"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger and close icons
import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";

const styles = [
  "realistic",
  "anime",
  "cinematic lighting",
  "3D render",
  "oil painting",
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const generateRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Generate image using backend API
  const handleGenerate = async () => {
    const finalPrompt = `${prompt} ${style}`.trim();
    if (!finalPrompt) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to generate image");

      setImageUrl(data.url);
      setHistory((prev) => [data.url, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Image generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Download generated image
  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-image.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black text-white">
  <ParticlesBackground />
      {/* Navbar */}
     <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10 py-4 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between w-full sm:w-auto items-center">
          <h1 className="text-2xl font-bold text-white">Image Generator</h1>
          
          <button
            className="sm:hidden text-2xl text-indigo-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <nav
          className={`flex flex-col sm:flex-row sm:items-center w-full sm:w-auto gap-2 sm:gap-6 mt-2 sm:mt-0 ${
            menuOpen ? "flex" : "hidden sm:flex"
          }`}
        >
          <Link href="/" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <a
            href="#generate"
            onClick={(e) => {
              e.preventDefault();
              generateRef.current?.scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
            }}
            className="hover:text-indigo-600"
          >
            Generate
          </a>
          <a href="#features" className="hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Features</a>
          <Link
            href="/contact"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero */}
     <section className="text-center py-28 px-6">

<motion.h1
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text"
>
Create AI Images Instantly
</motion.h1>

<motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="text-gray-300 max-w-2xl mx-auto mb-10"
>
Turn your imagination into stunning visuals with AI-powered image generation.
</motion.p>

<motion.button
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.95 }}
 className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
>
Start Generating
</motion.button>

</section>

      {/* Features */}
      <section
        id="features"
        className="py-1 px-4 sm:px-8 max-w-6xl mx-auto grid sm:grid-cols-3 gap-6 sm:gap-8 text-center"
      >
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
          <p className="text-x1 font-semibold mb-2">Generate High-quality Images within seconds</p>
        </div>
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Creative Prompts</h3>
          <p className="text-x1 font-semibold mb-2">Use prompts and styles to guide your visuals.</p>
        </div>
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/10">
          <h3 className="text-xl font-semibold mb-2">Download Images</h3>
          <p className="text-x1 font-semibold mb-2">Save generated images directly to your device.</p>
        
        </div>
      </section>

      {/* Generator */}
      <section id="generate" ref={generateRef} className="flex flex-col items-center py-12 px- sm:px- w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-6">Create your Image</h2>

        {/* Prompt Input */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full max-w-xl">
          <input
            type="text"
            placeholder="Describe your image..."
            value={prompt}
            disabled={loading}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
            className="px-4 py-2 border rounded-lg w-full"
          />
         <button
  onClick={handleGenerate}
  disabled={loading}
 className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90"
>
  {loading ? "Generating..." : "Generate Image"}
</button>
        </div>

        {/* Style selector */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center w-full max-w-xl">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-2 rounded-full border text-sm sm:text-base ${
                style === s ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
              } w-full sm:w-auto text-center`}
            >
              {s}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Generated Image */}
        {imageUrl && (
          <div className="mt-6 text-center w-full max-w-xl">
            <Image
              src={imageUrl}
              alt="Generated"
              width={800}
              height={600}
              className="rounded-lg shadow w-full h-auto"
            />
            <button
              onClick={handleDownload}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
            >
              Download Image
            </button>
          </div>
        )}
      </section>

      {/* History */}
      {history.length > 0 && (
        <section className="max-w-6xl mx-auto py-12 px-4 sm:px-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Generated History</h3>
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {history.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`history-${i}`}
                width={300}
                height={200}
                className="rounded-lg shadow w-full h-auto"
              />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        © {new Date().getFullYear()} AI Image Generator
      </footer>
    </div>
  );
}