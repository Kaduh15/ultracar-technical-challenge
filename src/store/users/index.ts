import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { TClient, TMechanic } from '../../../@types';

type ActionsProps = {
  addUser: (user: TClient | TMechanic) => void;
  getUser: (id: string) => TClient | TMechanic | undefined;
  getClients: () => TClient[];
  getMechanics: () => TMechanic[];
  getAllUsers: () => (TClient | TMechanic)[];
  filterClientsByName: (name: string) => TClient[];
};

export type UsersStoreProps = {
  state: (TClient | TMechanic)[];
} & ActionsProps;

export const useUsersStore = create(
  devtools(
    persist<UsersStoreProps>(
      (set, get) => ({
        state: [],
        addUser: (user) => {
          set((state) => ({
            state: [...state.state, user],
          }));
        },
        getUser: (id) => {
          const users = get().state;
          return users.find((user) => user.id === id);
        },
        getAllUsers: () => {
          const users = get().state;
          return users;
        },
        getClients: () => {
          const users = get().state;
          return users.filter((user) => user.role === 'client') as TClient[];
        },
        getMechanics: () => {
          const users = get().state;
          return users.filter(
            (user) => user.role === 'mechanic',
          ) as TMechanic[];
        },
        filterClientsByName: (name) => {
          const clients = get().getClients();
          return clients.filter((client) =>
            client.name.toLowerCase().includes(name.toLowerCase()),
          );
        },
      }),
      {
        name: 'usersStore',
      },
    ),
  ),
);
