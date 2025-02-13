import React from 'react';
import { motion } from 'framer-motion';

const SearchResults = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  // Function to convert asterisk text to bold
  const convertAsteriskToBold = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, index) => {
      // Even indices are normal text, odd indices are bold
      return index % 2 === 0 ? 
        part : 
        <strong 
          key={index} 
          className="font-extrabold bg-gradient-to-r from-accent-blue-400 via-primary-400 to-accent-purple-400 
                     text-transparent bg-clip-text px-1 tracking-wider scale-105 inline-block
                     hover:from-accent-blue-300 hover:via-primary-300 hover:to-accent-purple-300 
                     transition-all duration-300 ease-in-out"
        >
          {part}
        </strong>
    });
  };

  // Function to check if a source has been successfully summarized
  const hasSummary = (source) => {
    return source.status === 'success' && source.summary;
  };

  // Function to ensure URL is properly formatted
  const formatUrl = (url) => {
    if (!url) return '';
    // If URL doesn't start with http:// or https://, add https://
    if (!url.match(/^https?:\/\//i)) {
      return `https://${url}`;
    }
    return url;
  };

  // Function to handle URL click
  const handleUrlClick = (url, e) => {
    e.preventDefault();
    const formattedUrl = formatUrl(url);
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {[...sources]
        .sort((a, b) => {
          const aHasSummary = hasSummary(a);
          const bHasSummary = hasSummary(b);
          if (aHasSummary === bHasSummary) return 0;
          return aHasSummary ? -1 : 1;
        })
        .map((source, index) => {
        const summarized = hasSummary(source);
        return (
          <motion.div
            key={index}
            variants={item}
            className={`rounded-xl overflow-hidden border ${
              summarized
                ? 'border-dark-600 bg-dark-800/50'
                : 'border-red-500/20 bg-red-500/5'
            }`}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {source.url ? (
                    <a
                      href={formatUrl(source.url)}
                      onClick={(e) => handleUrlClick(source.url, e)}
                      className="block group"
                    >
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        {summarized ? (
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        )}
                        <span className="text-accent-blue-300 hover:text-accent-blue-200 transition-colors">
                          {source.title || 'Untitled'}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 whitespace-nowrap">
                          {summarized ? 'Summarized' : 'Unable to Summarize'}
                        </span>
                      </h3>
                      <span className="text-sm text-gray-400 hover:text-gray-300 transition-colors mt-1 inline-block">
                        {formatUrl(source.url)}
                      </span>
                    </a>
                  ) : (
                    <>
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        {summarized ? (
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        )}
                        <span className="text-accent-blue-300 hover:text-accent-blue-200 transition-colors">
                          {source.title || 'Untitled'}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 whitespace-nowrap">
                          {summarized ? 'Summarized' : 'Unable to Summarize'}
                        </span>
                      </h3>
                    </>
                  )}
                </div>
                <div className="ml-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        summarized
                          ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {summarized ? 'success' : 'failed'}
                    </span>
                    {summarized && !source.summary && (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        No Summary
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              {summarized ? (
                <div className="space-y-3">
                  {source.summary && (
                    <div className="bg-dark-900/50 rounded-lg p-4">
                      <div className="text-lg font-medium text-primary-300 mb-3">Summary</div>
                      <div className="text-gray-300 text-lg leading-loose tracking-wide font-normal">
                        {convertAsteriskToBold(source.summary)}
                      </div>
                    </div>
                  )}

                  {source.key_points && source.key_points.length > 0 && (
                    <div className="bg-dark-900/50 rounded-lg p-4">
                      <div className="text-lg font-medium text-primary-300 mb-3">Key Points</div>
                      <ul className="space-y-3">
                        {source.key_points.map((point, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start text-lg"
                          >
                            <span className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-300 leading-loose tracking-wide font-normal">
                              {convertAsteriskToBold(point)}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {source.snippet && (
                    <div className="bg-dark-900/50 rounded-lg p-4">
                      <div className="text-lg font-medium text-primary-300 mb-3">Relevant Snippet</div>
                      <div className="text-gray-400 text-lg italic leading-loose tracking-wide font-normal">
                        "{convertAsteriskToBold(source.snippet)}"
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/10">
                  <div className="text-red-400 text-lg leading-relaxed">
                    {source.error || 'Failed to process this source'}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-dark-700 bg-dark-900/30 px-4 py-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date().toLocaleDateString()}
                  </span>
                  {summarized && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
                <button className="text-primary-400 hover:text-primary-300 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SearchResults;