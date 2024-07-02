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






// Test
app.get('/api/test', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const test = await collection.find({}).project({ _id: 0 }).toArray();
        res.json(test);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No items for you!");
    }
});



// Characters
app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_2);
        const characters = await collection.find({}).project({ _id: 0 }).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No characters for you!");
    }
});



// Films
app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_1);
        const films = await collection.find({}).project({ _id: 0 }).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No films for you!");
    }
});



// Planets
app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_3);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... No planets for you!");
    }
});



// Character ID
app.get('/api/characters/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_2);
        const { id } = req.params;
        const character = await collection.findOne({ "id": parseInt(id) });
        res.json(character);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... Character not found!");
    }
});



// Film ID
app.get('/api/films/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_1);
        const { id } = req.params;
        const film = await collection.find({ "id": parseInt(id) }).project({ _id: 0 }).toArray();
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... Film not found!");
    }
});



// Planet ID
app.get('/api/planets/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_3);
        const { id } = req.params;
        const planet = await collection.find({ "id": parseInt(id) }).project({ _id: 0 }).toArray();
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... Planet not found!");
    }
});



// Film ID Characters
app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_4);
        const { id } = req.params;
        const filmcharacters = await collection.find({ "film_id": parseInt(id) }).project({ _id: 0, film_id: 0 }).toArray();
        res.json(filmcharacters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... no characters found for this film!");
    }
});


// Film ID Planets
app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_3);
        const { id } = req.params;
        const filmcharacters = await collection.find({ "id": parseInt(id) }).project({ _id: 0 }).toArray();
        res.json(filmcharacters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... no planets found for this film!");
    }
});



// Character ID Films ---- Asssuming ID = Character_ID
app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_4);
        const { id } = req.params;
        const characterfilm = await collection.find({ "character_id": parseInt(id) }).project({ _id: 0, character_id: 0 }).toArray();
        res.json(characterfilm);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... films have not been found for this character!");
    }
});



// Planet ID Films ---- Assuming ID = Planet_ID
app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_5);
        const { id } = req.params;
        const planetfilm = await collection.find({ "planet_id": parseInt(id) }).project({ _id: 0, planet_id: 0 }).toArray();
        res.json(planetfilm);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... films have not been found for this character!");
    }
});



// Planet ID Films ---- Assuming ID = Planet_ID
app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName_2);
        const { id } = req.params;
        const planetfilm = await collection.find({ "homeworld": parseInt(id) }).project({ _id: 0, homeworld: 0 }).toArray();
        res.json(planetfilm);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something is wrong... films have not been found for this character!");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



