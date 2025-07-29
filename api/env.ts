import fs from "fs";
import type { Environment } from "./env.dt";

const ENV: Environment = {
  PORT: "",
  PG_HOST: "",
  PG_USER: "",
  PG_PORT: "",
  PG_PASSWORD: "",
  PG_DATABASE: "",
};

const data = fs.readFileSync(".env", "utf-8");
const lines = data.split("\n");
lines.forEach((line) => {
  const nv = line.toString().split("=");
  const vName = nv[0].trim() as keyof Environment;
  if (!Object.keys(ENV).includes(vName)) {
    throw Error(`Invalid environment variable name ${vName}`);
  }
  const vValue = nv[1].trim();
  ENV[vName] = vValue;
});

export default ENV;
