-- Cria o banco de dados e usa-o
CREATE DATABASE IF NOT EXISTS sistema_kanban_ti;
USE sistema_kanban_ti;

-- Tabela de Setores
CREATE TABLE IF NOT EXISTS setores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_setor VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de Usuários (setor_id como chave estrangeira)
CREATE TABLE IF NOT EXISTS usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_completo VARCHAR(100) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	instituicao VARCHAR(255) DEFAULT 'SENAI',
	ocupacao VARCHAR(50) NOT NULL,
	setor_id INT,
	FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE SET NULL
);

-- Tabela de Blocos
CREATE TABLE IF NOT EXISTS blocos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome_bloco VARCHAR(50) NOT NULL
);

-- Tabela de Salas
CREATE TABLE IF NOT EXISTS salas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	numero_sala VARCHAR(255) NOT NULL,
	bloco_id INT NOT NULL,
	FOREIGN KEY (bloco_id) REFERENCES blocos(id) ON DELETE CASCADE
);

-- Tabela de Máquinas
CREATE TABLE IF NOT EXISTS maquinas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	numero_maquina VARCHAR(50) NOT NULL,
	sala_id INT NOT NULL,
	FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE
);

-- Tabela de Problemas
CREATE TABLE IF NOT EXISTS problemas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	descricao VARCHAR(255) NOT NULL
);

-- Tabela de Chamados
CREATE TABLE IF NOT EXISTS chamados (
	id INT AUTO_INCREMENT PRIMARY KEY,
	usuario_id INT NOT NULL,
	problema_id INT NOT NULL,
	bloco_id INT NOT NULL,   -- Adicionado bloco_id para referenciar o bloco
	sala_id INT NOT NULL,    -- Adicionado sala_id para referenciar a sala
	descricao TEXT,
	status VARCHAR(50) NOT NULL DEFAULT 'Aceitar',
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
	FOREIGN KEY (problema_id) REFERENCES problemas(id) ON DELETE CASCADE,
	FOREIGN KEY (bloco_id) REFERENCES blocos(id) ON DELETE CASCADE,
	FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE
);

-- Tabela de Chamados_Maquinas
CREATE TABLE IF NOT EXISTS chamados_maquinas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	chamado_id INT NOT NULL,
	maquina_id INT NOT NULL,
	FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
	FOREIGN KEY (maquina_id) REFERENCES maquinas(id) ON DELETE CASCADE
);

-- Tabela de Atribuídos
CREATE TABLE IF NOT EXISTS atribuidos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	chamado_id INT NOT NULL,
	setor_id INT NOT NULL,
	data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
	FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE
);

