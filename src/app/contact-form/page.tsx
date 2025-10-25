
"use client";

import Aurora from "@/components/Backgrounds/Aurora";
import { useState } from "react";


export default function ContactFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      console.log({ name, email, message });
      setTimeout(() => {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      }, 1000);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#7CFF67", "#FF3232"]}
          amplitude={1.0}
          blend={0.4}
          speed={1.0}
        />
      </div>

      {/* Form Card */}
      <div className="relative z-10 max-w-lg w-full bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center text-shadow-glow">
          Contact Us
        </h2>

        {success && (
          <p className="text-green-400 mb-4 text-center font-medium text-shadow-glow">
            Message sent successfully!
          </p>
        )}
        {error && (
          <p className="text-red-400 mb-4 text-center font-medium text-shadow-glow">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-white/20 bg-black/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-white/20 bg-black/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-white/20 bg-black/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white font-medium hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
