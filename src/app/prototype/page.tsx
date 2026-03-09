'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PrototypePage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(''); // clear old image
    setError(''); // reset error message
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${prompt}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      
      // Log the full response data for debugging
      console.log("Response data from Unsplash API:", data);
  
      // Check if data exists and if the structure matches what we expect
      if (data && data.urls && data.urls.regular) {
        setImageUrl(data.urls.regular);
      } else {
        console.error("Image URL not found in response:", data);
        setError("No image returned from API.");
      }
      
    } catch (error) {
      // Catch any errors and set error state
      console.error('Error fetching image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };       

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-white text-gray-800 px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">🚀 AI Image Generator</h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type anything (optional)..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleGenerate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Generate Image
        </button>
      </div>

      {loading && <p className="mt-6 text-purple-500 text-lg animate-pulse">Loading image...</p>}

      {error && <p className="mt-6 text-red-500 text-lg">{error}</p>}

      {imageUrl && !loading && (
        <Image
          src={imageUrl}
          alt="Generated"
          width={800}
          height={600}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
    </main>
  );
}
