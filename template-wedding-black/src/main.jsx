import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Volume2, 
  VolumeX, 
  Copy, 
  Send, 
  Instagram,
  AlertCircle,
  Gift,
  MessageCircle,
  MessageSquare,
  Info,
  User,
  Lock,
  ExternalLink,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Firebase Imports ---
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

const getEnv = (key) => {
  try {
    // Mencoba akses via import.meta.env (Vite)
    return import.meta.env[key];
  } catch (e) {
    // Fallback jika kompilasi gagal mengakses import.meta
    return null;
  }
};

/**
 * 1. KREDENSIAL FIREBASE (STATIS)
 */
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID')
};

/**
 * 2. ADMIN SECURITY (STATIC PLAIN TEXT)
 */
const ADMIN_CREDENTIALS = {
  email: "admin@wedding.com",
  password: "naya-tegar-2026"
};

/**
 * 3. INISIALISASI FIREBASE
 */
let auth = null;
let db = null;
let isFirebaseInitialized = false;

try {
  const finalConfig = (typeof __firebase_config !== 'undefined' && __firebase_config) 
    ? (typeof __firebase_config === 'string' ? JSON.parse(__firebase_config) : __firebase_config)
    : firebaseConfig;

  if (finalConfig.apiKey && finalConfig.apiKey !== "YOUR_API_KEY") {
    const app = getApps().length > 0 ? getApp() : initializeApp(finalConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseInitialized = true;
  }
} catch (error) {
  console.error("Firebase fail:", error);
}

const appId = typeof __app_id !== 'undefined' ? __app_id : 'wedding-naya-tegar';

/**
 * 4. DATA PERNIKAHAN
 */
const WEDDING_DATA = {
  bride: {
    nickname: "Naya",
    fullName: "Nayaka Maheswari Putri, S.Gz",
    parents: "Putri Tercinta dari Bpk. Amin Rachmat Sapto Budiantono & Ibu Irma Yulianti Dewi",
    ig: "nayaka_mp",
    img: "https://images.unsplash.com/photo-1594744803329-a584af1ea41f?q=80&w=1974&auto=format&fit=crop"
  },
  groom: {
    nickname: "Tegar",
    fullName: "Muhammad Tegar Febriansyah, S.T",
    parents: "Putra Tercinta dari Bpk. Muhammad Faruq & Ibu Laksmi Pradana Putri",
    ig: "mtegarf",
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop"
  },
  date: "2026-01-17T08:00:00",
  events: [
    {
      title: "Akad Nikah",
      date: "Sabtu, 17 Januari 2026",
      time: "08.00 - 10.00 WIB",
      location: "Hasri Ainun Habibie Convention Hall",
      address: "Jl. Kapten Tata Natanegara, Pajajaran, Cicendo, Bandung",
    },
    {
      title: "Resepsi Pernikahan",
      date: "Sabtu, 17 Januari 2026",
      time: "11.00 - 13.30 WIB",
      location: "Hasri Ainun Habibie Convention Hall",
      address: "Jl. Kapten Tata Natanegara, Pajajaran, Cicendo, Bandung",
    }
  ],
  bankAccounts: [
    { bank: "BSI", number: "7176634663", owner: "Nayaka Maheswari" },
    { bank: "Mandiri", number: "1310014281408", owner: "Muhammad Tegar" }
  ],
  quotes: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  surah: "QS. Ar-Rum: 21"
};

/**
 * 5. KOMPONEN PENDUKUNG
 */
const DecorativeBorder = () => (
  <div className="flex justify-center items-center gap-4 my-6 opacity-30">
    <div className="h-[1px] w-12 bg-amber-600"></div>
    <Heart size={16} className="text-amber-600 fill-amber-600" />
    <div className="h-[1px] w-12 bg-amber-600"></div>
  </div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) return clearInterval(timer);
      setTimeLeft({
        hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
        jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 px-4 my-10">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center bg-white/40 backdrop-blur-sm py-4 rounded-xl border border-amber-200/50 shadow-sm">
          <span className="text-2xl font-serif font-bold text-amber-900">{value}</span>
          <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
};

const ProfileCard = ({ name, fullName, parents, ig, img }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    className="flex flex-col items-center"
  >
    <div className="relative mb-8 text-center">
      <div className="w-56 h-72 rounded-t-full overflow-hidden border-8 border-white shadow-2xl relative z-10 mx-auto">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-72 border-2 border-amber-200 rounded-t-full -z-0"></div>
    </div>
    <h3 className="text-4xl font-serif text-amber-900 mb-2 italic">{name}</h3>
    <p className="font-bold text-slate-800 mb-3 px-6 text-lg tracking-tight">{fullName}</p>
    <p className="text-sm text-slate-500 leading-relaxed mb-6 px-10 text-center font-medium">
      {parents}
    </p>
    <a href={`https://instagram.com/${ig}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white border border-amber-200 px-6 py-2 rounded-full text-amber-800 text-xs font-bold hover:bg-amber-50 transition-all shadow-sm uppercase tracking-widest active:scale-95">
      <Instagram size={14} /> @{ig}
    </a>
  </motion.div>
);

/**
 * 6. ADMIN DASHBOARD COMPONENT
 */
const AdminDashboard = ({ onLogout }) => {
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!guestName) return;
    // Menggunakan origin dan pathname agar URL tetap bersih (tanpa hash admin di link bagi)
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?to=${encodeURIComponent(guestName.trim())}`;
    setGeneratedLink(url);
  };

  const copyLink = () => {
    const el = document.createElement('textarea');
    el.value = generatedLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    const toast = document.createElement('div');
    toast.innerText = "Link Tamu Disalin!";
    toast.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-amber-900 text-white px-6 py-3 rounded-full z-[3000] text-xs font-bold shadow-2xl";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const shareToWA = () => {
    const message = `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *${guestName.trim()}* untuk menghadiri acara pernikahan kami.\n\nBerikut link undangan digital kami:\n${generatedLink}\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col p-6 font-sans">
      <div className="max-w-md mx-auto w-full space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-amber-100">
          <div>
            <h1 className="text-xl font-bold text-amber-950">Admin Panel</h1>
            <p className="text-[10px] text-amber-600 uppercase tracking-widest font-bold">Wedding Management</p>
          </div>
          <button onClick={onLogout} className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:bg-rose-50 px-4 py-2 rounded-full border border-rose-100 transition-all">Logout</button>
        </header>

        <main className="space-y-6">
          <section className="bg-white p-8 rounded-[3rem] shadow-lg border border-amber-100 text-center">
            <h2 className="text-lg font-bold mb-6 flex items-center justify-center gap-3 text-amber-900">
              <Send size={20} className="text-amber-600" />
              Bagi Undangan
            </h2>
            <div className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-amber-700 ml-2">Nama Tamu Undangan</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300" />
                  <input 
                    value={guestName} 
                    onChange={e => setGuestName(e.target.value)} 
                    placeholder="Contoh: Kelg. Besar Pusdatin" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-amber-50 border-none text-sm focus:ring-2 focus:ring-amber-200 shadow-inner"
                  />
                </div>
              </div>
              <button 
                onClick={generateLink}
                className="w-full py-4 bg-amber-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Buat Link Undangan
              </button>
            </div>

            {generatedLink && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] uppercase tracking-widest font-bold text-amber-700 mb-3 text-center">Link Untuk {guestName}:</p>
                <div className="bg-white p-4 rounded-xl border border-amber-200 overflow-hidden mb-4">
                  <p className="text-[10px] font-mono text-slate-600 break-all text-center">{generatedLink}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button onClick={copyLink} className="flex-1 py-3 bg-white border border-amber-200 text-amber-900 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                      <Copy size={14} /> Salin
                    </button>
                    <a href={generatedLink} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-white border border-amber-200 text-amber-900 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 text-center">
                      <ExternalLink size={14} /> Test
                    </a>
                  </div>
                  <button onClick={shareToWA} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                    <MessageSquare size={16} /> Bagikan ke WA
                  </button>
                </div>
              </motion.div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

/**
 * 7. KOMPONEN UTAMA (App)
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('invitation'); // 'invitation' | 'admin-login' | 'admin-dashboard'
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [form, setForm] = useState({ name: '', status: 'Hadir', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Login State
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const audioRef = useRef(null);

  // Routing & URL Params
  useEffect(() => {
    const checkRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) {
        const decoded = decodeURIComponent(to);
        setGuestName(decoded);
        setForm(prev => ({ ...prev, name: decoded }));
      }

      // Gunakan URL Hash untuk menghindari 404 Not Found di Netlify/Hosting
      if (window.location.hash === '#admin-dashboard') {
        setCurrentPage('admin-login');
      } else {
        setCurrentPage('invitation');
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  // Firebase Auth
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error("Auth fail:", err); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Firestore Snapshot
  useEffect(() => {
    if (!db || !user) { setIsFirebaseConnected(false); return; }
    const messagesRef = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      setIsFirebaseConnected(true);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    }, (error) => { setIsFirebaseConnected(false); });
    return () => unsubscribe();
  }, [user]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    audioRef.current?.play().catch(() => {});
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const cleanEmail = loginForm.email.trim().toLowerCase();
    const cleanPassword = loginForm.password.trim();

    if (cleanEmail === ADMIN_CREDENTIALS.email && cleanPassword === ADMIN_CREDENTIALS.password) {
      setCurrentPage('admin-dashboard');
    } else {
      setLoginError('Kredensial tidak valid.');
    }
  };

  const logoutAdmin = () => {
    window.location.hash = '';
    setCurrentPage('invitation');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db || !user || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const messagesRef = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
      await addDoc(messagesRef, {
        ...form,
        createdAt: serverTimestamp(),
        uid: user.uid
      });
      setForm(prev => ({ ...prev, message: '' }));
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyText = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    const toast = document.createElement('div');
    toast.innerText = "Berhasil Disalin!";
    toast.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-900 text-white px-8 py-3 rounded-xl z-[2000] text-sm font-bold shadow-2xl transition-all";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  // --- RENDER SWITCHER ---
  if (currentPage === 'admin-dashboard') {
    return <AdminDashboard onLogout={logoutAdmin} />;
  }

  if (currentPage === 'admin-login') {
    return (
      <div className="min-h-screen bg-[#fdfaf5] flex items-center justify-center p-6 font-sans text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-amber-100">
          <Lock className="mx-auto text-amber-600 mb-6" size={48} />
          <h1 className="text-2xl font-bold text-amber-950 mb-2 text-center">Admin Login</h1>
          <p className="text-xs text-amber-600/60 mb-8 font-medium text-center">Dashboard Management Undangan</p>
          <form onSubmit={handleAdminLogin} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-amber-800 ml-2">Email</label>
              <input type="email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="w-full p-5 rounded-2xl bg-amber-50 border-none text-sm focus:ring-2 focus:ring-amber-200" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-amber-800 ml-2">Password</label>
              <input type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full p-5 rounded-2xl bg-amber-50 border-none text-sm focus:ring-2 focus:ring-amber-200" required />
            </div>
            {loginError && <p className="text-rose-500 text-center text-[10px] font-bold uppercase tracking-widest leading-relaxed text-center">{loginError}</p>}
            <button type="submit" className="w-full py-5 bg-amber-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">Masuk</button>
            <button type="button" onClick={() => { window.location.hash = ''; }} className="w-full text-amber-400 text-[9px] font-bold uppercase tracking-widest mt-2 text-center">Kembali ke Undangan</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-800 bg-[#fdfaf5] overflow-x-hidden selection:bg-amber-100 min-h-screen">
      <audio ref={audioRef} loop src="/music/play.mp3" />

      {/* Hidden Door to Admin (Top Edge) */}
      <div onClick={() => { window.location.hash = 'admin-dashboard'; }} className="fixed top-0 left-0 w-full h-1 z-[200] opacity-0 cursor-default"></div>

      {isOpen && (
        <button 
          onClick={() => {
            if (isMuted) audioRef.current?.play();
            else audioRef.current?.pause();
            setIsMuted(!isMuted);
          }}
          className="fixed bottom-6 right-6 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-amber-200 text-amber-800 active:scale-90 transition-all animate-pulse"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {/* --- COVER PAGE --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            exit={{ y: '-100%' }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between text-center p-10 bg-cover bg-center"
            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop)' }}
          >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
              <h2 className="text-sm uppercase tracking-[0.8em] mb-4 text-amber-200 font-bold text-center">The Wedding of</h2>
              <h1 className="text-6xl md:text-8xl font-serif text-white drop-shadow-2xl italic text-center">Naya & Tegar</h1>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-10 w-full max-w-sm text-center">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 shadow-2xl text-white">
                <p className="text-xs opacity-80 mb-4 tracking-widest uppercase font-medium italic text-center">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                <h3 className="text-3xl font-serif mb-8 text-amber-100 italic text-center">{guestName}</h3>
                <button 
                  onClick={handleOpenInvitation}
                  className="w-full bg-amber-100 text-amber-950 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl uppercase tracking-[0.3em] text-[10px] active:scale-95 mx-auto"
                >
                  <Send size={18} /> Buka Undangan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      {isOpen && (
        <main className="max-w-md mx-auto bg-white shadow-2xl relative min-h-screen flex flex-col text-center">
          
          <section className="relative h-screen flex flex-col items-center justify-center p-8 bg-[#fdfaf5] overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none rotate-180 text-center">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#B45309" d="M44.7,-76.4C58.2,-69.3,69.7,-57.4,77.3,-43.8C84.8,-30.2,88.4,-15.1,88.7,0.2C88.9,15.4,85.8,30.8,78.3,44.4C70.7,58,58.7,69.7,44.9,77.3C31,84.8,15.5,88.2,0.4,87.5C-14.7,86.8,-29.4,82,-43.1,74.3C-56.8,66.6,-69.5,56,-78.4,42.5C-87.3,29.1,-92.4,14.5,-92.1,0.2C-91.8,-14.2,-86.1,-28.3,-77.2,-41.7C-68.3,-55.1,-56.3,-67.7,-42.5,-74.6C-28.7,-81.4,-14.3,-82.5,0.2,-82.9C14.7,-83.3,29.3,-83,44.7,-76.4Z" transform="translate(100 100)" /></svg>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center">
              <DecorativeBorder />
              <h2 className="text-[11px] tracking-[0.5em] uppercase mb-6 text-amber-700 font-bold text-center">Walimatul 'Ursy</h2>
              <h1 className="text-7xl font-serif text-amber-900 mb-6 italic leading-tight text-center">Naya <br/>&<br/> Tegar</h1>
              <p className="text-amber-800 font-bold tracking-[0.5em] uppercase text-sm text-center">17 JANUARI 2026</p>
              <DecorativeBorder />
              <div className="mt-10 px-8 text-center">
                <p className="text-xs text-slate-500 italic leading-relaxed text-center italic">"{WEDDING_DATA.quotes}"</p>
                <p className="text-[10px] mt-4 font-bold text-amber-800 uppercase tracking-widest text-center">— {WEDDING_DATA.surah}</p>
              </div>
            </motion.div>
          </section>

          <section className="py-24 px-8 bg-white relative text-center">
            <div className="absolute top-1/2 left-0 w-full h-1/2 bg-[#fdfaf5] -z-0"></div>
            <div className="relative z-10 space-y-32">
              <ProfileCard {...WEDDING_DATA.bride} name={WEDDING_DATA.bride.nickname} />
              <ProfileCard {...WEDDING_DATA.groom} name={WEDDING_DATA.groom.nickname} />
            </div>
          </section>

          <section className="py-24 px-8 bg-amber-900 text-white text-center rounded-t-[4rem] -mt-10 relative z-20 overflow-hidden shadow-2xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative z-10">
              <h2 className="text-4xl font-serif mb-2 text-amber-100 italic text-center">Save the Date</h2>
              <div className="w-16 h-1 bg-amber-400 mx-auto mb-10 rounded-full"></div>
              <Countdown targetDate={WEDDING_DATA.date} />
              <div className="space-y-12 mt-20">
                {WEDDING_DATA.events.map((ev, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 shadow-inner">
                    <h3 className="text-3xl font-serif mb-8 text-amber-100 italic text-center">{ev.title}</h3>
                    <div className="space-y-6 text-xs font-medium tracking-[0.2em] uppercase text-center">
                      <div className="flex flex-col items-center gap-3 text-center"><Calendar size={24} className="text-amber-300" /><span>{ev.date}</span></div>
                      <div className="flex flex-col items-center gap-3 text-center"><Clock size={24} className="text-amber-300" /><span>{ev.time}</span></div>
                      <div className="flex flex-col items-center gap-3 px-6 text-center"><MapPin size={24} className="text-amber-300" /><span className="leading-relaxed text-center">{ev.location}</span><p className="text-[10px] opacity-60 normal-case tracking-normal italic mt-2 text-center">{ev.address}</p></div>
                    </div>
                    <button className="mt-10 w-full py-4 bg-amber-100 text-amber-950 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all text-[10px] tracking-widest uppercase shadow-xl active:scale-95 text-center mx-auto">
                      <MapPin size={16} /> Buka Google Maps
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="py-24 px-8 bg-[#fdfaf5] text-center">
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
                <Gift size={40} className="mx-auto text-amber-700 mb-6 text-center" />
                <h2 className="text-4xl font-serif mb-4 text-amber-900 italic text-center">Wedding Gift</h2>
                <div className="space-y-6 mt-12 text-center">
                    {WEDDING_DATA.bankAccounts.map((acc, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-amber-100 flex flex-col items-center text-center">
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-5 py-2 rounded-full mb-4 uppercase tracking-widest text-center">Bank {acc.bank}</span>
                            <span className="text-2xl font-serif text-slate-800 mb-1 tracking-wider text-center">{acc.number}</span>
                            <span className="text-[10px] uppercase text-slate-400 mb-6 tracking-[0.3em] font-bold text-center">A.N {acc.owner}</span>
                            <button onClick={() => copyText(acc.number)} className="flex items-center gap-2 text-[10px] font-bold text-amber-900 border border-amber-200 px-8 py-3 rounded-full hover:bg-amber-50 transition-all uppercase tracking-widest text-center mx-auto"><Copy size={14} /> Salin Rekening</button>
                        </div>
                    ))}
                </div>
             </motion.div>
          </section>

          <section className="py-24 px-8 bg-white text-center">
            <div className="flex flex-col items-center mb-12 text-center">
                <MessageCircle size={40} className="text-amber-700 mb-6 text-center" />
                <h2 className="text-4xl font-serif text-amber-900 italic text-center">Guest Book</h2>
                <div className="w-12 h-1 bg-amber-400 mt-2 rounded-full mx-auto"></div>
            </div>
            {!isFirebaseConnected && (
              <div className="p-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-3xl mb-10 flex gap-4 shadow-sm items-center text-center"><Info size={24} className="shrink-0 text-center" /><div className="text-[11px] leading-relaxed tracking-wide font-medium text-left">Fitur buku tamu akan aktif secara otomatis setelah Firebase dikonfigurasi.</div></div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6 mb-20 bg-[#fdfaf5] p-8 rounded-[3rem] border border-amber-100 shadow-inner text-left">
              <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest font-bold text-amber-800 ml-4">Nama</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Nama..." className="w-full p-5 rounded-2xl border-none text-xs shadow-sm focus:ring-2 focus:ring-amber-200 bg-white" required /></div>
              <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest font-bold text-amber-800 ml-4">Kehadiran</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full p-5 rounded-2xl border-none text-xs shadow-sm focus:ring-2 focus:ring-amber-200 appearance-none bg-white"><option value="Hadir">Hadir</option><option value="Tidak Hadir">Tidak Hadir</option></select></div>
              <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest font-bold text-amber-800 ml-4">Ucapan</label><textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tulis ucapan..." className="w-full p-5 rounded-2xl border-none text-xs shadow-sm focus:ring-2 focus:ring-amber-200 bg-white" rows={5} required /></div>
              <button disabled={isSubmitting || !isFirebaseConnected} className="w-full py-5 bg-amber-900 text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all active:scale-95 disabled:opacity-30 text-center">
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar text-left">
              {messages.length === 0 ? (<div className="text-center text-slate-300 py-16 italic text-sm font-light text-center">{isFirebaseConnected ? "Belum ada ucapan." : "Fitur pesan sedang disiapkan..."}</div>) : (
                messages.map(m => (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={m.id} className="p-8 bg-[#fdfaf5] rounded-[2.5rem] border border-amber-100 shadow-sm relative text-left">
                    <div className="flex justify-between items-center mb-5"><div className="flex flex-col text-left"><span className="font-bold text-amber-900 text-sm">{m.name}</span><span className="text-[9px] text-slate-400 font-medium">{m.createdAt?.toDate ? m.createdAt.toDate().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'Baru saja'}</span></div><span className={`text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full ${m.status === 'Hadir' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{m.status}</span></div>
                    <p className="text-sm text-slate-600 italic leading-relaxed text-left">"{m.message}"</p>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          <footer className="p-20 bg-amber-950 text-white text-center rounded-t-[5rem] mt-10 shadow-inner relative overflow-hidden text-center">
            <Heart className="mx-auto text-amber-400 mb-10 w-12 h-12 text-center fill-amber-400 mx-auto" />
            <h2 className="text-4xl font-serif mb-8 text-amber-100 italic text-center leading-tight">Terima Kasih</h2>
            <p className="text-[11px] opacity-70 mb-20 leading-relaxed px-10 uppercase tracking-[0.4em] font-light text-center">Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i</p>
            <div className="flex items-center justify-center gap-6 text-amber-200 font-serif text-5xl italic text-center"><span>Naya</span><div className="w-2 h-2 rounded-full bg-amber-500" /><span>Tegar</span></div>
            <div className="mt-24 pt-10 border-t border-white/10 opacity-30 text-[9px] tracking-[0.6em] uppercase font-bold text-center">Created with Heart • 2026</div>
          </footer>
        </main>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;700&display=swap');
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 10px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}