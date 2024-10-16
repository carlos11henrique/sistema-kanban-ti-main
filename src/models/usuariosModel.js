// src/models/usuariosModel.js
const db = require('../db');

const usuariosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (usuario) => {
    return new Promise((resolve, reject) => {
      const { nome_completo, senha, email, instituicao, ocupacao, setor_id } = usuario;
      db.query('INSERT INTO usuarios (nome_completo, senha, email, instituicao, ocupacao, setor_id) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_completo, senha, email, instituicao, ocupacao, setor_id], (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
        });
    });
  },
  update: (id, usuario) => {
    return new Promise((resolve, reject) => {
      const { nome_completo, senha, email, instituicao, ocupacao, setor_id } = usuario;
      db.query('UPDATE usuarios SET nome_completo = ?, senha = ?, email = ?, instituicao = ?, ocupacao = ?, setor_id = ? WHERE id = ?',
        [nome_completo, senha, email, instituicao, ocupacao, setor_id, id], (err) => {
          if (err) return reject(err);
          resolve();
        });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('Select * from usuarios where email = ?', [email], (err, result) => {
        if (err) return reject(err);
        resolve(result[0])
      })
    })
  }
};

module.exports = usuariosModel;
