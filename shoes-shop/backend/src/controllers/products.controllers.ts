import { Response, Request } from 'express';
import Products from '../models/Products';
import mongoose from 'mongoose';


const getAllProducts = async (req: Request, res: Response) => {
    try {
        // recuperation de tout les produits
        const products = await Products.find()
        return res.status(200).json(products)
    } catch (error: any) {
        // si une erreur survient
        const message = "Erreur lors de la récupération des produits";
        return res.status(500).json({ message, error: error.message })
    }
}

const getProducts = async (req: Request, res: Response) => {
    // recuperation de l'id du produit
    const { id } = req.params;

    try {
        // recherche du produit par son id
        const oneProduct = await Products.findById(id)
        // si le produit n'existe pas
        if (!oneProduct) {
            return res.status(404).json({ error: 'Aucun produit trouvé' });
        }
        // si le produit existe
        return res.status(200).json(oneProduct)
    } catch (error: any) {
        // si une erreur survient
        const message = "Erreur lors de la récupération du produit";
        return res.status(500).json({ message, error: error.message})
    }
}

const addProducts = async (req: Request, res: Response) => {
    // recuperation des données du produit
    const { nom_shoe, image, taille, prix, stock, categories } = req.body

    // verification des données
    if (!nom_shoe || !image || !taille || !prix || !stock || !categories) {
        return res.status(400).json({ message: "Tout les champs sont requis" })
    }

    try {

        // creation d'un nouveau produit
        const newProduct = new Products({
            nom_shoe,
            image,
            taille,
            prix,
            stock, 
            categories
        })
        // sauvegarde du produit
        await newProduct.save();
        const message = "Le produit a bien été créer";
        return res.status(200).json({ message, newProduct })
    } catch (error: any) {
        // si une erreur survient
        const message = "Erreur lors de la création du produit";
        return res.status(400).json({message, error: error.message})
    }
}

const updateProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nom_shoe, image, taille, prix, stock, categories } = req.body;

    try {

        // verification de l'id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: "ID invalide", 
                error: `L'identifiant '${id}' n'est pas un ObjectId valide.` 
            });
        }

        // mise à jour du produit
        const updateproducts = await Products.findByIdAndUpdate(
            id, 
            { nom_shoe, image, taille, prix, stock, categories },
            { new: true } // Cette option retourne le document mis à jour
        );

        // si le produit n'existe pas
        if (!updateproducts) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        // recuperation de l'id du produit dans le message
        const message = `Le produit ${id} a bien été mis à jour`;
        return res.status(201).json({message, updateproducts})  
        
    } catch (error: any) {
        // si une erreur survient
        const message = "Erreur lors de la mise à jour du produit";
        return res.status(400).json({message, error: error.message})
    }
}

const deleteProducts = async(req: Request, res: Response) =>{
 const { id } = req.params; 

    try {

        // verification de l'id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: "ID invalide", 
                error: `L'identifiant '${id}' n'est pas un ObjectId valide.` 
            });
        }

        // suppression du produit
        const deleteProduct = await Products.findByIdAndDelete(id);

        // si le produit n'existe pas
        if (!deleteProduct) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        // recuperation de l'id du produit dans le message
        const message = `Le produit ${id} a bien été supprimé`;
        return res.status(200).json({ message, deleteProduct })
    } catch (error: any) {
        // si une erreur survient
        const message = "Erreur lors de la suppression du produit";
        return res.status(400).json({ message, error: error.message })
    }
}

export { getAllProducts, getProducts, addProducts, updateProducts, deleteProducts }