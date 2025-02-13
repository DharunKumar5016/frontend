import { useState } from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        className="bg-dark-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-700/20"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="text-primary-400 mb-4 text-2xl">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
);

const HomePage = ({ onStartSearch }) => {
    const [isHovered, setIsHovered] = useState(false);

    const features = [
        {
            icon: "🔍",
            title: "Smart Search",
            description: "Powerful search capabilities enhanced by AI to find exactly what you need."
        },
        {
            icon: "💡",
            title: "Intelligent Summaries",
            description: "Get concise, relevant summaries of search results powered by advanced NLP."
        },
        {
            icon: "💬",
            title: "Interactive Chat",
            description: "Engage in meaningful conversations about your search results with our AI assistant."
        },
        {
            icon: "📊",
            title: "Visual Insights",
            description: "Visualize connections and patterns in your search results for better understanding."
        }
    ];

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Discover Insights with{" "}
                        <span className="text-primary-400">Visionary</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
                        Transform your search experience with AI-powered insights, intelligent summaries,
                        and interactive conversations.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={onStartSearch}
                        className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold 
                                 hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300
                                 transform hover:scale-105 hover:shadow-primary-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        Start Exploring
                        <span className="ml-2">→</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Powerful Features for Enhanced Search
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Experience a new way of searching and understanding information with our
                        cutting-edge features.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                        >
                            <FeatureCard {...feature} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-dark-700">
                <div className="text-center text-gray-500">
                    <p> 2025 Visionary. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
