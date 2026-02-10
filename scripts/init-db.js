const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initialize() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'init-db.sql'), 'utf8');
        await pool.query(sql);
        console.log('✅ Database initialized successfully.');
    } catch (err) {
        console.error('❌ Error initializing database:', err);
    } finally {
        await pool.end();
    }
}

initialize();
