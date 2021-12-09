/* esse arquivo faz uma conexão com o banco de dados usando a biblioteca mysql2 e a exporta*/
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

class DbConnection {
    static async openConnection() {
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
    static async closeConnection(connection) {
        await connection.end();
    }
    async executeQuery(query) {
        let rows, fields, err;
        try {
            const connection = await DbConnection.openConnection();
            [rows, fields, err] = await connection.query(query);
            await DbConnection.closeConnection(connection);
            return [rows, err]; /*retorna sempre resposta e se tem ou não erros*/
        }
        catch (e) {
            console.log(e);
            return ["", "Connection Error"];
        }
    }
}
export default new DbConnection();