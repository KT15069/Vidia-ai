
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/ui/AnimatedPage';
import Button from '../components/ui/Button';
import { MOCK_MEDIA_ITEMS } from '../constants';
import { BrainCircuitIcon, DownloadIcon, SparklesIcon, ChevronDownIcon } from '../components/icons/Icons';
import type { MediaItem } from '../types';
import { GlowCard } from '../components/ui/spotlight-card';

// Reusable component for section headers
const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
            {title}
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {subtitle}
        </p>
    </div>
);

// Row component for the scroller
const ScrollerRow: React.FC<{ items: MediaItem[]; animationClass: string }> = ({ items, animationClass }) => (
    <div className={`flex w-max ${animationClass}`}>
        {[...items, ...items].map((item, index) => (
             <img key={`${item.id}-${index}`} src={item.url} alt={item.prompt} className="w-64 h-80 object-cover rounded-2xl mx-2 flex-shrink-0" />
        ))}
    </div>
);

// Gallery component with infinite scroll
const InfiniteImageScroller: React.FC = () => {
    const row1Items = MOCK_MEDIA_ITEMS.slice(0, 6);
    const row2Items = MOCK_MEDIA_ITEMS.slice(6, 12);

    return (
        <div className="relative w-full overflow-hidden py-12 mask-gradient">
            <ScrollerRow items={row1Items} animationClass="animate-scroll-x-left" />
            <div className="h-4" /> {/* Spacer */}
            <ScrollerRow items={row2Items} animationClass="animate-scroll-x-right" />
        </div>
    );
};

const features = [
    {
        icon: <BrainCircuitIcon className="w-8 h-8" />,
        title: "Advanced AI Model",
        description: "Leverage state-of-the-art AI to generate visuals with incredible detail and coherence.",
        glowColor: "purple" as const,
    },
    {
        icon: <SparklesIcon className="w-8 h-8" />,
        title: "Image & Video",
        description: "Create both static images and dynamic video clips from a single, intuitive interface.",
        glowColor: "blue" as const,
    },
    {
        icon: <DownloadIcon className="w-8 h-8" />,
        title: "High-Resolution Exports",
        description: "Download your creations in high quality, ready for any project or social media platform.",
        glowColor: "green" as const,
    },
];


const LandingPage: React.FC = () => {
  return (
    <AnimatedPage className="relative bg-light-bg dark:bg-dark-bg text-black dark:text-white overflow-x-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 w-full bg-white dark:bg-black bg-[linear-gradient(to_right,rgba(128,128,128,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.12)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"></div>
      
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-light-bg dark:to-dark-bg"></div>
            <div className="z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-600 dark:from-white dark:to-neutral-400"
                >
                    Turn your ideas into stunning AI visuals.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
                >
                    Generate breathtaking images and cinematic videos from simple text prompts. The future of creation is here.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="mt-10"
                >
                    <Link to="/home">
                        <Button variant="primary" className="text-lg px-8 py-4">Start Creating Free</Button>
                    </Link>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDownIcon className="w-6 h-6 text-neutral-500" />
                </motion.div>
            </motion.div>
        </section>

        {/* --- Visual Showcase Section --- */}
        <section className="relative py-16">
            <InfiniteImageScroller />
        </section>

        {/* --- Features Section --- */}
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
            className="py-24 px-6"
        >
            <SectionHeader 
                title="Powerful, Simple, Fast."
                subtitle="Rivora is packed with features to make your creative process seamless and inspiring."
            />
            <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                     <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="h-full"
                    >
                        <GlowCard 
                            glowColor={feature.glowColor} 
                            customSize={true} 
                            className="p-6 text-center h-full !rounded-2xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 rounded-xl mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-black dark:text-white">{feature.title}</h3>
                                <p className="mt-2 text-neutral-500 dark:text-neutral-400">{feature.description}</p>
                            </div>
                        </GlowCard>
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* --- Final CTA Section --- */}
        <section className="py-24 px-6 text-center bg-light-card/50 dark:bg-dark-card/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <SectionHeader 
                    title="Ready to bring your vision to life?"
                    subtitle="Join thousands of creators and start your journey with Rivora today."
                />
                <Link to="/home" className="mt-10 inline-block">
                    <Button variant="primary" className="text-lg px-8 py-4">Get Started Now</Button>
                </Link>
            </motion.div>
        </section>

        {/* --- Footer --- */}
        <footer className="w-full p-6 text-center text-neutral-500 z-10 relative">
            <div className="flex justify-center gap-6">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Docs</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
            </div>
        </footer>
    </AnimatedPage>
  );
};

export default LandingPage;
