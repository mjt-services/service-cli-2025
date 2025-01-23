import { Command } from "commander";
import { initConnection } from "../initConnection";

export const vastaiShowInstancesAction = () => {
  const program = new Command();
  program
    .description("Vastai show instances")
    .action(async (query, options) => {
      const con = await initConnection();
      const resp = await con.request({
        request: {
          body: {},
        },
        subject: "vastai.show.instances",
      });
      console.log(JSON.stringify(resp, null, 2));
      process.exit(0);
    });

  program.parse();
};
