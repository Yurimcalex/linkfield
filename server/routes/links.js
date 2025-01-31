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

export default router;