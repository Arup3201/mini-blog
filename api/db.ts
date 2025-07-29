import { Pool } from "pg";
import env from "./env";

const pool = new Pool({
  host: env.PG_HOST,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  port: Number(env.PG_PORT),
  idleTimeoutMillis: 30000,
});

export default pool;