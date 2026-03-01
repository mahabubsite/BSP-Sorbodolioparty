import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Image, HandCoins, UserPlus, FileImage, Info } from "lucide-react";

const links = [
  { icon: Info, label: "পরিচিতি", to: "/about", emoji: "🤔", color: "bg-primary/10 text-primary" },
  { icon: Users, label: "নেতৃবৃন্দ", to: "/members", emoji: "👥", color: "bg-accent/10 text-accent" },
  { icon: FileImage, label: "পোস্টার", to: "/posters", emoji: "🖼️", color: "bg-gold/20 text-gold-foreground" },
  { icon: Image, label: "গ্যালারি", to: "/gallery", emoji: "📸", color: "bg-primary/10 text-primary" },
  { icon: HandCoins, label: "অনুদান", to: "/donate", emoji: "💸", color: "bg-accent/10 text-accent" },
  { icon: UserPlus, label: "যোগদান", to: "/join", emoji: "🙋", color: "bg-gold/20 text-gold-foreground" },
];

const QuickLinksSection = () => {
  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {links.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={link.to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="text-2xl">{link.emoji}</span>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
