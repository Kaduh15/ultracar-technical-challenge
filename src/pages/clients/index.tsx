'use client';

import React from 'react';
import QRCode from 'react-qr-code';

import { useLocalStorage } from 'usehooks-ts';

import { TMechanic, TClient } from '../../../@types';

const clients: React.FC = () => {
  const [data, setData] = useLocalStorage<(TClient | TMechanic)[]>('data', []);
  const [clientSelected, setClientSelected] = React.useState<TClient | null>();
  const clients = data.filter((item) => item.role === 'client') as TClient[];

  const handleSelectClient = (client: TClient) => {
    setClientSelected(client);
  };

  return (
    <main className="text-white flex flex-col items-center justify-center h-screen">
      <h1>Clientes</h1>
      {clients && (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <p>
                {client.name} - {client.car}
              </p>
              <button type="button" onClick={() => handleSelectClient(client)}>
                Selecionar
              </button>
            </li>
          ))}
        </ul>
      )}
      {!clients.length && (
        <p className="font-semibold">Nenhum cliente cadastrado</p>
      )}
      {clientSelected && <QRCode value={clientSelected.id} />}
    </main>
  );
};

export default clients;
