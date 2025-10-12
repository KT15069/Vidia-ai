
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import { useResponsive } from '../../hooks/useResponsive';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useResponsive();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-neutral-900 dark:text-neutral-100 flex">
      {isMobile ? (
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 z-20"
                onClick={toggleSidebar}
                aria-hidden="true"
              />
              <Sidebar isCollapsed={false} />
            </>
          )}
        </AnimatePresence>
      ) : (
        <Sidebar isCollapsed={isSidebarCollapsed} />
      )}
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!isMobile ? (isSidebarCollapsed ? 'ml-20' : 'ml-64') : ''}`}>
        <Header 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          toggleSidebarCollapse={toggleSidebarCollapse}
        />
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 ${isMobile ? 'pb-24' : ''}`}>
          {children}
        </main>
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default MainLayout;