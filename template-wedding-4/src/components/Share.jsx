import { useState } from 'react';
import { FaWhatsapp, FaCopy, FaShareAlt, FaArrowLeft } from 'react-icons/fa';

export default function Share() {
  const [guestName, setGuestName] = useState('');
  
  // Mengambil domain utama (misal: https://undangan-saya.com)
  const baseUrl = window.location.origin;
  const invitationUrl = `${baseUrl}?to=${encodeURIComponent(guestName)}`;

  // Template pesan WhatsApp
  const messageTemplate = `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *${guestName || '[Nama Tamu]'}* untuk menghadiri acara pernikahan kami.

Berikut link undangan kami:
${invitationUrl}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.`;

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageTemplate)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationUrl);
    alert('Link undangan berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-6 flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-stone-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShareAlt className="text-2xl text-amber-600" />
          </div>
          <h1 className="text-2xl font-serif text-stone-800">Bagikan Undangan</h1>
          <p className="text-stone-500 text-sm mt-2">Generate link khusus untuk setiap tamu</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Nama Tamu Undangan</label>
            <input
              type="text"
              className="w-full px-4 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all shadow-sm"
              placeholder="Contoh: Bpk. Budi Santoso"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
            <label className="block text-xs font-bold text-stone-400 uppercase mb-3 tracking-wider">Preview Link</label>
            <p className="text-stone-600 text-sm break-all font-mono bg-white p-3 rounded-lg border border-stone-100 mb-4">
              {invitationUrl}
            </p>
            <button
              onClick={copyToClipboard}
              className="flex items-center text-amber-700 text-sm font-bold hover:text-amber-800 transition-colors"
            >
              <FaCopy className="mr-2" /> Salin Tautan
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleWhatsAppShare}
              disabled={!guestName}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition shadow-lg ${
                guestName ? 'bg-green-500 hover:bg-green-600 text-white transform hover:-translate-y-1' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <FaWhatsapp className="text-xl" /> Kirim ke WhatsApp
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-stone-400 text-xs text-center max-w-xs leading-relaxed">
        *Nama tamu akan muncul otomatis di halaman sampul undangan saat link tersebut dibuka oleh penerima.
      </p>
    </div>
  );
}