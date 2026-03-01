import { motion } from "framer-motion";
import { Shield, Users, Target, Heart, Scroll, Megaphone, Coffee, Zap } from "lucide-react";

const values = [
  { icon: Shield, title: "ন্যায়বিচার 😇", desc: "বিচার চাই — কিন্তু শুধু অন্যদের জন্য। নিজেদের বেলায় 'পরিস্থিতি বিবেচনায়' ছাড়!" },
  { icon: Users, title: "ঐক্য 🤝", desc: "সবাই মিলে চা খাই, মতামতের পার্থক্য? সেটা চা শেষে দেখা যাবে।" },
  { icon: Target, title: "উন্নয়ন 🚀", desc: "উন্নয়ন মানে নতুন ব্যানার, নতুন পোস্টার, নতুন ফেসবুক পেইজ। ব্যস।" },
  { icon: Heart, title: "সেবা ❤️", desc: "জনগণের সেবায় — মানে ফেসবুকে পোস্ট দিয়ে দুঃখ প্রকাশ করা।" },
  { icon: Coffee, title: "সবার জন্য ফ্রি চা 🍵", desc: "প্রতিটি মোড়ে চায়ের স্টল — খরচ সরকার দেবে (কীভাবে জানি না)" },
  { icon: Megaphone, title: "সপ্তাহে ৩ দিন মিছিল 🙋", desc: "বাকি ৪ দিন বিশ্রাম — কারণ গলা ব্যথা হয়" },
  { icon: Zap, title: "লোডশেডিং-মুক্ত আড্ডা 🎒", desc: "চায়ের দোকানে ২৪/৭ বিদ্যুৎ নিশ্চিত করা হবে" },
  { icon: Heart, title: "ভালোবাসা দিবসে ছুটি ❤️", desc: "সিঙ্গেলদের জন্য বিশেষ চা-অফার" },
  { icon: Shield, title: "পোস্টার সুরক্ষা আইন 🛡️", desc: "পোস্টার ছেঁড়া শাস্তিযোগ্য অপরাধ ঘোষণা করা হবে" },
  { icon: Scroll, title: "মিটিং-এ ঘুমানো বৈধ 😴", desc: "বক্তৃতা বোরিং হলে ঘুমানোর অধিকার সংরক্ষিত" },
];

const AboutSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2 font-semibold">আমাদের সম্পর্কে</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            আমরা কারা? 🤷
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            বাংলাদেশ সর্বোদলীয় পার্টি — দেশের একমাত্র দল যেটার কোনো ইশতেহার নেই, কোনো দফতর নেই, 
            কিন্তু ফেসবুক পেইজ আছে! আমরা বিশ্বাস করি চায়ের দোকানে বসে দেশ চালানো যায়, 
            শুধু দরকার সঠিক চা আর সঠিক আড্ডা। 🍵✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card-gradient rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
