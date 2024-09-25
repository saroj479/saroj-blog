"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

// Hardcode the GA tracking ID for testing or use environment variables
const GA_TRACKING_ID = 'G-M2WCZGM2EX'; // Replace with your actual GA tracking ID

export const initAnalytics = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const PageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    ReactGA.send({ hitType: "pageview", page: url });
  }, [pathname, searchParams]);

  return null;
};
