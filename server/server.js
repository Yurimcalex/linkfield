import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';


const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		const db = client.db('Links');
		const coll = db.collection('links');

		// const allValues = await getAllLinks(coll);
		// console.log(allValues);
		
		// const insertedDocs = await insertLinks(coll, [
		// 	{
		// 		description: 'React documentation',
		// 		src: 'https://react.dev/learn',
		// 		category: 'react',
		// 		type: 'docs'
		// 	},

		// 	{
		// 		description: 'JavaScript Game Tutorial – Build a Stick Hero Clone with HTML Canvas + JavaScript',
		// 		src: 'https://www.freecodecamp.org/news/javascript-game-tutorial-stick-hero-with-html-canvas/',
		// 		category: 'javascript',
		// 		type: 'tutorial'
		// 	},

		// 	{
		// 		description: 'JavaScript Game Dev Tutorial – Build Gorillas with HTML Canvas + JavaScript',
		// 		src: 'https://www.freecodecamp.org/news/gorillas-game-in-javascript/',
		// 		category: 'javascript',
		// 		type: 'tutorial'
		// 	}
		// ]);
		// console.log(insertedDocs);

		// let res = await coll.find({ "_id" : new ObjectId('67863cc31128a8bdc4b6be8f') }).toArray();
		// console.log(res);

		const updatedDoc = await updateLink(coll, {
			id: '67863cc31128a8bdc4b6be8f',
			type: 'docs'
		});
		console.log(updatedDoc);

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


async function updateLink(links_coll, linkData) {
	const data = { ...linkData };
	delete data.id;
	return await links_coll.updateOne(
		{ _id: new ObjectId(linkData.id) },
		{ $set: { ...data } }
	);
}


run().catch(err => console.log(err));