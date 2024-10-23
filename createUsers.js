// Import MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB connection URI and database/collection names
const uri = 'mongodb+srv://code-wizard-18:mongodb18@cluster0.pl3op.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'mydatabase';
const collectionName = 'users';

// Function to generate random username and email
function generateRandomUser() {
    const username = Math.random().toString(36).substring(2, 10);
    const email = `${username}@example.com`;
    return { username, email };
}

// Function to insert users into MongoDB
async function insertUsers() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const users = [];

        // Generate 10 random users
        for (let i = 0; i < 10; i++) {
            users.push(generateRandomUser());
        }

        // Insert users into the collection
        const result = await collection.insertMany(users);
        console.log(`${result.insertedCount} users inserted successfully`);

    } catch (err) {
        console.error('Error inserting users:', err);
    } finally {
        await client.close();
    }
}

// Call the insert function
insertUsers();
