const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function fixUsers() {
    const client = await pool.connect();
    try {
        console.log('🔄 Fixing user active status...');
        const res = await client.query('UPDATE users SET is_active = true WHERE is_active IS NOT true');
        console.log(`✅ Updated ${res.rowCount} users to active status.`);
    } catch (err) {
        console.error('❌ Error updating users:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixUsers();
