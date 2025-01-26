// importation des modules
import { Response, Request } from 'express';
import Paniers from '../models/Paniers';
import Products from '../models/Products';
import mongoose from 'mongoose';

// recuperation du panier d'un user
const getPanier = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID invalide",
                error: `L'identifiant '${id}' n'est pas un ObjectId valide.`
            });
        }

        const panier = await Paniers.findOne({ userId: id })
            .populate('products.produit')
            .exec();

        if (!panier) {
            const message = `Aucun panier trouvé pour l'utilisateur avec l'ID ${id}`;
            return res.status(404).json({ message });
        }

        console.log("Données reçues dans le panier", panier);
        //console.log(panier.products);  // Pour verifier que les produits sont peuplés correctement

        const message = `Vous avez bien recuperer le panier de l'user ${id}`;
        const message1 = `Vous avez ${panier.products.length} produits dans le panier`;

        // Calculer le total par produit et l'ajouter dynamiquement dans la réponse
        const updatedProducts = panier.products.map((product: any) => {
            const totalProduit = product.produit.prix * product.quantite;
            return {
                ...product.toObject(),
                total_produit: totalProduit
            }
        }); 

        return res.status(200).json({ message, message1, panier: { ...panier.toObject(), products: updatedProducts } });
    } catch (error: any) {
        const message = 'Récupération échouée';
        return res.status(404).json({ message, error: error.message })
    }
}


const addPanier = async (req: Request, res: Response) => {
    // Étape 1 : Récupérer l'utilisateur et les produits de la requête
    // (id de l'utilisateur et liste de produits)
    const { id } = req.params;
    const { products } = req.body;

    // console.log("Id en parametre:", id);
    // console.log("Product recus: ", products);

    try {

        // Étape 2 : Vérifier que l'utilisateur a un ID valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // console.log("Id non valide:", id);
            return res.status(404).json({
                message: "ID non valide",
                error: `L'identifiant ${id} n'est pas un ObjectId valide.`
            })
        }

        // Étape 3 : Initialiser une variable pour calculer le total de la commande
        let total_commande = 0;
        // console.log("Init Total commande:", total_commande);

        // Étape 4 : Parcourir chaque produit de la liste de la requête
        for (const product of products) {
            // console.log("Traitement du produit :", product);
            // - Chercher le produit dans la collection `Products`
            const productDetails = await Products.findById(product.produit).lean()
            // console.log("Detail produit: ", productDetails);

            // - Si le produit existe :
            if (productDetails) {
                //   - Multiplier le prix du produit par la quantité
                //   - Ajouter ce montant au total
                total_commande += productDetails.prix * product.quantite
                // console.log(`Prix: ${productDetails.prix}, Quantité: ${product.quantite}`);
                // console.log("Total commande après:", total_commande);
            } else {
                // - Si le produit n'existe pas :
                // - Retourner une erreur indiquant que ce produit n'existe pas   
                // console.log(`Produit non trouvé : ${product.produit}`);
                return res.status(404).json({
                    message: "Produit non trouvé",
                    error: `Le produit avec l'identifiant '${product.produit}' n'existe pas.`
                })
            }
        }

        // Étape 5 : Vérifie si plusieurs produits existent avec affichage des IDs qui n'existent pas
        // const productsId = products.map((product: { produit: string }) => product.produit);
        // console.log("Liste des IDs des produits :", productsId);

        // const productsExist = await Products.find({ _id: { $in: productsId } });
        // console.log("Produits existants trouvés dans bdd:", productsExist);

        // const productsNotExist = productsId.filter((productId: string) => !productsExist.find((product: any) => product._id == productId));
        // console.log("Produits inexistants :", productsNotExist);

        // if (productsNotExist.length) {
        //     const message = `Sur un total de ${productsId.length} produit(s), les produits suivants n'existent pas: ${productsNotExist.join(', ')}`;
        //     console.log(message);
        //     return res.status(404).json({ message });
        // }

        // Étape 6 : Vérifier si l'utilisateur a déjà un panier existant
        const existingPanier = await Paniers.findOne({ userId: id })
        // console.log("Panier existant:", existingPanier)
        // - Si un panier existe : 
        if (existingPanier){
            // console.log("Panier existant trouvé, mise à jour...");
            //   - Parcourir les produits dans ce panier
            for (const product of products) {
                const productExist = existingPanier.products.find((p) => p.produit.toString() === product.produit.toString())
                // console.log("Produit trouvé dans le panier :", productExist);
                //   - Si le produit est déjà présent, mettre à jour sa quantité
                if (productExist) {
                    productExist.quantite += product.quantite;
                    // console.log(`Mise à jour de la quantité pour le produit ${product.produit}; quantite: ${productExist.quantite}`);
                //   - Si le produit n'est pas présent, l'ajouter au panier
                } else {
                    existingPanier.products.push({
                        produit: product.produit,
                        quantite: product.quantite
                    });
                    // console.log(`Ajout du produit ${product.produit} au panier`);
                }
            }
            // Étape 7 : Mettre à jour le total de la commande
            existingPanier.total_commande += total_commande;
            // console.log("Total commande après mise à jour :", existingPanier.total_commande);
            // Étape 8 : Sauvegarder les modifications apportées au panier dans la base de données
            existingPanier.save();
            // console.log("Panier mis à jour avec succès");
        }
        // - Si aucun panier n'existe, en créer un nouveau
        else {
            // console.log("Aucun panier existant trouvé, création d'un nouveau...");
            const createPanier = new Paniers({
                userId: id,
                products: products.map((product: { produit: string, quantite: number }) => ({
                    produit: product.produit,
                    quantite: product.quantite
                })),
                total_commande
            })
        // Étape 9 : Sauvegarder le panier dans la base de données
        await createPanier.save();
        }
        // Étape 10 : Retourner une réponse avec un message de succès et les détails du panier
        const message = "Vous avez ajouté des produits à votre panier";
        // console.log('Produits ajoutés au panier:', products);
        return res.status(200).json({ message, products, total_commande });
    } catch (error: any) {
        // Étape 11 : Gérer les erreurs et retourner une réponse appropriée
        const message = "Erreur lors de la création du panier";
        return res.status(500).json({ message, error: error.message });
    }
};


