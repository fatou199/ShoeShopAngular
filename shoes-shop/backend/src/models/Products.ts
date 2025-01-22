import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nom_shoe: { type: String, required: true },
    image: { type: String, required: true },
    taille: { type: Number, required: true },
    prix: { type: Number, required: true },
    quantiteStock: { type: Number, required: true },
    categories: { type: String, enum: ['homme', 'femme'], required: true },
})

const Products = mongoose.model("Products", ProductSchema);

export default Products;