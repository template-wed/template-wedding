// src/components/Countdown.jsx
import { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-12-12T08:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const Item = ({ val, label }) => (
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md min-w-[70px]">
      <span className="text-2xl font-bold text-amber-800">{val}</span>
      <span className="text-xs uppercase text-stone-500 tracking-tighter">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-4 justify-center py-8">
      <Item val={timeLeft.days} label="Hari" />
      <Item val={timeLeft.hours} label="Jam" />
      <Item val={timeLeft.minutes} label="Menit" />
      <Item val={timeLeft.seconds} label="Detik" />
    </div>
  );
}