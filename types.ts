export interface NavItemType {
  path: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface MediaItem {
  id: number;
  type: 'Image' | 'Video';
  prompt: string;
  url: string;
  isFavorite?: boolean;
}
