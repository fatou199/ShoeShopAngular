import express, { Request, Response } from 'express';
require('dotenv').config()
import connectDB from './connectToDB';
const cors = require('cors');

const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:4200'
}));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.get('/api/home', (req: Request, res: Response) => {
  res.json({ message: 'Helloeee from the backend!' });
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
