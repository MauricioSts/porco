import pkg from "pg";

const { Pool } = pkg;

let cachedPool;

export function getPool() {
  if (!cachedPool) {
    cachedPool = new Pool({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT || 5432),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return cachedPool;
}

// Ensure table exists on cold start
async function ensureSchema() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS financas (
      id SERIAL PRIMARY KEY,
      valor NUMERIC NOT NULL,
      data DATE NOT NULL
    )
  `);
}

ensureSchema().catch(() => {
  // Avoid crashing the function on cold start; queries will fail later if schema truly broken
});


