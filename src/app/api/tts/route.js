import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

/**
 * Text-to-Speech API using Microsoft Edge neural voices.
 * Free, no API key needed. Produces natural human-like speech.
 *
 * POST /api/tts
 * Body: { text: string, language: "en" | "es" | "ne" }
 * Returns: audio/mpeg stream
 */

// Simple rate limiter: max 10 TTS requests per IP per minute
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const VOICE_MAP = {
  en: "en-US-AriaNeural", // Natural female English voice
  es: "es-ES-ElviraNeural", // Natural female Spanish voice
  ne: "ne-NP-HemkalaNeural", // Natural female Nepali voice
};

// Limit text length to prevent abuse (roughly 15-20 min of audio)
const MAX_TEXT_LENGTH = 15000;

export async function POST(req) {
  try {
    // Rate limit check
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    const { text, language = "en" } = await req.json();

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    // Truncate if too long
    const cleanText = text.slice(0, MAX_TEXT_LENGTH).trim();

    if (!cleanText) {
      return Response.json({ error: "Text is empty" }, { status: 400 });
    }

    const voice = VOICE_MAP[language] || VOICE_MAP.en;

    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    const { audioStream } = tts.toStream(cleanText);

    // Collect chunks from the readable stream
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    if (audioBuffer.length === 0) {
      return Response.json(
        { error: "Failed to generate audio" },
        { status: 500 }
      );
    }

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400", // Cache for 24h
      },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return Response.json(
      { error: "Text-to-speech generation failed" },
      { status: 500 }
    );
  }
}
