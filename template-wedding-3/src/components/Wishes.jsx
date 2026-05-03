// src/components/Wishes.jsx
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'Hadir',
    guests: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Real-time listener Firestore
  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishes(wishesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi Minimal 2 Karakter
    if (formData.message.trim().length < 2) {
      setError('Ucapan minimal harus 2 karakter.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Simpan ke koleksi 'wishes' (untuk ditampilkan)
      await addDoc(collection(db, 'wishes'), {
        name: formData.name,
        message: formData.message,
        attendance_status: formData.attendance,
        timestamp: serverTimestamp()
      });

      // 2. Simpan ke koleksi 'rsvp' (untuk rekap backend)
      await addDoc(collection(db, 'rsvp'), {
        name: formData.name,
        attendance_status: formData.attendance,
        total_guests: formData.guests,
        timestamp: serverTimestamp()
      });

      // Reset form
      setFormData({ name: '', attendance: 'Hadir', guests: 1, message: '' });
    } catch (err) {
      setError('Gagal mengirim pesan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-stone-100">
      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-serif text-center mb-8 text-amber-800">RSVP & Ucapan</h2>
        
        {/* Form RSVP */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input type="text" required className="w-full border p-2 rounded focus:ring-amber-500 focus:border-amber-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kehadiran</label>
                <select className="w-full border p-2 rounded outline-none" value={formData.attendance} onChange={e => setFormData({...formData, attendance: e.target.value})}>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jumlah Tamu</label>
                <input type="number" min="1" max="5" required disabled={formData.attendance === 'Tidak Hadir'} className="w-full border p-2 rounded outline-none" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ucapan & Doa</label>
              <textarea rows="3" required className="w-full border p-2 rounded outline-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition">
              {isSubmitting ? 'Mengirim...' : 'Kirim RSVP & Ucapan'}
            </button>
          </form>
        </div>

        {/* Real-time Wishes List */}
        <div>
          <h3 className="font-semibold text-lg mb-4">{wishes.length} Ucapan</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {wishes.map(wish => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={wish.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-stone-800">{wish.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${wish.attendance_status === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {wish.attendance_status}
                  </span>
                </div>
                <p className="text-stone-600 text-sm">{wish.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}