import { motion } from "framer-motion";

const SloganBanner = () => {
  return (
    <section className="py-10 md:py-16 bg-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gold blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gold/80 text-xs uppercase tracking-[0.3em] mb-3">আমাদের স্লোগান</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
            "চায়ের কাপে ঝড়, <br />
            <span className="text-gradient-gold">ভোটের বাক্সে গর্জন!" 🦁</span>
          </h2>
          <p className="text-primary-foreground/50 text-sm mt-4">
            (গর্জন এখনো শুরু হয়নি, চা খাওয়া চলছে ☕)
          </p>
          <div className="w-20 h-1 bg-gold mx-auto mt-5 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default SloganBanner;
