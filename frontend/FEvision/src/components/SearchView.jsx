import React from 'react';
import SearchResults from './SearchResults';
import Message from './Message';

const SearchView = ({ messages, isLoading }) => {
    // Find the last message with sources
    const lastSearchResult = [...messages].reverse().find(
        msg => msg.type === 'assistant' && msg.sources
    );

    return (
        <div className="space-y-6">
            {/* Show search results if available */}
            {lastSearchResult && lastSearchResult.sources && (
                <div className="mb-6">
                    <SearchResults sources={lastSearchResult.sources} />
                </div>
            )}

            {/* Show all messages */}
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
                {isLoading && (
                    <div className="flex justify-center">
                        <div className="loader">Loading...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchView;
