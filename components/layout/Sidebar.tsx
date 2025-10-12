import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants';
import { sidebarVariants } from '../../utils/animations';
import { LogoIcon, UserIcon } from '../icons/Icons';
import type { NavItemType } from '../../types';

const NavItem: React.FC<{ item: NavItemType, isCollapsed: boolean }> = ({ item, isCollapsed }) => (
    <NavLink
        to={item.path}
        className={({ isActive }) =>
            `flex items-center gap-3 py-2.5 rounded-lg transition-colors duration-200 ${
            isCollapsed ? 'px-3 justify-center' : 'px-4'
            } ${
            isActive
                ? 'bg-neutral-200 dark:bg-white/10 text-black dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
            }`
        }
    >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
    </NavLink>
);

const profileNavItem: NavItemType = {
    path: '/profile',
    name: 'Profile',
    icon: UserIcon,
};

const Sidebar: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
    return (
        <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 left-0 h-full bg-light-card dark:bg-dark-card border-r border-light-border dark:border-dark-border flex flex-col p-4 z-30 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div className={`flex items-center gap-2 px-4 mb-8 ${isCollapsed ? '!px-0 justify-center' : ''}`}>
                <LogoIcon className="w-8 h-8 text-black dark:text-white flex-shrink-0" />
                {!isCollapsed && <h1 className="text-xl font-bold text-black dark:text-white">Vidia</h1>}
            </div>
            <nav className="flex-1 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                    <NavItem key={item.name} item={item} isCollapsed={isCollapsed} />
                ))}
            </nav>
            <div className="mt-auto">
                 <NavItem item={profileNavItem} isCollapsed={isCollapsed} />
            </div>
        </motion.aside>
    );
};

export default Sidebar;