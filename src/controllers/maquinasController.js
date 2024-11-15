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
  
      // Chama o método create do modelo para inserir no banco de dados
      const id = await maquinasModel.create(numero_maquina, tipo_equipamento, descricao, sala_id);
      
      // Retorna o ID da nova máquina criada
      res.status(201).json({ id });
    } catch (error) {
      console.error("Erro ao criar máquina:", error);
      res.status(500).json({ error: 'Erro ao criar máquina' });
    }
  },

  // Atualizar máquina
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

      // Atualizar os dados da máquina
      await maquinasModel.update(req.params.id, { numero_maquina, tipo_equipamento, descricao, sala_id });
      res.sendStatus(204);
    } catch (error) {
      console.error("Erro ao atualizar máquina:", error);
      res.status(500).json({ error: 'Erro ao atualizar máquina' });
    }
  },

  // Deletar máquina
  delete: async (req, res) => {
    try {
      // Verificar se a máquina existe antes de tentar deletar
      const maquinaExistente = await maquinasModel.getById(req.params.id);
      if (!maquinaExistente) {
        return res.status(404).json({ error: 'Máquina não encontrada' });
      }

      // Deletar a máquina
      await maquinasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Erro ao deletar máquina:", error);
      res.status(500).json({ error: 'Erro ao deletar máquina' });
    }
  },
};

module.exports = maquinasController;