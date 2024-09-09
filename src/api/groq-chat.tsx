import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import type { BaseMessage } from "@langchain/core/messages";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

type ChainInput = {
  chat_history: BaseMessage[];
  input: string;
};

// const [chatHistory, setChatHistory] = useState<BaseMessage[]>([]);
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
const model = new ChatGroq({
  model: "llama3-8b-8192",
  temperature: 0,
  apiKey: import.meta.env.VITE_GROQ_API_KEY
});


async function sendMessage(message: string, chatHistory: BaseMessage[], setChatHistory: (chatHistory: BaseMessage[]) => void) {
  const filterMessages = (input: ChainInput) => input.chat_history.slice(-10);

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are Larry David.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
  ]);
  
  const chain = RunnableSequence.from<ChainInput>([
    RunnablePassthrough.assign({
      chat_history: filterMessages,
    }),
    prompt,
    model,
  ]);
  
  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
      if (messageHistories[sessionId] === undefined) {
        const messageHistory = new InMemoryChatMessageHistory();
        await messageHistory.addMessages(chatHistory);
        messageHistories[sessionId] = messageHistory;
      }
      return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
  });
  
  const config = {
    configurable: {
      sessionId: "abc4",
    },
  };
  
  const response = await withMessageHistory.invoke(
    {
      chat_history: chatHistory,
      input: message,
    },
    config
  );

  const newMessage = new HumanMessage({ content: message, name: "User" });
  const larryMessage = new AIMessage({ content: response.content, name: "Larry David" });
  // setChatHistory([...chatHistory, newMessage]);
  // setChatHistory([...chatHistory, larryMessage]);
  setChatHistory([...chatHistory, newMessage, larryMessage]);

  // Handle the response here
  console.log(response);
  console.log(chatHistory);
  // log the types of the messages in chatHistory
  console.log(chatHistory.map(message => message.constructor.name));
}

export { sendMessage };