import { useState } from 'react'

const SearchInput = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isLoading && input.trim()) {
      onSearch(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
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
          {isLoading ? 'Processing...' : 'Send'}
        </button>
      </div>
    </form>
  )
}

export default SearchInput
