// l'ensemble des imports
import express, { Application, Request, Response } from 'express'
import { pool } from './db.js'

interface User { 
    id: string
    username: string
    birthdate?: string
}

const app: Application = express()
const PORT: number = 4000

const users: User[] = []

app.use(express.json())

// logique métier
app.get('/users/:id', async (req: Request, res: Response) => {
    const id = req.params.id

    const [rows]: any = await pool.promise().query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    )

    console.log('test route users')
    return res.status(200).json(rows)
})

app.get('/users/:username', (req: Request, res: Response) => {
    const username = Array.isArray(req.params.username) ? req.params.username[0] : req.params.username

    const result = users.filter((user) => user.username.toLowerCase() === username.toLowerCase())
    return res.json(result)
})

app.post('/users', async (req: Request, res: Response) => {
    const { username, birthdate } = req.body
    pool.promise().execute(
        'INSERT INTO users (username, birthdate) VALUES (?, ?)',
        [username, birthdate]
    )
    res.status(201).json({ username, birthdate })
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const i = users.findIndex(x => x.id === req.params.id)
    const [d] = users.splice(i, 1)
    res.json(d)
})

// écouter sur un port
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})