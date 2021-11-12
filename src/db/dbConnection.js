/* esse arquivo faz uma conexão com o banco de dados usando a biblioteca mysql2 e a exporta*/
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

class DbConnection {
    async openConnection() {
        // create the connection
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DEFAULTDATABASE
            });
            return connection;
        }
        catch (e) {
            console.log("connection with database was refused");
            console.log(`error: ${e}`);
            throw ("Error connecting to db");
        }
    }
    async closeConnection(connection) {
        await connection.end();
    }
}
export default new DbConnection();