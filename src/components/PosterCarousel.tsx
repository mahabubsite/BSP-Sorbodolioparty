import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import poster1 from "@/assets/poster1.jpg";
import poster2 from "@/assets/poster2.jpg";
import poster3 from "@/assets/poster3.jpg";

const posters = [
  { src: poster1, alt: "পোস্টার ১ - গ্লিটার বেশি দিলে ভোট বেশি" },
  { src: poster2, alt: "পোস্টার ২ - ফটোশপের জাদু" },
  { src: poster3, alt: "পোস্টার ৩ - কালার যত বেশি, বিপ্লব তত কাছে" },
];

const PosterCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % posters.length);
  const prev = () => setCurrent((c) => (c - 1 + posters.length) % posters.length);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-8">
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2 font-semibold">প্রচারণা</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            মাস্টারপিস পোস্টার 🎨
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            (ফটোশপ শিখে ৩ দিনে বানানো — প্রফেশনাল মানের!)
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated bg-muted">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={posters[current].src}
                alt={posters[current].alt}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated hover:opacity-90 transition-opacity"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated hover:opacity-90 transition-opacity"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {posters.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Poster ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterCarousel;
