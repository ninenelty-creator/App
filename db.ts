import mysql from 'mysql2'

export const pool = mysql.createPool({
    // Toutes notre config
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
})
