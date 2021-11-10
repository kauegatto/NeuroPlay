require('dotenv').config();

module.exports = { // Isso aqui é pra configurar as migrations: https://sequelize.org/master/manual/migrations.html
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  timezone: '-03:00',
  dialectOptions: {
    timezone: '-03:00',
  },
// eslint-disable-next-line
}
