import { motion } from 'framer-motion';

const Navigation = ({ onBack, title, showLogo = true }) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between py-4 relative">
                <div className="flex items-center space-x-4">
                    <motion.button
                        onClick={onBack}
                        className="group flex items-center space-x-2 bg-dark-800/80 hover:bg-dark-700 
                                 px-4 py-2 rounded-xl border border-dark-700 hover:border-primary-500/30
                                 transition-all duration-300"
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-primary-400 group-hover:text-primary-300 transform transition-transform duration-300 group-hover:-translate-x-1">
                            ←
                        </span>
                        <span className="text-gray-300 group-hover:text-white">Back</span>
                    </motion.button>
                    
                    {showLogo && (
                        <div className="flex items-center space-x-3 px-4">
                            <div className="h-6 w-px bg-dark-700" />
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-2"
                            >
                                <span className="text-2xl">🔮</span>
                                <span className="text-white font-semibold">Visionary</span>
                            </motion.div>
                        </div>
                    )}
                </div>

                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
                    >
                        <h1 className="text-xl font-semibold text-white">{title}</h1>
                    </motion.div>
                )}

                <div className="flex items-center space-x-4">
                    <motion.button
                        className="bg-dark-800/80 hover:bg-dark-700 p-2 rounded-lg border border-dark-700 
                                 hover:border-primary-500/30 transition-all duration-300 group"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 text-primary-400 group-hover:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </motion.button>
                    <motion.button
                        className="bg-dark-800/80 hover:bg-dark-700 p-2 rounded-lg border border-dark-700 
                                 hover:border-primary-500/30 transition-all duration-300 group"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 text-primary-400 group-hover:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
