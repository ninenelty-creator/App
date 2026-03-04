import { Request, Response } from 'express'
import { register } from '../services/users.services.js'

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: "Username n'est pas un string valide" })
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email n'est pas un string valide" })
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: "Password n'est pas un string valide" })
    }
    if (password.length < 6 || password.length > 20 || !/^[a-zA-Z0-9]+$/.test(username) ) {
        return res.status(400).json({ error: "Password doit contenir entre 6 et 20 caractères" })
    }
    if (username.length < 3 || username.length > 15 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ error: "Username doit contenir entre 3 et 15 caractères" })
    }
    if (email.length < 5 || email.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  {
        return res.status(400).json({ error: "Email doit contenir entre 5 et 50 caractères" })
    }
    const userCreated = await register({username, email, password})

    res.status(200).json({ username, email, password })
}