import express from 'express';
import { login, register } from "../controllers/auth.controllers";
const app = express()


app.post('/auth/register', (req, res) => {
    register(req, res)
});


app.post('/auth/login', (req, res) => { 
    login(req, res)
});


export default app;