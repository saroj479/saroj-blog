"use client";
import { useState } from "react";

export default function BuyMeACoffee() {
  const [amount, setAmount] = useState(2);
  const [custom, setCustom] = useState("");

  const handleSelect = (value) => {
    setAmount(value);
    setCustom("");
  };

  const handleCustom = (e) => {
    setCustom(e.target.value);
    setAmount(Number(e.target.value) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black p-4 overflow-hidden">
      {/* Universe background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1500&q=80"
          alt="Universe background"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>
      <h1 className="mb-6 z-10 text-3xl font-bold text-gray-100 flex items-center gap-2">
        Buy Me a Coffee <span role="img" aria-label="coffee">☕</span>
      </h1>
      <form onSubmit={handleSubmit} className="z-10 w-full max-w-sm space-y-4 rounded-xl bg-white/90 p-8 shadow-2xl border border-gray-200 backdrop-blur-md">
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => handleSelect(2)} className={`border rounded px-4 py-2 text-gray-900 font-semibold transition ${amount===2 ? 'bg-yellow-300' : 'bg-gray-100 hover:bg-yellow-200'}`}>Coffee (€2)</button>
          <button type="button" onClick={() => handleSelect(7)} className={`border rounded px-4 py-2 text-gray-900 font-semibold transition ${amount===7 ? 'bg-yellow-300' : 'bg-gray-100 hover:bg-yellow-200'}`}>Guinness Pint (€7)</button>
          <input type="number" min="1" placeholder="Custom amount" value={custom} onChange={handleCustom} className="border rounded px-4 py-2 text-gray-900 bg-gray-200 focus:bg-white focus:outline-accent1" />
        </div>
        <button type="submit" className="w-full rounded bg-yellow-400 py-2 font-semibold text-black transition hover:bg-yellow-500 shadow">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
} 