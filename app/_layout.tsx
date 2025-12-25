import { useEffect } from 'react';
import '../global.css';

import { Stack } from 'expo-router';
import { initializePublicKeyPinning } from '@/services/publicKeyPinning';

export default function Layout() {
  useEffect(() => {
    async function initializeApp() {
      try {
        await initializePublicKeyPinning();
        console.log('SSL pinning initialized successfully');
      } catch (error) {
        console.error('Failed to initialize SSL pinning:', error);
      }
    }

    initializeApp();
  }, []);
  return <Stack />;
}
