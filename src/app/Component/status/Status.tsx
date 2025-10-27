'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Result {
  like: number;
  view: number;
}

const modernColors = {
  like: '#ff6b6b',
  view: '#4dabf7',
  cardBg: 'rgba(255,255,255,0.95)',
  border: '#e3e8ee',
};

const StatsCard: React.FC<{ result: Result }> = ({ result }) => {
  const [view, setView] = useState(0);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const API_URL = process.env.NEXT_PUBLIC_URL || 'https://portfo1.vercel.app/';

  // Calculate dates for display
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const progressPercentage = Math.floor((today.getDate() / daysInMonth) * 100);

  // Load initial data and increment view on mount
  useEffect(() => {
    if (result) {
      setView(result.view);
      setLike(result.like);
      setLoading(false);
      
      // Increment view immediately on component mount
      incrementViewCount(result.view);
    }
    
    // Use beforeunload to ensure the request completes even if page closes
    const sendBeaconData = new FormData();
    sendBeaconData.append('view', String(result?.view ? result.view + 1 : 1));
    
    // Use Navigator.sendBeacon for more reliable tracking on page close
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API_URL}status`, sendBeaconData);
    }
  }, [result]);

  // Function to increment view count
  const incrementViewCount = async (currentViews: number) => {
    const updatedView = currentViews + 1;
    setView(updatedView);
    
    try {
      setTimeout(() => {
        axios.post(`${API_URL}status`, { view: updatedView })
          .catch(() => {});
      }, 0);
    } catch {
      // Silent catch
    }
  };

  const handleLike = async () => {
    const updatedLike = liked ? like - 1 : like + 1;
    setLiked(!liked);
    setLike(updatedLike);
    try {
      await axios.post(`${API_URL}status`, { like: updatedLike });
      
      // Show tooltip feedback
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } catch {
      setLiked(liked);
      setLike(like);
    }
  };

  const total = like + view;
  const likePercent = total ? ((like / total) * 100).toFixed(1) : '0';
  const viewPercent = total ? ((view / total) * 100).toFixed(1) : '0';
  
  // Calculate daily average
  const daysPassed = Math.max(1, today.getDate());
  const dailyViewAverage = Math.round(view / daysPassed);

  if (loading) {
    return (
      <motion.div
        className="flex flex-col items-center mx-auto w-[90%] sm:w-[85%] md:w-[75%] lg:w-[480px]"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: `1.5px solid ${modernColors.border}`,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-3 sm:px-5 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Portfolio Stats</h3>
        </div>
        <div className="flex flex-wrap w-full justify-around gap-4 sm:gap-8 px-3 sm:px-4 py-6 sm:py-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1 min-w-[120px] sm:min-w-[140px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-t-2 border-t-transparent border-gray-300 animate-spin"></div>
              <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3">Loading...</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium mt-1">{i === 0 ? 'Likes' : 'Views'}</div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center mx-auto w-[90%] sm:w-[85%] md:w-[75%] lg:w-[480px]"
      style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: `1.5px solid ${modernColors.border}`,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="w-full px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-100 flex justify-between items-center">
        <div className="text-xs sm:text-sm text-gray-500">{startDate.toLocaleDateString()} - Today</div>
      </div>
      
      {/* Main Stats */}
      <div className="flex flex-wrap w-full justify-around gap-4 sm:gap-8 px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col items-center flex-1 min-w-[120px] sm:min-w-[140px] relative">
          {showTooltip && liked && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -40 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 bg-green-500 text-white px-3 py-1 rounded-full text-xs shadow-lg whitespace-nowrap z-10"
            >
              Thanks for the like!
            </motion.div>
          )}
          {showTooltip && !liked && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -40 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 bg-gray-700 text-white px-3 py-1 rounded-full text-xs shadow-lg whitespace-nowrap z-10"
            >
              Like removed
            </motion.div>
          )}
          <button
            onClick={handleLike}
            className={`rounded-full p-2 sm:p-3 bg-white shadow-md transition-all duration-300 border-2 ${
              liked ? 'border-[#ff6b6b] scale-110' : 'border-gray-200 hover:scale-105'
            }`}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? modernColors.like : 'none'}
              stroke={modernColors.like}
              viewBox="0 0 24 24"
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 ${liked ? 'scale-110' : ''}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <motion.div 
            className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3" 
            style={{ color: modernColors.like }}
            key={like}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {like}
          </motion.div>
          <div className="text-sm sm:text-base text-gray-700 font-medium mt-1">Likes</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{likePercent}% of engagement</div>
        </div>

        <div className="flex flex-col items-center flex-1 min-w-[120px] sm:min-w-[140px]">
          <div className="rounded-full p-2 sm:p-3 bg-white shadow-md border-2 border-[#4dabf7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={modernColors.view}
              viewBox="0 0 24 24"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <motion.div 
            className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3" 
            style={{ color: modernColors.view }}
            key={view}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {view}
          </motion.div>
          <div className="text-sm sm:text-base text-gray-700 font-medium mt-1">Views</div>
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{viewPercent}% of engagement</div>
        </div>
      </div>
      
      {/* Additional Statistics */}
      <div className="w-full px-3 sm:px-5 py-3 sm:py-4 border-t border-gray-100 space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-xs sm:text-sm text-gray-700">Average views per day</div>
          <div className="text-xs sm:text-sm text-black font-medium">{dailyViewAverage}</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="text-xs sm:text-sm text-gray-700">Month progress</div>
            <div className="text-[10px] sm:text-xs text-gray-500">{progressPercentage}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 sm:h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-1">
          <div className="text-xs sm:text-sm font-medium text-gray-700">21% more than last month</div>
          <div className="flex items-center text-xs sm:text-sm text-green-600 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            +21%
          </div>
        </div>
      </div>
      
      {/* Share Section */}
      <div className="w-full px-3 sm:px-5 py-3 sm:py-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <button 
            className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition flex items-center gap-1 touch-action-manipulation"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Check out my portfolio',
                  url: window.location.href
                }).catch(() => {});
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <div className="text-[10px] sm:text-xs text-gray-500 truncate ml-2">Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
