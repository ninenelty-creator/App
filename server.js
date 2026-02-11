// l'ensemble des imports
import express from 'express'
import { create } from 'node:domain'

const app = express()
const PORT = 4000

const user = []

app.use(express.json())

// logique métier
app.get('/users/:id', async (req, res) => {
    const { id } = req.params.id


    const [rows] = await pool.query(
        "SELECT * FROM users where id = ?",
        [id]
    )

    res.status(200).json({rows})
})

// récupérer un utilisateur par son username
app.get('/users/:username', (req, res) => {
    const { username } = req.query
    // const { username } pour récuperer la variable username et req.query pour récuperer les query params 
    const result = user.filter((user) => user.username.toLowerCase() === username.toLowerCase())
    console.log('test route users/:username')
    res.json({ username })
})

app.post('/users', (req, res) => {
    //req.body.name

    res.json({ id: '', username, birthdate })
})

app.delete('/users', (req, res) => {
    delete (user)
    console.log('delete user')
    res.json({ success: true })
})

// écouter sur un port

app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})
