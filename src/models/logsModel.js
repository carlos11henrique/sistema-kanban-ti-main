// src/models/logsModel.js
const db = require('../db');

const logsModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM logs', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM logs WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (log) => {
    return new Promise((resolve, reject) => {
      const { chamado_id, usuario_id, acao, data_atualizacao, data_exclusao } = log;
      db.query('INSERT INTO logs (chamado_id, usuario_id, acao, data_atualizacao, data_exclusao) VALUES (?, ?, ?, ?, ?)', 
      [chamado_id, usuario_id, acao, data_atualizacao, data_exclusao], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM logs WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = logsModel;
