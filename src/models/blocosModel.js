// src/models/blocosModel.js
const db = require('../db');

const blocosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM blocos', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM blocos WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (nome_bloco) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO blocos (nome_bloco) VALUES (?)', [nome_bloco], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  update: (id, nome_bloco) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE blocos SET nome_bloco = ? WHERE id = ?', [nome_bloco, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM blocos WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  
};

module.exports = blocosModel;
