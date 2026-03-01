import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "হোম", to: "/" },
  { label: "পরিচিতি", to: "/about" },
  { label: "সদস্যবৃন্দ", to: "/members" },
  { label: "অনুদান", to: "/donate" },
  { label: "যোগদান", to: "/join" },
];

const Footer = () => {
  return (
    <footer className="bg-footer text-primary-foreground">
      <div className="container px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-3">বাংলাদেশ সর্বোদলীয় পার্টি</h3>
            <p className="text-primary-foreground/60 leading-relaxed text-sm">
              চায়ের কাপে ঝড় তুলে বাংলাদেশ বদলানোর মিশনে। ⚠️ এটি একটি স্যাটায়ার পেইজ।
            </p>
            <div className="w-14 h-1 bg-gold mt-3 rounded-full" />
          </div>

          <div>
            <h4 className="font-bold text-base mb-3 text-gold">দ্রুত লিংক</h4>
            <ul className="space-y-1.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-primary-foreground/60 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3 text-gold">যোগাযোগ</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+880 1XXX-XXXXXX (মিস কল দিলেও চলবে)</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                <Mail size={16} className="text-gold shrink-0" />
                <span>chai@sorbodoliyoparty.fake</span>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>নিকটতম চায়ের দোকান, ঢাকা 🍵</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                <a
                  href="https://www.facebook.com/profile.php?id=61588643024995"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook page"
                  className="inline-flex items-center"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.16 10.44 21.98v-6.99H8.08v-2.92h2.36V9.85c0-2.34 1.4-3.64 3.55-3.64 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.74h2.59l-.41 2.92h-2.18V22C18.34 21.16 22 17.09 22 12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container px-4 py-4 text-center text-xs text-primary-foreground/40">
          © ২০২৬ বাংলাদেশ সর্বোদলীয় পার্টি। কোনো অধিকার সংরক্ষিত নেই — চুরি করলেও সমস্যা নাই। 😂
        </div>
      </div>
    </footer>
  );
};

export default Footer;
