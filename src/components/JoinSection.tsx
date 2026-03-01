import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const JoinSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", area: "", reason: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("নাম আর ফোন নম্বর ছাড়া কিভাবে চায়ে ডাকবো? 😑");
      return;
    }
    // save join request to Firestore
    try {
      addDoc(collection(db, "joinRequests"), {
        ...form,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Failed to save join request:", e);
    }

    toast.success(`স্বাগতম ${form.name}! 🎉 আবেদন জমা হয়েছে।`);
    setForm({ name: "", phone: "", area: "", reason: "" });
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-7 h-7 text-primary" />
            </div>
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-2 font-semibold">যোগদান</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              দলে ভিড়ুন!
            </h2>
            <p className="text-muted-foreground text-base">
              কোনো যোগ্যতা লাগে না, কোনো পরীক্ষা নেই! শুধু চা খেতে পারলেই হবে। 
              ফর্ম পূরণ করুন, পদ বরাদ্দ হবে খুব শীঘ্রই (হয়তো)। 😄
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-5 md:p-8 shadow-elevated border border-border space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">আপনার নাম (আসল না হলেও চলবে) *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="যেমন: বিপ্লব মামা"
                className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">ফোন নম্বর (মিস কল দিলেও চলবে) *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="০১XXXXXXXXX"
                className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">এলাকা (চায়ের দোকানের নাম দিলে বোনাস পয়েন্ট)</label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
                placeholder="যেমন: মিরপুর ১০ নম্বর চায়ের স্টল"
                className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">কেন যোগ দিতে চান? (সৎ উত্তর দিলে চা ফ্রি)</label>
              <textarea
                value={form.reason}
                onChange={(e) => update("reason", e.target.value)}
                placeholder="যেমন: টাইমপাস করতে, পদবি চাই, চায়ে ছাড় চাই..."
                rows={3}
                className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:opacity-90 transition-opacity shadow-card"
            >
              আবেদন জমা দিন 🚀
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
