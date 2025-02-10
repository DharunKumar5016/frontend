import { useState } from 'react'

const ChatInput = ({ onSend, isLoading }) => {
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isLoading && message.trim()) {
            onSend(message)
            setMessage('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
                        isLoading 
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-600'
                    }`}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </form>
    )
}

export default ChatInput
