const pool = require('pg').Pool;

// Database configuration - match your hostelhub .env file
const dbPool = new pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'hostelhub',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres'
});

async function clearApplicationQueue() {
    const client = await dbPool.connect();
    try {
        console.log('🗑️  Clearing application queue...');

        // Delete all pending applications
        const result = await client.query(
            `DELETE FROM hostel_applications 
             WHERE status = 'Pending' 
             RETURNING id`
        );

        console.log(`✅ Cleared ${result.rowCount} pending application(s)`);

        // Also reset any students who were in "Applied" state
        const studentResult = await client.query(
            `UPDATE students 
             SET enrollment_status = 'Prospective', hostel_block_id = NULL 
             WHERE enrollment_status = 'Applied'
             RETURNING id`
        );

        console.log(`✅ Reset ${studentResult.rowCount} student(s) to Prospective status`);

        console.log('\n✨ Application queue cleared successfully!');

    } catch (error) {
        console.error('❌ Error clearing queue:', error);
        throw error;
    } finally {
        client.release();
        await dbPool.end();
    }
}

// Run the script
clearApplicationQueue()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
