import Header from './components/header'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { ChatBubble } from './components/chat-bubble'
import { useState } from 'react'
import { sendMessage } from './api/groq-chat'
import type { BaseMessage } from "@langchain/core/messages";


function App() {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<BaseMessage[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(inputValue)
    setInputValue('')
    const timestamp = new Date().toLocaleTimeString();
    setTimestamps([...timestamps, timestamp, timestamp])
    await sendMessage(inputValue, chatHistory, setChatHistory)
  }

  return (
    <div className="box-border border-4 border-green-500 flex flex-col h-screen items-center">
      <Header />
      <div className="flex flex-col flex-grow overflow-y-auto w-4/5">
        {chatHistory.map((message, index) => {
          const timestamp = timestamps[index];
          return (
            <ChatBubble
              key={index}
              message={message.content.toString()}
              sender={message.name === 'User' ? 'user' : 'ai'}
              timestamp={timestamp}
            />
          );
        })}
      </div>
      <form onSubmit={handleSend} className="mx-auto mt-auto pb-12 pt-4 flex w-full max-w-md items-center space-x-2 px-4 md:px-0">
        <Input
          type="text"
          placeholder="tell me something interesting."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button type="submit">send</Button>
      </form>
    </div>
  )
}

export default App
