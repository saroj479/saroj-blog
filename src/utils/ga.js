import { initGA, logPageView } from 'next-ga';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID; // Ensure this environment variable is correct

export const initAnalytics = () => {
  initGA(GA_TRACKING_ID);
};

export const PageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    logPageView(url);
  }, [pathname, searchParams]);

  return null;
};
