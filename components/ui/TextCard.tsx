import React from 'react';
import { motion } from 'framer-motion';
import type { MediaItem } from '../../types';
import { cardFadeIn } from '../../utils/animations';
import { MessageSquareIcon } from '../icons/Icons';

interface TextCardProps {
  item: MediaItem;
}

const TextCard: React.FC<TextCardProps> = ({ item }) => {
  const textContent = item.url.startsWith('text:') ? item.url.substring(5) : item.url;

  return (
    <motion.div
      variants={cardFadeIn}
      className="group relative block overflow-hidden rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4 break-inside-avoid"
    >
      <div className="flex items-start gap-3 mb-2">
        <MessageSquareIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 mt-1 flex-shrink-0" />
        <div>
            <p className="text-sm font-semibold text-black dark:text-white line-clamp-3">{item.prompt}</p>
        </div>
      </div>
      <pre className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap font-sans bg-light-bg dark:bg-dark-bg p-3 rounded-lg overflow-x-auto">
        <code>{textContent}</code>
      </pre>
    </motion.div>
  );
};

export default TextCard;
