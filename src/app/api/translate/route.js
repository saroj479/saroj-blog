import { NextResponse } from "next/server";

/**
 * Translation API route.
 * Primary: free Google Translate endpoint (no key, generous limits).
 * Fallback: MyMemory Translation API.
 * Server-side in-memory cache to avoid redundant external calls.
 *
 * POST /api/translate
 * Body: { text: string, sourceLang: string, targetLang: string }
 */

// Simple in-memory LRU cache (survives across requests in the same serverless instance)
const cache = new Map();
const MAX_CACHE = 200;

function getCached(key) {
  if (cache.has(key)) {
    const val = cache.get(key);
    // Move to end (most recently used)
    cache.delete(key);
    cache.set(key, val);
    return val;
  }
  return null;
}

function setCache(key, value) {
  if (cache.size >= MAX_CACHE) {
    // Delete oldest entry
    const first = cache.keys().next().value;
    cache.delete(first);
  }
  cache.set(key, value);
}

export async function POST(request) {
  try {
    const { text, sourceLang = "en", targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: "Missing required fields: text, targetLang" },
        { status: 400 }
      );
    }

    if (sourceLang === targetLang) {
      return NextResponse.json({ translatedText: text });
    }

    // Check server cache
    const cacheKey = `${sourceLang}|${targetLang}|${text.slice(0, 100)}|${text.length}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return NextResponse.json({ translatedText: cached });
    }

    const langMap = { en: "en", es: "es", ne: "ne" };
    const from = langMap[sourceLang] || sourceLang;
    const to = langMap[targetLang] || targetLang;

    // Split into chunks — Google handles up to ~5000 chars, but stay safe at 4000
    const chunks = splitTextIntoChunks(text, 4000);
    const translatedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      // Try Google first, fall back to MyMemory
      let translated = await translateWithGoogle(chunks[i], from, to);
      if (!translated) {
        translated = await translateWithMyMemory(chunks[i], from, to);
      }
      translatedChunks.push(translated || chunks[i]);
    }

    const translatedText = translatedChunks.join("\n\n");

    // Cache result
    setCache(cacheKey, translatedText);

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed", translatedText: null },
      { status: 500 }
    );
  }
}

// ── Google Translate (free, no key) ──────────────────────────────────────────
async function translateWithGoogle(text, from, to) {
  try {
    const url =
      `https://translate.googleapis.com/translate_a/single` +
      `?client=gtx&sl=${from}&tl=${to}&dt=t` +
      `&q=${encodeURIComponent(text)}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.warn("Google Translate HTTP", res.status);
      return null;
    }

    const data = await res.json();

    // Response shape: [[["translated","original",…], …], …]
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0]
        .filter(Array.isArray)
        .map((seg) => seg[0])
        .join("");
    }

    return null;
  } catch (err) {
    console.warn("Google Translate error:", err.message);
    return null;
  }
}

// ── MyMemory fallback ────────────────────────────────────────────────────────
async function translateWithMyMemory(text, from, to) {
  try {
    // MyMemory caps at ~500 chars per request, so split further if needed
    const subChunks = splitTextIntoChunks(text, 450);
    const parts = [];

    for (let i = 0; i < subChunks.length; i++) {
      if (i > 0) await delay(500);

      const emailParam = process.env.MYMEMORY_EMAIL
        ? `&de=${encodeURIComponent(process.env.MYMEMORY_EMAIL)}`
        : "";

      const url =
        `https://api.mymemory.translated.net/get` +
        `?q=${encodeURIComponent(subChunks[i])}` +
        `&langpair=${from}|${to}${emailParam}`;

      const res = await fetch(url, {
        headers: { "User-Agent": "SarojBlog/1.0" },
      });

      if (!res.ok) {
        console.warn("MyMemory HTTP", res.status);
        parts.push(subChunks[i]);
        continue;
      }

      const data = await res.json();
      parts.push(data.responseData?.translatedText || subChunks[i]);
    }

    return parts.join(" ");
  } catch (err) {
    console.warn("MyMemory error:", err.message);
    return null;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function splitTextIntoChunks(text, maxLength) {
  if (text.length <= maxLength) return [text];

  const paragraphs = text.split("\n\n");
  const chunks = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length + 2 > maxLength) {
      if (currentChunk) chunks.push(currentChunk.trim());
      if (paragraph.length > maxLength) {
        const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
        let sentenceChunk = "";
        for (const sentence of sentences) {
          if (sentenceChunk.length + sentence.length > maxLength) {
            if (sentenceChunk) chunks.push(sentenceChunk.trim());
            sentenceChunk = sentence;
          } else {
            sentenceChunk += sentence;
          }
        }
        if (sentenceChunk) currentChunk = sentenceChunk;
      } else {
        currentChunk = paragraph;
      }
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
    }
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}
