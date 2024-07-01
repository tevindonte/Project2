// Import MongoDB Driver
//const { MongoClient } = require('mongodb');
// MongoDB Server URL 
//const url = "mongodb://localhost:27017"; 
// Create client 
//const client = new MongoClient(url);


import express from 'express';
import { promises as fs } from 'fs';

const app = express();
const PORT = 3000;

// API Test - Part 2
app.get('/api/planets', async (_req, res) => {
    try {
        const data = await fs.readFile('../mongodb/json-data/planets.json', 'utf8');
        const jsonObj = JSON.parse(data);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you!");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



