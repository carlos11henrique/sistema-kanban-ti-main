const maquinasModel = require('../models/maquinasModel');

const maquinasController = {
  // Buscar todas as máquinas
  getAll: async (req, res) => {
    try {
      const maquinas = await maquinasModel.getAll();
      res.json(maquinas);
    } catch (error) {
      console.error("Erro ao buscar máquinas:", error);
      res.status(500).json({ error: 'Erro ao buscar máquinas' });
    }
  },

  // Buscar máquina por ID
  getById: async (req, res) => {
    try {
      const maquina = await maquinasModel.getById(req.params.id);
      if (!maquina) {
        return res.status(404).json({ error: 'Máquina não encontrada' });
      }
      res.json(maquina);
    } catch (error) {
      console.error("Erro ao buscar máquina:", error);
      res.status(500).json({ error: 'Erro ao buscar máquina' });
    }
  },

  // Criar nova máquina
  create: async (req, res) => {
    try {
      const { numero_maquina, tipo_equipamento, descricao, sala_id } = req.body;
      
      if (!numero_maquina || !tipo_equipamento || !sala_id) {
        return res.status(400).json({ error: 'Dados insuficientes para criar a máquina' });
      }
      
      if (isNaN(sala_id)) {
        return res.status(400).json({ error: 'ID da sala inválido' });
      }
  
      const id = await maquinasModel.create(numero_maquina, tipo_equipamento, descricao, sala_id);
      
      res.status(201).json({ id });
    } catch (error) {
      console.error("Erro ao criar máquina:", error);
      res.status(500).json({ error: 'Erro ao criar máquina' });
    }
  },

  update: async (req, res) => {
    try {
      const { numero_maquina, tipo_equipamento, descricao, sala_id } = req.body;
      
      if (!numero_maquina || !tipo_equipamento || !sala_id) {
        return res.status(400).json({ error: 'Dados insuficientes para atualizar a máquina' });
      }

      if (isNaN(sala_id)) {
        return res.status(400).json({ error: 'ID da sala inválido' });
      }

      // Verificar se a máquina existe
      const maquinaExistente = await maquinasModel.getById(req.params.id);
      if (!maquinaExistente) {
        return res.status(404).json({ error: 'Máquina não encontrada' });
      }

      await maquinasModel.update(req.params.id, { numero_maquina, tipo_equipamento, descricao, sala_id });
      res.sendStatus(204);
    } catch (error) {
      console.error("Erro ao atualizar máquina:", error);
      res.status(500).json({ error: 'Erro ao atualizar máquina' });
    }
  },

  delete: async (req, res) => {
    try {
      const maquinaExistente = await maquinasModel.getById(req.params.id);
      if (!maquinaExistente) {
        return res.status(404).json({ error: 'Máquina não encontrada' });
      }

      await maquinasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Erro ao deletar máquina:", error);
      res.status(500).json({ error: 'Erro ao deletar máquina' });
    }
  },
};

module.exports = maquinasController;