const mysql = require('mysql2');
async function main() {
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'prjtdah'
    });
    export { connection };
}
main();