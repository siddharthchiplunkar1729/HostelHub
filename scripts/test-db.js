const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://127.0.0.1:27017/hostelhub";

async function testConnection() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ Successfully connected to MongoDB!");

        // List collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        await mongoose.connection.close();
    } catch (error) {
        console.error("❌ Connection failed!");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        if (error.cause) console.error("Cause:", error.cause);
    }
}

testConnection();
