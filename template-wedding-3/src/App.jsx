// src/App.jsx
import { useState, useRef } from 'react';
import Cover from './components/Cover';
import Quote from './components/Quote';
import Profile from './components/Profile';
import Event from './components/Event';
import Wishes from './components/Wishes';
import LoveGift from './components/LoveGift';
import { FaMusic, FaPause } from 'react-icons/fa';
import Gallery from './components/Gallery';
import bgMusic from './music/play.mp3';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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