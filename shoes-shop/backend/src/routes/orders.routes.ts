import express from 'express';
const app = express()
import { getOrders, getOrdersUser, getOneOrder, addOrder } from '../controllers/orders.controllers';


app.get('/orders', (req, res) => {
    getOrders(req, res)
})

app.get('/user-orders/:userid', (req, res) => {
    getOrdersUser(req, res)
})

app.get('/orders/:num_commande', (req, res) => {
    getOneOrder(req, res)
})

app.post('/orders', (req, res) => {
    addOrder(req, res)
})


export default app;