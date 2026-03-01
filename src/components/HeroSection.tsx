import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden -mt-14">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/20 opacity-30" />

      <div className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-3 font-medium">
            ঐক্য · চা · আড্ডা · ভোট
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-4 leading-tight">
            বাংলাদেশ <br />
            <span className="text-gradient-gold">সর্বোদলীয় পার্টি</span> 
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            দেশের একমাত্র দল যেখানে কোনো নেতা নেই, কোনো কর্মী নেই, শুধু আছে স্বপ্ন আর পোস্টার! 
            চায়ের কাপে ঝড় তুলে বাংলাদেশ বদলে দেওয়ার মিশনে আমরা। 🍵
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/join"
            className="inline-block px-8 py-3.5 bg-accent text-accent-foreground font-bold rounded-lg text-lg hover:opacity-90 transition-opacity shadow-elevated"
          >
            যোগ দিবো! 🙋
          </Link>
          <Link
            to="/about"
            className="inline-block px-8 py-3.5 border-2 border-gold text-gold font-bold rounded-lg text-lg hover:bg-gold/10 transition-colors"
          >
            এটার কাজ কি? 🤔
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
