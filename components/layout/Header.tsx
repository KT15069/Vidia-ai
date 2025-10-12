import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, LogoIcon, MenuIcon, XIcon } from '../icons/Icons';
import ThemeToggle from '../ui/ThemeToggle';
import { useResponsive } from '../../hooks/useResponsive';

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
    toggleSidebarCollapse: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen, toggleSidebarCollapse }) => {
    const { isMobile } = useResponsive();

    const renderMobileHeader = () => (
        <>
            <div className="flex items-center gap-2">
                <button onClick={toggleSidebar} className="p-2 -ml-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white" aria-label="Toggle menu">
                        <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={isSidebarOpen ? 'x' : 'menu'}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </div>
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                <LogoIcon className="w-8 h-8 text-black dark:text-white" />
                <h1 className="text-xl font-bold text-black dark:text-white">Vidia</h1>
            </div>
        </>
    );
    
    const renderDesktopHeader = () => (
        <button onClick={toggleSidebarCollapse} className="p-2 -ml-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white" aria-label="Collapse menu">
             <MenuIcon className="w-6 h-6" />
        </button>
    );


    return (
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-light-border dark:border-dark-border">
            {isMobile ? renderMobileHeader() : renderDesktopHeader()}
            
            <div className="flex items-center gap-2 ml-auto">
                <ThemeToggle />
                <Link to="/profile">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-light-card dark:bg-dark-card rounded-full flex items-center justify-center border border-light-border dark:border-dark-border"
                    >
                         <UserIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </motion.div>
                </Link>
            </div>
        </header>
    );
};

export default Header;