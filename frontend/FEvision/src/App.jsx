import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatInterface from './components/ChatInterface'
import ChatPage from './components/ChatPage'
import HomePage from './components/HomePage'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  const [appState, setAppState] = useState({
    currentView: 'home', // 'home', 'search', 'chat'
    chatContent: null
  })

  const handleStartSearch = () => {
    setAppState({
      currentView: 'search',
      chatContent: null
    })
  }

  const handleStartChat = (content) => {
    setAppState({
      currentView: 'chat',
      chatContent: content
    })
  }

  const handleBackToSearch = () => {
    setAppState({
      currentView: 'search',
      chatContent: null
    })
  }

  const handleBackToHome = () => {
    setAppState({
      currentView: 'home',
      chatContent: null
    })
  }

  const renderContent = () => {
    switch (appState.currentView) {
      case 'home':
        return <HomePage onStartSearch={handleStartSearch} />;
      case 'search':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl"
          >
            <div className="bg-dark-800 rounded-2xl shadow-xl border border-dark-700 overflow-hidden">
              <div className="border-b border-dark-700">
                <div className="px-6">
                  <Navigation onBack={handleBackToHome} title="Search" />
                </div>
              </div>
              <div className="p-6">
                <ChatInterface onStartChat={handleStartChat} />
              </div>
            </div>
          </motion.div>
        );
      case 'chat':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl"
          >
            <ChatPage 
              initialContent={appState.chatContent}
              onBack={handleBackToSearch}
            />
          </motion.div>
        );
      default:
        return <HomePage onStartSearch={handleStartSearch} />;
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  )
}

export default App