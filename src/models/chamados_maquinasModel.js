// src/models/chamados_maquinasModel.js
const db = require('../db');

const chamadosMaquinasModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chamados_maquinas', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chamados_maquinas WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (chamado_id, maquina_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO chamados_maquinas (chamado_id, maquina_id) VALUES (?, ?)', 
      [chamado_id, maquina_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM chamados_maquinas WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = chamadosMaquinasModel;
