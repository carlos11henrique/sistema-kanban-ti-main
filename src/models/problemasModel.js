// src/models/problemasModel.js
const db = require('../db');

const problemasModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM problemas', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM problemas WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (descricao) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO problemas (descricao) VALUES (?)', [descricao], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  update: (id, descricao) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE problemas SET descricao = ? WHERE id = ?', [descricao, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM problemas WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = problemasModel;
