const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function fixMissingStudents() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking for students without profiles...');

        // Find users with role 'Student' who don't have a record in the students table
        const res = await client.query(`
            SELECT u.id, u.name, u.email 
            FROM users u 
            LEFT JOIN students s ON u.id = s.user_id 
            WHERE u.role = 'Student' AND s.id IS NULL
        `);

        if (res.rows.length === 0) {
            console.log('✅ All student users have profiles.');
            return;
        }

        console.log(`🛠 Found ${res.rows.length} students missing profiles. Creating them...`);

        for (const user of res.rows) {
            const rollNo = `TEMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            await client.query(`
                INSERT INTO students (user_id, roll_number, department, course, year, enrollment_status)
                VALUES ($1, $2, 'General', 'B.Tech', 1, 'Prospective')
            `, [user.id, rollNo]);
            console.log(`   - Created profile for ${user.name} (${user.email})`);
        }

        console.log('✅ Successfully fixed missing student profiles.');

    } catch (err) {
        console.error('❌ Error fixing students:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixMissingStudents();
