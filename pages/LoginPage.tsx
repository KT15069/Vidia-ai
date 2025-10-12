import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/ui/AnimatedPage';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'signIn' | 'signUp';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithEmail, signUpWithEmail, session } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, [session, navigate]);
  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSignUpSuccess(false);

    try {
        if (mode === 'signIn') {
            const { error } = await signInWithEmail(email, password);
            if (error) throw error;
            // Successful sign in will be handled by the session listener
        } else {
            const { error } = await signUpWithEmail(email, password);
            if (error) throw error;
            setSignUpSuccess(true);
        }
    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
    } finally {
        setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'signIn' ? 'signUp' : 'signIn'));
    setError(null);
    setSignUpSuccess(false);
    setEmail('');
    setPassword('');
  };
  
  const pageTitle = mode === 'signIn' ? 'Welcome Back' : 'Create an Account';
  const pageSubtitle = mode === 'signIn' ? 'Sign in to continue your creative journey.' : 'Join to start creating stunning visuals.';
  const buttonText = mode === 'signIn' ? 'Sign In' : 'Sign Up';
  const toggleText = mode === 'signIn' ? "Don't have an account?" : "Already have an account?";
  const toggleLinkText = mode === 'signIn' ? "Sign Up" : "Sign In";

  return (
    <AnimatedPage className="bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-white to-neutral-200 dark:from-black dark:to-neutral-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/40 p-8">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-2">{pageTitle}</h2>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">{pageSubtitle}</p>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {signUpSuccess && <p className="text-sm text-green-500 text-center">Success! Please check your email to confirm your account.</p>}
          
            <Button 
                type="submit"
                variant="primary" 
                className="w-full !py-3 !text-base"
                disabled={loading}
            >
                {loading ? 'Processing...' : buttonText}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            {toggleText}{' '}
            <button onClick={toggleMode} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              {toggleLinkText}
            </button>
          </p>
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default LoginPage;
