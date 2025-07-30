import { Pool } from "pg";
import env from "../env";

export const pool = new Pool({
  host: env.PG_HOST,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  port: Number(env.PG_PORT),
  idleTimeoutMillis: 30000,
});

export const query = async (text: string, params: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

export const commit = async () => {
  const start = Date.now();
  await pool.query("COMMIT");
  const duration = Date.now() - start;
  console.log("Changes commited to DB", { duration });
};
