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
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes'); // Corrigido o caminho
const cors = require('cors');
const { verify, authorize, ROLES } = require('./middleware/auth');
const usuariosModel = require('./models/usuariosModel');
const bcrypt = require('bcrypt');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Definindo as rotas com seus respectivos middlewares
app.use('/auth', authRoutes);
app.use('/setores', verify, setoresRoutes);
app.use('/usuarios', verify, authorize([ROLES.NOA, ROLES.TI, ROLES.MANUTENCAO]), usuariosRoutes);
app.use('/blocos', verify, authorize([ROLES.NOA, ROLES.TI, ROLES.MANUTENCAO, ROLES.DOCENTE, ROLES.ESTUDANDE]), blocosRoutes);
app.use('/salas', verify, authorize([ROLES.NOA, ROLES.TI, ROLES.MANUTENCAO, ROLES.DOCENTE, ROLES.ESTUDANDE]), salasRoutes);
app.use('/maquinas', verify, authorize([ROLES.NOA, ROLES.TI, ROLES.MANUTENCAO, ROLES.DOCENTE, ROLES.ESTUDANDE]), maquinasRoutes);
app.use('/problemas', verify, problemasRoutes);
app.use('/chamados', verify, authorize([ROLES.NOA, ROLES.TI, ROLES.MANUTENCAO, ROLES.DOCENTE, ROLES.ESTUDANDE]), chamadosRoutes);
app.use('/chamados-maquinas', verify, authorize([ROLES.NOA, ROLES.TI, ROLES.MANUTENCAO, ROLES.DOCENTE, ROLES.ESTUDANDE]), chamadosMaquinasRoutes);
app.use('/atribuidos', verify, atribuídosRoutes);
app.use('/logs', verify, logsRoutes);
app.use('/home', homeRoutes); 

// Corrigido o caminho e o middleware

// Função para criar usuário se não existir
const createUserIfNotExists = async () => {
  const email = 'admin@usuario.com';
  const usuario = {
    nome_completo: 'Admin Supremo',
    senha: 'Supremo@123',
    email: email,
    instituicao: 'Senai',
    ocupacao: 'NOA',
    setor_id: 1,
  };

  try {
    // Verifica se o usuário já existe
    const existingUser = await usuariosModel.findByEmail(email);
    if (!existingUser) {
      // Hasheando a senha antes de salvar
      const hashedPass = await bcrypt.hash(usuario.senha, 10);
      usuario.senha = hashedPass; // Atualiza a senha com o hash

      // Cria o usuário e retorna o ID
      const userId = await usuariosModel.create(usuario);
      console.log(`Usuário criado com ID: ${userId}`);
    } else {
      console.log('Usuário já existe, não foi criada nova entrada.');
    }
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  }
};

// Chama a função para criar o usuário antes de iniciar o servidor
createUserIfNotExists().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
