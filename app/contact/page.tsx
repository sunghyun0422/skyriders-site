'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus('✅ Sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('❌ Failed to send');
    }
  }

  return (
    <div className="max-w-xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Apply / Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
