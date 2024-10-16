// src/models/atribuidosModel.js
const db = require('../db');

const atribuídosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM atribuídos', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM atribuídos WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (chamado_id, setor_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO atribuídos (chamado_id, setor_id) VALUES (?, ?)', 
      [chamado_id, setor_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM atribuídos WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = atribuídosModel;
