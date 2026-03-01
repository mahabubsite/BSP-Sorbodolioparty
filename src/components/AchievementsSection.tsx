import { motion } from "framer-motion";
import { Trophy, Coffee, Megaphone, Users, FileText, Clock } from "lucide-react";

const stats = [
  { icon: Coffee, value: "৫,০০০+", label: "কাপ চা খাওয়া হয়েছে", emoji: "☕" },
  { icon: Megaphone, value: "১,২০০+", label: "মিছিলে গলা ফাটানো হয়েছে", emoji: "📢" },
  { icon: FileText, value: "৩,৫০০+", label: "পোস্টার ছাপানো হয়েছে (কেউ পড়েনি)", emoji: "🖨️" },
  { icon: Users, value: "৮৭", label: "সদস্য যোগ দিয়ে পালিয়েছে", emoji: "🏃" },
  { icon: Trophy, value: "০", label: "নির্বাচনে জিতেছি", emoji: "🏆" },
  { icon: Clock, value: "∞", label: "ঘণ্টা মিটিংয়ে নষ্ট হয়েছে", emoji: "⏰" },
];

const AchievementsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            🏅 আমাদের গৌরবময় অর্জন
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            (যা নিয়ে আমরা গর্বিত... হওয়ার চেষ্টা করছি)
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-border rounded-xl p-4 md:p-6 text-center shadow-sm"
            >
              <span className="text-3xl md:text-4xl">{stat.emoji}</span>
              <div className="text-2xl md:text-3xl font-bold text-primary mt-2 font-display">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
