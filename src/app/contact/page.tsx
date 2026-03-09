"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Failed to send message.");
        setLoading(false);
        return;
      }

      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Error sending message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center py-20 px-4
        bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
        transition-colors"
      >

        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Contact Us
        </h1>

        <p className="mb-10 text-center text-gray-700 dark:text-gray-300 max-w-xl">
          Have questions or feedback? Fill out the form below and we’ll get back to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-100 dark:bg-slate-800
            p-8 rounded-2xl shadow-lg dark:shadow-black/40
            space-y-4 border border-gray-200 dark:border-slate-700 transition-colors"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg
              bg-gray-50 dark:bg-slate-900
              text-black dark:text-white
              border border-gray-300 dark:border-slate-700
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg
              bg-gray-50 dark:bg-slate-900
              text-black dark:text-white
              border border-gray-300 dark:border-slate-700
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            required
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-lg
              bg-gray-50 dark:bg-slate-900
              text-black dark:text-white
              border border-gray-300 dark:border-slate-700
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold
              rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="text-center text-gray-700 dark:text-gray-300 mt-2">
              {status}
            </p>
          )}
        </form>

        <div className="mt-10 text-center text-gray-600 dark:text-gray-400 space-y-1">
          <p>
            Email:{" "}
            <a href="mailto:freshtegenu@gmail.com" className="text-indigo-600">
              freshtegenu@gmail.com
            </a>
          </p>

          <p>
            Phone:{" "}
            <a href="tel:+251911801241" className="text-indigo-600">
              +251 911 801 241
            </a>
          </p>
        </div>
      </div>
    </>
  );
}