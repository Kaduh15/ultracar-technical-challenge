'use client';

import React, { InputHTMLAttributes } from 'react';
import QRCode from 'react-qr-code';

import { useUsersStore } from '@/store/users';

import { TClient } from '../../../@types';

const clients: React.FC = () => {
  const { getClients } = useUsersStore((store) => store);
  const [clientSelected, setClientSelected] = React.useState<TClient | null>();
  const clients = getClients();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const client = clients?.find(
      (client) => client.name.toLocaleLowerCase() === value.toLocaleLowerCase(),
    );
    setClientSelected(client);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen text-white gap-6">
      <h1 className="text-6xl">Cliente</h1>
      <input
        className="text-black w-56"
        name="searcherClient"
        id="searcherClient"
        list="clients"
        onChange={handleInputChange}
        placeholder="Digite o nome do cliente"
      />
      <datalist className="bg-white border min-w-fit w-56" id="clients">
        {clients &&
          clients.map((client: TClient) => (
            <option
              className="border min-w-fit w-56 haver:bg-blue-500 active:bg-blue-500"
              key={client.id}
              value={client.name}
            />
          ))}
      </datalist>

      {!!clientSelected && (
        <>
          <QRCode value={clientSelected.id} />
        </>
      )}
    </main>
  );
};

export default clients;
