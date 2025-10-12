import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

// FIX: Extend HTMLMotionProps<'button'> instead of React.ButtonHTMLAttributes to resolve type conflicts
// for props like `onAnimationStart` when they are spread onto a motion component.
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg';

  const variantClasses = {
    primary: 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:ring-black dark:focus:ring-white',
    secondary: 'bg-light-card dark:bg-dark-card text-black dark:text-white border border-light-border dark:border-dark-border hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-indigo-500',
    ghost: 'bg-transparent text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus:ring-indigo-500'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;