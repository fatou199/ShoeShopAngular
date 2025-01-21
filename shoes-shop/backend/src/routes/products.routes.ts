import express from "express";
import { getAllProducts, getProducts, addProducts, updateProducts, deleteProducts } from "../controllers/products.controllers";
const app = express()


app.get('/products', (req, res) => {
    getAllProducts(req, res)
})

app.get('products/:id', (req, res) =>{
    getProducts(req, res)
})

app.post('/products', (req, res) => {
    addProducts(req, res)
})

app.put('/products/:id', (req, res) => {
    updateProducts(req, res)
})

app.delete('/products/:id', (req, res) => {
    deleteProducts(req, res)
})

export default app;