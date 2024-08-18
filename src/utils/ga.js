// ga.js
import { initGA, logPageView } from 'next-ga';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-M2WCZGM2EX'; // Replace with your GA ID

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
