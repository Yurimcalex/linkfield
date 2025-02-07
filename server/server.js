import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import "express-async-errors";
import links from './routes/links.js';
import login from './routes/login.js';


const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/links", links);
app.use("/login", login);


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
});

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});