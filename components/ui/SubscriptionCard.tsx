import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { cardFadeIn } from '../../utils/animations';
// FIX: Import CheckCircleIcon from the icons file and remove the local definition.
import { CheckCircleIcon } from '../icons/Icons';

interface SubscriptionPlan {
  name: string;
  price: number;
  features: string[];
  cta: string;
  isPopular?: boolean;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan }) => {
  return (
    <motion.div
      variants={cardFadeIn}
      className={`relative flex flex-col p-8 bg-light-card dark:bg-dark-card border rounded-2xl shadow-lg
        ${plan.isPopular ? 'border-indigo-500' : 'border-light-border dark:border-dark-border'}`
      }
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-semibold text-white bg-indigo-500 rounded-full shadow-md">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-semibold text-black dark:text-white">{plan.name}</h3>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        {plan.name === 'FREE' ? 'For casual creators' : `For professional creators`}
      </p>

      <div className="mt-6">
        <span className="text-5xl font-extrabold text-black dark:text-white">₹{plan.price}</span>
        <span className="text-lg font-medium text-neutral-500 dark:text-neutral-400">/mo</span>
      </div>

      <ul className="mt-8 space-y-4 text-neutral-600 dark:text-neutral-300 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircleIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        variant={plan.isPopular ? 'primary' : 'secondary'}
        className="w-full mt-10 !py-3"
        disabled={plan.name === 'FREE'}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
};

export default SubscriptionCard;
