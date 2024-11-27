const db = require('../db');
const userModel = require('./usuariosModel');
const roles = require('../middleware/auth').ROLES;

const chamadosModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
SELECT 
    u.email AS email,
    u.id AS id_usuario,
    u.nome_completo AS nome_completo,
    u.ocupacao AS ocupacao,
    st.nome_setor AS setor, 
    st.id AS setor_id,
    b.nome_bloco AS bloco,
    s.numero_sala AS sala,
    p.descricao AS problema,
    c.feedback AS feedback,
    c.descricao AS descricao_chamado,
    m.numero_maquina AS maquina,  
    c.id,
    c.status
FROM 
    chamados c
JOIN 
    usuarios u ON c.usuario_id = u.id
JOIN 
    setores st ON c.setor_id = st.id
JOIN 
    blocos b ON c.bloco_id = b.id
JOIN 
    salas s ON c.sala_id = s.id
JOIN 
    problemas p ON c.problema_id = p.id
JOIN 
    maquinas m ON c.maquina_id = m.id;
      `;

      db.query(query, (err, results) => {
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
      let { usuario_id, problema_id, bloco_id, sala_id, descricao, maquina_id, setor_id } = chamado;
  
      if (!usuario_id || !problema_id || !bloco_id || !sala_id || !maquina_id) {
        return reject(new Error("Campos obrigatórios não foram fornecidos."));
      }
  
      // Valor padrão para setor_id, caso não fornecido
      if (!setor_id) {
        console.warn('setor_id não fornecido. Usando valor padrão 1.');
        setor_id = 1; // Valor padrão
      }
  
      const queryMaquina = 'SELECT id FROM maquinas WHERE numero_maquina = ?';
      db.query(queryMaquina, [maquina_id], (err, results) => {
        if (err) {
          console.error('Erro ao buscar a máquina:', err);
          return reject(new Error('Erro ao buscar a máquina.'));
        }
  
        // Verifica se a máquina existe
        if (results.length === 0) {
          return reject(new Error('Máquina não encontrada.'));
        }
  
        const maquinaId = results[0].id; 
        const query = `
          INSERT INTO chamados (usuario_id, problema_id, bloco_id, sala_id, descricao, status, setor_id, maquina_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        db.query(query, [usuario_id, problema_id, bloco_id, sala_id, descricao || '', 'Análise', setor_id, maquinaId], (err, results) => {
          if (err) {
            console.error('Erro ao criar o chamado:', err);
            return reject(new Error('Erro ao criar o chamado.'));
          }
          const id = results.insertId;
          resolve(id);
        });
      });
    });
  },
  updateFeedback: (id, feedback) => {
    return new Promise((resolve, reject) => {
      if (!feedback) {
        return reject(new Error('Feedback não pode ser vazio.'));
      }

      const query = 'UPDATE chamados SET feedback = ? WHERE id = ?';

      db.query(query, [feedback, id], (err) => {
        if (err) {
          console.error('Erro ao atualizar o feedback:', err);
          return reject(new Error('Erro ao atualizar o feedback.'));
        }
        resolve();
      });
    });
  },
  update: (id, chamado) => {
    return new Promise((resolve, reject) => {
      const { status, setor_id } = chamado;
      db.query(
        'UPDATE chamados SET setor_id = ?, status = ? WHERE id = ?',
        [setor_id, status, id],
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
