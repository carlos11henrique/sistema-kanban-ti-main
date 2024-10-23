const express = require('express');
const setoresRoutes = require('./routes/setoresRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const blocosRoutes = require('./routes/blocosRoutes');
const salasRoutes = require('./routes/salasRoutes');
const maquinasRoutes = require('./routes/maquinasRoutes');
const problemasRoutes = require('./routes/problemasRoutes');
const chamadosRoutes = require('./routes/chamadosRoutes');
const chamadosMaquinasRoutes = require('./routes/chamados_maquinasRoutes');
const atribuídosRoutes = require('./routes/atribuidosRoutes');
const logsRoutes = require('./routes/logsRoutes');
const authRoutes = require('./routes/authRoutes')
const cors = require('cors');
const { verify, authorize, ROLES } = require('./middleware/auth');
const usuariosModel = require('./models/usuariosModel');
const bcrypt = require('bcrypt')



const app = express();
app.use(express.json());
app.use(cors())

app.use('/auth',authRoutes);
app.use('/setores',verify, setoresRoutes);
app.use('/usuarios', verify,authorize([ROLES.NOA,ROLES.TI,ROLES.MANUTENCAO]), usuariosRoutes);
app.use('/blocos', blocosRoutes);
app.use('/salas',verify,authorize([ROLES.NOA,ROLES.TI,ROLES.MANUTENCAO,ROLES.DOCENTE,ROLES.ESTUDANDE]), salasRoutes);
app.use('/maquinas',verify,authorize([ROLES.NOA,ROLES.TI,ROLES.MANUTENCAO,ROLES.DOCENTE,ROLES.ESTUDANDE]), maquinasRoutes);
app.use('/problemas',verify, problemasRoutes);
app.use('/chamados', chamadosRoutes);
app.use('/chamados-maquinas',verify,authorize([ROLES.NOA,ROLES.TI,ROLES.MANUTENCAO,ROLES.DOCENTE,ROLES.ESTUDANDE]), chamadosMaquinasRoutes);
app.use('/atribuidos', verify, atribuídosRoutes);
app.use('/logs',verify, logsRoutes);

const createUserIfNotExists = async () => {
  const email = 'admin@usuario.com'; // Defina o email desejado
  const usuario = {
    nome_completo: 'Admin Supremo',
    senha: 'Supremo@123', // A senha que será hasheada
    email: email,
    instituicao: 'Senai',
    ocupacao: 'NOA',
    setor_id: 1, // Defina um setor_id válido
  };

  try {
    const existingUser = await usuariosModel.findByEmail(email);
    if (!existingUser) {
      // Hasheando a senha
      const hashedPass = await bcrypt.hash(usuario.senha, 10);
      usuario.senha = hashedPass; // Atualizando a senha com o hash

      const userId = await usuariosModel.create(usuario);
      console.log(`Usuário criado com ID: ${userId}`);
    } else {
      console.log('Usuário já existe, não foi criada nova entrada.');
    }
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  }
};

// Chame a função antes de iniciar o servidor
createUserIfNotExists().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});



