const enviarEmail = require('../services/emailService');
const chamadosModel = require('../models/chamadosModel');
const userModel = require('../models/usuariosModel'); // Modelo para buscar o usuário
const problemasModel = require('../models/problemasModel'); // Modelo para buscar o problema
const blocosModel = require('../models/blocosModel'); // Modelo para buscar o bloco
const salasModel = require('../models/salasModel'); // Modelo para buscar a sala

// Função utilitária para montar mensagens
function montarMensagem(tipo, problema, bloco, sala) {
  if (tipo === 'registro') {
    return `Seu chamado foi registrado com sucesso. Problema: ${problema.descricao}. Bloco: ${bloco.nome_bloco}. Sala: ${sala.numero_sala}.`;
  } else if (tipo === 'conclusao') {
    return `O chamado foi concluído com sucesso. Problema: ${problema.descricao}. Bloco: ${bloco.nome_bloco}. Sala: ${sala.numero_sala}.`;
  }
  return '';
}

// Função para criar um chamado
const criarChamado = async (req, res) => {
  try {
    const usuario_id = req.userId;
    const { problema_id, bloco_id, sala_id, descricao, maquina_id, setor_id } = req.body;

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
      setor_id
    });

    const chamado = await chamadosModel.getById(chamadoId);

    // Busca o e-mail do usuário para envio da notificação
    const usuario = await userModel.getById(usuario_id);
    if (usuario && usuario.email) {
      console.log(`Enviando e-mail de notificação para: ${usuario.email}`);

      // Busca o problema, bloco e sala
      const problema = await problemasModel.getById(problema_id);
      const bloco = await blocosModel.getById(bloco_id);
      const sala = await salasModel.getById(sala_id);

      // Verificar se os dados necessários estão presentes
      if (!problema || !bloco || !sala) {
        return res.status(400).json({ message: 'Dados relacionados ao chamado estão incompletos.' });
      }

      // Montando a frase corretamente
      const mensagemRegistro = montarMensagem('registro', problema, bloco, sala);

      // Envia o e-mail com as informações
      await enviarEmail(usuario.email, 'Chamado Realizado', mensagemRegistro);
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
    const usuario = await userModel.getById(chamado.usuario_id);

    if (usuario && usuario.email) {
      console.log(`Enviando e-mail de conclusão para: ${usuario.email}`);

      // Busca o problema, bloco e sala
      const problema = await problemasModel.getById(chamado.problema_id);
      const bloco = await blocosModel.getById(chamado.bloco_id);
      const sala = await salasModel.getById(chamado.sala_id);

      // Verificar se os dados necessários estão presentes
      if (!problema || !bloco || !sala) {
        return res.status(400).json({ message: 'Dados relacionados ao chamado estão incompletos.' });
      }

      // Montando a frase corretamente
      const mensagemConclusao = montarMensagem('conclusao', problema, bloco, sala);

      // Envia o e-mail com as informações
      await enviarEmail(usuario.email, 'Chamado Concluído', mensagemConclusao);
    }

    res.status(200).json({ message: 'Chamado concluído com sucesso', chamado, nome_bloco, numero_sala });
  } catch (error) {
    console.error('Erro ao concluir chamado:', error);
    res.status(500).json({ message: 'Erro ao concluir chamado' });
  }
};

module.exports = { criarChamado, concluirChamado };
