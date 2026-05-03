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
    <section className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative overflow-hidden" 
      style={{ 
        backgroundColor: "#483C32",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/batik-fractal.png'), linear-gradient(rgba(72, 60, 50, 0.85), rgba(72, 60, 50, 0.95))" 
      }}>
      
      {/* Ornamen Gebyok di Sudut */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-40 grayscale sepia brightness-50" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/1155/1155605.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-40 grayscale sepia brightness-50 rotate-90" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/1155/1155605.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-40 grayscale sepia brightness-50 -rotate-90" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/1155/1155605.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-40 grayscale sepia brightness-50 rotate-180" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/1155/1155605.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>

      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-amber-100 px-6 max-w-lg"
      >
        {/* Bingkai Gunungan */}
        <div className="mb-6 relative flex items-center justify-center">
          <div className="w-64 h-80 md:w-80 md:h-[400px] relative bg-amber-600/50 p-[2px]"
               style={{ clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)" }}>
            <div className="w-full h-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 md:p-8"
                 style={{ clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)" }}>
              <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mt-10 mb-4 font-sans text-amber-500 font-bold">The Wedding Of</p>
              <h1 className="text-5xl md:text-6xl italic mb-4" style={{ fontFamily: "'Pinyon Script', cursive" }}>Naya & Tegar</h1>
              <div className="w-12 h-[1px] bg-amber-600 mb-6"></div>
              <p className="text-lg font-serif tracking-widest text-amber-200">{formattedDate}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-sm mb-2 font-sans opacity-80 uppercase tracking-widest">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className="text-2xl font-serif font-bold mb-4 text-white border-b border-amber-800/50 pb-2 inline-block px-4">{guestName}</p>
          <p className="text-[10px] opacity-60 font-sans tracking-tight">Mohon maaf bila ada kesalahan penulisan nama/gelar.</p>
        </div>

        <button 
          onClick={onOpen}
          className="bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-500/50 text-amber-100 px-10 py-4 rounded-lg shadow-[0_0_20px_rgba(180,83,9,0.3)] transition duration-300 font-serif font-bold uppercase tracking-[0.2em] hover:brightness-125 transform hover:scale-105 active:scale-95"
        >
          Buka Undangan
        </button>
      </motion.div>
    </section>
  );
}