const updatePanier = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { products } = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID invalide",
                error: `L'identifiant '${req.params.id}' n'est pas un ObjectId valide.`
            });
        }

        // Vérifier si un panier existe pour cet utilisateur
        const existingPanier = await Paniers.findOne({ userId: id });
        if (!existingPanier) {
            return res.status(400).json({
                message: "Panier non trouvé",
                error: `Le panier avec l'identifiant '${id}' n'existe pas.`
            })
        }
        console.log('Panier existant:', existingPanier);



        let total_commande = 0;
        // Mettre à jour les quantités des produits dans le panier
        for (const updateQte of products) {
            // Trouver le produit dans le panier existant
            const productInPanier = existingPanier.products.find(product =>
                product.produit.toString() === updateQte.produit.toString()
            );
            console.log("ExistePanier", existingPanier.products);
            console.log("Product", products.produit);
            console.log(`UpdateQte: ${updateQte.produit}, ProductInPanier: ${productInPanier}`);

            if (productInPanier) {
                // Mettre à jour la quantité
                productInPanier.quantite = updateQte.quantite;

                // Récupérer les détails du produit pour recalculer le total
                const detailProduct = await Products.findById(updateQte.produit).lean()

                // Recalculer le total de la commande
                if (detailProduct) {
                    total_commande += detailProduct.prix * updateQte.quantite
                } else {
                    return res.status(404).json({
                        message: "Produit non trouvé dans la base de données",
                        error: `Le produit avec l'identifiant '${updateQte.produit}' n'existe pas dans la base de données.`
                    })
                }
            }
            else {
                return res.status(404).json({
                    message: "Panier non trouvé dans la base de données",
                    error: `Le panier avec l'identifiant '${updateQte.produit}' n'existe pas dans la base de données.`
                })
            }
            console.log('Produit mis à jour:', updateQte.produit);
        }

        existingPanier.total_commande = total_commande;

        await existingPanier.save()

        const message = "Vous avez bien mis à jour votre panier";
        return res.status(200).json({ message, total_commande, products });
    }
    catch (error: any) {
        const message = "Erreur lors de la mise à jour de votre panier";
        return res.status(500).json({ message, error: error.message })
    }
}

const deleteProductPanier = async (req: Request, res: Response) => {
    const { id, productId } = req.params;

    try {
        // Vérifier si l'ID utilisateur (id) est valide.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID invalide",
                error: `L'identifiant '${id}' n'est pas un ObjectId valide.`
            })

        }

        // Vérifier si un panier existe pour cet utilisateur
        const existingPanier = await Paniers.findOne({ userId: id });
        if (!existingPanier) {
            return res.status(404).json({
                message: "Panier non trouvé",
                error: `Le panier avec l'identifiant '${id}' n'existe pas.`
            })
        }

        // Vérifier si le produit existe dans le panier
        const productIndex = existingPanier.products.findIndex((product) => product.produit.toString() === productId);
        if (productIndex === -1) {
            return res.status(400).json({
                message: "Produit non trouvé",
                error: `Le produit avec l'identifiant '${productId}' n'existe pas dans le panier.`
            })
        }

        // Supprimer le produit
        existingPanier.products.splice(productIndex, 1)

        // recalculer le total commande
        let total_commande = 0;
        for (const product of existingPanier.products) {
            const productDetails = await Products.findById(product.produit).lean();
            if (productDetails) {
                total_commande += productDetails.prix * product.quantite
            }
        }
        existingPanier.total_commande = total_commande

        // Sauvegarder les modifications
        await existingPanier.save();

        const message = "Produit supprimé avec succès du panier";
        return res.status(200).json({ message, existingPanier });

    } catch (error: any) {
        const message = "Erreur lors de la suppression de votre panier";
        return res.status(500).json({ message, error: error.message });
    }
}

const deletePanier = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID invalide",
                error: `L'identifiant '${id}' n'est pas un ObjectId valide.`
            })

        }


        // Vérifier si un panier existe pour cet utilisateur
        const existingPanier = await Paniers.findOne({ userId: id });
        if (!existingPanier) {
            return res.status(404).json({
                message: "Panier non trouvé",
                error: `Le panier avec l'identifiant '${id}' n'existe pas.`
            })
        }

        // Supprimer le panier
        await existingPanier.deleteOne({ userId: id });

        const message = "Vous avez bien supprimé votre panier";
        return res.status(200).json({ message });

    } catch (error: any) {
        const message = "Erreur lors de la suppression de votre panier";
        return res.status(500).json({ message, error: error.message });
    }
}

export { getPanier, addPanier, updatePanier, deleteProductPanier, deletePanier };