const db = require('../db');

const salasModel = {
  // Função para obter todas as salas
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
        if (err) return reject(new Error('Erro ao buscar salas'));
        resolve(results);
      });
    });
  },

  // Função para obter uma sala pelo ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM salas WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  // Função para verificar se uma sala já existe com o número e bloco especificados
  getByNumeroBloco: (numero_sala, bloco_id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM salas WHERE numero_sala = ? AND bloco_id = ?';
      db.query(query, [numero_sala, bloco_id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Retorna a primeira sala encontrada ou null
      });
    });
  },

  // Função para criar uma nova sala
  create: (numero_sala, bloco_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO salas (numero_sala, bloco_id) VALUES (?, ?)', [numero_sala, bloco_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId); // Retorna o ID da nova sala criada
      });
    });
  },

  // Função para atualizar uma sala existente
  update: (id, numero_sala, bloco_id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE salas SET numero_sala = ?, bloco_id = ? WHERE id = ?', [numero_sala, bloco_id, id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  // Função para excluir uma sala
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
