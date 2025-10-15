import React from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/ui/AnimatedPage';
import ChatInput from '../components/ui/ChatInput';
import { staggerContainer, cardFadeIn } from '../utils/animations';
import { MOCK_MEDIA_ITEMS } from '../constants';
import { useGeneration } from '../context/GenerationContext';
import MediaCard from '../components/ui/MediaCard';
import TextCard from '../components/ui/TextCard';
import { SparklesIcon } from '../components/icons/Icons';

const EmptyStateWithBackground: React.FC = () => (
    <div className="relative h-full overflow-hidden">
        {/* Background Grid */}
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 opacity-10 pointer-events-none"
        >
            {MOCK_MEDIA_ITEMS.map((item) => (
                <motion.img
                    key={item.id}
                    src={item.url}
                    alt={item.prompt}
                    className="w-full h-auto object-cover rounded-2xl"
                    variants={cardFadeIn}
                />
            ))}
        </motion.div>

        {/* Welcome message overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-light-bg via-light-bg/90 to-light-bg/50 dark:from-dark-bg dark:via-dark-bg/90 dark:to-dark-bg/50">
            <div className="text-center p-4">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-2xl font-bold text-black dark:text-white"
                >
                    Welcome!
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-2 text-neutral-500 dark:text-neutral-400"
                >
                    Your creative journey starts here. <br /> Use the prompt bar below to generate your first visual.
                </motion.p>
            </div>
        </div>
    </div>
);

const HomePage: React.FC = () => {
  const { items, loading, hasGeneratedThisSession } = useGeneration();

  return (
    <AnimatedPage className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto relative pb-36">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
              <SparklesIcon className="w-10 h-10 mx-auto animate-pulse" />
          </div>
        ) : (hasGeneratedThisSession && items.length > 0) ? (
          <motion.div
              key="generations-list"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 p-4 sm:p-6 lg:p-8"
          >
              {items.map((item) => (
                item.type === 'Text' 
                ? <TextCard key={item.id} item={item} />
                : <MediaCard key={item.id} item={item} />
              ))}
          </motion.div>
        ) : (
          <EmptyStateWithBackground />
        )}
      </div>
      <ChatInput />
    </AnimatedPage>
  );
};

export default HomePage;