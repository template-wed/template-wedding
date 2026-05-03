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
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-serif text-amber-800 mb-4">Love Gift</h2>
      <p className="max-w-md mx-auto text-stone-600 mb-8 text-sm">
        Doa restu Anda merupakan kado terindah. Namun jika ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* BSI Naya */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-bold">BSI</div>
          <p className="text-sm font-bold text-stone-400 mb-2 uppercase tracking-widest text-left">Bank Syariah Indonesia</p>
          <p className="text-xl font-mono text-left mb-4">714521xxxx</p>
          <p className="text-sm text-left mb-4">a.n Nayaka XXXXXX</p>
          <button 
            onClick={() => handleCopy('714521xxxx', 'bsi')}
            className="flex items-center justify-center w-full bg-amber-600 text-white py-2 rounded-lg text-sm hover:bg-amber-700 transition"
          >
            {copied === 'bsi' ? <><FaCheck className="mr-2"/> Tersalin</> : <><FaCopy className="mr-2"/> Salin Rekening</>}
          </button>
        </div>

        {/* Mandiri Tegar */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-bold">Mandiri</div>
          <p className="text-sm font-bold text-stone-400 mb-2 uppercase tracking-widest text-left">Bank Mandiri</p>
          <p className="text-xl font-mono text-left mb-4">1310014xxxxxx</p>
          <p className="text-sm text-left mb-4">a.n Tegar XXXXXX</p>
          <button 
            onClick={() => handleCopy('1310014xxxxxx', 'mandiri')}
            className="flex items-center justify-center w-full bg-amber-600 text-white py-2 rounded-lg text-sm hover:bg-amber-700 transition"
          >
            {copied === 'mandiri' ? <><FaCheck className="mr-2"/> Tersalin</> : <><FaCopy className="mr-2"/> Salin Rekening</>}
          </button>
        </div>
      </div>
    </section>
  );
}