import { Command } from "commander";
import { initConnection } from "../initConnection";

export const vastaiSearchAction = () => {
  const program = new Command();
  program
    .description("Vastai search")
    .argument("[query]", "query for vastai search")
    .action(async (query, options) => {
      const con = await initConnection();
      const resp = await con.request({
        request: {
          body: {
            query: query,
          },
        },
        subject: "vastai.search",
      });
      console.log("resp",resp);
      process.exit(0);
    });

  program.parse();
};
