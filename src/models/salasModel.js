// src/models/salasModel.js
const db = require('../db');

const salasModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
        salas.id, 
        salas.numero_sala, 
        salas.bloco_id, 
        blocos.nome_bloco
      FROM salas
      INNER JOIN blocos ON salas.bloco_id = blocos.id;
    `;
    db.query(query, (err, results) => {
      if (err) return reject(new Error('Erro ao salas'));
      resolve(results);
    });
  });
},
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM salas WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  create: (numero_sala, bloco_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO salas (numero_sala, bloco_id) VALUES (?, ?)', [numero_sala, bloco_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
  },
  update: (id, numero_sala, bloco_id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE salas SET numero_sala = ?, bloco_id = ? WHERE id = ?', [numero_sala, bloco_id, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM salas WHERE id = ?', [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

module.exports = salasModel;
