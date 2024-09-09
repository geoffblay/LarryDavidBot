import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";



async function sendMessage(message: string) {
  const model = new ChatGroq({
    model: "llama3-8b-8192",
    temperature: 0,
    apiKey: import.meta.env.VITE_GROQ_API_KEY
  });

  const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are Larry David.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
  ]);
  
  const chain = prompt.pipe(model);
  
  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
      if (messageHistories[sessionId] === undefined) {
        messageHistories[sessionId] = new InMemoryChatMessageHistory();
      }
      return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
  });

  const config = {
    configurable: {
      sessionId: "abc2",
    },
  };
  
  const response = await withMessageHistory.invoke(
    {
      input: "How's your day going?",
    },
    config
  );

  // const response = await model.invoke([new HumanMessage({ content: message })]);

  // Handle the response here
  console.log(response);
}

export { sendMessage };