const ChatMessages = ({ messages, isLoading }) => {
    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg ${
                        message.type === 'user'
                            ? 'bg-dark-700 ml-12'
                            : message.type === 'error'
                            ? 'bg-red-900/50'
                            : message.type === 'system'
                            ? 'bg-dark-700/50 text-gray-400 text-sm'
                            : 'bg-dark-700/50 mr-12'
                    }`}
                >
                    <div className="font-medium mb-1 text-primary-400">
                        {message.type === 'user'
                            ? 'You'
                            : message.type === 'error'
                            ? 'Error'
                            : message.type === 'system'
                            ? 'System'
                            : 'Assistant'}
                    </div>
                    <div className="text-white whitespace-pre-wrap">
                        {message.content}
                    </div>
                    {message.metadata && (
                        <div className="mt-2 text-sm text-gray-500">
                            {message.metadata.confidence && (
                                <div>Confidence: {message.metadata.confidence}</div>
                            )}
                        </div>
                    )}
                    {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <div className="text-sm text-primary-400">Suggested follow-up questions:</div>
                            <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        className="px-3 py-1 text-sm bg-dark-600 text-primary-300 rounded-full
                                                 hover:bg-dark-500 transition-colors duration-200"
                                        onClick={() => {
                                            // You'll need to implement this
                                            console.log('Suggestion clicked:', suggestion);
                                        }}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-center space-x-2 p-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            )}
        </div>
    )
}

export default ChatMessages