import Message from './Message'

const MessageList = ({ messages, onStartChat, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary-black min-h-[700px] max-h-[85vh] rounded-2xl">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          onStartChat={onStartChat}
        />
      ))}
      {isLoading && (
        <div className="flex items-center space-x-3 text-text-secondary">
          <div className="w-3 h-3 bg-text-secondary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  )
}

export default MessageList