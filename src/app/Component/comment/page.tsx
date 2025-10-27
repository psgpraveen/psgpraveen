"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaRegHeart, FaReply, FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script";
import { useInView } from "react-intersection-observer";

interface Comment {
  id?: string;
  Name: string;
  comment: string;
  Time: string;
  likes?: number;
  isLiked?: boolean;
  isOwner?: boolean;
  isVerified?: boolean;
  avatar?: string;
}

// Sort options
type SortOption = "newest" | "oldest" | "popular";

const API_URL =
  process.env.NEXT_PUBLIC_REACT_APP_URL ||
  process.env.NEXT_PUBLIC_URL ||
  "http://localhost:5000";

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [filterVerified, setFilterVerified] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // For lazy loading the comment form
  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Max character limit for comments
  const MAX_CHARS = 500;

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}comment`);
        // Enhance the comment data
        const enhancedComments = res.data.map((comment: Comment, index: number) => ({
          ...comment,
          id: comment.id || `comment-${index}-${Date.now()}`,
          likes: Math.floor(Math.random() * 10), // Simulate likes
          isLiked: false,
          isOwner: false,
          isVerified: index % 5 === 0, // Simulate some verified comments
        }));
        setComments(enhancedComments);
        sortAndFilterComments(enhancedComments, sortOption, filterVerified);
      } catch (e) {
        console.error("Failed to fetch comments:", e);
        toast.error("Couldn't load comments. Please try again later.");
        setComments([]);
      }
      setLoading(false);
    };
    fetchComments();
  }, []);

  // Sort and filter comments
  const sortAndFilterComments = (commentsToSort: Comment[], sort: SortOption, onlyVerified: boolean) => {
    let sorted = [...commentsToSort];
    
    // Apply sorting
    switch (sort) {
      case "newest":
        sorted = sorted.sort((a, b) => new Date(b.Time).getTime() - new Date(a.Time).getTime());
        break;
      case "oldest":
        sorted = sorted.sort((a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime());
        break;
      case "popular":
        sorted = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
    }
    
    // Apply filtering
    if (onlyVerified) {
      sorted = sorted.filter(comment => comment.isVerified);
    }
    
    setFilteredComments(sorted);
    // Reset active index when sorting/filtering changes
    setActiveIndex(0);
  };

  useEffect(() => {
    sortAndFilterComments(comments, sortOption, filterVerified);
  }, [comments, sortOption, filterVerified]);

  useEffect(() => {
    if (filteredComments.length < 2 || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredComments.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [filteredComments, isPaused]);

  useEffect(() => {
    if (cardRef.current?.parentElement) {
      cardRef.current.parentElement.style.height =
        cardRef.current.offsetHeight + "px";
    }
  }, [activeIndex, filteredComments]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!message.trim()) return toast.error("Please enter your thoughts.");
    if (message.length > MAX_CHARS) return toast.error(`Comment is too long (max ${MAX_CHARS} characters).`);

    setSending(true);
    try {
      const commentData = {
        id: `comment-${Date.now()}`,
        Name: name.trim(),
        comment: message.trim(),
        Time: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        isOwner: true, // Mark as owner since the user created it
        isVerified: false,
      };
      
      // In a real app, you'd send this to the backend
      await axios.post(`${API_URL}comment`, commentData);
      
      // Add to local state
      setComments(prev => [commentData, ...prev]);
      setMessage("");
      toast.success("Your comment has been posted!");
    } catch (error) {
      console.error("Failed to post comment:", error);
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
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const handleLikeComment = (id: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === id 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? (comment.likes || 1) - 1 : (comment.likes || 0) + 1
            } 
          : comment
      )
    );
  };

  const handleReplyClick = (name: string) => {
    setMessage(prev => `@${name} ${prev}`);
    // Focus on the textarea
    document.getElementById('comment-textarea')?.focus();
  };

  // For a smooth progress bar that resets on comment change
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isPaused || filteredComments.length < 1) return;
    
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / 6000) * 100; // 6000ms = 6 seconds
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, filteredComments.length]);

  return (
    <section className="py-12 md:py-16 " aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" />
        
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            What People Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what others have to say about their experience working with us.
            We value every feedback and continuously strive to improve.
          </p>
        </div>

        {/* Controls - Sort and Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center rounded-full bg-white shadow-sm border border-gray-100 p-1">
            <button 
              className={`flex items-center px-3 py-1.5 text-sm rounded-full ${
                sortOption === "newest" ? "bg-blue-100 text-blue-800" : "text-gray-600"
              }`}
              onClick={() => setSortOption("newest")}
              aria-pressed={sortOption === "newest"}
            >
              <FaSortAmountDown className="mr-1.5" size={12} />
              Newest
            </button>
            <button 
              className={`flex items-center px-3 py-1.5 text-sm rounded-full ${
                sortOption === "oldest" ? "bg-blue-100 text-blue-800" : "text-gray-600"
              }`}
              onClick={() => setSortOption("oldest")}
              aria-pressed={sortOption === "oldest"}
            >
              <FaSortAmountUp className="mr-1.5" size={12} />
              Oldest
            </button>
            <button 
              className={`flex items-center px-3 py-1.5 text-sm rounded-full ${
                sortOption === "popular" ? "bg-blue-100 text-blue-800" : "text-gray-600"
              }`}
              onClick={() => setSortOption("popular")}
              aria-pressed={sortOption === "popular"}
            >
              <FaHeart className="mr-1.5" size={12} />
              Popular
            </button>
          </div>
          
          <button 
            className={`flex items-center px-4 py-1.5 text-sm rounded-full border ${
              filterVerified 
                ? "bg-green-100 text-green-800 border-green-200" 
                : "bg-white text-gray-600 border-gray-100"
            } shadow-sm`}
            onClick={() => setFilterVerified(!filterVerified)}
            aria-pressed={filterVerified}
          >
            <FaFilter className="mr-1.5" size={12} />
            {filterVerified ? "All Comments" : "Verified Only"}
          </button>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative flex flex-col items-center mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Progress Bar */}
          {filteredComments.length > 1 && !isPaused && (
            <div className="w-full max-w-lg h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          )}

          {/* Comments Display */}
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
                  className="flex flex-col items-center justify-center h-full py-12"
                >
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">Loading comments...</p>
                </motion.div>
              ) : filteredComments.length > 0 ? (
                <motion.article
                  key={filteredComments[activeIndex].id}
                  ref={cardRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20
                  }}
                  className="absolute w-full max-w-2xl mx-auto bg-white rounded-xl p-6 sm:p-8 flex flex-col items-start shadow-lg"
                  aria-label={`Testimonial from ${filteredComments[activeIndex].Name}`}
                  style={{
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    top: 0,
                  }}
                >
                  {/* Comment Header */}
                  <div className="flex items-center w-full mb-5">
                    <div className="flex-shrink-0">
                      {filteredComments[activeIndex].avatar ? (
                        <img 
                          src={filteredComments[activeIndex].avatar} 
                          alt="" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-medium shadow-inner">
                          {filteredComments[activeIndex].Name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {filteredComments[activeIndex].Name}
                        </h3>
                        {filteredComments[activeIndex].isVerified && (
                          <MdVerified className="ml-1.5 text-blue-500" title="Verified" />
                        )}
                        {filteredComments[activeIndex].isOwner && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {getTimeAgo(filteredComments[activeIndex].Time)}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleReplyClick(filteredComments[activeIndex].Name)}
                        className="mr-3 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Reply to this comment"
                      >
                        <FaReply size={16} />
                      </button>
                      <button 
                        onClick={() => handleLikeComment(filteredComments[activeIndex].id || '')}
                        className={`flex items-center gap-1 ${
                          filteredComments[activeIndex].isLiked 
                            ? "text-red-500" 
                            : "text-gray-400 hover:text-red-500"
                        } transition-colors`}
                        aria-label={`${filteredComments[activeIndex].isLiked ? 'Unlike' : 'Like'} this comment`}
                        aria-pressed={filteredComments[activeIndex].isLiked}
                      >
                        {filteredComments[activeIndex].isLiked ? (
                          <FaHeart size={16} />
                        ) : (
                          <FaRegHeart size={16} />
                        )}
                        <span className="text-xs font-medium">
                          {filteredComments[activeIndex].likes || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Comment Body */}
                  <div className="bg-gray-50 p-4 rounded-lg w-full">
                    <p className="text-base text-gray-800 whitespace-pre-line">
                      {filteredComments[activeIndex].comment}
                    </p>
                  </div>

                  {/* Comment Quote Design Elements */}
                  <svg className="absolute top-8 right-8 text-gray-200 opacity-20" width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M13.5,10.5c-1.7,0-3.3,0.7-4.5,1.9S7.1,15.2,7.1,16.9c0,3.5,2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S17,10.5,13.5,10.5z"/>
                    <path d="M26.5,10.5c-1.7,0-3.3,0.7-4.5,1.9s-1.9,2.8-1.9,4.5c0,3.5,2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S30,10.5,26.5,10.5z"/>
                  </svg>
                </motion.article>
              ) : (
                <motion.div
                  key="no-comments"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500">No comments yet - be the first to write your thoughts!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          {filteredComments.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {filteredComments.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to comment ${idx + 1}`}
                  aria-current={activeIndex === idx ? "true" : "false"}
                />
              ))}
            </div>
          )}
          
          {/* Navigation Arrows for larger screens */}
          {filteredComments.length > 1 && (
            <>
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + filteredComments.length) % filteredComments.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 hidden sm:flex"
                aria-label="Previous comment"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % filteredComments.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 hidden sm:flex"
                aria-label="Next comment"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Enhanced Comment Form */}
        <motion.div 
          ref={formRef}
          initial={{ opacity: 0, y: 40 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100"
        >
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-blue-600 rounded-full mr-3"></div>
            <h3 className="text-xl font-bold text-gray-900">
              Share Your Thoughts
            </h3>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSend}
            aria-label="Comment form"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sending}
                aria-required="true"
                maxLength={50}
              />
            </div>
            
            <div>
              <label htmlFor="comment-textarea" className="block text-sm font-medium text-gray-700 mb-1">
                Your Comment
              </label>
              <div className="relative">
                <textarea
                  id="comment-textarea"
                  rows={3}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Share your experience..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setMessageLength(e.target.value.length);
                  }}
                  disabled={sending}
                  aria-required="true"
                  maxLength={MAX_CHARS}
                />
                <div className="absolute bottom-3 right-3 text-xs font-medium text-gray-500">
                  {messageLength}/{MAX_CHARS}
                </div>
              </div>
            </div>

            <div className="flex items-center pt-2">
              <button
                type="submit"
                disabled={sending || !name.trim() || !message.trim() || message.length > MAX_CHARS}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto ${
                  sending || !name.trim() || !message.trim() || message.length > MAX_CHARS
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
                    Post Comment
                  </>
                )}
              </button>
              
              <p className="ml-4 text-xs text-gray-500 hidden sm:block">
                Your comment will be visible after review.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Comment guidelines */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By submitting a comment, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              community guidelines
            </a>
            .
          </p>
        </div>
      </div>

      {/* Structured Data for SEO */}
      {filteredComments.length > 0 && (
        <Script id="testimonial-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Comment",
            "author": {
              "@type": "Person",
              "name": filteredComments[activeIndex].Name,
            },
            "text": filteredComments[activeIndex].comment,
            "dateCreated": filteredComments[activeIndex].Time,
          })}
        </Script>
      )}
    </section>
  );
};

export default CommentSection;
