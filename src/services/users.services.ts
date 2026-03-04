import { Request, Response } from 'express'
import { pool } from '../../db.js'
import { findUserByEmail } from '../Repositories/users.repositorie.js'


export const register = async (userToCreated: { username: string; email: string; password: string }) => async (req: Request, res: Response) => {
    // Chercher si l'utilisateur existe déjà dans la base de données
    if (userToCreated.password.includes(' ') || userToCreated.password.length < 6 || userToCreated.password.length > 20 || !/[A-Z]/.test(userToCreated.password) || !/[a-z]/.test(userToCreated.password) || !/[0-9]/.test(userToCreated.password)) {
        return res.status(400).json({ error: "Password n'est pas valide" })
    }
    if (userToCreated.email.includes(' ') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userToCreated.email)) {
        const [rows]: any = await pool.promise().query(
            'SELECT * FROM users WHERE email = ?',
            [userToCreated.email]
        )
        return res.status(400).json({ error: "Email n'est pas valide" })
    }
    if (userToCreated.username.includes(' ') || userToCreated.username.length < 3 || userToCreated.username.length > 15) {
        const [rows]: any = await pool.promise().query(
            'SELECT * FROM users WHERE username = ?',
            [userToCreated.username]
        )
        return res.status(400).json({ error: "Username n'est pas valide" })
    }
    const user = await findUserByEmail(userToCreated.email)
    // Hasher le mot de passe 
    const bcrypt = require('bcrypt');
    const saltRounds = 10; // Facteur de travail

    const hashPassword = async (plainPassword: string) => {
        try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        console.log('Mot de passe haché :', hashedPassword);
        return hashedPassword;
        } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        throw error;
        }
    };
    // Enregistrer l'utilisateur dans la base de données
    await pool.promise().execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [userToCreated.username, userToCreated.email, userToCreated.password]
    )
    // Envoyer un emai
    console.log(`Email de confirmation envoyé à ${userToCreated.email}`)
    // Renvoyé notre données 
    return userToCreated
}
