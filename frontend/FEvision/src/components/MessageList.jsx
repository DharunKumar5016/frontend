import Message from './Message'

const MessageList = ({ messages, onStartChat, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          onStartChat={onStartChat}
        />
      ))}
      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  )
}

export default MessageList