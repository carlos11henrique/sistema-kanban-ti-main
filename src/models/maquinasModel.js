// src/models/maquinasModel.js
const db = require('../db');

const maquinasModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
       SELECT 
    maquinas.id, 
    maquinas.numero_maquina, 
    maquinas.tipo_equipamento, 
    maquinas.descricao, 
    maquinas.sala_id, 
    salas.numero_sala
FROM maquinas
LEFT JOIN salas ON maquinas.sala_id = salas.id;

      `;
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          maquinas.id, 
          maquinas.numero_maquina, 
          maquinas.tipo_equipamento, 
          maquinas.descricao, 
          maquinas.sala_id, 
          salas.numero_sala
        FROM maquinas
        LEFT JOIN salas ON maquinas.sala_id = salas.id
        WHERE maquinas.id = ?;
      `;
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  create: (numero_maquina, tipo_equipamento, descricao, sala_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO maquinas (numero_maquina, tipo_equipamento, descricao, sala_id) 
        VALUES (?, ?, ?, ?)
      `;
      db.query(query, [numero_maquina, tipo_equipamento, descricao, sala_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);  // Retorna o ID da máquina criada
      });
    });
  },

  update: (id, numero_maquina, tipo_equipamento, descricao, sala_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE maquinas
        SET numero_maquina = ?, tipo_equipamento = ?, descricao = ?, sala_id = ?
        WHERE id = ?
      `;
      db.query(query, [numero_maquina, tipo_equipamento, descricao, sala_id, id], (err, result) => {
        if (err) return reject(err);
        if (result.affectedRows === 0) {
          return reject('Nenhuma máquina encontrada com o ID fornecido.');
        }
        resolve('Máquina atualizada com sucesso!');
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
