import express, { Request, Response } from 'express';
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello world')
  })

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
})