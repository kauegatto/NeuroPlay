/* esse arquivo faz uma conexão com o banco de dados usando a biblioteca mysql2 e a exporta*/
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
let connection;
async function main() {
    // create the connection
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'prjtdah'
        });
    }
    catch (e) {
        console.log("connection with database was refused");
    }
}
main();
export { connection };