import Header from './components/header'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { ChatBubble } from './components/chat-bubble'
import { useState } from 'react'
import { sendMessage } from './api/groq-chat'


function App() {
  const [inputValue, setInputValue] = useState('');

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(inputValue)
    setInputValue('')
    await sendMessage('hey')
  }

  return (
    <div className="flex flex-col h-screen items-center">
      <Header />
      <div className="flex flex-col flex-grow overflow-y-auto w-4/5 border border-black">
        <ChatBubble
          message="Hello, I'm a chatbot. How can I help you today?"
          sender="ai"
          timestamp="12:34 PM"
        />
        <ChatBubble
          message="I'm looking for a new job."
          sender="user"
          timestamp="12:35 PM"
        />
        <ChatBubble
          message="What kind of job are you looking for?"
          sender="ai"
          timestamp="12:36 PM"
        />
        <ChatBubble
          message="I'm looking for a remote job as a software engineer."
          sender="user"
          timestamp="12:37 PM"
        />
        <ChatBubble
          message="Great! I can help you with that. Can you tell me more about your experience?"
          sender="ai"
          timestamp="12:38 PM"
        />
        <ChatBubble
          message="I have 5 years of experience working as a full-stack developer."
          sender="user"
          timestamp="12:39 PM"
        />
        <ChatBubble
          message="That's great! Do you have a resume or a portfolio that you can share with me?"
          sender="ai"
          timestamp="12:40 PM"
        />
      </div>
      <form onSubmit={handleSend} className="border-4 border-red-500 mx-auto mt-auto pb-12 flex w-full max-w-sm items-center space-x-2">
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
