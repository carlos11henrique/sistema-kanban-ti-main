CREATE DATABASE IF NOT EXISTS sistema_kanban_ti;
USE sistema_kanban_ti;

-- Tabela de Setores
CREATE TABLE IF NOT EXISTS setores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_setor VARCHAR(50) NOT NULL UNIQUE
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
    tipo_equipamento VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    sala_id INT NOT NULL,  
    FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE
);

-- Tabela de Periféricos
CREATE TABLE IF NOT EXISTS perifericos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_periferico VARCHAR(50) NOT NULL,  -- Tipo do periférico (Ex: Teclado, Mouse, Impressora)
    descricao VARCHAR(255),  -- Descrição do periférico (marca, modelo, etc.)
    maquina_id INT NOT NULL,  -- Referência à máquina associada
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id) ON DELETE CASCADE  -- Relaciona o periférico com a máquina
);

-- Tabela de Problemas
CREATE TABLE IF NOT EXISTS problemas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela de Usuários
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

-- Tabela de Chamados
CREATE TABLE IF NOT EXISTS chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    problema_id INT NOT NULL,
    bloco_id INT NOT NULL,
    sala_id INT NOT NULL,
    setor_id INT NOT NULL,
    maquina_id INT NOT NULL,
    descricao TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Aberto',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id) ON DELETE CASCADE,
    FOREIGN KEY (problema_id) REFERENCES problemas(id) ON DELETE CASCADE,
    FOREIGN KEY (bloco_id) REFERENCES blocos(id) ON DELETE CASCADE,
    FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE,
    FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS atribuidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chamado_id INT NOT NULL,
    setor_id INT NOT NULL,
    data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
    FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chamado_id INT NOT NULL,
    usuario_id INT NOT NULL,
    acao VARCHAR(255) NOT NULL,
    data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    data_exclusao TIMESTAMP NULL DEFAULT NULL,  
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
DELIMITER //

CREATE TRIGGER after_chamados_insert
AFTER INSERT ON chamados
FOR EACH ROW
BEGIN
    INSERT INTO logs (chamado_id, usuario_id, acao)
    VALUES (NEW.id, NEW.usuario_id, 'Chamado criado');
END; //

DELIMITER ;



DELIMITER //

CREATE TRIGGER after_chamados_update
AFTER UPDATE ON chamados
FOR EACH ROW
BEGIN
    INSERT INTO logs (chamado_id, usuario_id, acao)
    VALUES (NEW.id, NEW.usuario_id, CONCAT('Chamado atualizado: Status mudou para ', NEW.status));
END; //

DELIMITER ;


INSERT IGNORE INTO setores (nome_setor) VALUES ('NOA'), ('TI'), ('MANUTENCAO');

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
('Sala 01 - Térreo', 4),
('Lab Maker - Térreo', 4);

-- Insere salas para Bloco E
INSERT INTO salas (numero_sala, bloco_id) VALUES
('Sala 01 - Térreo', 5),
('Sala 1.1 - Térreo', 5),
('Sala 1.2 - Térreo', 5),
('Sala 02 - Térreo', 5),
('Sala 03 - Térreo', 5),
('Sala 04 - Térreo', 5),
('Sala 05 - Térreo', 5),
('Sala 06 - Térreo', 5),
('Sala 6.1 - Térreo', 5),
('Sala 07 - Térreo', 5),
('Sala 08 - Térreo', 5),
('Predial (S.9) - Térreo', 5),
('Sala 10 - Térreo', 5);

-- Insere salas para Bloco F
INSERT INTO salas (numero_sala, bloco_id) VALUES
('Sala 01 - 1° Andar', 6),
('Sala 02 - 1° Andar', 6),
('Sala 03 - 1° Andar', 6),
('Sala 04 - 1° Andar', 6),
('Sala 05 - 1° Andar', 6),
('Sala 06 - 1° Andar', 6),
('Sala 07 - 1° Andar', 6),
('Sala 08 - 1° Andar', 6),
('Sala 09 - 1° Andar', 6),
('Sala 10 - 1° Andar', 6),
('Sala 11 - 2° Andar', 6),
('Sala 12 - 2° Andar', 6),
('Sala 13 - 2° Andar', 6),
('Sala 14 - 2° Andar', 6),
('Sala 15 - 2° Andar', 6),
('Sala 16 - 2° Andar', 6),
('Sala 17 - 2° Andar', 6),
('Sala 18 - 2° Andar', 6),
('Sala 19 - 2° Andar', 6),
('Sala 20 - 2° Andar', 6);

-- Insere salas para Bloco G
INSERT INTO salas (numero_sala, bloco_id) VALUES
('Mecânica automotiva - Térreo', 7);

-- Insere salas para Bloco H
INSERT INTO salas (numero_sala, bloco_id) VALUES
('Setor teórica de Empilhadeira - Térreo', 8),
('Sala de Planta EMI - Térreo', 8),
('Planta de processamento de cereais, raízes e derivados - Térreo', 8);

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
('Outros');

-- Insere usuários
INSERT INTO usuarios (nome_completo, senha, email, instituicao, ocupacao) VALUES
('Maria Souza', 'senha123', 'maria.souza@example.com', 'SENAI', 'TI'),
('Carlos Pereira', 'senha456', 'carlos.pereira@example.com', 'SENAI', 'NOA');


INSERT INTO maquinas (numero_maquina, tipo_equipamento, descricao, sala_id) 
VALUES 
('PC001', 'Computador', 'Desktop Dell', 1), 
('PC002', 'Computador', 'Desktop HP', 2), 
('PC003', 'Computador', 'Laptop Lenovo', 3);

-- Inserir dados em chamados
INSERT INTO chamados (usuario_id, problema_id, bloco_id, sala_id, setor_id, maquina_id, descricao, status) 
VALUES 
(1, 1, 1, 1, 1, 1, 'Problema no ar condicionado', 'Aberto'),
(2, 2, 2, 2, 2, 2, 'Problema com o projetor', 'Em Andamento');









