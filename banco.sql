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
    feedback TEXT,

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
('Bloco H'),
('Bloco I');

-- Insere salas para Bloco A
INSERT INTO salas (numero_sala, bloco_id) VALUES
('sala de METROLOGIA', 1),
('SALA ELÉTRICA SALA 01', 1),
('SALA ELÉTRICA SALA 02', 1),
('SALA ELÉTRICA SALA 03', 1),
('SALA ELÉTRICA SALA 04', 1),
('HIDRÁULICA LAB', 1),
('AUT PREDIAL LAB', 1),
('PANIFICAÇÃO 2/3 LAB', 1);

-- Insere salas para Bloco B
INSERT INTO salas (numero_sala, bloco_id) VALUES
('Química LAB', 2);

-- Insere salas para Bloco C
INSERT INTO salas (numero_sala, bloco_id) VALUES
('LAB FABRICAÇÃO ', 3),
('MANUTENÇÃO I LAB', 3),
('MANUTENÇÃO II LAB', 3),
('SOLDAGEM LAB', 3),
('MECÂNICA I SALA', 3);



-- Insere salas para Bloco D
INSERT INTO salas (numero_sala, bloco_id) VALUES
('PLANTA CIM', 4),
('LAB QUALIDADE', 4),
('LAB MAKER', 4);

-- Insere salas para Bloco E
INSERT INTO salas (numero_sala, bloco_id) VALUES
('Sala 01 - Térreo', 5),
('Sala 02 - Térreo', 5),
('Sala 03 - Térreo', 5),
('Sala 04 - Térreo', 5),
('Sala 05 - Térreo', 5),
('Sala 06 - Térreo', 5),
('Sala 07 - Térreo', 5),
('Sala 08 - Térreo', 5),
('Sala 09 - Térreo', 5),
('Sala 10 - Térreo', 5),
('Sala 11 - Térreo', 5),
('Sala 12 - Térreo', 5),
('Sala 13 - Térreo', 5),
('Sala 14 - Térreo', 5),
('Sala 15 - Térreo', 5),
('Sala 16 - Térreo', 5);

-- Insere salas para Bloco F
INSERT INTO salas (numero_sala, bloco_id) VALUES
('01 - LAB DE SISTEMAS', 6),
('02 - LAB DE INFORMÁTICA', 6),
('03 - LAB PROGRAMAÇÃO DE APP', 6),
('04 - LAB DE INFORMÁTICA', 6),
('05 - LAB LÓGICA DE PROGRAMAÇÃO', 6),
('06 - LAB DE INFORMÁTICA', 6),
('07 - LAB PROGRAMAÇÃO WEB', 6),
('08 - LAB DE INFORMÁTICA', 6),
('09 - LAB CAD/CAM', 6),
('10 - LAB DE INFORMÁTICA', 6),
('11 - LAB ELETROTÉCNICA', 6),
('12 - SALA - 2º ANDAR', 6),
('13 - LAB ACIONAMENTOS', 6),
('14 - SALA - 2º ANDAR', 6),
('15 - LAB ELETRÔNICA', 6),
('16 - SALA - 2º ANDAR', 6),
('17 - SALA - 2º ANDAR', 6),
('18 - SALA - 2º ANDAR', 6);
('19 - SALA - 2º ANDAR', 6),
('20 - SALA - 2º ANDAR', 6),

-- Insere salas para Bloco G
INSERT INTO salas (numero_sala, bloco_id) VALUES
('ARMAZENAGEM', 7);
('LAB MOTOCICLETAS', 7);
('FUNILARIA', 7);


-- Insere salas para Bloco H
INSERT INTO salas (numero_sala, bloco_id) VALUES
('SALA EMPILHADEIRA', 8),
('PANIFICAÇÃO', 8),
('MICROBIOLOGIA', 8),
('ARENA RD', 8);
INSERT INTO salas (numero_sala, bloco_id) VALUES
('PREDIAL II', 9),
('SALA EXTERNA', 9);


-- Insere problemas
INSERT IGNORE INTO problemas (descricao) VALUES
('Ar condicionado'),
('Projetores'),
('Caixa de Som'),
('Iluminação do ambiente'),
('Mobiliário'),
('Computadores e Periféricos'),
('Softwares e Programas Específicos'),
('Internet'),
('Outros');

-- Insere usuários
INSERT INTO usuarios (nome_completo, senha, email, instituicao, ocupacao) VALUES
('Maria Souza', 'senha123', 'maria.souza@example.com', 'SENAI', 'TI'),
('Carlos Pereira', 'senha456', 'carlos.pereira@example.com', 'SENAI', 'NOA');


INSERT INTO maquinas (numero_maquina, tipo_equipamento, descricao, sala_id) 
VALUES 
('PC001', 'Computador', 'Desktop LG', 1), 
('PC002', 'Computador', 'Desktop LG', 2), 
('PC003', 'Computador', 'Desktop LG', 3);









