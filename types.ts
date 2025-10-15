// FIX: Import `ComponentType` from 'react' to resolve "Cannot find namespace 'React'" error.
import type { ComponentType } from 'react';

export interface NavItemType {
  path: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export interface MediaItem {
  id: number;
  type: 'Image' | 'Video' | 'Text';
  prompt: string;
  url: string;
  isFavorite?: boolean;
}
