"use client";

/* eslint-disable tailwindcss/classnames-order */

import { useLanguage } from "@/providers/LanguageProvider";
import { portableTextToPlainText } from "@/utils/portableTextToPlainText";
import { useTranslation } from "@/utils/useTranslation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ListenButton — plays blog content using Microsoft Edge neural TTS voices.
 * Fetches audio from /api/tts (server-side), plays via HTML5 Audio element.
 * Sounds natural and human-like across English, Spanish, and Nepali.
 *
 * Props:
 *  - content: Portable Text array (original blog content)
 *  - translatedText: plain text string (already translated, from TranslatedBlogContent)
 */
export const ListenButton = ({ content, translatedText }) => {
  const { language, mounted } = useLanguage();
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle"); // idle | loading | playing | paused | error
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const abortRef = useRef(null);
  const rafRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset when language changes
  useEffect(() => {
    if (status !== "idle") {
      cleanup();
      setStatus("idle");
      setProgress(0);
      setDuration(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const cleanup = useCallback(() => {
    abortRef.current?.abort();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  const getTextToSpeak = useCallback(() => {
    if (translatedText && language !== "en") {
      return translatedText;
    }
    return portableTextToPlainText(content);
  }, [content, translatedText, language]);

  // Smooth progress tracking via requestAnimationFrame
  const trackProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    if (audio.duration > 0) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    rafRef.current = requestAnimationFrame(trackProgress);
  }, []);

  const fetchAndPlay = useCallback(async () => {
    const text = getTextToSpeak();
    if (!text) return;

    setStatus("loading");
    setProgress(0);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "TTS request failed");
      }

      const blob = await res.blob();
      if (controller.signal.aborted) return;

      // Revoke old blob
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.addEventListener("ended", () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setStatus("idle");
        setProgress(0);
        setDuration(0);
      });
      audio.addEventListener("error", () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setStatus("error");
      });

      await audio.play();
      setStatus("playing");
      trackProgress();
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("TTS error:", err);
      setStatus("error");
    }
  }, [getTextToSpeak, language, trackProgress]);

  const togglePlayPause = useCallback(() => {
    if (status === "playing" && audioRef.current) {
      audioRef.current.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setStatus("paused");
    } else if (status === "paused" && audioRef.current) {
      audioRef.current.play();
      setStatus("playing");
      trackProgress();
    } else if (status === "idle" || status === "error") {
      fetchAndPlay();
    }
  }, [status, fetchAndPlay, trackProgress]);

  const stopPlayback = useCallback(() => {
    cleanup();
    setStatus("idle");
    setProgress(0);
    setDuration(0);
  }, [cleanup]);

  if (!mounted) return null;

  const text = getTextToSpeak();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 150));
  const isActive = status === "playing" || status === "paused" || status === "loading";

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-secondary-10 bg-accent1-5">
      <div className="flex items-center gap-3 p-3">
        {/* Play / Pause / Loading button */}
        <button
          onClick={togglePlayPause}
          disabled={status === "loading"}
          aria-label={
            status === "playing"
              ? t("listen.pause")
              : status === "loading"
                ? "Generating audio..."
                : t("listen.play")
          }
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent1 text-white transition-colors hover:bg-accent1-80 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? (
            <LoadingSpinner />
          ) : status === "playing" ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </button>

        {/* Info + progress bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <HeadphoneIcon />
              {status === "loading"
                ? language === "es"
                  ? "Generando audio..."
                  : language === "ne"
                    ? "अडियो बनाउँदै..."
                    : "Generating audio..."
                : t("listen.title")}
            </span>
            <span className="text-xs text-secondary">
              {duration > 0
                ? formatTime(audioRef.current?.currentTime || 0) +
                  " / " +
                  formatTime(duration)
                : `~${readingMinutes} min`}
            </span>
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary-10">
            <div
              className="h-full rounded-full bg-accent1 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stop button */}
        {isActive && (
          <button
            onClick={stopPlayback}
            aria-label={t("listen.stop")}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary-10 transition-colors hover:bg-secondary-20"
          >
            <StopIcon />
          </button>
        )}
      </div>

      {/* Error recovery */}
      {status === "error" && (
        <div className="border-t border-secondary-10 px-3 py-2 text-xs text-secondary">
          {language === "es"
            ? "Error al generar audio. Toca reproducir para reintentar."
            : language === "ne"
              ? "अडियो बनाउन सकिएन। पुन: प्रयास गर्न प्ले थिच्नुहोस्।"
              : "Audio generation failed. Tap play to retry."}
        </div>
      )}
    </div>
  );
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h12v12H6z" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="size-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
