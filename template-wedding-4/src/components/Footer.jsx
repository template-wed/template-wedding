import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-24 bg-stone-950 text-center relative overflow-hidden">
      {/* Tekstur latar belakang Batik */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/batik-fractal.png')" }}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 max-w-2xl mx-auto"
      >
        <div className="mb-8">
           <img src="https://cdn-icons-png.flaticon.com/512/2855/2855145.png" alt="Cincin Pertunangan" className="w-20 h-20 mx-auto opacity-60 sepia brightness-150" />
        </div>

        <h2 className="text-4xl font-serif text-amber-200 mb-6 italic">Terima Kasih</h2>
        
        <p className="text-stone-400 font-serif italic text-base mb-12 leading-relaxed">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai."
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-[1px] w-8 bg-amber-900"></div>
          <p className="text-3xl font-serif text-amber-500 italic" style={{ fontFamily: "'Pinyon Script', cursive" }}>
            Naya & Tegar
          </p>
          <div className="h-[1px] w-8 bg-amber-900"></div>
        </div>

        <div className="space-y-2">
          <p className="text-stone-600 text-[10px] uppercase tracking-[0.5em] font-sans">Matur Nuwun</p>
          <div className="pt-8 border-t border-amber-900/20 text-stone-700 text-[8px] uppercase tracking-widest">
            © 2026 The Wedding of Naya & Tegar
          </div>
        </div>
      </motion.div>
    </footer>
  );
}