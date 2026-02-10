const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function grantAccess() {
    const client = await pool.connect();
    try {
        const email = 'student1@example.com';
        console.log(`🔓 Granting dashboard access to ${email}...`);

        const res = await client.query(
            'UPDATE users SET can_access_dashboard = true WHERE email = $1 RETURNING *',
            [email]
        );

        if (res.rowCount === 0) {
            console.log(`❌ User ${email} not found.`);
        } else {
            console.log(`✅ Access granted to ${res.rows[0].name} (${email})`);
        }

    } catch (err) {
        console.error('❌ Error granting access:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

grantAccess();
