import { motion } from "framer-motion";

const headlines = [
  "⚡ ব্রেকিং: দলীয় সভায় চা ফুরিয়ে গেছে — জরুরি সভা ডাকা হয়েছে",
  "🔥 পোস্টার মিয়া নতুন ফন্ট আবিষ্কার করেছেন — দল উল্লসিত",
  "📢 আগামী মিছিলে স্লোগান মুখস্ত রাখা বাধ্যতামূলক — নেতৃবৃন্দ",
  "☕ ৫,০০১ তম কাপ চা উদযাপন — ফ্রি বিস্কুট বিতরণ",
  "🏆 এবারও নির্বাচনে দাঁড়ানো হয়নি — 'প্রস্তুতি চলছে' বলা হয়েছে",
  "🎪 দলীয় অফিসের ভাড়া বাকি — চায়ের দোকানে শিফট করা হয়েছে",
];

const NewsTicker = () => {
  return (
    <div className="bg-accent text-accent-foreground overflow-hidden py-2">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...headlines, ...headlines].map((h, i) => (
          <span key={i} className="text-sm font-medium">{h}</span>
        ))}
      </motion.div>
    </div>
  );
};

export default NewsTicker;
