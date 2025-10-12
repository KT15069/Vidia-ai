import React from 'react';
import { motion } from 'framer-motion';
import type { MediaItem } from '../../types';
import { cardFadeIn } from '../../utils/animations';
import { ImageIcon as ImgIcon, VideoIcon, StarIcon } from '../icons/Icons';
import { useGeneration } from '../../context/GenerationContext';

interface MediaCardProps {
  item: MediaItem;
}

const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  const { toggleFavorite } = useGeneration();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <motion.div
      variants={cardFadeIn}
      className="group relative block overflow-hidden rounded-2xl cursor-pointer"
    >
      <motion.img
        src={item.url}
        alt={item.prompt}
        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        width={400}
        height={400}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
        aria-label="Toggle favorite"
      >
        <StarIcon className={`w-5 h-5 transition-colors ${item.isFavorite ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-white'}`} />
      </button>

      <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2 mb-1">
          {item.type === 'Image' ? <ImgIcon className="w-4 h-4" /> : <VideoIcon className="w-4 h-4" />}
          <span className="text-sm font-semibold">{item.type}</span>
        </div>
        <p className="text-sm text-neutral-300 line-clamp-2">{item.prompt}</p>
      </div>
    </motion.div>
  );
};

export default MediaCard;