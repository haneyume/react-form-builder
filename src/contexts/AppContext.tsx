import { useState, ReactNode, createContext } from 'react';

import type { DNDTreeFormFieldItem } from '../types';
import { defaultFormFieldItems } from '../types';

export interface AppContextProps {
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  statusMessage: string;
  setStatusMessage: React.Dispatch<React.SetStateAction<string>>;

  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;

  themes: Array<{ label: string; value: string }>;
  languages: Array<{ label: string; value: string }>;

  formFieldItems: DNDTreeFormFieldItem[];
  setFormFieldItems: React.Dispatch<
    React.SetStateAction<DNDTreeFormFieldItem[]>
  >;
}

export const AppContext = createContext<AppContextProps>(undefined!);

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready');
  const [userId, setUserId] = useState<string>('');

  const [formFieldItems, setFormFieldItems] = useState<DNDTreeFormFieldItem[]>(
    defaultFormFieldItems(),
  );

  return (
    <AppContext.Provider
      value={{
        initialized,
        setInitialized,

        loading,
        setLoading,

        statusMessage,
        setStatusMessage,

        userId,
        setUserId,

        themes: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ],

        languages: [
          { label: 'English', value: 'en' },
          { label: '日本語', value: 'ja' },
          { label: '繁體中文', value: 'zhHant' },
          { label: '简体中文', value: 'zhHans' },
        ],

        formFieldItems,
        setFormFieldItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
