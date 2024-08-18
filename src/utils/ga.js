// ga.js
import { initGA, logPageView } from 'next-ga';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTM_ID; // Replace with your environment variable

export const initAnalytics = () => {
  initGA(GA_TRACKING_ID);
};

export const PageView = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      logPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);   

  return null;
};