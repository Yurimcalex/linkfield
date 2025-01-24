import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		const db = client.db('Links');
		const coll = db.collection('links');

		//const allValues = await getAllLinks(coll);
		//console.log(allValues);
		
		const insertedDocs = await insertLinks(coll, [
			{
				description: 'React documentation',
				src: 'https://react.dev/learn',
				category: 'react',
				type: 'docs'
			},

			{
				description: 'JavaScript Game Tutorial – Build a Stick Hero Clone with HTML Canvas + JavaScript',
				src: 'https://www.freecodecamp.org/news/javascript-game-tutorial-stick-hero-with-html-canvas/',
				category: 'javascript',
				type: 'tutorial'
			},

			{
				description: 'JavaScript Game Dev Tutorial – Build Gorillas with HTML Canvas + JavaScript',
				src: 'https://www.freecodecamp.org/news/gorillas-game-in-javascript/',
				category: 'javascript',
				type: 'tutorial'
			}
		]);

		console.log(insertedDocs);

	} finally {
		await client.close();
	}
}


async function getAllLinks(links_coll) {
	return await links_coll.find().toArray();
}


async function insertLinks(links_coll, docs) {
	return await links_coll.insertMany(docs);
}



run().catch(err => console.log(err));