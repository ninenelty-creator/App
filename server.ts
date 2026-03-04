// l'ensemble des imports
import express, { Application, Request, Response } from 'express'
import { pool } from './db.js'
import { emitWarning } from 'node:process'
import { URLSearchParams } from 'node:url'
import userRouter from './src/Routes/user.route.js'

const app: Application = express()
const PORT: number = 4000

// use logique métier
app.use(express.json())

app.use(userRouter)

// écouter sur un port
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})