import type { Metadata } from 'next';
import OriginPage from '../components/OriginPage';

export const metadata: Metadata = {
  title: 'Origen',
  description: 'Historia de Viñedo 1970 y su origen en Samaipata.',
};

export default function Origen() {
  return <OriginPage />;
}