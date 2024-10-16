// src/models/setoresModel.js
const db = require('../db');

const setoresModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM setores', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM setores WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (nome_setor) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO setores (nome_setor) VALUES (?)', [nome_setor], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  update: (id, nome_setor) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE setores SET nome_setor = ? WHERE id = ?', [nome_setor, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM setores WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = setoresModel;
