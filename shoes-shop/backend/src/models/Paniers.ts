import mongoose from "mongoose";

const PanierSchema = new mongoose.Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: {type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true},
    quantite: { type: Number, required: true },
    total_commande: { type: Number, required: true },
})

const Paniers = mongoose.model("Paniers", PanierSchema);

export default Paniers;