import Express from "express";
import bp from "body-parser";
import User from "../models/userSchema.js";
import sha256 from 'js-sha256'; // Import the sha256 function from js-sha256

const app = Express();
app.use(bp.json());

export default async function LogIn(req, res) {
    const { email, password } = req.body;
    try {
        const userLogIn = await User.findOne({ email });
        if (!userLogIn) {
            return res.status(400).json({ 
                error: 'User not found',
                message:'Email you entered is incorrect'
            });
        }

        // Hash the provided password and compare it with the stored hashed password
        const hashedPassword = sha256(password);
        if (hashedPassword !== userLogIn.password) {
            return res.status(401).json({ 
                error: 'Invalid password',
                message: 'The password you entered is incorrect.'
            });
        }

        // Passwords match, user is authenticated
        res.json({ message: 'User authenticated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
