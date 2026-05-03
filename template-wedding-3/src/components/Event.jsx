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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-4xl font-serif text-amber-800 mb-2">Save The Date</h2>
          <p className="text-stone-600 mb-8">Kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada hari bahagia kami:</p>
          
          <Countdown />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Akad Nikah */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100"
          >
            <h3 className="text-2xl font-serif text-amber-900 mb-4 border-b pb-4">Akad Nikah</h3>
            <div className="flex items-center justify-center gap-2 text-stone-600 mb-2">
              <FaCalendarCheck className="text-amber-600"/>
              <span>{dateString}</span>
            </div>
            <p className="text-stone-800 font-bold text-lg mb-4">08.00 - 10.00 WIB</p>
            <p className="text-sm text-stone-500 italic">"Dimohon untuk hadir tepat waktu"</p>
          </motion.div>

          {/* Resepsi */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100"
          >
            <h3 className="text-2xl font-serif text-amber-900 mb-4 border-b pb-4">Resepsi</h3>
            <div className="flex items-center justify-center gap-2 text-stone-600 mb-2">
              <FaCalendarCheck className="text-amber-600"/>
              <span>{dateString}</span>
            </div>
            <p className="text-stone-800 font-bold text-lg mb-4">11.00 - 13.30 WIB</p>
            <p className="text-sm text-stone-500 italic">"Merupakan suatu kehormatan bagi kami atas kehadiran Anda"</p>
          </motion.div>
        </div>

        {/* Lokasi Acara */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mt-12 bg-amber-50 p-8 rounded-2xl border border-amber-100"
        >
          <h3 className="text-xl font-serif text-amber-900 mb-2">Lokasi Acara</h3>
          <p className="font-bold text-stone-800 mb-1">Hasri Ainun Habibie Convention Hall</p>
          <p className="text-stone-600 text-sm mb-6">Jl. Contoh Alamat No. 123, Kota Bandung, Jawa Barat</p>
          
          <a 
            href="https://maps.app.goo.gl/..." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition shadow-md"
          >
            <FaMapMarkerAlt className="mr-2" /> Buka Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}