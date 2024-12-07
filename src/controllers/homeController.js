const modelHome = require('../models/modelHome'); // Importe o modelo para executar as consultas no banco

// Função para buscar o total de chamados por status
const getTotalChamados = (status, res) => {
  const query = `SELECT COUNT(*) AS total FROM chamados WHERE status = ?`;
  modelHome.executeQuery(query, [status], (err, result) => {
    if (err) {
      console.error(`Erro ao buscar total de chamados (${status}):`, err);
      return res.status(500).json({ error: 'Erro ao buscar total de chamados' });
    }
    res.json(result[0]);
  });
};

// Função para buscar o tempo médio de resolução
const getTempoMedioResolucao = (req, res) => {
  const query = `
    SELECT 
      CEIL(AVG(TIMESTAMPDIFF(SECOND, andamento.data_log, concluido.data_log)) / 86400) AS tempo_medio_resolucao_dias
    FROM 
      logs andamento
    JOIN 
      logs concluido 
      ON andamento.chamado_id = concluido.chamado_id
    WHERE 
      andamento.acao = 'Chamado atualizado: Status mudou para Em Andamento'
      AND concluido.acao = 'Chamado atualizado: Status mudou para Concluido'
      AND andamento.data_log < concluido.data_log;
  `;

  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar tempo médio de resolução:', err);
      return res.status(500).json({ error: 'Erro ao buscar tempo médio de resolução' });
    }
    if (result.length > 0 && result[0].tempo_medio_resolucao_dias !== null) {
      res.json({
        tempo_medio_resolucao_dias: result[0].tempo_medio_resolucao_dias
      });
    } else {
      res.json({
        tempo_medio_resolucao_dias: 0
      });
    }
  });
};

// Função para buscar problemas recorrentes
const getProblemasRecorrentes = (req, res) => {
  const query = `SELECT p.descricao AS nome_problema, COUNT(*) AS total 
                 FROM chamados c JOIN problemas p ON c.problema_id = p.id 
                 GROUP BY p.descricao ORDER BY total DESC LIMIT 3`;
  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar problemas recorrentes:', err);
      return res.status(500).json({ error: 'Erro ao buscar problemas recorrentes' });
    }
    res.json(result);
  });
};

// Função para buscar a distribuição de chamados por categoria
const getDistribuicaoCategoria = (req, res) => {
  const query = `SELECT s.nome_setor, COUNT(*) AS total_chamados 
                 FROM chamados c JOIN setores s ON c.setor_id = s.id 
                 GROUP BY s.nome_setor`;
  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar distribuição de chamados por categoria:', err);
      return res.status(500).json({ error: 'Erro ao buscar distribuição de chamados por categoria' });
    }
    res.json(result);
  });
};

// Função para buscar chamados por mês
const getChamadosPorMes = (req, res) => {
  const query = `SELECT MONTH(criado_em) AS mes, COUNT(*) AS total_chamados 
                 FROM chamados 
                 GROUP BY MONTH(criado_em) ORDER BY mes`;
  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar chamados por mês:', err);
      return res.status(500).json({ error: 'Erro ao buscar chamados por mês' });
    }
    res.json(result);
  });
};

// Função para buscar evolução de chamados
const getEvolucaoChamados = (req, res) => {
  const query = `SELECT DATE_FORMAT(criado_em, '%Y-%m-%d') AS dia, COUNT(*) AS total_chamados 
FROM chamados 
GROUP BY dia 
ORDER BY dia;`;
  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar evolução de chamados:', err);
      return res.status(500).json({ error: 'Erro ao buscar evolução de chamados' });
    }
    res.json(result);
  });
};

// Função para buscar chamados em degrau
const getChamadosDegrau = (req, res) => {
  const query = `SELECT DATE_FORMAT(criado_em, '%Y-%m-%d') AS dia, COUNT(*) AS total_chamados 
FROM chamados 
GROUP BY dia 
ORDER BY dia;`;
  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar chamados em degrau:', err);
      return res.status(500).json({ error: 'Erro ao buscar chamados em degrau' });
    }
    res.json(result);
  });
};

// Função para buscar chamados por categoria
const getChamadosPorCategoria = (req, res) => {
  const query = `SELECT categoria, COUNT(*) AS total 
                 FROM chamados 
                 GROUP BY categoria`;
  modelHome.executeQuery(query, [], (err, result) => {
    if (err) {
      console.error('Erro ao buscar chamados por categoria:', err);
      return res.status(500).json({ error: 'Erro ao buscar chamados por categoria' });
    }
    res.json(result);
  });
};

// Função para buscar chamados por problema
const getChamadosPorProblema = (problemaId, res) => {
  const query = `SELECT * FROM chamados WHERE problema_id = ?`;
  modelHome.executeQuery(query, [problemaId], (err, result) => {
    if (err) {
      console.error('Erro ao buscar chamados por problema:', err);
      return res.status(500).json({ error: 'Erro ao buscar chamados por problema' });
    }
    res.json(result);
  });
};

module.exports = {
  getTotalChamados,
  getTempoMedioResolucao,
  getProblemasRecorrentes,
  getDistribuicaoCategoria,
  getChamadosPorMes,
  getEvolucaoChamados,
  getChamadosDegrau,
  getChamadosPorCategoria,
  getChamadosPorProblema
};
