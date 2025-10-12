import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/ui/AnimatedPage';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getJoinDate = () => {
    if (user?.created_at) {
        return new Date(user.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    return 'N/A';
  }

  return (
    <AnimatedPage>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Profile</h1>
        
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl p-8 space-y-6">
          <div className="flex flex-col">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">Email</span>
            <span className="text-lg text-black dark:text-white">{user?.email || 'Not available'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">Joined</span>
            <span className="text-lg text-black dark:text-white">{getJoinDate()}</span>
          </div>
        </div>

        <div className="mt-8">
          <Button variant="secondary" className="w-full" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProfilePage;