import type { NavItemType, MediaItem } from './types';
import { HomeIcon, ImageIcon, StarIcon, CrownIcon } from './components/icons/Icons';

export const NAV_ITEMS: NavItemType[] = [
  { path: '/home', name: 'Home', icon: HomeIcon },
  { path: '/assets', name: 'Assets', icon: ImageIcon },
  { path: '/favorites', name: 'Favorites', icon: StarIcon },
  { path: '/subscriptions', name: 'Subscriptions', icon: CrownIcon },
];

export const MOCK_MEDIA_ITEMS: MediaItem[] = [
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