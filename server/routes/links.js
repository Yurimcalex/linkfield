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


router.patch('/:id', async (req, res) => {
	const collection = await db.collection('links');
	const query = { _id: new ObjectId(req.params.id) };
	const updates = {
	  $set: { ...req.body, date: new Date() }
	};
	const result = await collection.updateOne(query, updates);
	res.send(result).status(200);
});


router.delete('/:id', async (req, res) => {
	const collection = await db.collection('links');
	const query = { _id: new ObjectId(req.params.id) };
	const result = await collection.deleteOne(query);
	res.send(result).status(200);
});

export default router;