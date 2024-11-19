const enviarEmail = require('./emailService');


// Função ao criar um chamado
const criarChamado = async (req, res) => {
  try {
    const { usuario_id, descricao } = req.body;

    console.log('Iniciando criação de chamado...');
    // Simulação: Criação do chamado no banco de dados
    const novoChamado = { id: 1, usuario_id, descricao }; // Mock de exemplo

    // Novo destinatário para o teste
    const usuario = { email: 'carlos.h.lima6@ba.estudante.senai.br' }; // Alterado para o teste

    if (usuario && usuario.email) {
      console.log(`Enviando e-mail de notificação para: ${usuario.email}`);
      await enviarEmail(
        usuario.email,
        'Chamado Realizado',
        'Seu chamado foi realizado. Aguarde por mais informações.'
      );
    }

    res.status(201).json({ message: 'Chamado criado com sucesso', chamado: novoChamado });
  } catch (error) {
    console.error('Erro ao criar chamado:', error.message);
    res.status(500).json({ message: 'Erro ao criar chamado' });
  }
};

// Função ao concluir um chamado
const concluirChamado = async (req, res) => {
  try {
    const { chamado_id } = req.body;

    console.log('Iniciando conclusão de chamado...');
    // Simulação: Atualização do chamado no banco de dados
    const chamado = { id: chamado_id, status: 'Concluido', usuario_id: 1 }; // Mock de exemplo

    // Novo destinatário para o teste
    const usuario = { email: 'carlos.h.lima6@ba.estudante.senai.br' }; // Alterado para o teste

    if (usuario && usuario.email) {
      console.log(`Enviando e-mail de conclusão para: ${usuario.email}`);
      await enviarEmail(
        usuario.email,
        'Chamado Concluído',
        'O chamado foi concluído com sucesso.'
      );
    }

    res.status(200).json({ message: 'Chamado concluído com sucesso', chamado });
  } catch (error) {
    console.error('Erro ao concluir chamado:', error.message);
    res.status(500).json({ message: 'Erro ao concluir chamado' });
  }
};

module.exports = { criarChamado, concluirChamado };
