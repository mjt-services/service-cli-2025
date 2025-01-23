import { Command } from "commander";
import { initConnection } from "../initConnection";

export const vastaiDestroyInstanceAction = () => {
  const program = new Command();
  program
    .description("Vastai create instance")
    .argument("<contract-id>", "machine id")
    .action(async (contractId) => {
      const con = await initConnection();
      const resp = await con.request({
        request: {
          body: {
            contractId,
          },
        },
        subject: "vastai.destroy.instance",
      });
      console.log("resp", resp);
      process.exit(0);
    });

  program.parse();
};
