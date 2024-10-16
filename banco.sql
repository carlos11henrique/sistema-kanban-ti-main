CREATE DATABASE sistema_kanban_ti;
USE sistema_kanban_ti;

-- Cria o banco de dados e usa-o
CREATE DATABASE IF NOT EXISTS sistema_kanban_ti;
USE sistema_kanban_ti;

-- Tabela de Setores (certifique-se que seja criada antes)
CREATE TABLE setores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_setor VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de Usuários (setor_id como chave estrangeira)
CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_completo VARCHAR(100) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	instituicao VARCHAR(255) DEFAULT ('SENAI'),
	ocupacao VARCHAR(50) NOT NULL,
	setor_id INT,
	FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE SET NULL
);


CREATE TABLE blocos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_bloco VARCHAR(50) NOT NULL
);

CREATE TABLE salas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	numero_sala VARCHAR(10) NOT NULL,
	bloco_id INT NOT NULL,
	FOREIGN KEY (bloco_id) REFERENCES blocos(id) ON DELETE CASCADE
);

CREATE TABLE maquinas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	numero_maquina VARCHAR(50) NOT NULL,
	sala_id INT NOT NULL,
	FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE
);

-- Tabela de Problemas
CREATE TABLE problemas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	descricao VARCHAR(255) NOT NULL
);

-- Tabela de Chamados (atualizada)
CREATE TABLE chamados (
	id INT AUTO_INCREMENT PRIMARY KEY,
	usuario_id INT NOT NULL,
	problema_id INT NOT NULL, -- Referência para a nova tabela de problemas
	descricao TEXT,
	status VARCHAR(50) NOT NULL DEFAULT 'Aceitar',
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
	FOREIGN KEY (problema_id) REFERENCES problemas(id) ON DELETE CASCADE
);

CREATE TABLE chamados_maquinas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	chamado_id INT NOT NULL,
	maquina_id INT NOT NULL,
	FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
	FOREIGN KEY (maquina_id) REFERENCES maquinas(id) ON DELETE CASCADE
);

CREATE TABLE atribuidos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	chamado_id INT NOT NULL,
	setor_id INT NOT NULL,
	data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
	FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE
);

CREATE TABLE logs (
	id INT AUTO_INCREMENT PRIMARY KEY,
	chamado_id INT NOT NULL,
	usuario_id INT NOT NULL,
	acao VARCHAR(255) NOT NULL,
	data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao TIMESTAMP NULL,
	data_exclusao TIMESTAMP NULL,
	FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


-- Inserts para a tabela de Setores
INSERT INTO setores (nome_setor) VALUES ('Administrativo');
INSERT INTO setores (nome_setor) VALUES ('CAA');
INSERT INTO setores (nome_setor) VALUES ('Manutenção');

-- Inserts para a tabela de Usuários
INSERT INTO usuarios (nome_completo, senha, email, instituicao, ocupacao, setor_id) 
VALUES ('João Silva', 'senha123', 'joao.silva@email.com', 'Universidade X', 'Aluno', 1);
INSERT INTO usuarios (nome_completo, senha, email, instituicao, ocupacao, setor_id) 
VALUES ('Maria Oliveira', 'senha456', 'maria.oliveira@email.com', 'Universidade Y', 'Técnico de TI', 2);
INSERT INTO usuarios (nome_completo, senha, email, instituicao, ocupacao, setor_id) 
VALUES ('Carlos Souza', 'senha789', 'carlos.souza@email.com', 'Universidade Z', 'Administrador', 3);

-- Inserts para a tabela de Blocos
INSERT INTO blocos (nome_bloco) VALUES ('Bloco A');
INSERT INTO blocos (nome_bloco) VALUES ('Bloco B');
INSERT INTO blocos (nome_bloco) VALUES ('Bloco C');

-- Inserts para a tabela de Salas
INSERT INTO salas (numero_sala, bloco_id) VALUES ('101', 1);
INSERT INTO salas (numero_sala, bloco_id) VALUES ('102', 2);
INSERT INTO salas (numero_sala, bloco_id) VALUES ('103', 3);

-- Inserts para a tabela de Máquinas
INSERT INTO maquinas (numero_maquina, sala_id) VALUES ('PC-001', 1);
INSERT INTO maquinas (numero_maquina, sala_id) VALUES ('PC-002', 2);
INSERT INTO maquinas (numero_maquina, sala_id) VALUES ('PC-003', 3);

-- Inserts para a tabela de Problemas
INSERT INTO problemas (descricao) VALUES ('Problema de rede');
INSERT INTO problemas (descricao) VALUES ('Máquina não liga');
INSERT INTO problemas (descricao) VALUES ('Erro no sistema operacional');

-- Inserts para a tabela de Chamados
INSERT INTO chamados (usuario_id, problema_id, descricao, status) VALUES (1, 1, 'Conexão de internet intermitente.', 'Aceitar');
INSERT INTO chamados (usuario_id, problema_id, descricao, status) VALUES (2, 2, 'Computador não liga.', 'Em Andamento');
INSERT INTO chamados (usuario_id, problema_id, descricao, status) VALUES (3, 3, 'Erro ao inicializar o Windows.', 'Pendentes');

-- Inserts para a tabela de Chamados_Maquinas
INSERT INTO chamados_maquinas (chamado_id, maquina_id) VALUES (1, 1);
INSERT INTO chamados_maquinas (chamado_id, maquina_id) VALUES (2, 2);
INSERT INTO chamados_maquinas (chamado_id, maquina_id) VALUES (3, 3);

-- Inserts para a tabela de Atribuídos
INSERT INTO atribuidos (chamado_id, setor_id) VALUES (1, 1);
INSERT INTO atribuidos (chamado_id, setor_id) VALUES (2, 2);
INSERT INTO atribuidos (chamado_id, setor_id) VALUES (3, 3);

-- Inserts para a tabela de Logs
INSERT INTO logs (chamado_id, usuario_id, acao) VALUES (1, 1, 'Chamado aberto');
INSERT INTO logs (chamado_id, usuario_id, acao) VALUES (2, 2, 'Chamado em andamento');
INSERT INTO logs (chamado_id, usuario_id, acao) VALUES (3, 3, 'Chamado pendente');

