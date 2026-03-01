import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const amounts = [50, 100, 500, 1000];

const DonateSection = () => {
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");

  const handleDonate = () => {
    const amount = custom ? parseInt(custom) : selected;
    if (!amount || amount <= 0) {
      toast.error("ভাই, শূন্য টাকা দিয়ে বিপ্লব হয় না! 😤");
      return;
    }
    // write donation to Firestore
    try {
      addDoc(collection(db, "donations"), {
        amount,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Failed to record donation:", e);
    }
    if (amount >= 10000) {
      toast.success(`৳${amount}?! আপনি তো সরাসরি সভাপতি হয়ে যান! 👑`);
    } else {
      toast.success(`৳${amount} পেয়েছি! চায়ের ফান্ডে জমা হবে। ধন্যবাদ! 🍵`);
    }
    setCustom("");
  };

  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-accent" />
          </div>
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2 font-semibold">অনুদান</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            চায়ের ফান্ডে দান করুন 🍵
          </h2>
          <p className="text-muted-foreground text-base mb-8 leading-relaxed">
            আপনার টাকা কোথায় যাবে? চা কিনতে, ব্যানার ছাপাতে, আর ফেসবুকে বুস্ট দিতে। 
            স্বচ্ছতার প্রতিশ্রুতি — রিসিট দিতে পারবো না, কিন্তু দোয়া পাবেন! 🤲
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelected(amt); setCustom(""); }}
                className={`py-3 rounded-lg font-bold text-lg border-2 transition-all duration-200 ${
                  selected === amt && !custom
                    ? "border-primary bg-primary text-primary-foreground shadow-card"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                ৳{amt}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="বড়লোক হলে অন্য পরিমাণ লিখুন (৳)"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
            className="w-full py-3 px-4 rounded-lg border-2 border-border bg-card text-foreground text-center text-lg mb-4 focus:outline-none focus:border-primary transition-colors"
          />

          <button
            onClick={handleDonate}
            className="w-full py-3.5 bg-accent text-accent-foreground font-bold text-lg rounded-lg hover:opacity-90 transition-opacity shadow-elevated"
          >
            দান করুন (চায়ের জন্য) ☕
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DonateSection;
