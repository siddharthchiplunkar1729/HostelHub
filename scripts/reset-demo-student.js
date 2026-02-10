const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function resetDemoStudent() {
    const client = await pool.connect();
    try {
        const email = 'student4@example.com';
        console.log(`🔄 Resetting demo student (${email}) to 'New Applicant' state...`);

        // 1. Get User ID
        const userRes = await client.query('SELECT id, name FROM users WHERE email = $1', [email]);

        if (userRes.rows.length === 0) {
            console.log('❌ User not found. Creating demo user...');
            // Create if verifying script runs on empty db, but assume seed exists
            return;
        }

        const userId = userRes.rows[0].id;

        // 2. Get Student ID
        const studentRes = await client.query('SELECT id FROM students WHERE user_id = $1', [userId]);
        const studentId = studentRes.rows[0]?.id;

        if (studentId) {
            // 3. Delete existing applications and data
            await client.query('DELETE FROM hostel_applications WHERE student_id = $1', [studentId]);
            await client.query('DELETE FROM complaints WHERE student_id = $1', [studentId]);
            // 4. Reset Student Profile
            await client.query(`
                UPDATE students 
                SET enrollment_status = 'Prospective', 
                    hostel_block_id = NULL, 
                    room_number = NULL 
                WHERE id = $1
            `, [studentId]);

            // 5. Reset User Access
            await client.query('UPDATE users SET can_access_dashboard = false WHERE id = $1', [userId]);

            console.log(`✅ Successfully reset ${userRes.rows[0].name}.`);
            console.log(`👉 You can now log in as ${email} and apply for a hostel from scratch.`);
        } else {
            console.log('❌ Student profile not found (even after fix script?).');
        }

    } catch (err) {
        console.error('❌ Error resetting student:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

resetDemoStudent();
