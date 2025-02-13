import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Message = ({ type, content, sources, suggestions, isSummarized, onSuggestionClick }) => {
  const getIcon = () => {
    switch(type) {
      case 'user':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'assistant':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-4"
      >
        <div className="max-w-[80%]">
          <div className="bg-gradient-to-br from-accent-blue-400 to-accent-purple-500 text-white rounded-2xl rounded-tr-sm px-6 py-4 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-shine opacity-10 animate-gradient-x"></div>
            <div className="relative">
              <div className="font-medium text-sm opacity-90 mb-1 flex items-center">
                <span className="mr-2">You</span>
                <span className="w-2 h-2 rounded-full bg-accent-blue-300"></span>
              </div>
              <div className="text-[15px] leading-relaxed">{content}</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'assistant') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex mb-4"
      >
        <div className="max-w-[80%]">
          <div className="bg-dark-700 text-gray-100 rounded-2xl rounded-tl-sm px-6 py-4 shadow-lg">
            <div className="font-medium text-sm opacity-90 mb-1 flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 bg-gradient-to-r from-primary-300 to-accent-purple-300 text-transparent bg-clip-text">Assistant</span>
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-accent-purple-400"></span>
              </div>
              {isSummarized !== undefined && (
                <span className={`text-xs px-2 py-1 rounded ${isSummarized ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {isSummarized ? 'Summarized' : 'Unable to Summarize'}
                </span>
              )}
            </div>
            <div className="prose prose-invert max-w-none text-base space-y-6">
              <ReactMarkdown
                components={{
                  a: ({node, href, children}) => (
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-blue-400 hover:text-accent-blue-300 underline"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(href, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      {children}
                    </a>
                  ),
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-primary-300 mb-8 mt-6" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-accent-teal-300 mt-8 mb-6" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-medium text-accent-blue-300 mt-6 mb-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 my-6 text-base leading-relaxed" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-200 text-base leading-relaxed pl-4" {...props} />,
                  p: ({node, ...props}) => {
                    // Replace text between asterisks with bold tags
                    const text = props.children;
                    if (typeof text === 'string') {
                      const parts = text.split(/\*(.*?)\*/g);
                      return (
                        <p className="text-gray-300 leading-loose mb-6 text-base tracking-wide">
                          {parts.map((part, index) => {
                            // Even indices are normal text, odd indices are bold
                            return index % 2 === 0 ? 
                              part : 
                              <strong key={index} className="font-bold text-accent-purple-300 text-base">{part}</strong>
                          })}
                        </p>
                      );
                    }
                    return <p className="text-gray-300 leading-loose mb-6 text-base tracking-wide" {...props} />;
                  },
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-primary-400 pl-6 my-8 py-2 text-gray-400 italic text-base leading-relaxed" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
            {sources && sources.length > 0 && (



  <div className="mt-8 pt-8 border-t border-dark-600">
    <div className="text-lg font-medium text-accent-teal-300 mb-6">Sources:</div>
    <div className="space-y-8">
      {sources.map((source, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}

          className="bg-dark-800/50 rounded-xl p-8 text-base border border-dark-600 shadow-lg"
        >







          {/* Header Section */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-dark-500">
            <h3 className="font-semibold text-accent-blue-300 text-xl">
              {source.title}
            </h3>
            <div className="flex gap-3">

              <span className="px-4 py-1.5 text-sm rounded-full bg-accent-purple-500/20 text-accent-purple-300">
                {new URL(source.url).hostname.replace('www.', '')}
              </span>

              <span className={`px-4 py-1.5 text-sm rounded-full ${
                source.status === 'success'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {source.status === 'success' ? 'Summarized' : 'Not Summarized'}
              </span>
            </div>
          </div>


          {/* Content Sections */}
          {source.status === 'success' ? (
            <div className="prose prose-invert max-w-none">
              {/* Introduction Section */}
              {source.summary ? (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-accent-teal-300 mb-4">Introduction</h4>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {source.summary.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-base">{paragraph}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-accent-teal-300 mb-4">Preview</h4>
                  <div className="text-gray-300 leading-relaxed">
                    <p className="text-base">{source.snippet}</p>
                  </div>
                </div>
              )}

              {/* Key Points Section */}
              {source.key_points && source.key_points.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-accent-teal-300 mb-4">Key Points</h4>
                  <ul className="space-y-4">
                    {source.key_points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className="text-accent-purple-300 mt-1">•</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections with Headers */}
              {['Components', 'Applications', 'Advantages', 'Challenges'].map((section) => (
                <div key={section} className="mb-8">
                  <h4 className="text-lg font-semibold text-accent-teal-300 mb-4">{section}</h4>
                  <ul className="space-y-3">
                    {source[section.toLowerCase()]?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className="text-accent-purple-300 mt-1">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-8">
              <div className="text-gray-300 leading-relaxed">
                <p className="text-base">{source.snippet}</p>
              </div>
            </div>
          )}








          {/* Source Link */}

          <div className="mt-6 pt-4 border-t border-dark-500">
            <a 
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"

              className="inline-flex items-center gap-2 text-accent-blue-400 hover:text-accent-blue-300 transition-colors"
            >


              View Original Source
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)}
            {suggestions && suggestions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-dark-600">
                <div className="text-sm font-medium text-accent-teal-300 mb-2">Suggested questions:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
                      className="px-3 py-1.5 text-sm bg-dark-600 text-primary-300 rounded-full
                               hover:bg-dark-500 transition-colors duration-200 border border-dark-500
                               hover:border-primary-500/30 hover:text-primary-200"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex mb-4"
      >
        <div className="max-w-[80%]">
          <div className="bg-red-900/30 text-red-200 rounded-2xl px-6 py-4 shadow-lg border border-red-900/50">
            <div className="font-medium text-sm text-red-300 mb-1 flex items-center">
              <span className="mr-2">Error</span>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            </div>
            <div className="text-[15px]">{content}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default Message;