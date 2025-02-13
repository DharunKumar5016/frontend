import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import SearchResults from './SearchResults'
import Navigation from './Navigation'

const ChatPage = ({ initialContent, onBack }) => {
    const [messages, setMessages] = useState([
        { 
            type: 'system', 
            content: 'This is a chat session based on the previous summary. Feel free to ask questions.' 
        },
        { 
            type: 'assistant', 
            content: initialContent.mainSummary,
            sources: initialContent.sources
        }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (message) => {
        if (!message.trim()) return

        setIsLoading(true)
        setMessages(prev => [...prev, { type: 'user', content: message }])

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    context: {
                        content: initialContent.mainSummary,
                        sources: initialContent.sources
                            .filter(s => s.status === 'success')
                            .map(s => `Source: ${s.title}\n${s.summary}`)
                            .join('\n\n')
                    }
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response')
            }

            setMessages(prev => [...prev, {
                type: 'assistant',
                content: data.response,
                suggestions: data.suggestions
            }])
        } catch (error) {
            setMessages(prev => [...prev, {
                type: 'error',
                content: error.message
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-dark-800 rounded-2xl shadow-xl border border-dark-700 overflow-hidden">
            {/* Header */}
            <div className="bg-dark-900/50 border-b border-dark-700">
                <div className="px-6">
                    <Navigation onBack={onBack} title="Chat Session" />
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-700 scrollbar-track-dark-900/50">
                <div className="max-w-4xl mx-auto w-full">
                    {/* Search Results Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-6 py-4"
                    >
                        <div className="bg-dark-900/50 rounded-xl shadow-lg p-6 mb-6 border border-dark-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <span className="text-primary-400 mr-2">📊</span>
                                    Search Results
                                </h3>
                                <button className="text-primary-400 hover:text-primary-300 transition-colors text-sm">
                                    Minimize
                                </button>
                            </div>
                            <SearchResults sources={initialContent.sources} />
                        </div>
                    </motion.div>
                    
                    {/* Chat Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-6 pb-4"
                    >
                        <div className="border-t border-dark-700 pt-4">
                            <div className="flex items-center mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <span className="text-primary-400 mr-2">💬</span>
                                    Chat
                                </h3>
                                <div className="ml-4 flex items-center space-x-2">
                                    <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-primary-400 animate-pulse' : 'bg-primary-400'}`} />
                                    <span className="text-sm text-gray-400">
                                        {isLoading ? 'Thinking...' : 'Ready'}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <AnimatePresence>
                                    <ChatMessages 
                                        messages={messages}
                                        isLoading={isLoading}
                                    />
                                </AnimatePresence>
                            </div>
                        </div>
                        <div ref={messagesEndRef} />
                    </motion.div>
                </div>
            </div>
            
            {/* Input Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-dark-700 bg-dark-900/50"
            >
                <div className="max-w-4xl mx-auto w-full px-6 py-4">
                    <ChatInput 
                        onSend={handleSendMessage}
                        isLoading={isLoading}
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default ChatPage