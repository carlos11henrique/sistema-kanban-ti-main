// src/controllers/usuariosController.js
const usuariosModel = require('../models/usuariosModel');

const usuariosController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await usuariosModel.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },
  getById: async (req, res) => {
    try {
      const usuario = await usuariosModel.getById(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await usuariosModel.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },
  update: async (req, res) => {
    try {
      await usuariosModel.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
  delete: async (req, res) => {
    try {
      await usuariosModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },
};

module.exports = usuariosController;
