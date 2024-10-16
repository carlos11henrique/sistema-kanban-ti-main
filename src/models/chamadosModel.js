// src/models/chamadosModel.js
const db = require('../db');

const chamadosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chamados', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chamados WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (chamado) => {
    return new Promise((resolve, reject) => {
      const { usuario_id, problema_id, descricao } = chamado;
      db.query('INSERT INTO chamados (usuario_id, problema_id, descricao) VALUES (?, ?, ?)', 
      [usuario_id, problema_id, descricao], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  update: (id, chamado) => {
    return new Promise((resolve, reject) => {
      const { usuario_id, problema_id, descricao, status } = chamado;
      db.query('UPDATE chamados SET usuario_id = ?, problema_id = ?, descricao = ?, status = ? WHERE id = ?', 
      [usuario_id, problema_id, descricao, status, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM chamados WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = chamadosModel;
