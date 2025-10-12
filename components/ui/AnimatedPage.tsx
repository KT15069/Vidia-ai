
import React from 'react';
import { motion } from 'framer-motion';
import { fadeSlideUp } from '../../utils/animations';

const AnimatedPage: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={fadeSlideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
