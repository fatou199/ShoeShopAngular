const jwt = require('jsonwebtoken')
import { NextFunction, Request, Response } from 'express';



const verifyToken = (req: Request & {userId?: any}, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
   
    if (!token) {
     return res.status(401).json({ message: 'Accès non autorisé : pas de token fourni.' });
    }
   
    try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.userId = decoded.userId; // Injecte userId dans la requête
     next();
    } catch (err) {
     return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
   };


   export default verifyToken;