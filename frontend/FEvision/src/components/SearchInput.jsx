import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SearchInput = ({ onSearch, onNormalChat }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('chat'); // 'chat' or 'search'
    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        setIsLoading(true);
        try {
            if (mode === 'search') {
                await onSearch(message);
            } else {
                // Chat mode
                await onNormalChat({
                    message: message,
                    mode: 'chat'
                });
            }
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-4">
                <div className="bg-dark-800 rounded-xl p-1 flex space-x-1">
                    <motion.button
                        type="button"
                        onClick={() => setMode('chat')}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                            mode === 'chat'
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Chat
                    </motion.button>
                    <motion.button
                        type="button"
                        onClick={() => setMode('search')}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                            mode === 'search'
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Search
                    </motion.button>
                </div>
            </div>

            <div className="relative">
                <div className="relative flex items-center">
                    <textarea
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={mode === 'search' ? "Enter your search query..." : "Enter your message..."}
                        className="w-full bg-dark-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-16
                                border border-dark-700 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 
                                shadow-sm resize-none h-[52px] max-h-32 overflow-y-auto
                                focus:outline-none transition-all duration-200"
                        style={{ minHeight: '52px' }}
                    />
                    <div className="absolute right-2 flex items-center space-x-2">
                        {/* Send/Search Button */}
                        <motion.button
                            type="submit"
                            disabled={!message.trim() || isLoading}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                message.trim() && !isLoading
                                    ? 'text-primary-400 hover:text-primary-300 hover:bg-dark-700'
                                    : 'text-gray-600 cursor-not-allowed'
                            }`}
                            whileHover={message.trim() && !isLoading ? { scale: 1.1 } : {}}
                            whileTap={message.trim() && !isLoading ? { scale: 0.9 } : {}}
                        >
                            {mode === 'search' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Helper text */}
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                    <span>Press</span>
                    <kbd className="px-2 py-1 bg-dark-700 rounded-md">Enter</kbd>
                    <span>to {mode === 'search' ? 'search' : 'send'}</span>
                </div>
            </div>
        </form>
    );
};

export default SearchInput;
