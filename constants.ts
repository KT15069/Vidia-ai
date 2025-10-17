import type { NavItemType, MediaItem } from './types';
import { HomeIcon, ImageIcon, StarIcon, CrownIcon } from './components/icons/Icons';

export const NAV_ITEMS: NavItemType[] = [
  { path: '/home', name: 'Home', icon: HomeIcon },
  { path: '/assets', name: 'Assets', icon: ImageIcon },
  { path: '/favorites', name: 'Favorites', icon: StarIcon },
  { path: '/subscriptions', name: 'Subscriptions', icon: CrownIcon },
];

export const MOCK_MEDIA_ITEMS: MediaItem[] = [
  // Existing Items
  { id: 1, type: 'Image', prompt: 'A cinematic shot of a lone astronaut on a red planet', url: 'https://picsum.photos/seed/1/800/600', isFavorite: false },
  { id: 2, type: 'Video', prompt: 'Ocean waves crashing on a black sand beach, drone shot', url: 'https://picsum.photos/seed/2/600/800', isFavorite: false },
  { id: 3, type: 'Image', prompt: 'Neon-lit cyberpunk city street at night in the rain', url: 'https://picsum.photos/seed/3/800/800', isFavorite: false },
  { id: 4, type: 'Image', prompt: 'A majestic deer in a misty forest at sunrise', url: 'https://picsum.photos/seed/4/600/900', isFavorite: false },
  { id: 5, type: 'Video', prompt: 'Time-lapse of clouds moving over a mountain range', url: 'https://picsum.photos/seed/5/900/600', isFavorite: false },
  { id: 6, type: 'Image', prompt: 'An abstract painting with bold colors and textures', url: 'https://picsum.photos/seed/6/800/700', isFavorite: false },
  { id: 7, type: 'Image', prompt: 'Portrait of a futuristic warrior with glowing armor', url: 'https://picsum.photos/seed/7/700/800', isFavorite: false },
  { id: 8, type: 'Video', prompt: 'A cat playfully chasing a laser pointer in a cozy room', url: 'https://picsum.photos/seed/8/800/600', isFavorite: false },
  { id: 9, type: 'Image', prompt: 'A whimsical illustration of a floating island in the sky', url: 'https://picsum.photos/seed/9/600/800', isFavorite: false },
  { id: 10, type: 'Image', prompt: 'Close-up of a dewdrop on a vibrant green leaf', url: 'https://picsum.photos/seed/10/800/800', isFavorite: false },
  { id: 11, type: 'Video', prompt: 'Busy city intersection from a high angle view', url: 'https://picsum.photos/seed/11/900/600', isFavorite: false },
  { id: 12, type: 'Image', prompt: 'A steampunk-inspired mechanical owl with intricate gears', url: 'https://picsum.photos/seed/12/700/900', isFavorite: false },

  // New Brand-Focused & Professional Items
  { id: 13, type: 'Image', prompt: 'Minimalist product shot of a luxury watch on a marble surface', url: 'https://picsum.photos/seed/brand1/800/1000', isFavorite: false },
  { id: 14, type: 'Image', prompt: 'Architectural detail of a brutalist building, morning light', url: 'https://picsum.photos/seed/brand2/800/600', isFavorite: false },
  { id: 15, type: 'Video', prompt: 'Slow-motion capture of ink drop in water, monochrome', url: 'https://picsum.photos/seed/brand3/600/800', isFavorite: false },
  { id: 16, type: 'Image', prompt: 'Candid shot of a fashion model in a vibrant city street', url: 'https://picsum.photos/seed/brand4/700/900', isFavorite: false },
  { id: 17, type: 'Image', prompt: 'A gourmet dish plated with artistic precision in a high-end restaurant', url: 'https://picsum.photos/seed/brand5/900/600', isFavorite: false },
  { id: 18, type: 'Image', prompt: 'Interior design shot of a modern, sunlit living room with Scandinavian furniture', url: 'https://picsum.photos/seed/brand6/800/700', isFavorite: false },
  { id: 19, type: 'Video', prompt: 'Aerial drone footage of a winding mountain road at sunset', url: 'https://picsum.photos/seed/brand7/1000/600', isFavorite: false },
  { id: 20, type: 'Image', prompt: 'Abstract macro photography of iridescent soap bubble film', url: 'https://picsum.photos/seed/brand8/800/800', isFavorite: false },
  { id: 21, type: 'Image', prompt: 'Professional headshot of a CEO against a clean, corporate background', url: 'https://picsum.photos/seed/brand9/700/800', isFavorite: false },
  { id: 22, type: 'Image', prompt: 'Sleek electric concept car on a futuristic neon-lit road', url: 'https://picsum.photos/seed/brand10/1000/700', isFavorite: false },
  { id: 23, type: 'Video', prompt: 'A craftsman carefully working on a piece of wood in a workshop', url: 'https://picsum.photos/seed/brand11/800/600', isFavorite: false },
  { id: 24, type: 'Image', prompt: 'Flat lay of vintage camera, notebook, and a cup of coffee', url: 'https://picsum.photos/seed/brand12/900/700', isFavorite: false },
  { id: 25, type: 'Image', prompt: 'A field of vibrant flowers with a shallow depth of field', url: 'https://picsum.photos/seed/brand13/800/1000', isFavorite: false },
  { id: 26, type: 'Image', prompt: 'A powerful athlete mid-jump, captured with high-speed photography', url: 'https://picsum.photos/seed/brand14/900/600', isFavorite: false },
  { id: 27, type: 'Video', prompt: 'Time-lapse of a skilled artist painting a large canvas', url: 'https://picsum.photos/seed/brand15/800/600', isFavorite: false },
  { id: 28, type: 'Image', prompt: 'Serene landscape of a Japanese zen garden', url: 'https://picsum.photos/seed/brand16/1000/600', isFavorite: false },
  { id: 29, type: 'Image', prompt: 'Close-up on the textured fabric of a designer handbag', url: 'https://picsum.photos/seed/brand17/800/800', isFavorite: false },
  { id: 30, type: 'Image', prompt: 'A group of diverse professionals collaborating in a modern office space', url: 'https://picsum.photos/seed/brand18/900/600', isFavorite: false },
  { id: 31, type: 'Video', prompt: 'Hands typing on a mechanical keyboard with RGB lighting', url: 'https://picsum.photos/seed/brand19/800/600', isFavorite: false },
  { id: 32, type: 'Image', prompt: 'A silhouetted figure standing on a cliff overlooking the ocean', url: 'https://picsum.photos/seed/brand20/700/900', isFavorite: false },
  { id: 33, type: 'Image', prompt: 'Holographic data visualizations in a dark, futuristic server room', url: 'https://picsum.photos/seed/brand21/1000/700', isFavorite: false },
  { id: 34, type: 'Image', prompt: 'A freshly brewed cup of artisanal coffee with latte art', url: 'https://picsum.photos/seed/brand22/800/900', isFavorite: false },
  { id: 35, type: 'Image', prompt: 'Geometric patterns on a colorful tiled wall', url: 'https://picsum.photos/seed/brand23/800/800', isFavorite: false },
];

export const SUBSCRIPTION_PLANS = [
  {
    name: 'FREE',
    price: 0,
    features: [
      '3 images per day',
      '2 videos per day',
      '5 MB max uploads',
    ],
    cta: 'Current Plan',
    isPopular: false,
  },
  {
    name: 'PRO',
    price: 150,
    features: [
      '20 images per day',
      '10 videos per day',
      'Faster generation',
      '20 MB max uploads',
    ],
    cta: 'Upgrade to PRO',
    isPopular: true,
  },
  {
    name: 'PLUS',
    price: 250,
    features: [
      '40 images per day',
      '25 videos per day',
      'Faster generation',
      'Priority support',
      '100 MB max uploads',
    ],
    cta: 'Upgrade to PLUS',
    isPopular: false,
  }
];