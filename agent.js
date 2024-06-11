const { OpenAI } = require("langchain/llms");
const { ConversationChain } = require("langchain/chains");

const llm = new OpenAI({ temperature: 0 });
const conversation = new ConversationChain({ llm, verbose: true });

async function runAgent() {
  while (true) {
    const userInput = await new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      readline.question("User: ", (input) => {
        readline.close();
        resolve(input);
      });
    });

    const response = await conversation.predict({ input: userInput });
    console.log(`Agent: ${response}`);
  }
}

runAgent();
