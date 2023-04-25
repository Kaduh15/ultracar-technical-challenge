import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { TClient, TMechanic, TService } from '../../../@types';

type ActionsProps = {
  addUser: (user: TClient | TMechanic) => void;
  getUserById: (id: string) => TClient | TMechanic | undefined;
  getClients: () => TClient[];
  getMechanics: () => TMechanic[];
  addService: (mechanicId: string, service: TService) => void;
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
        getUserById: (id) => {
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
        addService: (mechanicId, service) => {
          set((state) => {
            const mechanics = state.state as TMechanic[];
            const mechanic = mechanics.find(
              (mechanic) => mechanic.id === mechanicId,
            );
            if (mechanic) {
              mechanic.services.push(service);
            }
            return {
              state: mechanics,
            };
          });
        },
      }),
      {
        name: 'usersStore',
      },
    ),
  ),
);
