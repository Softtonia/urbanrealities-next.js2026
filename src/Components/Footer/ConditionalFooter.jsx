"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.includes('/auth/user') || pathname?.includes('/auth/business')) {
    return null;
  }
  return <Footer />;
}
