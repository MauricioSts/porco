import { getPool } from "./db.js";

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT * FROM financas ORDER BY data DESC");
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const { valor, data } = req.body || {};
      if (valor === undefined || !data) {
        res.status(400).json({ error: "Valor e data são obrigatórios" });
        return;
      }

      const result = await pool.query(
        "INSERT INTO financas (valor, data) VALUES ($1, $2) RETURNING *",
        [valor, data]
      );

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end("Method Not Allowed");
}


