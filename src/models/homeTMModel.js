// src/models/homeTMModel.js

const db = require('../db');

const executeQuery = async (query, params, callback) => {
    try {
        const [rows] = await db.execute(query, params);
        callback(null, rows);
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        callback(error, null);
    }
};

module.exports = {
    executeQuery,
};
