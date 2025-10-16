
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import ChatInput from '../ui/ChatInput';
import { useResponsive } from '../../hooks/useResponsive';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useResponsive();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

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

      {isHomePage && (
        <div 
          className={`fixed bottom-0 right-0 z-20 transition-all duration-300
            ${isMobile 
              ? 'left-0 bottom-20' // On mobile, full width, above BottomNav
              : isSidebarCollapsed ? 'left-20' : 'left-64' // On desktop, respect sidebar
            }`
          }
        >
          <ChatInput />
        </div>
      )}

      {isMobile && <BottomNav />}
    </div>
  );
};

export default MainLayout;