// src/components/Event.jsx
import { motion } from 'framer-motion';
import Countdown from './Countdown';
import { FaMapMarkerAlt, FaCalendarCheck } from 'react-icons/fa';
import { WEDDING_DATE, formatWeddingDate } from '../config/config';

export default function Event() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const dateString = formatWeddingDate(WEDDING_DATE).full;

  return (
    <section className="py-24 px-6 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000')" }}>
      {/* Overlay agar teks lebih mudah dibaca */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12">
          <div className="flex justify-center mb-6">
             <img src="https://cdn-icons-png.flaticon.com/512/8141/8141042.png" alt="Blangkon" className="w-12 h-12 grayscale brightness-50 sepia" />
          </div>
          <h2 className="text-4xl font-serif text-amber-900 mb-4 italic">Jadwal Acara</h2>
          <p className="text-stone-600 mb-10 font-sans tracking-wide">Dengan memohon ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada:</p>
          
          <Countdown />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Akad Nikah */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="bg-white p-10 relative border-t-[75px]  border-amber-800 shadow-xl"
            style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)" }}
          >
            <h3 className="text-2xl font-serif text-amber-900 mb-6 mt-7 border-b border-amber-100 pb-4 italic">Akad Nikah</h3>
            <div className="flex items-center justify-center gap-3 text-stone-700 mb-3 font-bold">
              <FaCalendarCheck className="text-amber-800"/>
              <span className="font-sans text-sm tracking-widest">{dateString}</span>
            </div>
            <p className="text-stone-900 font-serif font-bold text-2xl mb-4">08.00 - 10.00 WIB</p>
            <p className="text-xs text-stone-500 italic font-sans">"Manten Ageng Style"</p>
          </motion.div>

          {/* Resepsi */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                        className="bg-white p-10 relative border-t-[75px]  border-amber-800 shadow-xl"
            style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)" }}
          >
            <h3 className="text-2xl font-serif text-amber-900 mb-6 mt-7 border-b border-amber-100 pb-4 italic">Resepsi</h3>
            <div className="flex items-center justify-center gap-3 text-stone-700 mb-3 font-bold">
              <FaCalendarCheck className="text-amber-800"/>
              <span className="font-sans text-sm tracking-widest">{dateString}</span>
            </div>
            <p className="text-stone-900 font-serif font-bold text-2xl mb-4">11.00 - 13.30 WIB</p>
            <p className="text-xs text-stone-500 italic font-sans">"Ngunduh Mantu Heritage"</p>
          </motion.div>
        </div>

        {/* Lokasi Acara */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mt-12 bg-amber-50 p-8 rounded-2xl border border-amber-100"
        >
          <h3 className="text-xl font-serif text-amber-900 mb-2">Lokasi Acara</h3>
          <p className="font-bold text-stone-800 mb-1 font-serif">Hasri Ainun Habibie Convention Hall</p>
          <p className="text-stone-600 text-xs mb-6 font-sans">Jl. Contoh Alamat No. 123, Kota Bandung, Jawa Barat</p>
          
          <a 
            href="https://maps.app.goo.gl/..." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-full transition shadow-lg text-xs font-bold uppercase tracking-widest"
          >
            <FaMapMarkerAlt className="mr-2" /> Penunjuk Lokasi
          </a>
        </motion.div>
      </div>
    </section>
  );
}