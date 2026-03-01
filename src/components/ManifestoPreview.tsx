import { motion } from "framer-motion";
import { Scroll, Zap, Coffee, Megaphone, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const manifestoPoints = [
  { icon: Coffee, title: "সবার জন্য ফ্রি চা", desc: "প্রতিটি মোড়ে চায়ের স্টল — খরচ সরকার দেবে (কীভাবে জানি না)" },
  { icon: Megaphone, title: "সপ্তাহে ৩ দিন মিছিল", desc: "বাকি ৪ দিন বিশ্রাম — কারণ গলা ব্যথা হয়" },
  { icon: Zap, title: "লোডশেডিং-মুক্ত আড্ডা", desc: "চায়ের দোকানে ২৪/৭ বিদ্যুৎ নিশ্চিত করা হবে" },
  { icon: Heart, title: "ভালোবাসা দিবসে ছুটি", desc: "সিঙ্গেলদের জন্য বিশেষ চা-অফার" },
  { icon: Shield, title: "পোস্টার সুরক্ষা আইন", desc: "পোস্টার ছেঁড়া শাস্তিযোগ্য অপরাধ ঘোষণা করা হবে" },
  { icon: Scroll, title: "মিটিং-এ ঘুমানো বৈধ", desc: "বক্তৃতা বোরিং হলে ঘুমানোর অধিকার সংরক্ষিত" },
];

const ManifestoPreview = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-1 font-semibold">ইশতেহার</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground">
            📜 আমাদের প্রতিশ্রুতি
          </h2>
          <p className="text-muted-foreground text-sm mt-1">(পূরণ করার কোনো প্ল্যান নেই, তবু দিলাম)</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {manifestoPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-elevated transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <point.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base">{point.title}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/about"
            className="inline-block px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            পুরো ইশতেহার পড়ুন (যদি সাহস থাকে) →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ManifestoPreview;
