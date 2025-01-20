import { Command } from "commander";
import { initConnection } from "../initConnection";
import * as fs from "fs";
import { extractMarkdownText } from "../common/extractMarkdownText";
import { toGoogleSearchUrl } from "../common/toGoogleSearchUrl";

export const textgenAction = () => {
  const program = new Command();
  program
    .description("Generate text")
    .option("-m, --model <model>", "Select a model")
    .option("-em, --extract-markdown", "extract markdwon text")
    .option("-g, --google", "google search")
    .argument("[prompt]", "Text prompt for the model")
    .action(async (prompt, options) => {
      const model: string = options.model || "google/gemini-flash-1.5";
      const google: boolean = options.google || false;
      const extractMarkdown: boolean = options.extractMarkdown || google;

      const handlePrompt = async (prompt: string) => {
        // console.log("Model:", model);
        // console.log("Prompt:", prompt);
        // console.log("Extract Markdown:", extractMarkdown);

        const con = await initConnection();
        con.requestMany({
          onResponse: (msg) => {
            if (msg.done) {
              const processedText = extractMarkdown
                ? extractMarkdownText(msg.text || "")
                : msg.text || "";
              const wrappedText = google
                ? toGoogleSearchUrl(processedText)
                : processedText;
              console.log(wrappedText);
              process.exit(0);
            }
          },
          request: {
            body: {
              prompt,
              model,
              stream: true,
            },
          },
          subject: "textgen.generate",
        });
      };

      if (prompt) {
        await handlePrompt(prompt);
      } else if (!process.stdin.isTTY) {
        let stdinData = "";
        process.stdin.setEncoding("utf8");
        process.stdin.on("data", (chunk) => {
          stdinData += chunk;
        });
        process.stdin.on("end", async () => {
          await handlePrompt(stdinData.trim());
        });
      } else {
        console.error("No prompt provided and no input from stdin.");
        process.exit(1);
      }
    });

  program.parse();
};
