import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
	const collection = await db.collection('links');
	const result = await collection
		.find({})
		.toArray();
	res.send(result).status(200);
});


router.post('/', async (req, res) => {
	const collection = await db.collection('links');
	const newDocument = req.body;
	newDocument.date = new Date();
	const result = await collection.insertOne(newDocument);
	res.send(result).status(204);
});


router.post('/links', async (req, res) => {
	const collection = await db.collection('links');
	const data = req.body;
	const newDocuments = data.map(d => ({ ...d, date: new Date() }));
	const result = await collection.insertMany(newDocuments);
	res.send(result).status(204);
});

export default router;