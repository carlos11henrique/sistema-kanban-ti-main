const db = require('../db');  

// Função para executar a consulta
const executeQuery = (query, params, callback) => {
  db.query(query, params, callback); 
};

module.exports = {
  executeQuery
};