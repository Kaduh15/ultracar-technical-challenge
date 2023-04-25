import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { TClient, TMechanic } from '../../../@types';

type ActionsProps = {
  addUser: (user: TClient | TMechanic) => void;
  getUser: (id: string) => TClient | TMechanic | undefined;
  getAllUsers: () => (TClient | TMechanic)[];
};

export type UsersStoreProps = {
  state: (TClient | TMechanic)[];
  actions: ActionsProps;
};

export const useUsersStore = create<UsersStoreProps>()(
  devtools(
    persist(
      (set, get) => ({
        state: [],
        actions: {
          addUser(user) {
            set((state) => ({ state: [...state.state, user] }));
          },
          getUser(id) {
            return get().state.find((user) => user.id === id);
          },
          getAllUsers() {
            return get().state;
          },
        },
      }),
      {
        name: 'users-store',
      },
    ),
  ),
);
