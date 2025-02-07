import { MongoClient } from 'mongodb';

const connectionString = process.env.ATLAS_URI || '';
const client = new MongoClient(connectionString);

//let connection;
try {
	//connection = await client.connect();
	await client.connect();
} catch (e) {
	console.error(e);
}

let db = client.db('Links');

export default db;