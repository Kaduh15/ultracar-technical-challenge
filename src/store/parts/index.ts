import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { TPart } from '../../../@types';

type ActionsProps = {
  addPart: (part: TPart) => void;
  getAllParts: () => TPart[];
};

export type PartsStoreProps = {
  state: TPart[];
} & ActionsProps;

export const usePartsStore = create(
  devtools(
    persist<PartsStoreProps>(
      (set, get) => ({
        state: [],
        addPart: (part) => {
          set((state) => ({
            state: [...state.state, part],
          }));
        },
        getAllParts: () => {
          const parts = get().state;
          return parts;
        },
      }),
      {
        name: 'partsStore',
      },
    ),
  ),
);
