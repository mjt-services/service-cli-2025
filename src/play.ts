import { initConnection } from "./initConnection";

export const play = async () => {
  const con = await initConnection();
  con.requestMany({
    onResponse: (msg) => {
      if (msg.done) {
        console.log(msg.text);
        process.exit(0);
      }
    },
    request: {
      body: {
        prompt: "Tell me a joke about a CLI",
        model: "google/gemini-flash-1.5",
        stream: true,
      },
    },
    subject: "textgen.generate",
  });
};
