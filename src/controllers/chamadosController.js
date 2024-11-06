// src/controllers/chamadosController.js
const chamadosModel = require('../models/chamadosModel');
const userModel = require('../models/usuariosModel');

const chamadosController = {
  getAll: async (req, res) => {
    try {
      const userFound = await userModel.getById(req.userId)
      const chamados = await chamadosModel.getAll(userFound);
      res.json(chamados);
    } catch (error) {
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

  create: async (req, res) => {
    try {
      const chamado = {
        usuario_id: req.userId,
        problema_id: req.body.problema_id,
        bloco_id: req.body.bloco_id,
        sala_id: req.body.sala_id,
        descricao: req.body.descricao,
        setor : req.body.setor,
        maquinas: req.body.maquinas,
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
      await chamadosModel.update(req.params.id, req.body );
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar chamado' });
      console.log(req.params, req.body);
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
