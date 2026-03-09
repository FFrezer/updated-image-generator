'use client';
import { useState } from 'react';

export default function PrototypePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${searchTerm}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      setImageUrl(data?.urls?.regular || '');
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex flex-col items-center justify-center px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">🚀 AI Prototype Page</h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        You're all set — let's build something awesome!
      </p>

      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Try something like 'sunset mountains'"
          className="px-4 py-2 rounded border w-64 focus:outline-none focus:ring"
        />
        <button
          onClick={fetchImage}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Generate
        </button>
      </div>

      {loading && <p className="text-gray-500">Generating...</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated from Unsplash"
          className="mt-6 w-full max-w-md rounded shadow"
        />
      )}
    </div>
  );
}
