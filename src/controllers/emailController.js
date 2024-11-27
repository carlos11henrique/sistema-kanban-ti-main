const db = require('../db');
const enviarEmail = require('.service/emailService');
const chamadosModel = require('./chamadosModel');
const userModel = require('./usuariosModel'); // Modelo para buscar o usuário

// Função para criar um chamado
const criarChamado = async (req, res) => {
  try {
    const { usuario_id, problema_id, bloco_id, sala_id, descricao, maquina_id,  } = req.body;

    // Validação das entradas
    if (!usuario_id || !problema_id || !bloco_id || !sala_id || !maquina_id) {
      return res.status(400).json({ message: 'Campos obrigatórios não fornecidos.' });
    }

    console.log('Iniciando criação de chamado...');

    // Criação do chamado
    const chamadoId = await chamadosModel.create({
      usuario_id,
      problema_id,
      bloco_id,
      sala_id,
      descricao,
      maquina_id,
    });

    const chamado = await chamadosModel.getById(chamadoId);

    // Busca o e-mail do usuário para envio da notificação
    const usuario = await userModel.getById(usuario_id);

    if (usuario && usuario.email) {
      console.log(`Enviando e-mail de notificação para: ${usuario.email}`);
      await enviarEmail(
        usuario.email,
        'Chamado Realizado',
        `Seu chamado foi registrado com sucesso. ID do chamado: ${chamadoId}.`
      );
    }

    res.status(201).json({ message: 'Chamado criado com sucesso', chamado });
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ message: 'Erro ao criar chamado' });
  }
};

// Função para concluir um chamado
const concluirChamado = async (req, res) => {
  try {
    const { chamado_id } = req.body;

    // Validação de entrada
    if (!chamado_id) {
      return res.status(400).json({ message: 'ID do chamado não fornecido.' });
    }

    console.log('Iniciando conclusão de chamado...');

    // Atualiza o status do chamado para 'Concluído'
    await chamadosModel.update(chamado_id, { status: 'Concluído' });

    // Busca os dados do chamado atualizado
    const chamado = await chamadosModel.getById(chamado_id);

    if (!chamado) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    // Busca o e-mail do usuário
    const usuarios = await userModel.getById(chamado.usuario_id);

    if (usuarios && usuarios.email) {
      console.log(`Enviando e-mail de conclusão para: ${usuarios.email}`);
      await enviarEmail(
        usuarios.email,
        'Chamado Concluído',
        `O chamado de ID ${chamado_id} foi concluído com sucesso.`
      );
    }

    res.status(200).json({ message: 'Chamado concluído com sucesso', chamado });
  } catch (error) {
    console.error('Erro ao concluir chamado:', error);
    res.status(500).json({ message: 'Erro ao concluir chamado' });
  }
};

module.exports = { criarChamado, concluirChamado };
