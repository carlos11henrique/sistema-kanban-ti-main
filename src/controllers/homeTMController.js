const modelHome = require('../models/homeTMModel');

// Retorna o tempo médio de resolução dos problemas por setor
const getTempoMedioResolucao = async (req, res) => {
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
            logs l ON l.chamado_id = c.id AND l.acao = 'Chamado atualizado: Status mudou para Concluído'
        GROUP BY 
            s.nome_setor, p.descricao
        ORDER BY 
            setor, tempo_medio_resolucao_horas;
    `;
    try {
        const result = await modelHome.executeQuery(query, []);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Nenhum dado encontrado.' });
        }
        return res.json(result);
    } catch (err) {
        console.error('Erro ao buscar tempo médio de resolução:', err);
        return res.status(500).json({ error: 'Erro ao buscar tempo médio de resolução' });
    }
};

// Retorna os problemas com maior número de chamados por setor
const getProblemasMaiorIndice = async (req, res) => {
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
    try {
        const result = await modelHome.executeQuery(query, []);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Nenhum dado encontrado.' });
        }
        return res.json(result);
    } catch (err) {
        console.error('Erro ao buscar problemas com maior índice de chamados:', err);
        return res.status(500).json({ error: 'Erro ao buscar problemas com maior índice de chamados' });
    }
};

// Retorna o tempo para o primeiro contato nos chamados por setor
const getTempoPrimeiroContato = async (req, res) => {
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
        HAVING 
            tempo_primeiro_contato_horas IS NOT NULL
        ORDER BY 
            setor, tempo_primeiro_contato_horas ASC;
    `;
    try {
        const result = await modelHome.executeQuery(query, []);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Nenhum dado encontrado.' });
        }
        return res.json(result);
    } catch (err) {
        console.error('Erro ao buscar tempo de primeiro contato:', err);
        return res.status(500).json({ error: 'Erro ao buscar tempo de primeiro contato' });
    }
};

// Retorna o tempo total para fechamento dos chamados por setor
const getTempoFechamento = async (req, res) => {
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
            l.acao = 'Chamado atualizado: Status mudou para Concluído'
        GROUP BY 
            s.nome_setor, c.id
        HAVING 
            tempo_total_resolucao_horas IS NOT NULL
        ORDER BY 
            setor, tempo_total_resolucao_horas DESC;
    `;
    try {
        const result = await modelHome.executeQuery(query, []);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Nenhum dado encontrado.' });
        }
        return res.json(result);
    } catch (err) {
        console.error('Erro ao buscar tempo de fechamento:', err);
        return res.status(500).json({ error: 'Erro ao buscar tempo de fechamento' });
    }
};

module.exports = {
    getTempoMedioResolucao,
    getProblemasMaiorIndice,
    getTempoPrimeiroContato,
    getTempoFechamento,
};
