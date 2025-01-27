import { Request, Response } from 'express';
import { Orders } from '../models/Orders';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import Paniers from '../models/Paniers';


const getOrders = async (req: Request, res: Response) => {
    try {
        const allOrders = await Orders.find();

        if (allOrders.length === 0) {
            return res.status(404).json({
                message: "Aucune commande trouvée"
            });
        }

        const message = "Vous avez bien recuperer toutes les commandes";
        return res.status(200).json({ message, allOrders });
    } catch (error: any) {
        const message = 'Récupération échouée';
        return res.status(404).json({ message, error: error.message });
    }
}


const getOrdersUser = async (req: Request, res: Response) => {
    // id utilisateurs dans les parametres
    const { userid } = req.params;
    console.log("Id user", userid);

    try {
        // verifie si l'ObjectId est valide
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({
                message: "ID invalide",
                error: `L'identifiant '${userid}' n'est pas un ObjectId valide.`
            })
        }

        // recuperation des commandes par userID
        const ordersUser = await Orders.findOne({ userId: userid });
        console.log("Toute les commandes user:", ordersUser);

        if (!ordersUser) {
            return res.status(404).json({
                message: `Aucune commande pour cet utilisateur avec l'ID ${userid}`
            })
        }
        console.log("Pas de commande", ordersUser);

        const message = `Vous avez bien recuperer la commande de l'user ${userid}`;
        return res.status(200).json({ message, ordersUser });
    } catch (error: any) {
        const message = 'Récupération échouée';
        return res.status(404).json({ message, error: error.message });
    }
}


const getOneOrder = async (req: Request, res: Response) => {
    const { num_commande } = req.params;
    console.log("Id commande", num_commande);

    try {
        const commande = await Orders.findOne({ num_commande });

        if (!commande) {
            const message = `Aucune commande avec ce numero de commande: ${num_commande}`;
            return res.status(404).json({ message })
        }


        const message = 'Commande trouvée';
        return res.status(200).json({ message, commande })
    } catch (error: any) {
        return res.status(500).json({
            message: "Erreur lors de la récupération de la commande",
            error: error.message
        })
    }
}


const addOrder = async (req: Request, res: Response) => {
    const { status, adresse_livraison, moyen_paiement, userId } = req.body;

    // generer le numero de commande
    const generateUUID = uuidv4().replace(/-/g, "").slice(0, 6);
    const num_commande = `CMD${generateUUID}`;

    // recuperer le panier de l'utilisateur
    const panier = await Paniers.findOne({ userId }).populate('products.produit');
    if (!panier) {
        return res.status(404).json({
            message: "Aucun panier trouvé pour cet utilisateur"
        })
    }

    if (panier.products.length === 0) {
        return res.status(400).json({
            message: "Le panier est vide, impossible de créer une commande."
        });
    }
    

    // calculer le total de la commande
    let total_commande = 0;
    panier.products.forEach((product: any) => {
        total_commande += product.produit.prix * product.quantite;
        console.log(`Prix: ${product.produit.prix}, Quantite: ${product.quantite}, Total: ${total_commande}`);
    });
    

    try {
        const newOrder = new Orders({
            num_commande,
            status,
            adresse_livraison,
            moyen_paiement,
            total_commande,
            date_commande : new Date(),
            userId,
            detail_commande: panier.products.map((product : any) => ({
                shoes_id: product.produit._id, // ID du produit
                quantiteOrder: product.quantite, // Quantité récupérée du panier
                prix_unitaire: product.produit.prix // Prix récupéré du produit
            }))
        })
        await newOrder.save();

        // vider le panier
        await Paniers.deleteOne({ userId });

        const message = "Commande créée avec succès";
        return res.status(200).json({ message, newOrder })
    } catch (error: any) {
        const message = "Erreur lors de la création de la commande";
        return res.status(400).json({ message, error: error.message})
    }
}


export { getOrders, getOrdersUser, getOneOrder, addOrder }