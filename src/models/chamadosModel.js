const db = require('../db');
const userModel = require('./usuariosModel');
const roles = require('../middleware/auth').ROLES;
const chamadosModel = {

  getAll: (user) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          u.nome_completo AS nome_usuario,
          u.email AS email_usuario,
          b.nome_bloco AS bloco,
          s.numero_sala AS sala,
          p.descricao AS problema,
          c.descricao AS descricao_chamado,
          (SELECT IFNULL(JSON_ARRAYAGG(m.numero_maquina), JSON_ARRAY())
                FROM maquinas m
                WHERE m.chamado_id = c.id) AS maquinas,
          c.id,
          c.status
        FROM 
          chamados c
        JOIN 
          usuarios u ON c.usuario_id = u.id
        JOIN 
          blocos b ON c.bloco_id = b.id
        JOIN 
          salas s ON c.sala_id = s.id
        JOIN 
          problemas p ON c.problema_id = p.id
      `;

      const query2 = `${query} 
      WHERE p.descricao ='Computadores e Periféricos' or p.descricao = 'Softwares e Programas Específicos'`

      




      
      db.query(user.ocupacao === roles.TI ? query2 : query, (err, results) => {
        console.log(results)
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
    return new Promise(async(resolve, reject) => {
      const { usuario_id, problema_id, bloco_id, sala_id, descricao,maquinas} = chamado;
      db.query(
        'INSERT INTO chamados (usuario_id, problema_id, bloco_id, sala_id, descricao,status) VALUES (?, ?, ?, ?, ?,?)', 
        [usuario_id, problema_id, bloco_id, sala_id, descricao, "Análise"], 
        (err, results) => {
          if (err) return reject(new Error('Erro ao criar o chamado.'));
          const id = results.insertId;
          if (maquinas.length <= 0) {
            return resolve(id);
          }
         
          const createMaquina = (maquina,chamado_id)=> new Promise((resolve, reject) => {
            db.query(
              'INSERT INTO maquinas(chamado_id, numero_maquina) VALUES (?, ?)',	
              [chamado_id, maquina],
              (err, results) => {
                if (err) return reject(new Error('Erro ao criar o chamado.'));
                resolve(results.insertId);
              })
          })
          maquinas.forEach(async(maquina) => {
           try {
            await createMaquina(maquina,id);
           } catch (error) { 
            reject(error);
            
           }
           resolve(id);
          })
         
        }
      );
    });
  },

  update: (id, chamado) => {
    return new Promise((resolve, reject) => {
      const {id, status} = chamado;
      db.query(
        'UPDATE chamados SET  status = ? WHERE id = ?', 
        [status, id],
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
