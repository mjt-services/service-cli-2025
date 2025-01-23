import { Command } from "commander";
import { initConnection } from "../initConnection";

export const vastaiCreateInstanceAction = () => {
  const program = new Command();
  program
    .description("Vastai create instance")
    .argument("<machine-id>", "machine id")
    .argument("<image>", "Select an image")
    .action(async (machineId, image) => {
      const con = await initConnection();
      const resp = await con.request({
        request: {
          body: {
            machineId,
            image,
          },
        },
        subject: "vastai.create.instance",
      });
      console.log("resp", resp);
      process.exit(0);
    });

  program.parse();
};
