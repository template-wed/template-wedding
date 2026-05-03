// src/components/Quote.jsx
import { motion } from 'framer-motion';
import bismillah from '../music/bismillah.png'

export default function Quote() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-stone-100 relative text-center overflow-hidden">
      {/* Overlay untuk memastikan teks tetap terbaca */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/circle-maze.png')" }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto relative z-10 p-12 border-2 border-amber-700/20 bg-white/40 backdrop-blur-sm rounded-3xl"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center text-amber-100 border-4 border-stone-100 shadow-lg">❦</div>
        <img src={bismillah} alt="Bismillah" className="w-48 mx-auto mb-8 opacity-80 sepia brightness-50" />
        <p className="text-stone-700 italic leading-relaxed mb-8 font-serif text-lg">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <span className="font-sans font-bold text-amber-800 decoration-amber-200 uppercase tracking-[0.3em] text-xs">
          QS. Ar-Rum: 21
        </span>
      </motion.div>
    </section>
  );
}