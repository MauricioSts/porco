// backend/server.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurando a conexão com PostgreSQL
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// Criando a tabela caso não exista
pool.query(`
  CREATE TABLE IF NOT EXISTS financas (
    id SERIAL PRIMARY KEY,
    valor NUMERIC NOT NULL,
    data DATE NOT NULL
  )
`).then(() => console.log('Tabela "financas" pronta'))
  .catch(err => console.error('Erro criando tabela', err));

// -------------------- ROTAS --------------------

// GET: todos os registros
app.get('/financas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM financas ORDER BY data DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: adicionar registro
app.post('/financas', async (req, res) => {
  const { valor, data } = req.body;
  if (valor === undefined || !data) {
    return res.status(400).json({ error: 'Valor e data são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO financas (valor, data) VALUES ($1, $2) RETURNING *',
      [valor, data]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: saldo total
app.get('/saldo', async (req, res) => {
  try {
    const result = await pool.query('SELECT SUM(valor) as saldo FROM financas');
    res.json({ saldo: result.rows[0].saldo || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servidor rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
