"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script"; // for JSON-LD

interface Comment {
  Name: string;
  comment: string;
  Time: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_REACT_APP_URL ||
  process.env.NEXT_PUBLIC_URL ||
  "http://localhost:5000";

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}comment`);
        const sorted = res.data.sort(
          (a: Comment, b: Comment) =>
            new Date(b.Time).getTime() - new Date(a.Time).getTime()
        );
        setComments(sorted);
      } catch (e) {
        console.log(e);
        setComments([]);
      }
      setLoading(false);
    };
    fetchComments();
  }, []);

  useEffect(() => {
    if (comments.length < 2) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % comments.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [comments]);

  useEffect(() => {
    if (cardRef.current?.parentElement) {
      cardRef.current.parentElement.style.height =
        cardRef.current.offsetHeight + "px";
    }
  }, [activeIndex, comments]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!message.trim()) return toast.error("Please enter your thoughts.");

    setSending(true);
    try {
      const commentData = {
        Name: name.trim(),
        comment: message.trim(),
        Time: new Date().toISOString(),
      };
      await axios.post(`${API_URL}comment`, commentData);
      setComments([commentData, ...comments]);
      setActiveIndex(0);
      setMessage("");
      toast.success("Your comment has been posted!");
    } catch {
      toast.error("Failed to send comment. Please try again.");
    }
    setSending(false);
  };

  const getTimeAgo = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return "just now";
    if (diff < 60) return `${diff} min${diff > 1 ? "s" : ""} ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <section className="py-12" aria-labelledby="testimonials-heading">
      <Toaster position="top-center" />
      <h2
        id="testimonials-heading"
        className="text-3xl font-bold text-green-800 text-center mb-8"
      >
        What People Say
      </h2>

      <div className="relative flex flex-col overflow-hidden items-center">
        <div
          className="relative w-full flex justify-center overflow-hidden"
          style={{ minHeight: 210 }}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full text-gray-500 italic"
              >
                Loading comments...
              </motion.div>
            ) : comments.length > 0 ? (
              <motion.article
                key={activeIndex}
                ref={cardRef}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full max-w-md mx-auto bg-gray rounded-lg p-6 text-white flex flex-col items-start shadow-lg"
                aria-label={`Testimonial from ${comments[activeIndex].Name}`}
                style={{
                  left: 0,
                  right: 0,
                  backgroundColor: "skyblue",
                  margin: "0 auto",
                  top: 0,
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center text-green-700 text-4xl mr-4 shadow">
                    <FaUserCircle />
                  </div>
                  <div className="m-6">
                    <h3 className="text-lg font-semibold">
                      {comments[activeIndex].Name}
                    </h3>
                    <p className="text-xs opacity-75">
                      {getTimeAgo(comments[activeIndex].Time)}
                    </p>
                  </div>
                </div>
                <p className="text-base">{comments[activeIndex].comment}</p>
              </motion.article>
            ) : (
              <motion.div
                key="no-comments"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full text-gray-500 italic"
              >
                No comments yet - be the first to write your thoughts!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2 mt-6">
          {comments.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "bg-green-700" : "bg-green-300"
              }`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to comment ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-white-700 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-green-700 mb-3">
          Add your comment
        </h3>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSend}
          aria-label="Comment form"
        >
          <input
            type="text"
            className="p-2 rounded border border-green-300 focus:ring-2 focus:ring-green-500"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={sending}
            aria-label="Your name"
          />
          <textarea
            rows={2}
            className="p-2 rounded border border-green-300 focus:ring-2 focus:ring-green-500"
            placeholder="Your thoughts"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sending}
            aria-label="Your comment"
          />
          <button
            type="submit"
            disabled={sending || !name.trim() || !message.trim()}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-800 transition ${
              sending || !name.trim() || !message.trim()
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            {sending ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              <>
                <IoMdSend className="w-5 h-5" />
                Comment
              </>
            )}
          </button>
        </form>
      </div>

      {/* Structured Data for SEO */}
      {comments.length > 0 && (
        <Script id="testimonial-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Comment",
            "author": {
              "@type": "Person",
              "name": comments[activeIndex].Name,
            },
            "text": comments[activeIndex].comment,
            "dateCreated": comments[activeIndex].Time,
          })}
        </Script>
      )}
    </section>
  );
};

export default CommentSection;
