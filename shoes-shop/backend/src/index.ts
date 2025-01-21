import express, { Request, Response } from 'express';
require('dotenv').config()
import connectDB from './connectToDB';
const cors = require('cors');
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/products.routes';


const app = express()
const port = process.env.PORT
app.use(express.json())

app.use(cors({
  origin:  ['http://localhost:4200', 'http://127.0.0.1:4200']
}));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.get('/api/home', (req: Request, res: Response) => {
  res.json({ message: 'Helloe from the backend!' });
})

app.use('', authRoutes);
app.use('', userRoutes);
app.use('', productRoutes);

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
