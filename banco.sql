
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