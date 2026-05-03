// src/components/LoveGift.jsx
import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

export default function LoveGift() {
  const [copied, setCopied] = useState('');

  const handleCopy = (acc, label) => {
    navigator.clipboard.writeText(acc);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className="py-24 px-6 bg-stone-100 text-center relative">
      {/* Tekstur Anyaman Bambu */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/woven.png')" }}></div>
      
      <h2 className="text-4xl font-serif text-amber-900 mb-4 italic">Kado Digital</h2>
      <p className="max-w-md mx-auto text-stone-600 mb-12 text-sm font-sans italic">
        Doa restu Anda merupakan kado terindah. Namun jika ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* BSI Naya */}
        <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-bold">BSI</div>
          <p className="text-[10px] font-bold text-amber-700 mb-2 uppercase tracking-widest text-left font-sans">Bank Syariah Indonesia</p>
          <p className="text-2xl font-serif text-left mb-4 tracking-tighter text-stone-800">714521xxxx</p>
          <p className="text-xs text-left mb-6 font-sans font-bold text-stone-500 uppercase">a.n Nayaka Maheswari</p>
          <button 
            onClick={() => handleCopy('714521xxxx', 'bsi')}
            className="flex items-center justify-center w-full bg-amber-800 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-900 transition shadow-md"
          >
            {copied === 'bsi' ? <><FaCheck className="mr-2"/> Tersalin</> : <><FaCopy className="mr-2"/> Salin Rekening</>}
          </button>
        </div>

        {/* Mandiri Tegar */}
        <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-bold">Mandiri</div>
          <p className="text-[10px] font-bold text-amber-700 mb-2 uppercase tracking-widest text-left font-sans">Bank Mandiri</p>
          <p className="text-2xl font-serif text-left mb-4 tracking-tighter text-stone-800">1310014xxxxxx</p>
          <p className="text-xs text-left mb-6 font-sans font-bold text-stone-500 uppercase">a.n Tegar Febriansyah</p>
          <button 
            onClick={() => handleCopy('1310014xxxxxx', 'mandiri')}
            className="flex items-center justify-center w-full bg-amber-800 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-900 transition shadow-md"
          >
            {copied === 'mandiri' ? <><FaCheck className="mr-2"/> Tersalin</> : <><FaCopy className="mr-2"/> Salin Rekening</>}
          </button>
        </div>
      </div>
    </section>
  );
}