// src/models/homeModel.js
const db = require('../db');  // Importando a conexão do arquivo db.js

// Função para executar a consulta
const executeQuery = (query, params, callback) => {
  db.query(query, params, callback);  // Usando db.query ao invés de connection.query
};

module.exports = {
  executeQuery
};