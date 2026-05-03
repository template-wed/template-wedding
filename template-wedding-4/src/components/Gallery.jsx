// src/components/Gallery.jsx
import { motion } from 'framer-motion';
import gal1 from '../music/galeri-1.png'
import gal2 from '../music/galeri-2.png'
import gal3 from '../music/galeri-3.png'

export default function Gallery() {
  const stories = [
    {
      year: "2023",
      title: "Pertama Bertemu",
      desc: "Pertemuan pertama yang tidak disengaja dalam sebuah acara teman, menjadi awal mula obrolan kecil kami."
    },
    {
      year: "2024",
      title: "Memulai Komitmen",
      desc: "Setelah saling mengenal lebih dekat, kami memutuskan untuk berkomitmen dan saling mendukung dalam mencapai impian."
    },
    {
      year: "2025",
      title: "Menuju Halal",
      desc: "Dengan restu dari kedua keluarga, kami melangkah untuk mempersiapkan pernikahan dan membangun ibadah bersama."
    }
  ];

  const photos = [
    gal1,
    gal2,
    gal3,
    gal1,
    gal2,
    gal3,
  ];

  return (
    <section className="py-20 px-6 bg-stone-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Love Story Timeline */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-serif text-amber-800 mb-10">Our Story</h2>
          <div className="relative border-l-2 border-amber-200 ml-4 md:mx-auto md:w-max">
            {stories.map((story, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="mb-10 ml-6 md:ml-8 relative text-left max-w-md"
              >
                {/* Dot */}
                <div className="absolute -left-[35px] md:-left-[41px] bg-amber-500 w-4 h-4 rounded-full border-4 border-white shadow"></div>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">{story.year}</span>
                <h3 className="text-lg font-bold text-stone-800 mt-2">{story.title}</h3>
                <p className="text-stone-600 text-sm mt-1">{story.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="text-center">
          <h2 className="text-3xl font-serif text-amber-800 mb-10">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-xl shadow-sm aspect-square bg-stone-200"
              >
                <img 
                  src={photo} 
                  alt={`Gallery Naya Tegar ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}