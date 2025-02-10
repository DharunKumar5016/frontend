const Message = ({ message, onStartChat }) => {
    const { type, content, sources, details, metadata } = message

    const handleStartChat = () => {
        if (onStartChat) {
            // Include both the main content and source summaries in the chat context
            const chatContext = {
                mainSummary: content,
                sources: sources ? sources.map(s => ({
                    title: s.title,
                    url: s.url,
                    summary: s.status === 'success' ? s.summary : null
                })) : []
            }
            onStartChat(chatContext)
        }
    }

    return (
        <div className={`p-4 rounded-lg ${
            type === 'user' 
                ? 'bg-blue-100 ml-12' 
                : type === 'error'
                ? 'bg-red-100'
                : 'bg-gray-100 mr-12'
        }`}>
            <div className="font-medium mb-1">
                {type === 'user' ? 'You' : type === 'error' ? 'Error' : 'Assistant'}
            </div>
            <div className="text-gray-700 whitespace-pre-wrap">{content}</div>
            
            {details && (
                <div className="mt-2 text-sm text-gray-600">
                    {details}
                </div>
            )}

            {sources && sources.length > 0 && (
                <div className="mt-4">
                    <div className="font-medium mb-2">Sources:</div>
                    {sources.map((source, index) => (
                        <div key={index} className="mb-4">
                            <a 
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {source.title}
                            </a>
                            {source.status === 'success' && (
                                <div className="mt-2 text-sm text-gray-600">
                                    {source.summary}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {metadata && (
                <div className="mt-2 text-sm text-gray-500">
                    <div>Sources processed: {metadata.successful_summaries} of {metadata.total_sources}</div>
                </div>
            )}

            {type === 'assistant' && (
                <div className="mt-4">
                    <button
                        onClick={handleStartChat}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Start Chat Session
                    </button>
                </div>
            )}
        </div>
    )
}

export default Message