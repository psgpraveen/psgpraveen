'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Result {
  like: number;
  view: number;
}

const modernColors = {
  like: '#ff6b6b',
  view: '#4dabf7',
  cardBg: 'rgba(255,255,255,0.85)',
  border: '#e3e8ee',
};

const StatsCard: React.FC<{ result: Result }> = ({ result }) => {
  const [hasRun, setHasRun] = useState(false);
  const [ref, inView] = useInView();
  const [view, setView] = useState(0);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_URL || 'https://portfo1.vercel.app/';

  useEffect(() => {
    if (result) {
      setView(result.view);
      setLike(result.like);
      setLoading(false);
    }
  }, [result]);

  const handleLike = async () => {
    const updatedLike = liked ? like - 1 : like + 1;
    setLiked(!liked);
    setLike(updatedLike);
    try {
      await axios.post(`${API_URL}status`, { like: updatedLike });
    } catch {
      setLiked(liked);
      setLike(like);
    }
  };

  const handleView = async () => {
    const updatedView = view + 1;
    setView(updatedView);
    try {
      await axios.post(`${API_URL}status`, { view: updatedView });
    } catch {
      setView(view);
    }
  };

  useEffect(() => {
    if (inView && !hasRun) {
      handleView();
      setHasRun(true);
    }
  }, [inView, hasRun]);

  const total = like + view;
  const likePercent = total ? ((like / total) * 100).toFixed(1) : '0';
  const viewPercent = total ? ((view / total) * 100).toFixed(1) : '0';

  if (loading) {
    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center mx-3 py-8"
        style={{
          background: modernColors.cardBg,
          borderRadius: '24px',
          boxShadow: '0 6px 32px rgba(76, 110, 245, 0.08)',
          border: `1.5px solid ${modernColors.border}`,
          maxWidth: 420,
          margin: 'auto',
          width: '100%',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap w-full justify-around gap-8 px-4 py-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1 min-w-[120px]">
              <div className="w-8 h-8 rounded-full border-t-2 border-t-transparent border-gray-300 animate-spin"></div>
              <div className="text-3xl font-bold mt-2">Loading...</div>
              <div className="text-base text-gray-700 font-medium mt-1">{i === 0 ? 'Likes' : 'Views'}</div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center mx-3 py-8"
      style={{
        background: modernColors.cardBg,
        borderRadius: '24px',
        boxShadow: '0 6px 32px rgba(76, 110, 245, 0.08)',
        border: `1.5px solid ${modernColors.border}`,
        maxWidth: 420,
        margin: 'auto',
        width: '100%',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap w-full justify-around gap-8 px-4 py-6">
        <div className="flex flex-col items-center flex-1 min-w-[120px]">
          <button
            onClick={handleLike}
            className={`rounded-full p-3 bg-white shadow transition-transform duration-200 border-2 ${
              liked ? 'border-[#ff6b6b] scale-110' : 'border-gray-200 hover:scale-105'
            }`}
            aria-label="Like"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? modernColors.like : 'none'}
              stroke={modernColors.like}
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <div className="text-3xl font-bold mt-2" style={{ color: modernColors.like }}>{like}</div>
          <div className="text-base text-gray-700 font-medium mt-1">Likes</div>
          <div className="text-xs text-gray-500 mt-1">{likePercent}%</div>
        </div>

        <div className="flex flex-col items-center flex-1 min-w-[120px]">
          <div className="rounded-full p-3 bg-white shadow border-2 border-[#4dabf7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={modernColors.view}
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="text-3xl font-bold mt-2" style={{ color: modernColors.view }}>{view}</div>
          <div className="text-base text-gray-700 font-medium mt-1">Views</div>
          <div className="text-xs text-gray-500 mt-1">{viewPercent}%</div>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500">21% more than last month</div>
    </motion.div>
  );
};

export default StatsCard;
