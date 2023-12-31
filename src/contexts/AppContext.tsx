import { useState, useMemo, ReactNode, createContext } from 'react';

import type {
  DNDTreeFormFieldItem,
  FormFieldItem,
  GlobalState,
} from '../types';
import { defaultFormFieldItems, defaultGlobalState } from '../types';

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

  codeType: string;
  setCodeType: React.Dispatch<React.SetStateAction<string>>;

  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;

  formFieldItems: DNDTreeFormFieldItem[];
  setFormFieldItems: React.Dispatch<
    React.SetStateAction<DNDTreeFormFieldItem[]>
  >;

  selectedFormFieldId: string;
  setSelectedFormFieldId: React.Dispatch<React.SetStateAction<string>>;

  currentFormFieldItem: DNDTreeFormFieldItem | undefined;

  setSingleItem: (
    id: string,
    data: Partial<FormFieldItem>,
    text?: string,
  ) => void;
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

  const [codeType, setCodeType] = useState<string>('form');

  const [globalState, setGlobalState] = useState<GlobalState>(
    defaultGlobalState(),
  );

  const [formFieldItems, setFormFieldItems] = useState<DNDTreeFormFieldItem[]>(
    defaultFormFieldItems(),
  );

  const [selectedFormFieldId, setSelectedFormFieldId] = useState<string>('');

  const currentFormFieldItem = useMemo(() => {
    if (selectedFormFieldId) {
      const selected = formFieldItems.find(
        (item) => item.id === selectedFormFieldId,
      );

      return selected;
    }
  }, [selectedFormFieldId]);

  const setSingleItem = (
    id: string,
    data: Partial<FormFieldItem>,
    text?: string,
  ) => {
    setFormFieldItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) {
        return prev;
      }

      const updated = [...prev];
      updated[index].data = {
        ...updated[index].data,
        ...data,
      } as any;

      if (text) {
        updated[index].text = text;
      }

      return updated;
    });
  };

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

        codeType,
        setCodeType,

        globalState,
        setGlobalState,

        formFieldItems,
        setFormFieldItems,

        selectedFormFieldId,
        setSelectedFormFieldId,

        currentFormFieldItem,

        setSingleItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
