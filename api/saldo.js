import { getPool } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const pool = getPool();
    const result = await pool.query("SELECT SUM(valor) as saldo FROM financas");
    res.status(200).json({ saldo: result.rows[0]?.saldo || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


