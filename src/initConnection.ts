import { Messages } from "@mjt-engine/message";

import { assertValue } from "@mjt-engine/assert";
import type { AsrConnectionMap } from "@mjt-services/asr-common-2025";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import type { Env } from "./Env";
import { loadEnvFile } from "./loadEnv";

export const initConnection = async () => {
  const cwd = process.cwd();
  const env = loadEnvFile(`${cwd}/.env`);

  const url = assertValue(env.NATS_URL);

  const con = await Messages.createConnection<
    AsrConnectionMap & TextgenConnectionMap,
    Env
  >({
    // options: { log: console.log },
    options: { log: () => {} },
    server: [url],
    token: env.NATS_AUTH_TOKEN,
    env,
  });
  return con;
};
