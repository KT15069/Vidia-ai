import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AnimatedPage from '../components/ui/AnimatedPage';
import MediaCard from '../components/ui/MediaCard';
import TextCard from '../components/ui/TextCard';
import { useGeneration } from '../context/GenerationContext';
import { staggerContainer } from '../utils/animations';
import { SparklesIcon } from '../components/icons/Icons';

type FilterType = 'All' | 'Image' | 'Video' | 'Text';

const GenerationsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All');
  const { items, loading } = useGeneration();
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  const pageTitle = isFavoritesPage ? 'Favorites' : 'Assets';
  const pageDescription = isFavoritesPage 
    ? 'Browse your collection of favorited visuals.' 
    : 'Browse and manage all your created visuals.';

  const sourceItems = isFavoritesPage 
    ? items.filter(item => item.isFavorite)
    : items;

  const filteredItems = sourceItems.filter(item => {
    if (filter === 'All') return true;
    return item.type === filter;
  });

  return (
    <AnimatedPage>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">{pageTitle}</h1>
        <p className="text-neutral-500 dark:text-neutral-400">{pageDescription}</p>
      </div>
      
      <div className="flex items-center gap-2 mb-8">
        {(['All', 'Image', 'Video', 'Text'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === f 
              ? 'bg-black dark:bg-white text-white dark:text-black' 
              : 'bg-light-card dark:bg-dark-card hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-neutral-500">
            <SparklesIcon className="w-10 h-10 mx-auto animate-pulse" />
            <p className="mt-4">Loading...</p>
        </div>
      ) : filteredItems.length > 0 ? (
        <motion.div
            key={`${isFavoritesPage}-${filter}`} // Re-trigger animation on filter/page change
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto space-y-6"
        >
            {filteredItems.map((item) => (
              item.type === 'Text'
              ? <TextCard key={item.id} item={item} />
              : <MediaCard key={item.id} item={item} />
            ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {isFavoritesPage ? 'No favorites yet!' : 'No assets yet!'}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">
              {isFavoritesPage 
                ? 'Click the star icon on any image or video to add it here.'
                : 'Use the prompt bar at the bottom to create your first visual.'}
            </p>
        </div>
      )}
    </AnimatedPage>
  );
};

export default GenerationsPage;