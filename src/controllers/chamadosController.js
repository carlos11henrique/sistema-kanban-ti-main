// src/controllers/chamadosController.js
const chamadosModel = require('../models/chamadosModel');
const userModel = require('../models/usuariosModel');
const { ROLES } = require('../middleware/auth')


const chamadosController = {
  getAll: async (req, res) => {
    try {
      const userFound = await userModel.getById(req.userId)
      const chamados = await chamadosModel.getAll();

      const options = {
        [ROLES.MANUTENCAO]: (c) => c.filter(c => c.setor === ROLES.MANUTENCAO),
        [ROLES.TI]: (c) => c.filter(c => c.setor === ROLES.TI),
        [ROLES.NOA]: (c) => c,
        [ROLES.ESTUDANDE]: (c) => c.filter(c => c.id_usuario === req.userId),

      }
      
      const action = options[userFound.ocupacao]

      res.json(action(chamados))
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao buscar chamados' });
    }
  },

  getById: async (req, res) => {
    try {
      const chamado = await chamadosModel.getById(req.params.id);
      if (!chamado) return res.status(404).json({ error: 'Chamado não encontrado' });
      res.json(chamado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar chamado' });
    }
  },

  getChamadoDetalhes: async (req, res) => {
    try {
      const detalhes = await chamadosModel.getChamadoDetalhes(req.params.id); // Aqui recebe o ID
      if (!detalhes) return res.status(404).json({ error: 'Detalhes do chamado não encontrados' });
      res.json(detalhes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar detalhes do chamado' });
    }
  },

  updateFeedback: async (req, res) => {
    const { feedback } = req.body; // Feedback enviado no corpo da requisição
    const chamadoId = req.params.id; // ID do chamado que será atualizado

    try {
      await chamadosModel.updateFeedback(chamadoId, feedback);

      // Resposta de sucesso
      res.sendStatus(204); 
    } catch (error) {
      console.error('Erro ao atualizar feedback do chamado:', error);
      res.status(500).json({ error: 'Erro ao atualizar feedback do chamado.' });
    }
  },
  create: async (req, res) => {
    try {
      const chamado = {
        usuario_id: req.userId,
        problema_id: req.body.problema_id,
        bloco_id: req.body.bloco_id,
        sala_id: req.body.sala_id,
        descricao: req.body.descricao,
        setor: req.body.setor,
        maquina_id: req.body.maquina_id,  
      };
  
      const id = await chamadosModel.create(chamado);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar chamado' });
      console.log(error);
    }
  },


  update: async (req, res) => {
    try {
      await chamadosModel.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao atualizar chamado' });
    }
  },

  delete: async (req, res) => {
    try {
      await chamadosModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar chamado' });
    }
  },
};

module.exports = chamadosController;
