import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		const db = client.db('Links');
		const coll = db.collection('links');
		const cursor = coll.find({});

		await cursor.forEach(console.log);

	} finally {
		await client.close();
	}
}

run().catch(err => console.log(err));

console.log(uri);