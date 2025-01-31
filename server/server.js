import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';


import express from 'express';
import cors from 'cors';
import "express-async-errors";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());


//app.use("/links", links);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
});

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});




const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

// description: '',
// src: '',
// category: '',
// type: ''

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

		// const updatedDoc = await updateLink(coll, {
		// 	id: '67863cc31128a8bdc4b6be8f',
		// 	type: 'docs'
		// });
		// console.log(updatedDoc);

		const deletedDoc = await deleteLink(coll, '67863cc31128a8bdc4b6be8f');
		console.log(deletedDoc);

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


async function deleteLink(links_coll, id) {
	return await links_coll.deleteOne({ '_id': new ObjectId(id) });
}


//run().catch(err => console.log(err));