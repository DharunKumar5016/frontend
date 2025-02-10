import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import ChatPage from './components/ChatPage'
import './App.css'

function App() {
  const [chatState, setChatState] = useState({
    isInChat: false,
    chatContent: null
  })

  const handleStartChat = (content) => {
    setChatState({
      isInChat: true,
      chatContent: content
    })
  }

  const handleBackToSearch = () => {
    setChatState({
      isInChat: false,
      chatContent: null
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Visionary AI Assistant
        </h1>
        {chatState.isInChat ? (
          <ChatPage 
            initialContent={chatState.chatContent}
            onBack={handleBackToSearch}
          />
        ) : (
          <ChatInterface onStartChat={handleStartChat} />
        )}
      </div>
    </div>
  )
}

export default App