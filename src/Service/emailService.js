require('dotenv').config();
const nodemailer = require('nodemailer');

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // E-mail remetente (carregado de .env)
    pass: process.env.EMAIL_PASS, // Senha do aplicativo
  },
});

// Função para enviar e-mail
const enviarEmail = async (emailDestinatario, assunto, mensagem) => {
  try {
    console.log(`Preparando envio de e-mail para: ${emailDestinatario}`);
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Remetente
      to: emailDestinatario, // Destinatário
      subject: assunto, // Assunto do e-mail
      text: mensagem, // Mensagem do e-mail
    });
    console.log(`E-mail enviado para ${emailDestinatario} com sucesso!`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${emailDestinatario}:`, error.message);
    throw new Error('Erro no envio de e-mail');
  }
};

module.exports = enviarEmail;
