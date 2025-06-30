"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router, sessionId]);

  if (!sessionId) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-4">
      <div className="mb-6 animate-bounce">
        <svg className="size-20 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fff" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" />
        </svg>
      </div>
      <h1 className="mb-2 text-4xl font-extrabold text-green-700">Thank You!</h1>
      <p className="mb-4 max-w-md text-center text-lg text-gray-700">
        Your support means a lot. We appreciate your generosity!<br />
        You will be redirected to the homepage in a moment.
      </p>
      <div className="text-sm text-gray-500">
        If you are not redirected,{" "}
        <button className="text-blue-600 underline" onClick={() => router.push("/")}>click here</button>.
      </div>
    </div>
  );
} 