import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";

const photos = [
  { src: gallery1, alt: "জনসমাবেশ", caption: "১২ জন এসেছিল, ফটো অ্যাঙ্গেলে ১২০০ লাগছে 📸" },
  { src: gallery2, alt: "নেতার ভাষণ", caption: "মাইক ছিল না, তবু ৩ ঘণ্টা বক্তৃতা 🎤" },
  { src: gallery3, alt: "সেবা কার্যক্রম", caption: "ফটো তোলার পর বাকিটা পরে করবো 📷" },
  { src: gallery4, alt: "দলীয় সভা", caption: "মিটিং-এ এজেন্ডা: পরবর্তী মিটিং কবে হবে 📋" },
  { src: gallery5, alt: "যুব মিছিল", caption: "স্লোগান ভুলে গেছি, তাও হেঁটেছি 🚶" },
  { src: gallery6, alt: "বৃক্ষরোপণ", caption: "গাছ লাগিয়ে সেলফি তুলে চলে গেছি 🌳" },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8">
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2 font-semibold">গ্যালারি</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            ঐতিহাসিক মুহূর্ত 📸
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            আমাদের "বিশাল" জনসভা ও "যুগান্তকারী" কার্যক্রমের কিছু (এডিটেড) ছবি
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => setSelected(i)}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-muted cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-background text-xs font-semibold">{photo.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 text-background flex items-center justify-center hover:bg-background/40 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.img
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-background text-sm font-semibold text-center px-4">
              {photos[selected].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
