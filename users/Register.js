// Register new user which is not present currently in our database

import Express from "express";
import bp from "body-parser";
import User from "../models/userSchema.js";
import sha256 from 'js-sha256'; // Import the sha256 function from js-sha256

const app = Express();
app.use(bp.json());

export default async function Register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Email already exists',
                message: 'Email already exist.'
             });
        }

        // Hashing the password with SHA-256
        const hashedPassword = sha256(password);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}


