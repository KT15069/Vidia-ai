import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { bottomNavVariants } from '../../utils/animations';
import type { NavItemType } from '../../types';

const BottomNavItem: React.FC<{ item: NavItemType }> = ({ item }) => (
    <NavLink
        to={item.path}
        className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 text-xs w-16 ${
            isActive
                ? 'text-black dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`
        }
    >
        <item.icon className="w-6 h-6" />
        <span>{item.name}</span>
    </NavLink>
);

const BottomNav: React.FC = () => {
    // Only show the first 5 items for a clean mobile nav
    const mobileNavItems = NAV_ITEMS.slice(0, 5);

    return (
        <motion.div
            variants={bottomNavVariants}
            initial="hidden"
            animate="visible"
            className="fixed bottom-0 left-0 right-0 h-20 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-t border-light-border dark:border-dark-border z-30"
        >
            <nav className="flex justify-around items-center h-full">
                {mobileNavItems.map((item) => (
                    <BottomNavItem key={item.name} item={item} />
                ))}
            </nav>
        </motion.div>
    );
};

export default BottomNav;