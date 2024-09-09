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

  

  const response = await model.invoke([new HumanMessage({ content: message })]);

  // Handle the response here
  console.log(response);
}

export { sendMessage };