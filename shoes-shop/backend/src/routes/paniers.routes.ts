import express from 'express';
import { getPanier, addPanier, updatePanier, deletePanier, deleteProductPanier } from '../controllers/paniers.controllers';
const app = express()

// id c'est le userID

app.get('/panier/:id', (req, res) =>{
    getPanier(req, res)
})

app.post('/panier/:id', (req, res) =>{
    addPanier(req, res)
})

app.put('/panier/:id', (req, res) => {
    updatePanier(req, res)
})

app.delete('/panier/:id/:productId', (req, res) => {  
    deleteProductPanier(req, res)
})

app.delete('/panier/:id', (req, res) => {
    deletePanier(req, res)
})

export default app;