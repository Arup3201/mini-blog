import { Pool } from "pg";
import env from "../env";

const db = {
  pool: new Pool({
    host: env.PG_HOST,
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DATABASE,
    port: Number(env.PG_PORT),
    idleTimeoutMillis: 30000,
  }),
  query: async function (text: string) {
    const start = Date.now();
    const res = await this.pool.query(text);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  }, 
  queryWithParams:  async function (text: string, params: any[]) {
    const start = Date.now();
    const res = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  }, 
};

export default db;
