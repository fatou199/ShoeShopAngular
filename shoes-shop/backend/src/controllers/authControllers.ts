import { Request, Response } from 'express';
require('dotenv').config();
import User from '../models/User';
import { hashPassword, verifyPassword } from '../utils/authUtils'
const jwt = require('jsonwebtoken');
 


const register = async (req: Request, res: Response) => {
    const { username, email, password, telephone } = req.body

    if (!username || !email || !password || !telephone) {
        return res.status(400).json({ message: 'Tous les champs sont requis' })
    }

    const hashedPassword = await hashPassword(password);

    try {

        const existMail = await User.findOne({ email })

        if (existMail) {
            return res.status(400).json("Cette email existe déja !")
        }

        const role = await User.countDocuments() === 0 ? 'admin' : 'user';

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            telephone,
            role
        })
        const signup = await newUser.save();
        const message = "Votre inscription a bien été prise en compte"
        return res.status(201).json({ message, signup })
    } catch (error) {
        const message = "Erreur lors de l\'enregistrement";
        return res.status(500).json({ message, error })
    }
}


const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe sont requis" })
    }

    try {
        const signin = await User.findOne({
            email
        });

        if (!signin) {
            return res.status(404).json({ message: "Cet utilisateur n\'existe pas" })
        }

        const isPasswordValid = await verifyPassword(password, signin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }


        const token = jwt.sign({ userId: signin._id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        const message = "Connexion réussie";
        return res.status(201).json({ message, token });
    } catch (error) {
        const message = "Erreur lors de la connexion";
        return res.status(500).json({ message, error });
    }
}


export { register, login };
