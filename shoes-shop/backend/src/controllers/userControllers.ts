import { Request, Response } from 'express';
require('dotenv').config();
import User from '../models/User';


const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json(users)
    } catch (error: any) {
        const message = "Erreur lors de la récupération des utilisateurs";
        return res.status(500).json({ message, error: error.message });
    }
}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const oneUser = await User.findById(id)
        if (!oneUser) {
            return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
        }
        return res.status(200).json(oneUser)

    } catch (error: any) {
        const message = "Erreur lors de la récupération de l\'utilisateur";
        return res.status(500).json({ message, error: error.message });
    }

}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { username, email, password, telephone } = req.body

    try {
        const updateduser = await User.findByIdAndUpdate(
            id, { username, email, password, telephone }, { new: true }
        );

        if (!updateduser) {
            return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
        }
        const message = "L\'utilisateur a bien été mise à jour";
        return res.status(200).json({ message, updateduser })

    } catch (error: any) {
        const message = "Erreur lors de la mise à jour de l\'utilisateur.";
        return res.status(500).json({ message, error: error.message });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const removeUser = await User.findByIdAndDelete(id)

        if (!removeUser) {
            return res.status(404).send("Utilisateur non trouvé.");
        }

        res.status(200).send("L'utilisateur a bien été supprimé.");
    } catch (error: any) {
        const message = "Erreur lors de la suppression de l\'utilisateur.";
        return res.status(500).json({ message, error: error.message });
    }
}


export { getAllUser, getUser, updateUser, deleteUser };
