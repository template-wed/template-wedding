// src/components/Quote.jsx
import { motion } from 'framer-motion';
import bismillah from '../music/bismillah.png'

export default function Quote() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-cover bg-center relative text-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2000')" }}>
      {/* Overlay untuk memastikan teks tetap terbaca */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <img src={bismillah} alt="Bismillah" className="w-40 mx-auto mb-6 opacity-70" />
        <p className="text-stone-600 italic leading-relaxed mb-6">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <span className="font-serif font-bold text-amber-800 decoration-amber-200 uppercase tracking-widest text-sm">
          QS. Ar-Rum: 21
        </span>
      </motion.div>
    </section>
  );
}