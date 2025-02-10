import { useState, useRef, useEffect } from 'react'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

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
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: message,
                    content: initialContent.mainSummary + '\n\n' + 
                            initialContent.sources
                                .filter(s => s.summary)
                                .map(s => `Source: ${s.title}\n${s.summary}`)
                                .join('\n\n')
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response')
            }

            setMessages(prev => [...prev, {
                type: 'assistant',
                content: data.answer,
                metadata: data.metadata
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
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
            <div className="bg-gray-100 p-4 flex items-center">
                <button
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800 mr-4"
                >
                    ← Back to Search
                </button>
                <h2 className="text-lg font-semibold">Chat Session</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages 
                    messages={messages}
                    isLoading={isLoading}
                />
                <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t">
                <ChatInput 
                    onSend={handleSendMessage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default ChatPage