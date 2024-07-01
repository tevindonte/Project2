import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
// Database URL | DB | Collections
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName_1 = process.env.MONGO_DB_COLLECTION_1; //films
const collectionName_2 = process.env.MONGO_DB_COLLECTION_2; //characters
const collectionName_3 = process.env.MONGO_DB_COLLECTION_3; //planets
const collectionName_4 = process.env.MONGO_DB_COLLECTION_4; //films_characters
const collectionName_5 = process.env.MONGO_DB_COLLECTION_5; //films_planets


const app = express();
const PORT = 3000;
app.use(cors());







app.get('/api/planets', async (_req, res) => {
    try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName_1);
    const socks = await collection.find({}).toArray();
    res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you!");
    }
});






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



