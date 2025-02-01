import { Command } from "commander";
import { initConnection } from "../initConnection";

export const vastaiConnectInstanceAction = () => {
  const program = new Command();
  program
    .description("Vastai connect instance")
    .argument("<contract-id>", "contract id")
    .argument("<target-port>", "target port")
    .argument("<service-name>", "service name")
    .action(async (contractId, portNumber, serviceName) => {
      const con = await initConnection();
      const resp = await con.request({
        request: {
          body: {
            contractId,
            serviceName,
            targetPort: parseInt(portNumber),
          },
        },
        subject: "vastai.connect.instance",
      });
      console.log(resp);
      process.exit(0);
    });

  program.parse();
};
