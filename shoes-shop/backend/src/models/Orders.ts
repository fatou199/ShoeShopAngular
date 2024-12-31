import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema ({
    shoes_id: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    quantiteOrder: { type: Number, required: true },      
    prix_unitaire: { type: Number, required: true },      
})

const OrdersDetail = mongoose.model("OrdersDetail", OrderDetailSchema);


const OrderSchema = new mongoose.Schema ({
    num_commande: { type: String, required: true },
    status: { type: String, enum: ["en attente", "traitée", "annulée"], default: "en attente",required: true },
    adresse_livraison: { type: String, required: true },
    moyen_paiement: { type: String, enum: ["carte bancaire", "paypal", "espèces"], required: true },
    total_commande: { type: Number, required: true },
    date_commande: { type: Date, required: true },
    userId: { type: Number, required: true },
    detail_commande : [OrderDetailSchema],
})

const Orders = mongoose.model("Orders", OrderSchema);

export { OrdersDetail, Orders };
