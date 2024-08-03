import mysql from 'mysql'

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "the-blog",
    password: "P@ssw0rd",
})