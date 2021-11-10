/* esse arquivo faz uma conexão com o banco de dados usando a biblioteca mysql2 e a exporta*/
const mysql = require('mysql2');

import dotenv from 'dotenv';

async function main() {
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'prjtdah'
    });
    export { connection };
}

main();