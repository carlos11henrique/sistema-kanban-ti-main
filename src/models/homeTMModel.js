const db = require('../db');

// Função genérica para executar queries
const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                console.error('Erro ao executar query:', err);
                return reject(new Error('Erro ao executar query.'));
            }
            resolve(results);
        });
    });
};

// Funções específicas utilizando a função genérica
const getTempoMedioResolucao = (query, params) => {
    return executeQuery(query, params);
};

const getProblemasMaiorIndice = (query, params) => {
    return executeQuery(query, params);
};

const getTempoPrimeiroContato = (query, params) => {
    return executeQuery(query, params);
};

const getTempoFechamento = (query, params) => {
    return executeQuery(query, params);
};

module.exports = {
    getTempoMedioResolucao,
    getProblemasMaiorIndice,
    getTempoPrimeiroContato,
    getTempoFechamento,
};
