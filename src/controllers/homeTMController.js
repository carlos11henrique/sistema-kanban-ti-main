const modelHome = require('../models/modelHome');

// Tempo médio de resolução dos problemas por setor
const getTempoMedioResolucao = (req, res) => {
    const query = `
        SELECT 
            s.nome_setor AS setor,
            p.descricao AS problema,
            ROUND(AVG(TIMESTAMPDIFF(HOUR, c.criado_em, l.data_log)), 2) AS tempo_medio_resolucao_horas
        FROM 
            setores s
        JOIN 
            chamados c ON s.id = c.setor_id
        JOIN 
            problemas p ON c.problema_id = p.id
        JOIN 
            logs l ON l.chamado_id = c.id AND l.acao LIKE 'Chamado atualizado: Status mudou para Concluído'
        GROUP BY 
            s.nome_setor, p.descricao
        ORDER BY 
            setor, tempo_medio_resolucao_horas;
    `;
    modelHome.executeQuery(query, [], (err, result) => {
        if (err) {
            console.error('Erro ao buscar tempo médio de resolução:', err);
            return res.status(500).json({ error: 'Erro ao buscar tempo médio de resolução' });
        }
        res.json(result);
    });
};

// Problemas com maior índice de chamados por setor
const getProblemasMaiorIndice = (req, res) => {
    const query = `
        SELECT 
            s.nome_setor AS setor,
            p.descricao AS problema,
            COUNT(c.id) AS total_chamados
        FROM 
            setores s
        JOIN 
            chamados c ON s.id = c.setor_id
        JOIN 
            problemas p ON c.problema_id = p.id
        GROUP BY 
            s.nome_setor, p.descricao
        ORDER BY 
            setor, total_chamados DESC
        LIMIT 10;
    `;
    modelHome.executeQuery(query, [], (err, result) => {
        if (err) {
            console.error('Erro ao buscar problemas com maior índice de chamados:', err);
            return res.status(500).json({ error: 'Erro ao buscar problemas com maior índice de chamados' });
        }
        res.json(result);
    });
};

// Tempo de resolução dos chamados (abertura até o primeiro contato) por setor
const getTempoPrimeiroContato = (req, res) => {
    const query = `
        SELECT 
            s.nome_setor AS setor,
            c.id AS chamado_id,
            TIMESTAMPDIFF(HOUR, c.criado_em, MIN(l.data_log)) AS tempo_primeiro_contato_horas
        FROM 
            setores s
        JOIN 
            chamados c ON s.id = c.setor_id
        JOIN 
            logs l ON l.chamado_id = c.id AND l.acao LIKE 'Chamado atualizado%'
        GROUP BY 
            s.nome_setor, c.id
        ORDER BY 
            setor, tempo_primeiro_contato_horas ASC;
    `;
    modelHome.executeQuery(query, [], (err, result) => {
        if (err) {
            console.error('Erro ao buscar tempo de primeiro contato:', err);
            return res.status(500).json({ error: 'Erro ao buscar tempo de primeiro contato' });
        }
        res.json(result);
    });
};

// Tempo de espera para fechamento de chamados por setor
const getTempoFechamento = (req, res) => {
    const query = `
        SELECT 
            s.nome_setor AS setor,
            c.id AS chamado_id,
            TIMESTAMPDIFF(HOUR, c.criado_em, MAX(l.data_log)) AS tempo_total_resolucao_horas
        FROM 
            setores s
        JOIN 
            chamados c ON s.id = c.setor_id
        JOIN 
            logs l ON l.chamado_id = c.id
        WHERE 
            l.acao LIKE 'Chamado atualizado: Status mudou para Concluído'
        GROUP BY 
            s.nome_setor, c.id
        ORDER BY 
            setor, tempo_total_resolucao_horas DESC;
    `;
    modelHome.executeQuery(query, [], (err, result) => {
        if (err) {
            console.error('Erro ao buscar tempo de fechamento:', err);
            return res.status(500).json({ error: 'Erro ao buscar tempo de fechamento' });
        }
        res.json(result);
    });
};

module.exports = {
    getTempoMedioResolucao,
    getProblemasMaiorIndice,
    getTempoPrimeiroContato,
    getTempoFechamento,
};
