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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, filterVerified]);

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
    <section className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-pulse"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Toaster position="top-center" />
        
        {/* Enhanced Header with better styling */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4 shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Testimonials & Reviews
            </span>
          </motion.div>
          
          <motion.h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What People Say
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Read what others have to say about their experience working with us.
            We value every feedback and continuously strive to improve.
          </motion.p>
        </div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: "Total Reviews", value: comments.length, icon: "💬" },
            { label: "Verified Users", value: comments.filter(c => c.isVerified).length, icon: "✓" },
            { label: "Average Rating", value: "4.8/5", icon: "⭐" },
            { label: "Response Rate", value: "100%", icon: "⚡" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Enhanced Controls - Sort and Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 p-1.5">
            <button 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                sortOption === "newest" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setSortOption("newest")}
              aria-pressed={sortOption === "newest" ? "true" : "false"}
            >
              <FaSortAmountDown className="mr-2" size={14} />
              Newest
            </button>
            <button 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                sortOption === "oldest" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setSortOption("oldest")}
              aria-pressed={sortOption === "oldest" ? "true" : "false"}
            >
              <FaSortAmountUp className="mr-2" size={14} />
              Oldest
            </button>
            <button 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                sortOption === "popular" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setSortOption("popular")}
              aria-pressed={sortOption === "popular" ? "true" : "false"}
            >
              <FaHeart className="mr-2" size={14} />
              Popular
            </button>
          </div>
          
          <button 
            className={`flex items-center px-5 py-2 text-sm font-medium rounded-2xl border-2 transition-all duration-300 ${
              filterVerified 
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 shadow-lg" 
                : "bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:border-green-400 shadow-lg"
            }`}
            onClick={() => setFilterVerified(!filterVerified)}
            aria-pressed={filterVerified ? "true" : "false"}
          >
            <FaFilter className="mr-2" size={14} />
            {filterVerified ? "Show All" : "Verified Only"}
          </button>
        </motion.div>

        {/* Testimonial Carousel */}
        <div 
          className="relative flex flex-col items-center mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Enhanced Progress Bar */}
          {filteredComments.length > 1 && !isPaused && (
            <div className="w-full max-w-lg h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full mb-8 overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          )}

          {/* Comments Display */}
          <div
            className="relative w-full flex justify-center overflow-hidden min-h-[210px]"
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
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25
                  }}
                  className="absolute w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 flex flex-col items-start shadow-2xl border border-gray-100"
                  aria-label={`Testimonial from ${filteredComments[activeIndex].Name}`}
                  style={{
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    top: 0,
                  }}
                >
                  {/* Decorative gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 rounded-3xl"></div>
                  
                  {/* Comment Header */}
                  <div className="flex items-center w-full mb-6 relative z-10">
                    <div className="flex-shrink-0">
                      {filteredComments[activeIndex].avatar ? (
                        <img 
                          src={filteredComments[activeIndex].avatar} 
                          alt="" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-blue-100">
                          {filteredComments[activeIndex].Name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-5 flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {filteredComments[activeIndex].Name}
                        </h3>
                        {filteredComments[activeIndex].isVerified && (
                          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                            <MdVerified className="mr-1" title="Verified" />
                            Verified
                          </span>
                        )}
                        {filteredComments[activeIndex].isOwner && (
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 font-medium">
                        {getTimeAgo(filteredComments[activeIndex].Time)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleReplyClick(filteredComments[activeIndex].Name)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                        aria-label="Reply to this comment"
                        title="Reply"
                      >
                        <FaReply size={18} />
                      </button>
                      <button 
                        onClick={() => handleLikeComment(filteredComments[activeIndex].id || '')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                          filteredComments[activeIndex].isLiked 
                            ? "text-red-500 bg-red-50" 
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        aria-label={`${filteredComments[activeIndex].isLiked ? 'Unlike' : 'Like'} this comment`}
                        aria-pressed={filteredComments[activeIndex].isLiked ? "true" : "false"}
                      >
                        {filteredComments[activeIndex].isLiked ? (
                          <FaHeart size={18} />
                        ) : (
                          <FaRegHeart size={18} />
                        )}
                        <span className="text-sm font-semibold">
                          {filteredComments[activeIndex].likes || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Comment Body with better styling */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-2xl w-full relative z-10 shadow-inner">
                    <p className="text-base text-gray-800 whitespace-pre-line leading-relaxed">
                      {filteredComments[activeIndex].comment}
                    </p>
                  </div>

                  {/* Enhanced Quote Design Elements */}
                  <svg className="absolute top-10 right-10 text-blue-100 opacity-30" width="40" height="40" viewBox="0 0 30 30" fill="currentColor">
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

          {/* Enhanced Navigation Dots */}
          {filteredComments.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2.5 mt-10">
              {filteredComments.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8 shadow-md" 
                      : "bg-gray-300 w-2.5 hover:bg-gray-400 hover:w-4"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to comment ${idx + 1}`}
                  aria-current={activeIndex === idx ? "true" : "false"}
                />
              ))}
            </div>
          )}
          
          {/* Enhanced Navigation Arrows */}
          {filteredComments.length > 1 && (
            <>
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + filteredComments.length) % filteredComments.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 hidden sm:flex border border-gray-100"
                aria-label="Previous comment"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % filteredComments.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 hidden sm:flex border border-gray-100"
                aria-label="Next comment"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Enhanced Comment Form with modern design */}
        <motion.div 
          ref={formRef}
          initial={{ opacity: 0, y: 50 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="h-12 w-1.5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Share Your Thoughts
                </h3>
                <p className="text-sm text-gray-600 mt-1">We&apos;d love to hear from you!</p>
              </div>
            </div>

            <form
              className="space-y-6"
              onSubmit={handleSend}
              aria-label="Comment form"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={sending}
                  aria-required="true"
                  maxLength={50}
                />
              </div>
              
              <div>
                <label htmlFor="comment-textarea" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Comment <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="comment-textarea"
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-400 resize-none"
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
                  <div className={`absolute bottom-3 right-3 text-xs font-semibold ${
                    messageLength > MAX_CHARS * 0.9 ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {messageLength}/{MAX_CHARS}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={sending || !name.trim() || !message.trim() || message.length > MAX_CHARS}
                  className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    sending || !name.trim() || !message.trim() || message.length > MAX_CHARS
                      ? "opacity-60 cursor-not-allowed transform-none"
                      : ""
                  }`}
                >
                  {sending ? (
                    <>
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
                      Posting...
                    </>
                  ) : (
                    <>
                      <IoMdSend className="w-5 h-5" />
                      Post Comment
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your comment will be visible after review.
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Enhanced comment guidelines and trust badges */}
        <motion.div 
          className="mt-12 text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="font-medium">No Spam</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Moderated Content</span>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            By submitting a comment, you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:underline font-medium">
              community guidelines
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline font-medium">
              privacy policy
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Enhanced Structured Data for SEO */}
      {filteredComments.length > 0 && (
        <>
          {/* Individual Comment Schema */}
          <Script id="testimonial-jsonld" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Person",
                "name": "Praveen Kumar Gupta"
              },
              "author": {
                "@type": "Person",
                "name": filteredComments[activeIndex].Name,
              },
              "reviewBody": filteredComments[activeIndex].comment,
              "datePublished": filteredComments[activeIndex].Time,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            })}
          </Script>

          {/* Aggregate Rating Schema */}
          <Script id="aggregate-rating-jsonld" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Praveen Kumar Gupta",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "ratingCount": comments.length,
                "reviewCount": comments.length
              }
            })}
          </Script>

          {/* Breadcrumb Schema */}
          <Script id="breadcrumb-jsonld" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://psgpraveen.me"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Testimonials",
                  "item": "https://psgpraveen.me/#testimonials"
                }
              ]
            })}
          </Script>
        </>
      )}
    </section>
  );
};

export default CommentSection;
