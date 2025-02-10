import { useState, useRef, useEffect } from 'react'
import MessageList from './MessageList'
import SearchInput from './SearchInput'

const ChatInterface = ({ onStartChat }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSearch = async (query) => {
    if (!query.trim()) return

    setIsLoading(true)
    setMessages(prev => [...prev, { type: 'user', content: query }])

    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`)
      }

      const summaryMessage = {
        type: 'assistant',
        content: data.cumulative_summary || 'No cumulative summary available.',
        sources: data.sources,
        metadata: data.metadata
      }

      setMessages(prev => [...prev, summaryMessage])
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'An error occurred while processing your request.',
        details: error.message
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-[600px] flex flex-col">
        <MessageList 
          messages={messages} 
          onStartChat={onStartChat}
          isLoading={isLoading}
        />
        <div ref={messagesEndRef} />
        <SearchInput 
          onSearch={handleSearch} 
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ChatInterface