// src/App.jsx
import { useState, useRef, useEffect } from 'react';
import Cover from './components/Cover';
import Quote from './components/Quote';
import Profile from './components/Profile';
import Event from './components/Event';
import Wishes from './components/Wishes';
import LoveGift from './components/LoveGift';
import { FaMusic, FaPause } from 'react-icons/fa';
import Gallery from './components/Gallery';
import bgMusic from './music/play.mp3';
import Share from './components/Share';
import Footer from './components/Footer';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const audioRef = useRef(null);

  // Listener untuk mendeteksi perubahan hash secara real-time
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Jalur khusus untuk halaman generate link WhatsApp
  if (currentHash === '#bagikan') {
    return <Share />;
  }

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="font-sans text-gray-800 bg-stone-50 min-h-screen overflow-x-hidden">
      <audio ref={audioRef} loop src={bgMusic} />
      
      {!isOpened ? (
        <Cover onOpen={handleOpen} />
      ) : (
        <div className="main-content pb-20">
          <Quote />
          <Profile />
          <Event />
          <Gallery />
          <LoveGift />
          <Wishes />
          <Footer />
          {/* Floating Music Button */}
          <button 
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 bg-amber-600 text-white p-3 rounded-full shadow-lg z-50 animate-bounce"
          >
            {isPlaying ? <FaPause /> : <FaMusic />}
          </button>
        </div>
      )}
    </div>
  );
}