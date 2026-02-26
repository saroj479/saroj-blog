"use client";

/* eslint-disable tailwindcss/classnames-order */

import { useLanguage } from "@/providers/LanguageProvider";
import { portableTextToPlainText } from "@/utils/portableTextToPlainText";
import { useTranslation } from "@/utils/useTranslation";
import { useCallback, useEffect, useRef, useState } from "react";

const LANG_VOICE_MAP = {
  en: "en-US",
  es: "es-ES",
  ne: "ne-NP",
};

const VOICE_FALLBACKS = {
  ne: ["ne-NP", "hi-IN", "ne", "hi"],
};

// Max chars per utterance chunk — Chrome stops speaking after ~15s,
// so we split into small chunks and play sequentially
const CHUNK_SIZE = 200;

export const ListenButton = ({ content, translatedText }) => {
  const { language, mounted } = useLanguage();
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [voiceAvailable, setVoiceAvailable] = useState(true);
  const [progress, setProgress] = useState(0);
  const chunksRef = useRef([]);
  const currentChunkRef = useRef(0);
  const isStoppedRef = useRef(false);
  const intervalRef = useRef(null);
  const totalChunksRef = useRef(0);

  // Check if speech synthesis is supported and voices are available
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    const checkVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) return; // Not yet loaded
      const langCode = LANG_VOICE_MAP[language] || language;
      const fallbacks = VOICE_FALLBACKS[language] || [langCode];
      const hasVoice = voices.some((v) =>
        fallbacks.some(
          (fb) =>
            v.lang.startsWith(fb) ||
            v.lang.toLowerCase().startsWith(fb.toLowerCase())
        )
      );
      setVoiceAvailable(hasVoice || language === "en");
    };

    checkVoices();
    speechSynthesis.addEventListener("voiceschanged", checkVoices);
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", checkVoices);
      stopSpeech();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const getTextToSpeak = useCallback(() => {
    if (translatedText && language !== "en") {
      return translatedText;
    }
    return portableTextToPlainText(content);
  }, [content, translatedText, language]);

  const findBestVoice = useCallback(() => {
    const voices = speechSynthesis.getVoices();
    const langCode = LANG_VOICE_MAP[language] || language;
    const fallbacks = VOICE_FALLBACKS[language] || [langCode];

    for (const fb of fallbacks) {
      const voice = voices.find((v) => v.lang.startsWith(fb));
      if (voice) return voice;
    }
    return voices.find((v) =>
      v.lang.toLowerCase().startsWith(language.toLowerCase())
    ) || null;
  }, [language]);

  // Split text into sentences/chunks for reliable playback
  const splitIntoChunks = useCallback((text) => {
    if (!text) return [];
    // Split by sentences first
    const sentences = text.match(/[^.!?\n]+[.!?\n]*/g) || [text];
    const chunks = [];
    let current = "";

    for (const sentence of sentences) {
      if (current.length + sentence.length > CHUNK_SIZE && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }, []);

  const stopSpeech = useCallback(() => {
    isStoppedRef.current = true;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthesis.cancel();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    chunksRef.current = [];
    currentChunkRef.current = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  }, []);

  // Speak one chunk, then call next on completion
  const speakChunk = useCallback(
    (chunkIndex) => {
      if (
        isStoppedRef.current ||
        chunkIndex >= chunksRef.current.length
      ) {
        // All chunks done
        setIsPlaying(false);
        setProgress(100);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setTimeout(() => setProgress(0), 1500);
        return;
      }

      const text = chunksRef.current[chunkIndex];
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = findBestVoice();

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = LANG_VOICE_MAP[language] || language;
      }

      utterance.rate = 0.95;
      utterance.pitch = 1;

      utterance.onend = () => {
        currentChunkRef.current = chunkIndex + 1;
        const pct = ((chunkIndex + 1) / totalChunksRef.current) * 100;
        setProgress(pct);
        // Small delay between chunks for natural pacing
        setTimeout(() => speakChunk(chunkIndex + 1), 50);
      };

      utterance.onerror = (event) => {
        if (event.error !== "canceled" && event.error !== "interrupted") {
          console.error("Speech error:", event.error, "on chunk", chunkIndex);
          // Try next chunk on error
          currentChunkRef.current = chunkIndex + 1;
          setTimeout(() => speakChunk(chunkIndex + 1), 100);
        }
      };

      speechSynthesis.speak(utterance);
    },
    [findBestVoice, language]
  );

  const playSpeech = useCallback(() => {
    if (!isSupported || !voiceAvailable) return;

    const text = getTextToSpeak();
    if (!text) return;

    // Reset state
    isStoppedRef.current = false;
    speechSynthesis.cancel();

    const chunks = splitIntoChunks(text);
    chunksRef.current = chunks;
    totalChunksRef.current = chunks.length;
    currentChunkRef.current = 0;

    setIsPlaying(true);
    setIsPaused(false);
    setProgress(0);

    // Small delay after cancel() — Chrome needs this to properly reset
    setTimeout(() => {
      if (!isStoppedRef.current) {
        speakChunk(0);
      }
    }, 100);
  }, [isSupported, voiceAvailable, getTextToSpeak, splitIntoChunks, speakChunk]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  if (!mounted || !isSupported) return null;

  const text = getTextToSpeak();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 150));

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-secondary-10 bg-accent1-5">
      <div className="flex items-center gap-3 p-3">
        {!isPlaying ? (
          <button
            onClick={playSpeech}
            disabled={!voiceAvailable}
            aria-label={t("listen.play")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent1 text-white transition-colors hover:bg-accent1-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlayIcon />
          </button>
        ) : (
          <button
            onClick={togglePause}
            aria-label={isPaused ? t("listen.play") : t("listen.pause")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent1 text-white transition-colors hover:bg-accent1-80"
          >
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <HeadphoneIcon />
              {t("listen.title")}
            </span>
            <span className="text-xs text-secondary">~{readingMinutes} min</span>
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary-10">
            <div
              className="h-full rounded-full bg-accent1 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {isPlaying && (
          <button
            onClick={stopSpeech}
            aria-label={t("listen.stop")}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary-10 transition-colors hover:bg-secondary-20"
          >
            <StopIcon />
          </button>
        )}
      </div>

      {!voiceAvailable && (
        <div className="border-t border-secondary-10 px-3 py-2 text-xs text-secondary">
          {t("listen.unavailable")}
        </div>
      )}
    </div>
  );
};

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
