import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const router = Router();
const config = process.env;


router.post('/', async (req, res) => {
	const { email, password } = req.body;

	if (!(email && password)) {
	  res.status(400).send("All input is required");
	}

	if (password === config.PASSWORD && email === config.EMAIL) {
		const token = jwt.sign(
		  { user_id: config.U_NAME, email },
		  config.TOKEN_KEY,
		  { expiresIn: "5h"}
		);

		return res.status(200).json({ token });

	} else {
		return res.status(400).send("Invalid Credentials");
	}
});

export default router;