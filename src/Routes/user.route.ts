import {Router} from "express";
import { pool } from "../../db.js";
import express, { Application, Request, Response } from 'express'
import { create } from "node:domain";
import { createUser } from "../Controlles/user.controller.js";

interface User { 
    id: string
    username: string
    birthdate?: string
    password?: string
    email?: string
}

const userRouter = Router()

const users: User[] = []

// logique métier

userRouter.get('/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id

    const [rows]: any = await pool.promise().query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    )

    console.log('test route users')
    return res.status(200).json(rows)
})
userRouter.get('/users/:username', (req: Request, res: Response) => {
    const username = Array.isArray(req.params.username) ? req.params.username[0] : req.params.username

    const result = users.filter((user) => user.username.toLowerCase() === username.toLowerCase())
    return res.json(result)
})

userRouter.post('/users', createUser)

userRouter.post('/users', async (req: Request, res: Response) => {
    const { username, birthdate } = req.body
    pool.promise().execute(
        'INSERT INTO users (username, birthdate) VALUES (?, ?)',
        [username, birthdate]
    )
    res.status(201).json({ username, birthdate })
})
userRouter.delete('/users/:id', (req: Request, res: Response) => {
    const i = users.findIndex(x => x.id === req.params.id)
    const [d] = users.splice(i, 1)
    res.json(d)
})
export default userRouter