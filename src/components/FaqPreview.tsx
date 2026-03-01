import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "এই দল কি আসল?", a: "না ভাই, এটা স্যাটায়ার। হাসির জন্য বানানো। রাজনৈতিক উদ্দেশ্য নেই — শুধু চায়ের উদ্দেশ্য আছে। ☕" },
  { q: "সদস্য হতে কত টাকা লাগে?", a: "০ টাকা। তবে এক কাপ চা খাওয়াতে হবে সভাপতিকে। এটাই ভর্তি ফি। 🍵" },
  { q: "নির্বাচনে দাঁড়াবেন কবে?", a: "যেদিন পোস্টারের কালি শুকাবে, সেদিন। মানে কোনোদিন না। 😅" },
  { q: "দলের অফিস কোথায়?", a: "নিকটতম চায়ের দোকানে জিজ্ঞেস করুন। তারাই আমাদের আঞ্চলিক অফিস। 🏪" },
];

const FaqPreview = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            ❓ জিজ্ঞাসিত প্রশ্ন
          </h2>
          <p className="text-muted-foreground text-sm mt-1">(যা কেউ জিজ্ঞেস করেনি, তবু উত্তর দিলাম)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="bg-card border border-border rounded-xl px-5">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-semibold text-foreground text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqPreview;
