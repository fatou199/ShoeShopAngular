import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: { type: String, enum: ["en attente", "payé", "annulé"], required: true},
    methode_paiement: { type: String , enum: ['paypal', 'carte bancaire'], required: true },
    num_transaction: { type: Number, required: true },
    date_paiement: { type: Date, required: true },
    montant_total: { type: Number, required: true },
})

const Payments = mongoose.model("Payments", PaymentSchema);

export default Payments;