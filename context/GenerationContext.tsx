import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import type { MediaItem } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface GenerationContextType {
  items: MediaItem[];
  loading: boolean;
  hasGeneratedThisSession: boolean;
  addGeneratedItem: (item: Omit<MediaItem, 'id' | 'isFavorite'>) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
}

export const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export const GenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasGeneratedThisSession, setHasGeneratedThisSession] = useState(false);

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
    if (!user) {
        throw new Error("You must be logged in to save generations.");
    }

    // Create a temporary ID for immediate UI update
    const tempId = Date.now();
    const newItem: MediaItem = {
      ...item,
      id: tempId,
      isFavorite: false,
    };

    // Optimistically update the UI
    setItems((prevItems) => [newItem, ...prevItems]);
    setHasGeneratedThisSession(true);

    // Prepare the data for the database (using snake_case for columns)
    const newItemForDb = {
      type: item.type,
      prompt: item.prompt,
      url: item.url,
      user_id: user.id,
      is_favorite: false,
    };
    
    // Perform the insert in the background.
    // We remove the chained .select() to prevent a potential failure if the user's
    // RLS policy for SELECT is missing or incorrect. The optimistic update
    // ensures the UI is responsive, and the real data will be loaded on the next refresh.
    const { error } = await supabase
      .from('generations')
      .insert(newItemForDb);

    if (error) {
      console.error('Error saving item to database:', error.message);
      // If the save fails, roll back the optimistic update
      setItems((prevItems) => prevItems.filter((i) => i.id !== tempId));
      // Throw an error to be caught by the UI component
      throw new Error(`Failed to save generation: ${error.message}`);
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

  const value = useMemo(() => ({ items, loading, hasGeneratedThisSession, addGeneratedItem, toggleFavorite }), [items, loading, hasGeneratedThisSession]);

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
