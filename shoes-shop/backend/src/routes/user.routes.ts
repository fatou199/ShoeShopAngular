import express from 'express';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.controllers';
const app = express()


app.get('/utilisateurs', (req, res) => {
    getAllUser(req, res)
});

app.get('/utilisateur/:id', (req, res) => { 
    getUser(req, res)
});

app.put('/utilisateur/:id', (req, res) => {
    updateUser(req, res);
});
  
app.delete('/utilisateur/:id', (req, res) => {
    deleteUser(req, res);
});
  

export default app;