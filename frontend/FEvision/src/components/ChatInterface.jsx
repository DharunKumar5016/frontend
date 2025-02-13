import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchInput from './SearchInput'
import Message from './Message'

const ChatInterface = ({ onStartChat }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSearch = async (query) => {
    setIsLoading(true)
    setError(null)

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
        throw new Error(data.error || 'Failed to search')
      }

      setMessages(prev => [...prev, 
        { type: 'user', content: query },
        { 
          type: 'assistant', 
          content: data.summary, 
          sources: data.sources,
          isSummarized: data.summary && data.summary.trim().length > 0
        }
      ])

      if (data.summary && data.sources) {
        onStartChat({
          mainSummary: data.summary,
          sources: data.sources
        })
      }

    } catch (err) {
      setError(err.message)
      setMessages(prev => [...prev, { type: 'error', content: err.message }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleNormalChat = async (chatData) => {
    console.log('Handling normal chat with data:', chatData);
    setIsLoading(true)
    setError(null)

    try {
      console.log('Sending request to chat endpoint...');
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: chatData.message,
          context: {}
        }),
      })

      const data = await response.json()
      console.log('Received response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      setMessages(prev => {
        console.log('Updating messages with:', {
          userMessage: chatData.message,
          response: data.response,
          suggestions: data.suggestions
        });
        return [...prev,
          { type: 'user', content: chatData.message },
          { 
            type: 'assistant', 
            content: data.response,
            suggestions: data.suggestions 
          }
        ];
      })

    } catch (err) {
      console.error('Error in handleNormalChat:', err);
      setError(err.message)
      setMessages(prev => [...prev, { type: 'error', content: err.message }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = async (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
    await handleNormalChat({ message: suggestion });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[700px] bg-gradient-to-br from-dark-900 via-dark-800 to-accent-purple-500/10 rounded-2xl shadow-2xl border border-dark-600 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-shine opacity-5 animate-gradient-x"></div>
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-dark-700 bg-dark-800/50 backdrop-blur-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary-300 via-accent-purple-300 to-accent-blue-300 text-transparent bg-clip-text">
              AI Assistant
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-dark-700/50 border border-dark-600 text-accent-teal-300">
              {messages.length} messages
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6 scroll-smooth scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800/30 relative z-10">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center px-4"
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-primary-500 via-accent-purple-400 to-accent-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-300 via-accent-purple-300 to-accent-blue-300 text-transparent bg-clip-text mb-2">
                Welcome to AI Assistant
              </h3>
              <p className="text-gray-400 max-w-md">
                Ask me anything! Use the search button for document analysis or just chat normally for general conversations.
              </p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <Message
                key={index}
                type={message.type}
                content={message.content}
                sources={message.sources}
                suggestions={message.suggestions}
                isSummarized={message.isSummarized}
                onSuggestionClick={handleSuggestionClick}
              />
            ))
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 px-4"
            >
              <div className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-accent-purple-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-accent-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-dark-700 bg-dark-800/50 backdrop-blur-sm relative z-10">
        <SearchInput 
          onSearch={handleSearch}
          onNormalChat={handleNormalChat}
          isLoading={isLoading}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-error-light flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ChatInterface