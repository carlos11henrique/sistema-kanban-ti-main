const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true para a porta 465, false para outras portas
  auth: {
    user: "st.solucoes21@gmail.com",
    pass: "stsolucoes",
  },
});

// async..await não é permitido no escopo global, deve-se usar uma função wrapper
async function main() {
  // envia o e-mail com o objeto de transporte definido
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // endereço do remetente
    to: "bar@example.com, baz@example.com", // lista de destinatários
    subject: "Hello ✔", // linha de assunto
    text: "Hello world?", // corpo em texto simples
    html: "<b>Hello world?</b>", // corpo em HTML
  });

  console.log("Mensagem enviada: %s", info.messageId);
  // Mensagem enviada: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
