import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import type { Env } from "./Env";

export function loadEnvFile(filePath: string): { [key: string]: string } {
  const absolutePath = path.resolve(filePath);
  const envConfig = dotenv.parse(fs.readFileSync(absolutePath));
  return envConfig as Env;
}
