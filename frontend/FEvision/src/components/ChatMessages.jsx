const ChatMessages = ({ messages, isLoading }) => {
    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg ${
                        message.type === 'user'
                            ? 'bg-blue-100 ml-12'
                            : message.type === 'error'
                            ? 'bg-red-100'
                            : message.type === 'system'
                            ? 'bg-gray-100 text-gray-600 text-sm'
                            : 'bg-gray-100 mr-12'
                    }`}
                >
                    <div className="font-medium mb-1">
                        {message.type === 'user'
                            ? 'You'
                            : message.type === 'error'
                            ? 'Error'
                            : message.type === 'system'
                            ? 'System'
                            : 'Assistant'}
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">
                        {message.content}
                    </div>
                    {message.metadata && (
                        <div className="mt-2 text-sm text-gray-500">
                            {message.metadata.confidence && (
                                <div>Confidence: {message.metadata.confidence}</div>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-center space-x-2 p-4">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            )}
        </div>
    )
}

export default ChatMessages
