import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MessageItem = {
  author: string;
  avatar: string;
  id: string;
  text: string;
};

type PromptState = {
  messages: MessageItem[];
  addMessage: (message: MessageItem) => void;
  clearMessages: () => void;
};

export const usePromptStore = create<PromptState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => {
          return {
            messages: [...state.messages, message],
          };
        }),
      clearMessages: () => set({ messages: [] }),
    }),
    { name: 'prompt-store' }
  )
);
