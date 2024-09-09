import Header from './components/header'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'


function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="mx-auto mt-auto mb-12 flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="tell me something interesting." />
        <Button type="submit">Send</Button>
      </div>
    </div>
  )
}

export default App
