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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-6 text-3xl font-bold">Buy Me a Coffee ☕</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded bg-white p-6 shadow-md">
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => handleSelect(2)} className={`border rounded px-4 py-2 ${amount===2 ? 'bg-yellow-300' : 'bg-gray-100'}`}>Coffee (€2)</button>
          <button type="button" onClick={() => handleSelect(7)} className={`border rounded px-4 py-2 ${amount===7 ? 'bg-yellow-300' : 'bg-gray-100'}`}>Guinness Pint (€7)</button>
          <input type="number" min="1" placeholder="Custom amount" value={custom} onChange={handleCustom} className="border rounded px-4 py-2" />
        </div>
        <button type="submit" className="w-full rounded bg-yellow-400 py-2 font-semibold text-black transition hover:bg-yellow-500">Proceed to Payment</button>
      </form>
    </div>
  );
} 