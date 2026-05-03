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
    <section className="py-24 px-6 bg-stone-50 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536733021572-1d744ad6658c?auto=format&fit=crop&q=80&w=2000')" }}>
      {/* Overlay halus untuk menjaga kontras */}
      <div className="absolute inset-0 bg-stone-50/60 backdrop-blur-[2px]"></div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Naya */}
        <motion.div variants={profileVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 bg-stone-200">
            <img src={wanita} alt="Naya" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-serif text-amber-900 mb-2">Nayaka Maheswari Putri, S.Gz</h2>
          <p className="text-sm text-stone-500 mb-4 italic">Putri Kedua dari Bapak [Nama Bapak] & Ibu [Nama Ibu]</p>
          <a href="https://instagram.com/nayaxxxxx" className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium">
            <FaInstagram className="mr-2" /> @nayaka_xxxx
          </a>
        </motion.div>

        {/* Separator & atau Muhammad */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-4xl font-serif text-amber-200">&</div>

        {/* Tegar */}
        <motion.div variants={profileVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 bg-stone-200">
            <img src={pria} alt="Tegar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-serif text-amber-900 mb-2">Muhammad Tegar Febriansyah, S.T</h2>
          <p className="text-sm text-stone-500 mb-4 italic">Putra Pertama dari Bapak [Nama Bapak] & Ibu [Nama Ibu]</p>
          <a href="https://instagram.com/tegaryyyyy" className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium">
            <FaInstagram className="mr-2" /> @tegar_yyyy
          </a>
        </motion.div>

      </div>
    </section>
  );
}