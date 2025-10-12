import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import type { MediaItem } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface GenerationContextType {
  items: MediaItem[];
  loading: boolean;
  addGeneratedItem: (item: Omit<MediaItem, 'id' | 'isFavorite'>) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
}

export const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export const GenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenerations = async () => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching generations:', error.message);
        setItems([]);
      } else {
        // Map snake_case from DB to camelCase for the app
        const formattedData = data.map(item => ({
          ...item,
          isFavorite: item.is_favorite
        }));
        setItems(formattedData);
      }
      setLoading(false);
    };

    fetchGenerations();
  }, [user]);

  const addGeneratedItem = async (item: Omit<MediaItem, 'id' | 'isFavorite'>) => {
    if (!user) return;

    const newItem = {
      ...item,
      user_id: user.id,
    };
    
    const { data, error } = await supabase
      .from('generations')
      .insert(newItem)
      .select()
      .single();

    if (error) {
      console.error('Error adding item:', error.message);
    } else if (data) {
       const formattedItem = { ...data, isFavorite: data.is_favorite };
       setItems((prevItems) => [formattedItem, ...prevItems]);
    }
  };

  const toggleFavorite = async (id: number) => {
    const itemToUpdate = items.find((item) => item.id === id);
    if (!itemToUpdate) return;

    const newFavoriteState = !itemToUpdate.isFavorite;

    // Optimistically update UI
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: newFavoriteState } : item
      )
    );

    const { error } = await supabase
      .from('generations')
      .update({ is_favorite: newFavoriteState })
      .eq('id', id);
    
    if (error) {
        console.error('Error updating favorite status:', error.message);
        // Revert UI on error
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isFavorite: !newFavoriteState } : item
            )
        );
    }
  };

  const value = useMemo(() => ({ items, loading, addGeneratedItem, toggleFavorite }), [items, loading]);

  return (
    <GenerationContext.Provider value={value}>
      {children}
    </GenerationContext.Provider>
  );
};

export const useGeneration = () => {
  const context = useContext(GenerationContext);
  if (context === undefined) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
};
