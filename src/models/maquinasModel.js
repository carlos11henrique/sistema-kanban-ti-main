// src/models/maquinasModel.js
const db = require('../db');

const maquinasModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM maquinas', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM maquinas WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (numero_maquina, sala_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO maquinas (numero_maquina, sala_id) VALUES (?, ?)', [numero_maquina, sala_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  update: (id, numero_maquina, sala_id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE maquinas SET numero_maquina = ?, sala_id = ? WHERE id = ?', [numero_maquina, sala_id, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM maquinas WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = maquinasModel;
