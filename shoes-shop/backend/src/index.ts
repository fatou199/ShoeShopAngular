import express, { Request, Response } from 'express';
require('dotenv').config()
import connectDB from '../connectToDatabase';

const app = express()
const port = process.env.PORT


app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})


const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erreur de démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer()
