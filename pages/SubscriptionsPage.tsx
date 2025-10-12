import React from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/ui/AnimatedPage';
import SubscriptionCard from '../components/ui/SubscriptionCard';
import { SUBSCRIPTION_PLANS } from '../constants';
import { staggerContainer } from '../utils/animations';

const SubscriptionsPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-3 tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Unlock more creative power. Upgrade your plan to generate more visuals and get access to exclusive features.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {SUBSCRIPTION_PLANS.map((plan) => (
          <SubscriptionCard key={plan.name} plan={plan} />
        ))}
      </motion.div>
    </AnimatedPage>
  );
};

export default SubscriptionsPage;