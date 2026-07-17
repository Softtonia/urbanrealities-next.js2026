"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith('/auth/user')) {
    return null;
  }
  return <Footer />;
}
