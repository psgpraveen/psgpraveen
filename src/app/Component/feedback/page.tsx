'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import toast, { Toaster } from 'react-hot-toast';
import AvatarModel from '@/components/AvatarModel';

type FocusField = 'name' | 'email' | 'msg' | null;

export default function ContactForm() {
  const [focusField, setFocusField] = useState<FocusField>(null);
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [mood, setMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');

  useEffect(() => {
    if (mood !== 'neutral') {
      const t = setTimeout(() => setMood('neutral'), 1500);
      console.log(focusField);
      
      return () => clearTimeout(t);

    }
  }, [mood]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: FocusField) => {
    setFocusField(field);
  };

  const handleBlur = () => {
    setFocusField(null);
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      return 'Valid email is required.';
    if (!form.msg.trim()) return 'Message is required.';
    return '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMood('sad');
      toast.error(error);
    } else {
      setMood('happy');
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: '', email: '', msg: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <Toaster position="top-center" />
      <div className="shadow-2xl rounded-3xl p-4 md:p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-[360px] flex-shrink-0 flex items-center justify-center">
          <Canvas
            camera={{ position: [0, -0.7, 4], fov: 38 }}
            style={{ width: '100%', height: 420 }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <AvatarModel num={7} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="flex-1 w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-800 mt-2 mb-1 text-center md:text-left">
            Let&apos;s Connect!
          </h1>
          <p className="text-white-600 mb-6 text-center md:text-left max-w-md">
            Have a question, idea, or just want to say hi? Fill out the form
            below and our friendly 3D assistant will keep you company while you
            type.
          </p>
          <form
            className="w-full space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-blue-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                placeholder="Your Name"
                className="w-full p-3 text-black rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-inner transition"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                placeholder="Your Email"
                className="w-full p-3 text-black rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-inner transition"
              />
            </div>
            <div>
              <label
                htmlFor="msg"
                className="block text-sm font-medium text-blue-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="msg"
                name="msg"
                value={form.msg}
                onChange={handleChange}
                onFocus={() => handleFocus('msg')}
                onBlur={handleBlur}
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 rounded-xl text-black border border-blue-200 focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-inner transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-200 shadow-lg"
            >
              Send Message
            </button>
          </form>
          <div className="mt-6 text-xs text-gray-400 text-center md:text-left">
            We respect your privacy. Your information will never be shared.
          </div>
        </div>
      </div>
    </div>
  );
}
