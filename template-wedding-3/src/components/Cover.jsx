// src/components/Cover.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATE, formatWeddingDate } from '../config/config';

export default function Cover({ onOpen }) {
  const [guestName, setGuestName] = useState('Tamu Undangan');

  // Mengambil tanggal yang sudah diformat
  const formattedDate = formatWeddingDate(WEDDING_DATE).short;

  // Mengambil nama tamu dari URL Query Param (misal: ?to=Nama+Tamu)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(to);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=2000')" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-6"
      >
        <p className="text-sm tracking-widest uppercase mb-4">The Wedding Of</p>
        <h1 className="text-5xl md:text-7xl font-serif mb-2">Naya & Tegar</h1>
        <p className="text-lg mb-8">{formattedDate}</p>
        
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-white/30">
          <p className="text-sm mb-2">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className="text-2xl font-semibold mb-4">{guestName}</p>
          <p className="text-xs mb-4">Mohon maaf bila ada kesalahan penulisan nama/gelar.</p>
        </div>

        <button 
          onClick={onOpen}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 font-medium"
        >
          Buka Undangan
        </button>
      </motion.div>
    </section>
  );
}