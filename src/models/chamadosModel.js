const db = require('../db');

const chamadosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chamados', (err, results) => {
        if (err) return reject(new Error('Erro ao buscar todos os chamados.'));
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM chamados WHERE id = ?', [id], (err, results) => {
        if (err) return reject(new Error('Erro ao buscar o chamado pelo ID.'));
        resolve(results[0]);
      });
    });
  },

  create: (chamado) => {
    return new Promise((resolve, reject) => {
      const { usuario_id, problema_id, bloco_id, sala_id, descricao,} = chamado;
      db.query(
        'INSERT INTO chamados (usuario_id, problema_id, bloco_id, sala_id, descricao,status) VALUES (?, ?, ?, ?, ?, ?)', 
        [usuario_id, problema_id, bloco_id, sala_id, descricao, "Análise"] ,
        (err, results) => {
          if (err) return reject(new Error('Erro ao criar o chamado.'));
          resolve(results.insertId);
        }
      );
    });
  },

  update: (id, chamado) => {
    return new Promise((resolve, reject) => {
      const { usuario_id, problema_id, bloco_id, sala_id, descricao, status } = chamado;
      db.query(
        'UPDATE chamados SET usuario_id = ?, problema_id = ?, bloco_id = ?, sala_id = ?, descricao = ?, status = ? WHERE id = ?', 
        [usuario_id, problema_id, bloco_id, sala_id, descricao, status, id],
        (err) => {
          if (err) return reject(new Error('Erro ao atualizar o chamado.'));
          resolve();
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM chamados WHERE id = ?', [id], (err) => {
        if (err) return reject(new Error('Erro ao deletar o chamado.'));
        resolve();
      });
    });
  },
};

module.exports = chamadosModel;
