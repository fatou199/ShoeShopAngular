const jwt = require('jsonwebtoken')
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';



const verifyToken = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log('Token reçu:', token); 


    if (!token) {
        // console.log('Aucun token trouvé dans l\'en-tête Authorization');
        return res.status(401).json({ message: 'Accès non autorisé : pas de token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Token décodé:', decoded);


        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user;
        // console.log('Utilisateur ajouté à la requête:', req.user);
        next();
    } catch (err) {
        // console.log('Erreur de vérification du token:', error);
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};


export default verifyToken;