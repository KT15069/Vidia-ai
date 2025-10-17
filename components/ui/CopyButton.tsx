import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyIcon, CheckIcon } from '../icons/Icons';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -90 },
    visible: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0.5, opacity: 0, rotate: 90 },
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white transition-colors duration-300 hover:bg-black/60 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="Copy to clipboard"
      disabled={isCopied}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCopied ? (
          <motion.div
            key="check"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="text-green-400"
          >
            <CheckIcon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <CopyIcon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CopyButton;
