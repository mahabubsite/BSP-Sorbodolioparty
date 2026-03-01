import { motion } from "framer-motion";
import { Star, Award, Shield, Crown, Flame, Zap } from "lucide-react";

const members = [
  {
    name: "নাফিয়ান শেখ নাফিজ",
    role: "সভাপতি (স্বঘোষিত)",
    initials: "না",
    image: "nafiz.jpg",
    tagline: "",
    rank: "👑 সর্বোচ্চ নেতা",
    icon: Crown,
    teaCups: 1000000,
    meetings: 990,
    specialty: "যেকোনো সমস্যার সমাধান: আরেক কাপ চা",
  },
  {
    name: "রবিউল আলম",
    role: "সহ-সভাপতি (স্বঘোষিত)",
    initials: "রো",
    image: "robiul.jpg",
    tagline: "",
    rank: "⚔️ সহ-সভাপতি",
    icon: Shield,
    teaCups: 100000,
    meetings: 890,
    specialty: "যেকোনো সমস্যার সমাধান: আরেক কাপ চা",
  },
  {
    name: "মাহবুব ইসলাম",
    role: "সদস্য সচিব (স্বঘোষিত)",
    initials: "মা",
    image: "mahbub.jpg",
    tagline: "",
    rank: "📋 সদস্য সচিব",
    icon: Star,
    teaCups: 10000,
    meetings: 698,
    specialty: "যেকোনো সমস্যার সমাধান: আরেক কাপ চা",
  },
  {
    name: "নয়ন মিয়া",
    role: "মুখ্য সংগঠক (স্বঘোষিত)",
    initials: "নে",
    image: "nayan.jpg",
    tagline: "",
    rank: "📣 প্রধান সংগঠক",
    icon: Zap,
    teaCups: 1000,
    meetings: 500,
    specialty: "যেকোনো সমস্যার সমাধান: আরেক কাপ চা",
  },
  {
    name: "চা-মামা",
    role: "চা সভাপতি (স্বঘোষিত)",
    initials: "চা",
    image: "chamama.jpg",
    tagline: "চা ছাড়া মিটিং হবে না!",
    rank: "🍵চা সর্বোচ্চ নেতা",
    icon: Crown,
    teaCups: 2847,
    meetings: 412,
    specialty: "যেকোনো সমস্যার সমাধান: আরেক কাপ চা",
  },
  {
    name: "ফেসবুক ভাই",
    role: "ডিজিটাল যুদ্ধ মন্ত্রী",
    initials: "ফে",
    image: "facebookbhai.jpg",
    tagline: "শেয়ার করো, বিপ্লব আসবে",
    rank: "⚔️ ডিজিটাল যোদ্ধা",
    icon: Zap,
    teaCups: 1523,
    meetings: 89,
    specialty: "ফেসবুক স্ট্যাটাস দিয়ে বিপ্লব",
  },
  {
    name: "আড্ডা খালা",
    role: "জনসংযোগ সচিব",
    initials: "আ.খ",
    image: "adda-khala.jpg",
    tagline: "গল্প শেষ হয় না কোনোদিন",
    rank: "🎙️ মুখপাত্র",
    icon: Star,
    teaCups: 3102,
    meetings: 567,
    specialty: "৫ মিনিটের গল্প ৫ ঘণ্টায় বলা",
  },
  {
    name: "পোস্টার মিয়া",
    role: "প্রচার সম্পাদক",
    initials: "পো",
    image: "poster-mia.jpg",
    tagline: "আরেকটু গ্লিটার দিলে ভালো হতো",
    rank: "🎨 শিল্পী",
    icon: Flame,
    teaCups: 987,
    meetings: 201,
    specialty: "MS Paint-এ মাস্টারপিস বানানো",
  },
  {
    name: "ভোট চাচা",
    role: "নির্বাচন কমিশনার",
    initials: "ভো",
    image: "vot-chacha.jpg",
    tagline: "ভোট দিন, চা ফ্রি!",
    rank: "🗳️ ভোট বিশেষজ্ঞ",
    icon: Shield,
    teaCups: 2156,
    meetings: 334,
    specialty: "ভোট চায় কিন্তু দাঁড়ায় না",
  },
  {
    name: "স্লোগান আপা",
    role: "সাংস্কৃতিক সম্পাদক",
    initials: "স্লো",
    image: "slogan-apa.jpg",
    tagline: "রাইম না মিললেও চলবে",
    rank: "📢 স্লোগান কুইন",
    icon: Award,
    teaCups: 1789,
    meetings: 445,
    specialty: "তাৎক্ষণিক স্লোগান তৈরি (কোনোটাই রাইম করে না)",
  },
  {
    name: "সেলফি ভাই",
    role: "অফিসিয়াল ফটোগ্রাফার",
    initials: "সে",
    image: "selfie-bhai.jpg",
    tagline: "ফটো না উঠলে ইভেন্ট হয়নি!",
    rank: "📸 চিফ ফটোগ্রাফার",
    icon: Star,
    teaCups: 654,
    meetings: 178,
    specialty: "সব ছবিতে নিজেকে ঢুকানো",
  },
  {
    name: "মিটিং দাদা",
    role: "সাংগঠনিক সম্পাদক",
    initials: "মি",
    image: "meeting-dada.jpg",
    tagline: "মিটিং-ই সমাধান!",
    rank: "📋 মিটিং মাস্টার",
    icon: Shield,
    teaCups: 4201,
    meetings: 999,
    specialty: "মিটিং-এর জন্য মিটিং ডাকা",
  },
];

const MembersSection = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2 font-semibold">নেতৃত্ব</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            মহান নেতৃবৃন্দ 🫡
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            যারা চায়ের দোকানে বসে দেশ বদলানোর পরিকল্পনা করেন। (কেউ চেনে না, কিন্তু পদ আছে!)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-border group"
            >
              {/* Rank badge */}
              <div className="bg-primary/5 px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{member.rank}</span>
                <member.icon size={14} className="text-primary/60" />
              </div>

              <div className="p-5 text-center">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ring-2 ring-primary/20 ring-offset-2 ring-offset-card overflow-hidden">
                  <img
                    src={`/${member.image ?? "member.jpg"}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/member.jpg";
                    }}
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-accent font-semibold text-xs mt-0.5">{member.role}</p>
                <p className="text-muted-foreground text-xs mt-2 italic">"{member.tagline}"</p>

                {/* Stats */}
                <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm font-bold text-foreground">{member.teaCups.toLocaleString("bn-BD")}</p>
                    <p className="text-[10px] text-muted-foreground">কাপ চা ☕</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-foreground">{member.meetings.toLocaleString("bn-BD")}</p>
                    <p className="text-[10px] text-muted-foreground">মিটিং 📋</p>
                  </div>
                </div>

                {/* Specialty */}
                <div className="mt-3 bg-muted/50 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">বিশেষত্ব</p>
                  <p className="text-xs text-foreground font-medium">{member.specialty}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs mt-8 italic"
        >
          ⚠️ উপরের সব তথ্য সম্পূর্ণ বানোয়াট। কোনো চরিত্রের সাথে কারো মিল থাকলে সেটা কাকতালীয়। 😂
        </motion.p>
      </div>
    </section>
  );
};

export default MembersSection;
