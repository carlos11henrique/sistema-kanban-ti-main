// src/controllers/setoresController.js
const setoresModel = require('../models/setoresModel');

const setoresController = {
  getAll: async (req, res) => {
    try {
      const setores = await setoresModel.getAll();
      res.json(setores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar setores' });
    }
  },
  getById: async (req, res) => {
    try {
      const setor = await setoresModel.getById(req.params.id);
      if (!setor) return res.status(404).json({ error: 'Setor não encontrado' });
      res.json(setor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar setor' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await setoresModel.create(req.body.nome_setor);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar setor' });
    }
  },
  update: async (req, res) => {
    try {
      await setoresModel.update(req.params.id, req.body.nome_setor);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar setor' });
    }
  },
  delete: async (req, res) => {
    try {
      await setoresModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar setor' });
    }
  },
};

module.exports = setoresController;
