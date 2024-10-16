const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão com MySQL estabelecida.');
});

module.exports = connection;
