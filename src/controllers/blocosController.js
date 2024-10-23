// src/controllers/blocosController.js
const blocosModel = require('../models/blocosModel');
const salasModel = require('../models/salasModel');

const blocosController = {
  getAll: async (req, res) => {
    try {
      const blocos = await blocosModel.getAll();
      res.json(blocos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar blocos' });
    }
  },
  getById: async (req, res) => {
    try {
      const bloco = await blocosModel.getById(req.params.id);
      if (!bloco) return res.status(404).json({ error: 'Bloco não encontrado' });
      res.json(bloco);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar bloco' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await blocosModel.create(req.body.nome_bloco);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar bloco' });
    }
  },
  update: async (req, res) => {
    try {
      await blocosModel.update(req.params.id, req.body.nome_bloco);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar bloco' });
    }
  },
  delete: async (req, res) => {
    try {
      await blocosModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar bloco' });
    }
  },
  getAllWithSalas: async (req, res) => {
    try {
      const blocos = await blocosModel.getAll();
      const salas = await salasModel.getAll();
      const blocoscomSalas = blocos.map((bloco) => {
      const salasDoBloco = salas.filter(sala => sala.bloco_id === bloco.id)
     return { ...bloco, salas: salasDoBloco };
      });
      res.status(200).json(blocoscomSalas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar blocos' });
    }
  }
};

module.exports = blocosController;
