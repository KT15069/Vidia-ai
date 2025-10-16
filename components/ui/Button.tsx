import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  children: React.ReactNode;
} & MotionProps;

// Props for when the component is rendered as a button (default)
type ButtonAsButton = BaseProps & { as?: 'button' } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

// Props for when the component is rendered as a div
type ButtonAsDiv = BaseProps & { as: 'div' } & Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>;

type ButtonProps = ButtonAsButton | ButtonAsDiv;


const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'primary', className = '' } = props;

  const baseClasses = 'px-6 py-3 font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg inline-block text-center cursor-pointer';

  const variantClasses = {
    primary: 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:ring-black dark:focus:ring-white',
    secondary: 'bg-light-card dark:bg-dark-card text-black dark:text-white border border-light-border dark:border-dark-border hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-indigo-500',
    ghost: 'bg-transparent text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 focus:ring-indigo-500'
  };

  const motionProps = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
  };
  
  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (props.as === 'div') {
      // FIX: Aliased destructured properties to avoid redeclaring variables that are already in scope.
      // This allows collecting the remaining valid div attributes into `divProps`.
      const { as: _as, variant: _variant, className: _className, children: _children, ...divProps } = props;
      return (
          <motion.div
              {...motionProps}
              className={combinedClassName}
              {...divProps}
          >
              {children}
          </motion.div>
      );
  }
  
  // FIX: Aliased destructured properties to avoid redeclaring variables that are already in scope.
  // This allows collecting the remaining valid button attributes into `buttonProps`.
  const { as: _as, variant: _variant, className: _className, children: _children, ...buttonProps } = props;
  return (
    <motion.button
      {...motionProps}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;