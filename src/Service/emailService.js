require('dotenv').config();
const nodemailer = require('nodemailer');

// Configuração do transportador
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envia um e-mail para o destinatário.
 *
 * @param {string} emailDestinatario - E-mail do destinatário.
 * @param {string} assunto - Assunto do e-mail.
 * @param {string} mensagem - Mensagem em texto puro.
 * @param {string} [htmlMensagem] - (Opcional) Mensagem em HTML.
 * @returns {Promise<void>} - Promessa resolvida se o envio for bem-sucedido.
 */
const enviarEmail = async (emailDestinatario, assunto, mensagem, htmlMensagem) => {
  try {
    if (!emailDestinatario || !assunto || !mensagem) {
      throw new Error('Dados insuficientes para envio de e-mail');
    }

    console.log(`Preparando envio de e-mail para: ${emailDestinatario}`);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailDestinatario,
      subject: assunto,
      text: mensagem,
      html: htmlMensagem || null, 
    });
    console.log(`E-mail enviado para ${emailDestinatario} com sucesso!`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para ${emailDestinatario}:`, error);
    throw new Error('Erro no envio de e-mail');
  }
};

module.exports = enviarEmail;
