// src/components/Profile.jsx
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import wanita from '../music/wanita.jpg';
import pria from '../music/pria.png';

export default function Profile() {
  const profileVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 px-6 bg-stone-900 relative overflow-hidden">
      {/* Tekstur gelap mewah */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')" }}></div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Naya */}
        <motion.div variants={profileVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center group">
          <div className="relative mb-8">
            <div className="absolute -inset-2 border border-amber-600/30 rounded-full rotate-6 group-hover:rotate-12 transition-transform duration-1000"></div>
            <div className="w-56 h-56 mx-auto rounded-full border-4 border-amber-700 shadow-2xl overflow-hidden bg-stone-800">
              <img src={wanita} alt="Naya" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          <h2 className="text-4xl font-serif text-amber-200 mb-2 italic">Nayaka Maheswari Putri, S.Gz</h2>
          <p className="text-sm text-stone-400 mb-6 italic font-sans tracking-wide">Putri Kedua dari Bapak [Nama Bapak] & Ibu [Nama Ibu]</p>
          <a href="https://instagram.com/nayaxxxxx" className="inline-flex items-center text-amber-600 hover:text-amber-500 font-bold uppercase tracking-widest text-[10px] border border-amber-900 px-4 py-2 rounded-full transition-colors">
            <FaInstagram className="mr-2" /> @nayaka_xxxx
          </a>
        </motion.div>

        {/* Tegar */}
        <motion.div variants={profileVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center group">
          <div className="relative mb-8">
            <div className="absolute -inset-2 border border-amber-600/30 rounded-full -rotate-6 group-hover:-rotate-12 transition-transform duration-1000"></div>
            <div className="w-56 h-56 mx-auto rounded-full border-4 border-amber-700 shadow-2xl overflow-hidden bg-stone-800">
              <img src={pria} alt="Tegar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          <h2 className="text-4xl font-serif text-amber-200 mb-2 italic">Muhammad Tegar Febriansyah, S.T</h2>
          <p className="text-sm text-stone-400 mb-6 italic font-sans tracking-wide">Putra Pertama dari Bapak [Nama Bapak] & Ibu [Nama Ibu]</p>
          <a href="https://instagram.com/tegaryyyyy" className="inline-flex items-center text-amber-600 hover:text-amber-500 font-bold uppercase tracking-widest text-[10px] border border-amber-900 px-4 py-2 rounded-full transition-colors">
            <FaInstagram className="mr-2" /> @tegar_yyyy
          </a>
        </motion.div>
      </div>
    </section>
  );
}