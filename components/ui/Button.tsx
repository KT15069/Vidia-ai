import React from 'react';
import { motion, MotionProps } from 'framer-motion';

// FIX: Corrected ButtonProps to properly include children and other HTML attributes.
// The previous type definition using React.ComponentProps<typeof motion.button> was failing to infer these props,
// leading to type errors. The new type explicitly combines React's button attributes with framer-motion's props for robust typing.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, MotionProps {
  variant?: 'primary' | 'secondary' | 'ghost';
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