-- Tabela de Logs
CREATE TABLE IF NOT EXISTS logs (
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

INSERT INTO usuarios (nome_completo, senha, email, ocupacao) VALUES
('Maria Souza', 'senha123', 'maria.souza@example.com', 'TI'),
('Carlos Pereira', 'senha456', 'carlos.pereira@example.com', 'NOA');

-- Insere setores
INSERT IGNORE INTO setores (nome_setor) VALUES ('Administrativo'), ('CAA'), ('Manutenção');

-- Insere blocos
INSERT INTO blocos (nome_bloco) VALUES 
('Bloco A'), 
('Bloco B'), 
('Bloco C'), 
('Bloco D'), 
('Bloco E'),
('Bloco F'),
('Bloco G'),
('Bloco H');

-- Insere salas para Bloco A
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Lab. de acionamento mezanino - Térreo', 1),
('Eletrotécnica - Térreo', 1),
('Hidráulica e pneumática - Térreo', 1),
('Automação industrial - Térreo', 1),
('Automação predial - Térreo', 1);

-- Insere salas para Bloco B
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Lab. Química - Térreo', 2);

-- Insere salas para Bloco C
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Lab. Mecânica industrial - Térreo', 3),
('Lab. de Hidráulica e Pneumática - Térreo', 3),
('Lab. Torno - Térreo', 3);

-- Insere salas para Bloco D
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Laboratório - Térreo', 4),
('Sala 01 - Térreo - Bloco D', 4),
('Lab Maker - Térreo', 4);

-- Insere salas para Bloco E
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Sala 01 - Térreo - Bloco E', 5),
('Sala 1.1 - Térreo - Bloco E', 5),
('Sala 1.2 - Térreo - Bloco E', 5),
('Sala 02 - Térreo - Bloco E', 5),
('Sala 03 - Térreo - Bloco E', 5),
('Sala 04 - Térreo - Bloco E', 5),
('Sala 05 - Térreo - Bloco E', 5),
('Sala 06 - Térreo - Bloco E', 5),
('Sala 6.1 - Térreo - Bloco E', 5),
('Sala 07 - Térreo - Bloco E', 5),
('Sala 08 - Térreo - Bloco E', 5),
('Predial (S.9) - Térreo - Bloco E', 5),
('Sala 10 - Térreo - Bloco E', 5);

-- Insere salas para Bloco F
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Sala 01 - 1° Andar - Bloco F', 6),
('Sala 02 - 1° Andar - Bloco F', 6),
('Sala 03 - 1° Andar - Bloco F', 6),
('Sala 04 - 1° Andar - Bloco F', 6),
('Sala 05 - 1° Andar - Bloco F', 6),
('Sala 06 - 1° Andar - Bloco F', 6),
('Sala 07 - 1° Andar - Bloco F', 6),
('Sala 08 - 1° Andar - Bloco F', 6),
('Sala 09 - 1° Andar - Bloco F', 6),
('Sala 10 - 1° Andar - Bloco F', 6),
('Sala 11 - 2° Andar - Bloco F', 6),
('Sala 12 - 2° Andar - Bloco F', 6),
('Sala 13 - 2° Andar - Bloco F', 6),
('Sala 14 - 2° Andar - Bloco F', 6),
('Sala 15 - 2° Andar - Bloco F', 6),
('Sala 16 - 2° Andar - Bloco F', 6),
('Sala 17 - 2° Andar - Bloco F', 6),
('Sala 18 - 2° Andar - Bloco F', 6),
('Sala 19 - 2° Andar - Bloco F', 6),
('Sala 20 - 2° Andar - Bloco F', 6);

-- Insere salas para Bloco G
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Mecânica automotiva - Térreo', 7);

-- Insere salas para Bloco H
INSERT INTO salas (numero_sala, bloco_id) VALUES 
('Setor teórica de Empilhadeira - Térreo', 8),
('Sala de Planta EMI - Térreo', 8),
('Planta de processamento de cereais, raízes e derivados - Térreo', 8);

-- Insere máquinas
INSERT IGNORE INTO maquinas (numero_maquina, sala_id) VALUES 
('PC-001', 1), 
('PC-002', 2), 
('PC-003', 3);

-- Insere problemas
INSERT IGNORE INTO problemas (descricao) VALUES 
('Ar condicionado'),
('Projetores'),
('Caixa de Som'),
('Iluminação do ambiente'),
('Mobiliário'),
('Computadores e Periféricos'),
('Softwares e Programas Específicos'),
('Disposição dos Equipamentos no Ambiente'),
('Internet'),
('outros');


-- Insere chamados
INSERT INTO chamados (usuario_id, problema_id, bloco_id, sala_id, descricao, status) VALUES 
(1, 1, 1, 1, 'Problema de rede no computador.', 'Aberto'), 
(1, 2, 1, 2, 'Computador não liga.', 'Em Andamento'),
(2, 3, 2, 3, 'Erro ao inicializar o Windows.', 'Pendentes');

-- Insere chamados para máquinas
INSERT INTO chamados_maquinas (chamado_id, maquina_id) VALUES 
(1, 1), 
(2, 2), 
(3, 3);

-- Insere atribuições de chamados
INSERT INTO atribuidos (chamado_id, setor_id) VALUES 
(1, 1), 
(2, 2), 
(3, 3);

-- Insere logs de chamados
INSERT INTO logs (chamado_id, usuario_id, acao) VALUES 
(1, 1, 'Chamado aberto'), 
(2, 1, 'Chamado em andamento'), 
(3, 2, 'Chamado pendente');