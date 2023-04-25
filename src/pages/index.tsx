import Link from 'next/link';
import { useState } from 'react';
import { QrReader, OnResultFunction } from 'react-qr-reader';

export default function Home() {
  const [scanResultWebCam, setScanResultWebCam] = useState('');

  const handleOnScan: OnResultFunction = (data) => {
    console.log('🚀 ~ file: index.tsx:27 ~ Home ~ data:', data);
    if (data) {
      setScanResultWebCam(data.getText());
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl font-bold text-center">Escaneie o QR Code</h1>
      <QrReader
        onResult={handleOnScan}
        constraints={{
          facingMode: 'environment',
        }}
        scanDelay={1000}
        containerStyle={{ width: '25rem', height: '25rem' }}
      />
      {scanResultWebCam && (
        <Link
          className="font-semibold py-2 px-3 text-white rounded bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50"
          href={`/service/${scanResultWebCam}`}
        >
          Iniciar Serviço
        </Link>
      )}
    </main>
  );
}
