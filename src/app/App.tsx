import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  Menu, X, Star, MapPin, Phone, Instagram, MessageCircle,
  ChevronDown, Sparkles, Heart, Award, Clock, Users, Camera,
  Check, ArrowRight, Quote, Gem, Crown, Flower2, Wand2,
  Brush, Palette, Scissors, Layers, Droplets, Zap,
} from "lucide-react";

/* ── Image imports ────────────────────────────────────────── */
import riya01 from "@/imports/riya-01.png";
import riya02 from "@/imports/riya-02.png";
import riya03 from "@/imports/riya-03.png";
import riya04 from "@/imports/riya-04.png";
import riya05 from "@/imports/riya-05.png";
import riya06 from "@/imports/riya-06.png";
import riya07 from "@/imports/riya-07.png";
import riya08 from "@/imports/riya-08.png";
import riya09 from "@/imports/riya-09.png";
import riya10 from "@/imports/riya-10.png";
import riya11 from "@/imports/riya-11.png";
import riya12 from "@/imports/riya-12.png";
import riya13 from "@/imports/riya-13.png";

// Use the first supplied portfolio image as the hero studio visual.
const studioMirror = riya01;

/* ── Brand constants ──────────────────────────────────────── */
const BRAND      = "RIYA'S GLITZ MAKE UP & NAIL STUDIO";
const SHORT      = "RIYA'S GLITZ";
const PHONE      = "07891618280";
const PHONE_HREF = "tel:07891618280";
const WA_HREF    = "https://wa.me/917891618280";
const IG_HREF    = "https://instagram.com/riyas_glitz?utm_medium=copy_link";
const ADDRESS    = "A-41, near Domino's, Sindhi Colony, Pratap Nagar, Chittorgarh, Rajasthan 312001";
const MAP_SRC    = "https://www.google.com/maps?q=A-41%2C%20near%20Domino%27s%2C%20Sindhi%20Colony%2C%20Pratap%20Nagar%2C%20Chittorgarh%2C%20Rajasthan%20312001&output=embed";

const NAV_LINKS = [
  { label: "Home",        href: "#home" },
  { label: "Services",    href: "#services" },
  { label: "Gallery",     href: "#gallery" },
  { label: "Why Us",      href: "#why-us" },
  { label: "Reviews",     href: "#reviews" },
  { label: "Appointment", href: "#appointment" },
  { label: "Contact",     href: "#contact" },
];

const SERVICES = [
  { icon: <Crown    className="w-6 h-6"/>, title: "Bridal Makeup",         desc: "Exquisite bridal looks crafted to complement your outfit, skin tone, and personality on your most sacred day.",         price: "₹7,000+" },
  { icon: <Sparkles className="w-6 h-6"/>, title: "Party Makeup",          desc: "Glamorous, long-lasting party looks designed to turn heads and photograph beautifully all evening.",                     price: "₹1,800+" },
  { icon: <Gem      className="w-6 h-6"/>, title: "Engagement Makeup",     desc: "Radiant engagement looks that make you glow through every photo and every precious moment.",                             price: "₹3,500+" },
  { icon: <Brush    className="w-6 h-6"/>, title: "Airbrush Makeup",       desc: "Flawless, streak-free HD airbrush finish — lightweight, long-wearing, and camera-perfect.",                             price: "₹4,500+" },
  { icon: <Flower2  className="w-6 h-6"/>, title: "Pre-Bridal Package",    desc: "Complete pre-wedding beauty prep — facials, clean-ups, threading, waxing, and skin care rituals.",                      price: "₹5,000+" },
  { icon: <Scissors className="w-6 h-6"/>, title: "Hair Styling",          desc: "Elegant updos, bridal braids, curls, and blowouts — hair artistry for every occasion.",                                 price: "₹1,500+" },
  { icon: <Droplets className="w-6 h-6"/>, title: "Skin & Facial",         desc: "Premium facials, clean-ups, D-tan, bleach, and advanced skin treatments for a luminous glow.",                          price: "₹800+"   },
  { icon: <Palette  className="w-6 h-6"/>, title: "Nail Art & Extensions", desc: "Gel nails, acrylic extensions, nail art, and French manicures — precision and creativity in every coat.",               price: "₹600+"   },
  { icon: <Layers   className="w-6 h-6"/>, title: "Hair Spa & Treatment",  desc: "Nourishing hair spa, keratin treatment, and deep conditioning for soft, lustrous, salon-fresh hair.",                   price: "₹1,200+" },
  { icon: <Zap      className="w-6 h-6"/>, title: "Full Bridal Package",   desc: "All-inclusive luxury — bridal makeup, hair, pre-bridal rituals, nail art, trial session, and more.",                   price: "₹12,000+" },
];

const GALLERY_IMAGES = [
  { src: riya01, alt: "RIYA'S GLITZ beauty portfolio image 1" },
  { src: riya02, alt: "RIYA'S GLITZ beauty portfolio image 2" },
  { src: riya03, alt: "RIYA'S GLITZ beauty portfolio image 3" },
  { src: riya04, alt: "RIYA'S GLITZ beauty portfolio image 4" },
  { src: riya05, alt: "RIYA'S GLITZ beauty portfolio image 5" },
  { src: riya06, alt: "RIYA'S GLITZ beauty portfolio image 6" },
  { src: riya07, alt: "RIYA'S GLITZ beauty portfolio image 7" },
  { src: riya08, alt: "RIYA'S GLITZ beauty portfolio image 8" },
  { src: riya09, alt: "RIYA'S GLITZ beauty portfolio image 9" },
  { src: riya10, alt: "RIYA'S GLITZ beauty portfolio image 10" },
  { src: riya11, alt: "RIYA'S GLITZ beauty portfolio image 11" },
  { src: riya12, alt: "RIYA'S GLITZ beauty portfolio image 12" },
  { src: riya13, alt: "RIYA'S GLITZ beauty portfolio image 13" },
];

const REVIEWS = [
  { name: "Pooja Sharma",    rating: 5, text: "Riya transformed me completely! My bridal makeup was exactly what I had dreamed of — flawless, long-lasting, and absolutely stunning. The entire team at RIYA'S GLITZ is incredibly professional and warm.", location: "Chittorgarh",    date: "Feb 2026" },
  { name: "Ritika Gupta",    rating: 5, text: "The best salon in Chittorgarh, hands down. The ambience is gorgeous and the services are top-notch. Riya has a magical touch — my party makeup lasted 10 hours and looked fresh the whole night!",                    location: "Chittorgarh",    date: "Jan 2026" },
  { name: "Sonia Mahajan",   rating: 5, text: "Got my nail art and bridal hair done here. Both were flawless! The studio is so beautiful — pink chairs, floral mirrors, everything is perfect. Truly a premium experience.",                                     location: "Chittorgarh",   date: "Mar 2026" },
  { name: "Deepa Choudhary", rating: 5, text: "Came for a pre-bridal package and left feeling like a queen! The facial was heavenly and Riya's makeup skills are beyond compare. Already booked my wedding appointment!",                                      location: "Chittorgarh", date: "Apr 2026" },
];

const WHY_CHOOSE = [
  { icon: <Award    className="w-6 h-6"/>, title: "Skilled & Certified",    desc: "Professionally trained makeup artist with expertise in bridal, editorial, and HD makeup techniques." },
  { icon: <Sparkles className="w-6 h-6"/>, title: "Premium Products Only",  desc: "MAC, Huda Beauty, Kryolan, INGLOT — internationally trusted brands for safe, lasting results." },
  { icon: <Heart    className="w-6 h-6"/>, title: "Personalised Attention", desc: "Every client receives a dedicated consultation — your look is uniquely designed, never copied." },
  { icon: <Clock    className="w-6 h-6"/>, title: "Timely & Punctual",      desc: "We value your schedule and ensure every appointment runs smoothly, right on time." },
  { icon: <Users    className="w-6 h-6"/>, title: "300+ Happy Clients",     desc: "A trusted name in Chittorgarh with a loyal, growing community of satisfied brides and clients." },
  { icon: <Camera   className="w-6 h-6"/>, title: "Camera-Ready Finish",    desc: "Makeup crafted to photograph beautifully — no flashback, no cakey finish, just pure radiance." },
];

const COMP_CARDS = [
  { name: "Asha Verma",    role: "Bride",          avatar: "A", text: "Riya is truly a wizard! She made me look like a dream on my wedding day. The makeup stayed perfect for 14 hours through dancing, emotion, and everything!" },
  { name: "Neha Khajuria", role: "Regular Client", avatar: "N", text: "I've been coming to RIYA'S GLITZ for a year now. The services are consistently excellent, the ambience is relaxing, and Riya genuinely cares about every client." },
  { name: "Priya Pandita", role: "Bride 2026",     avatar: "P", text: "The most beautiful salon experience I've ever had. From the warm welcome to the stunning final look — every minute at RIYA'S GLITZ is a luxury!" },
];

const COMP_MARQUEE = [
  { quote: "Walked in nervous, walked out absolutely glowing with confidence.",      author: "Seema Bhat",   tag: "Bridal Client" },
  { quote: "The studio feels like a boutique in Paris — in the heart of Chittorgarh!",   author: "Kavya Sharma", tag: "Regular Client" },
  { quote: "My nail art got more compliments than my outfit at the party!",          author: "Tanya Gupta",  tag: "Nail Art Client" },
  { quote: "Riya remembers exactly what suits you — she truly knows her craft.",  author: "Ritu Khanna",  tag: "Loyal Client" },
  { quote: "The pre-bridal package is worth every rupee — my skin was glowing!",    author: "Mansi Singh",  tag: "Pre-Bridal" },
  { quote: "Chittorgarh's best kept secret. If you haven't tried RIYA'S GLITZ — go!",   author: "Divya Raina",  tag: "Client" },
];

const COMP_INSTAGRAM = [
  { emoji: "💄", text: "Just got my bridal makeup done at @riyas_glitz and I'm crying happy tears! Absolutely flawless!",   handle: "@pooja_bride_2026" },
  { emoji: "✨", text: "The nail extensions at RIYA'S GLITZ are everything! My hands have never looked this good.",              handle: "@ritika.glam" },
  { emoji: "👑", text: "If you're in Chittorgarh and need makeup done RIGHT — Riya is the only name you need.",                      handle: "@sonia.mahajan" },
  { emoji: "🌸", text: "Came for a facial, left looking 5 years younger. The skin treatments here are genuinely incredible.",    handle: "@riyas_glitz" },
  { emoji: "💅", text: "Got a hair spa + blow dry and my hair feels like silk. Premium products, premium service!",              handle: "@tanya_j" },
  { emoji: "🌹", text: "RIYA'S GLITZ is not just a salon — it's an experience. The ambience alone is worth the visit!",        handle: "@kavya.sharma_" },
];

const COMP_QUOTES = [
  { quote: "Every woman deserves to feel her most beautiful self. At RIYA'S GLITZ, we don't just do makeup — we restore confidence, honour individuality, and celebrate every face that walks through our door.", attribution: "— Riya, Founder of RIYA'S GLITZ" },
  { quote: "Beauty is not about perfection — it's about enhancement. Our job is to bring out the best version of you and help you walk into any room with grace, poise, and absolute confidence.",                attribution: "— The RIYA'S GLITZ Philosophy" },
];

const STATS = [
  { emoji: "👑", metric: "300+",  label: "Happy Clients" },
  { emoji: "⭐", metric: "5.0",   label: "Average Rating" },
  { emoji: "🏅", metric: "5+",    label: "Years Experience" },
  { emoji: "💄", metric: "10+",   label: "Services Offered" },
  { emoji: "💅", metric: "1000+", label: "Nail Artworks" },
  { emoji: "🌸", metric: "100%",  label: "Client Satisfaction" },
];

/* ── Colour palette ───────────────────────────────────────── */
const C = {
  rose:    "#b5446e",
  gold:    "#c9907a",
  cream:   "#fdf8f3",
  dark:    "#1c0a00",
  pinkBg:  "#fdeee5",
  pinkBrd: "rgba(181,68,110,0.16)",
};

/* ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="relative overflow-x-hidden" style={{ background: C.cream, fontFamily: "'DM Sans',sans-serif" }}>
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <WhyChooseSection />
      <ReviewsSection />
      <ComplimentCards />
      <CTABannerMid />
      <ComplimentMarquee />
      <StatsSection />
      <ComplimentInstagram />
      <ComplimentQuotes />
      <AppointmentSection />
      <FinalCTA />
      <MapSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

/* ── Keyframes ────────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(4deg)}}
      @keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(-5deg)}}
      @keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-26px)}}
      @keyframes heroCard{0%,100%{transform:perspective(900px) rotateY(-4deg) translateY(0)}50%{transform:perspective(900px) rotateY(-4deg) translateY(-12px)}}
      @keyframes spinCW{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes spinCCW{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
      @keyframes glowPulse{0%,100%{box-shadow:0 8px 40px rgba(181,68,110,0.4)}50%{box-shadow:0 14px 65px rgba(181,68,110,0.68),0 0 90px rgba(201,144,122,0.22)}}
      @keyframes borderGlow{0%,100%{border-color:rgba(181,68,110,0.22)}50%{border-color:rgba(201,144,122,0.68)}}
      @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes particle{0%{opacity:0;transform:translateY(0) scale(0)}20%{opacity:1;transform:translateY(-16px) scale(1)}100%{opacity:0;transform:translateY(-100px) scale(0.4)}}
      @keyframes orbPulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:0.88;transform:scale(1.09)}}
      .marquee-strip{animation:marquee 34s linear infinite}
      .marquee-strip:hover{animation-play-state:paused}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-thumb{background:rgba(181,68,110,0.32);border-radius:99px}
      *{-webkit-tap-highlight-color:transparent}
    `}</style>
  );
}

/* ── Ambient orbs ─────────────────────────────────────────── */
function Orbs({ dark = false, count = 3 }: { dark?: boolean; count?: number }) {
  const cfg = [
    { w: 540, h: 540, t: "-8%",  r: "-10%", a: "floatA 16s ease-in-out infinite" },
    { w: 400, h: 400, b: "-6%",  l: "-8%",  a: "floatB 19s ease-in-out infinite 2s" },
    { w: 290, h: 290, t: "38%",  l: "43%",  a: "orbPulse 10s ease-in-out infinite 1s" },
    { w: 250, h: 250, t: "18%",  l: "22%",  a: "floatC 13s ease-in-out infinite 3s" },
  ].slice(0, count);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {cfg.map((c, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: c.w, height: c.h,
          top: (c as any).t, right: (c as any).r, bottom: (c as any).b, left: (c as any).l,
          background: dark
            ? `radial-gradient(circle,rgba(201,144,122,${[0.2,0.14,0.11,0.09][i]}) 0%,transparent 70%)`
            : `radial-gradient(circle,rgba(181,68,110,${[0.16,0.11,0.08,0.07][i]}) 0%,rgba(253,238,229,0.5) 55%,transparent 75%)`,
          filter: `blur(${[55,44,36,30][i]}px)`,
          animation: c.a,
        }} />
      ))}
    </div>
  );
}

/* ── Particles ────────────────────────────────────────────── */
function Particles({ dark = false }: { dark?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width:  [4,5,3,6,4,3,5,4,3,5,4,6,3,4][i],
          height: [4,5,3,6,4,3,5,4,3,5,4,6,3,4][i],
          left:   `${(i * 7.1 + 2) % 100}%`,
          top:    `${(i * 6.5 + 4) % 100}%`,
          background: dark ? "rgba(255,200,180,0.48)" : "rgba(181,68,110,0.28)",
          animation: `particle ${3 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${(i * 0.4) % 5.5}s`,
        }} />
      ))}
    </div>
  );
}

/* ── Scroll-reveal wrapper ────────────────────────────────── */
function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up"|"down"|"left"|"right"|"scale"; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const initial: Record<string, number|string> = { opacity: 0 };
  if (direction === "up")    initial.y = 48;
  if (direction === "down")  initial.y = -48;
  if (direction === "left")  initial.x = -50;
  if (direction === "right") initial.x = 50;
  if (direction === "scale") initial.scale = 0.88;

  const animate = inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial;

  return (
    <motion.div ref={ref} initial={initial} animate={animate}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ── Section header ───────────────────────────────────────── */
function SectionHead({ badge, title, accent, sub, dark = false }: {
  badge: React.ReactNode; title: string; accent: string; sub: string; dark?: boolean;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75 }} className="text-center mb-12 sm:mb-14 px-2">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs tracking-widest uppercase border"
        style={{ background: dark ? "rgba(201,144,122,0.18)" : C.pinkBg, color: dark ? "#f5c4a8" : C.rose, borderColor: dark ? "rgba(201,144,122,0.35)" : C.pinkBrd, fontFamily: "'DM Sans',sans-serif" }}>
        {badge}
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", color: dark ? "#fff" : C.dark, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700 }}>
        {title} <span style={{ color: dark ? "#f5c4a8" : C.rose, fontStyle: "italic" }}>{accent}</span>
      </h2>
      <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
        style={{ color: dark ? "rgba(255,215,195,0.68)" : "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>{sub}</p>
    </motion.div>
  );
}

/* ══════════════════ NAVBAR ════════════════════════════════ */
function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background:     scrolled ? "rgba(253,248,243,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "blur(4px)",
        borderBottom:   scrolled ? `1px solid ${C.pinkBrd}` : "1px solid transparent",
        boxShadow:      scrolled ? "0 4px 40px rgba(181,68,110,0.08)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-[70px] flex items-center justify-between gap-2">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 flex-shrink-0 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: "0 4px 18px rgba(181,68,110,0.42)" }}>
            <span style={{ fontFamily: "'Great Vibes',cursive", color: "#fff", fontSize: 18, lineHeight: 1 }}>R</span>
          </div>
          <div className="min-w-0 max-w-[180px] sm:max-w-[300px] lg:max-w-[380px]">
            <div className="hidden sm:block truncate" style={{ fontFamily: "'Great Vibes',cursive", color: scrolled ? C.rose : "#fff", fontSize: "clamp(15px,2.1vw,20px)", lineHeight: 1.1, textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.4)" }}>
              RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO
            </div>
            <div className="sm:hidden truncate" style={{ fontFamily: "'Great Vibes',cursive", color: scrolled ? C.rose : "#fff", fontSize: 20, lineHeight: 1.05, textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.4)" }}>
              RIYA'S GLITZ
            </div>
            <div className="hidden sm:block" style={{ fontFamily: "'DM Sans',sans-serif", color: scrolled ? "#9e6050" : "rgba(255,230,210,0.78)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Make Up · Hair · Skin · Nails · Chittorgarh
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} className="text-sm font-medium tracking-wide relative group transition-colors duration-200"
                style={{ color: scrolled ? "#5c1010" : "#fff", fontFamily: "'DM Sans',sans-serif", textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.5)" }}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: scrolled ? C.rose : "#f5c4a8" }} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#appointment"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: "0 6px 22px rgba(181,68,110,0.42)", fontFamily: "'DM Sans',sans-serif" }}>
            <Sparkles className="w-3.5 h-3.5" /> Book Now
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Toggle menu"
            style={{ color: scrolled ? C.rose : "#fff" }}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: "rgba(253,248,243,0.97)", backdropFilter: "blur(24px)", borderTop: `1px solid ${C.pinkBrd}` }}>
          <ul className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)}
                  className="block py-2.5 px-4 rounded-xl text-sm font-medium transition-all hover:bg-orange-50"
                  style={{ color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#appointment" onClick={() => setOpen(false)}
                className="block py-3 px-4 rounded-full text-sm font-semibold text-white text-center mt-2"
                style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})` }}>
                Book Appointment
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}

/* ══════════════════ HERO ══════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY     = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(145deg,#1c0500 0%,#4a0e20 30%,#7a2040 65%,#4a0e20 85%,#1c0500 100%)" }}>
      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 700, height: 700, top: "-15%", right: "-12%", background: "radial-gradient(circle at 40% 40%,rgba(181,68,110,0.42),rgba(201,144,122,0.14) 55%,transparent 72%)", filter: "blur(70px)", animation: "floatA 16s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 480, height: 480, bottom: "-10%", left: "-8%",  background: "radial-gradient(circle at 60% 60%,rgba(201,144,122,0.28),transparent 70%)", filter: "blur(60px)", animation: "floatB 20s ease-in-out infinite 3s" }} />
        {[
          { s: 95, t: "18%", l: "8%",  g: "rgba(255,160,140,0.68),rgba(181,68,110,0.38)", a: "floatA 9s ease-in-out infinite" },
          { s: 65, t: "12%", r: "18%", g: "rgba(255,200,180,0.58),rgba(201,144,122,0.28)", a: "floatB 11s ease-in-out infinite 2s" },
          { s: 52, t: "65%", l: "14%", g: "rgba(255,180,155,0.52),rgba(160,50,80,0.32)",  a: "floatC 8s ease-in-out infinite 1s" },
          { s: 80, b: "20%", r: "12%", g: "rgba(255,140,120,0.62),rgba(181,68,110,0.32)", a: "floatA 13s ease-in-out infinite 4s" },
        ].map((sp, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: sp.s, height: sp.s,
            top: (sp as any).t, left: (sp as any).l, right: (sp as any).r, bottom: (sp as any).b,
            background: `radial-gradient(circle at 30% 28%,${sp.g})`,
            boxShadow: `0 0 ${sp.s * 0.33}px rgba(201,144,122,0.42),inset 0 0 ${sp.s * 0.17}px rgba(255,255,255,0.18)`,
            animation: sp.a,
          }} />
        ))}
        <div className="absolute rounded-full" style={{ width: 840, height: 840, top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "1px solid rgba(201,144,122,0.09)", animation: "spinCW 60s linear infinite" }} />
        <div className="absolute rounded-full" style={{ width: 620, height: 620, top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "1px solid rgba(181,68,110,0.11)", animation: "spinCCW 44s linear infinite" }} />
      </motion.div>
      <Particles dark />

      <motion.div style={{ y: textY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-0 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center min-h-screen">
        {/* Text */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-5 text-xs tracking-widest uppercase border"
            style={{ background: "rgba(181,68,110,0.18)", borderColor: "rgba(201,144,122,0.3)", color: "#f5c4a8", fontFamily: "'DM Sans',sans-serif" }}>
            <Crown className="w-3.5 h-3.5" /> Make Up · Hair · Skin · Nails · Chittorgarh
          </motion.div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(2.4rem,5.5vw,5rem)", lineHeight: 1.07, fontWeight: 700 }}>
            <motion.span initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }} className="block">
              Where Beauty
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="block"
              style={{ background: "linear-gradient(135deg,#f5c4a8 0%,#fde8d8 45%,#e8907a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Meets Artistry
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.82, duration: 0.8 }}
            className="mt-5 text-base sm:text-lg leading-relaxed"
            style={{ color: "rgba(255,215,195,0.82)", fontFamily: "'DM Sans',sans-serif", fontWeight: 300, maxWidth: 490 }}>
            Welcome to <strong style={{ color: "#f5c4a8", fontWeight: 600 }}>RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO</strong> — Chittorgarh&apos;s premier beauty studio offering makeup, hair, skin treatments, and nail art with unmatched expertise and care.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.02, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3">
            <a href="#appointment"
              className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, fontFamily: "'DM Sans',sans-serif", animation: "glowPulse 3s ease-in-out infinite" }}>
              <Sparkles className="w-4 h-4" /> Book Your Session
            </a>
            <a href="#gallery"
              className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,144,122,0.38)", color: "#fff", backdropFilter: "blur(12px)", fontFamily: "'DM Sans',sans-serif" }}>
              Visit Studio <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.22, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-7 sm:gap-10">
            {[["300+","Happy Clients"],["5+","Years Experience"],["5.0★","Rating"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display',serif", color: "#f5c4a8", fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div style={{ color: "rgba(255,200,175,0.58)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", marginTop: 5, letterSpacing: "0.07em" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Studio image card */}
        <motion.div initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="relative flex justify-center items-center mt-8 lg:mt-0">
          <div className="absolute rounded-full" style={{ width: "130%", height: "130%", top: "-15%", left: "-15%", background: "radial-gradient(ellipse,rgba(181,68,110,0.4) 0%,transparent 65%)", filter: "blur(55px)" }} />
          <div className="absolute rounded-full w-full h-full" style={{ border: "1px solid rgba(201,144,122,0.22)", animation: "spinCW 25s linear infinite" }} />
          <div className="absolute rounded-full" style={{ width: "96%", height: "96%", border: "1px dashed rgba(201,144,122,0.14)", animation: "spinCCW 18s linear infinite" }} />
          <div className="relative rounded-3xl overflow-hidden w-full" style={{
            maxWidth: 430,
            boxShadow: "0 40px 100px rgba(181,68,110,0.44),0 0 0 1.5px rgba(201,144,122,0.3)",
            animation: "heroCard 7s ease-in-out infinite",
          }}>
            <ImageWithFallback src={studioMirror} alt="RIYA'S GLITZ MAKE UP & NAIL STUDIO — Premium Beauty Studio, Chittorgarh"
              className="w-full object-cover block" style={{ maxHeight: 580 }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
              style={{ background: "linear-gradient(to top,rgba(28,5,0,0.86),transparent)" }}>
              <div style={{ fontFamily: "'Great Vibes',cursive", color: "#f5c4a8", fontSize: 26 }}>RIYA'S GLITZ</div>
              <div style={{ color: "rgba(255,215,195,0.85)", fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: "0.14em" }}>BY ANKITA · JAMMU, J&amp;K</div>
              <div className="flex mt-1.5 gap-0.5">{Array.from({length:5}).map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#f5c4a8" }} />)}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div style={{ color: "rgba(201,144,122,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: "0.22em" }}>SCROLL</div>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown className="w-5 h-5 opacity-50" style={{ color: "#f5c4a8" }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════ SERVICES ══════════════════════════════ */
function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "#fffaf5" }}>
      <Orbs count={3} />
      <Particles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Gem className="w-3.5 h-3.5"/>Our Services</>}
          title="Everything Beauty," accent="Under One Roof"
          sub={`${BRAND} offers 10+ premium services — from bridal glamour to everyday glow.`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} direction="up">
              <div className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 h-full cursor-pointer transition-all duration-500 hover:-translate-y-2"
                style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(18px)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 4px 28px rgba(181,68,110,0.06)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(181,68,110,0.35)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 55px rgba(181,68,110,0.16)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.pinkBrd; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 28px rgba(181,68,110,0.06)"; }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg,${C.pinkBg},#fff5ee)`, color: C.rose, border: `1px solid ${C.pinkBrd}` }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: C.dark, fontSize: "1.05rem", fontWeight: 600 }}>{s.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>{s.desc}</p>
                <div className="mt-4 flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${C.pinkBrd}` }}>
                  <span className="text-sm font-semibold" style={{ color: C.rose, fontFamily: "'DM Sans',sans-serif" }}>From {s.price}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-all"
                    style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})` }}>→</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ GALLERY ════════════════════════════════ */
function GallerySection() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <section id="gallery" className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#fdf5f0 0%,#fffaf5 100%)" }}>
      <Orbs count={2} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Camera className="w-3.5 h-3.5"/>Our Studio</>}
          title="Step Inside" accent="RIYA'S GLITZ"
          sub="A peek inside our beautifully designed beauty studio in the heart of Chittorgarh." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 0.09} direction="scale">
              <div onClick={() => setSel(i)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ aspectRatio: i === 0 || i === 2 ? "4/3" : "3/4", boxShadow: "0 4px 20px rgba(181,68,110,0.1)" }}>
                <ImageWithFallback src={img.src} alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4"
                  style={{ background: "linear-gradient(to top,rgba(76,10,30,0.8),transparent)" }}>
                  <p className="text-white text-xs sm:text-sm leading-snug" style={{ fontFamily: "'DM Sans',sans-serif" }}>{img.alt}</p>
                </div>
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: "inset 0 0 0 2px rgba(201,144,122,0.6)" }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {sel !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(10,0,4,0.93)", backdropFilter: "blur(16px)" }}
          onClick={() => setSel(null)}>
          <button onClick={() => setSel(null)} className="absolute top-4 right-4 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}><X className="w-5 h-5" /></button>
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.28 }}>
            <ImageWithFallback src={GALLERY_IMAGES[sel].src} alt={GALLERY_IMAGES[sel].alt}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              style={{ boxShadow: "0 0 80px rgba(181,68,110,0.4)" }} />
          </motion.div>
        </div>
      )}
    </section>
  );
}

/* ══════════════════ WHY CHOOSE ════════════════════════════ */
function WhyChooseSection() {
  return (
    <section id="why-us" className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(145deg,#fdeee5 0%,#fffaf5 50%,#fdeee5 100%)" }}>
      <Orbs count={4} />
      <Particles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Award className="w-3.5 h-3.5"/>Why Choose Us</>}
          title="The RIYA'S GLITZ" accent="Difference"
          sub="We don't just do beauty services — we craft confidence-boosting, memorable experiences." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {WHY_CHOOSE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} direction="up">
              <div className="group relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-400 hover:-translate-y-2"
                style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(18px)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 4px 28px rgba(181,68,110,0.06)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 55px rgba(181,68,110,0.16)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 28px rgba(181,68,110,0.06)"; }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `linear-gradient(135deg,${C.pinkBg},#fff5ee)`, color: C.rose, border: `1px solid ${C.pinkBrd}` }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: C.dark, fontSize: "1.1rem", fontWeight: 600 }}>{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>{item.desc}</p>
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Check className="w-5 h-5" style={{ color: C.rose }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ REVIEWS ═══════════════════════════════ */
function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "#fffaf5" }}>
      <Orbs count={2} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Star className="w-3.5 h-3.5 fill-current"/>Client Reviews</>}
          title="Words from Our" accent="Happy Clients"
          sub="Real clients, real transformations, real love from Chittorgarh and beyond." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-400 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.95)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 8px 40px rgba(181,68,110,0.07)" }}>
                <Quote className="w-7 h-7 mb-3 opacity-20" style={{ color: C.rose }} />
                <div className="flex gap-1 mb-3">{Array.from({length:r.rating}).map((_,j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: C.rose }} />)}</div>
                <p className="text-sm sm:text-base leading-relaxed mb-5 italic" style={{ color: "#3d1010", fontFamily: "'DM Sans',sans-serif" }}>"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.pinkBrd}` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})` }}>{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: C.dark, fontFamily: "'DM Sans',sans-serif" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>{r.location} · {r.date}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5} direction="scale" className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-4 sm:gap-5 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.95)", border: `1px solid rgba(181,68,110,0.2)`, boxShadow: "0 12px 50px rgba(181,68,110,0.1)" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", color: C.rose, fontWeight: 700, lineHeight: 1 }}>5.0</div>
              <div className="flex justify-center gap-0.5 mt-1">{Array.from({length:5}).map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: C.rose }} />)}</div>
            </div>
            <div className="h-12 w-px" style={{ background: C.pinkBrd }} />
            <div className="text-left">
              <div className="font-semibold text-sm sm:text-base" style={{ color: C.dark, fontFamily: "'DM Sans',sans-serif" }}>300+ Reviews</div>
              <div className="text-xs sm:text-sm" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>across Google &amp; Instagram</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════ COMPLIMENT 1 — Quote Cards ════════════ */
function ComplimentCards() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(145deg,#fdeee5 0%,#fffaf5 50%,#fdeee5 100%)" }}>
      <Orbs count={3} />
      <Particles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Heart className="w-3.5 h-3.5 fill-current"/>Love Notes</>}
          title="What Our Clients" accent="Say"
          sub="Heartfelt words from those who trust us with their most beautiful moments." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMP_CARDS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.15} direction="up">
              <div className="relative rounded-2xl sm:rounded-3xl p-7 transition-all duration-500 hover:-translate-y-3"
                style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 8px 40px rgba(181,68,110,0.09)" }}>
                <div className="absolute top-5 right-6" style={{ fontFamily: "'Playfair Display',serif", fontSize: "5rem", color: "rgba(181,68,110,0.08)", lineHeight: 1, fontWeight: 700 }}>"</div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, fontSize: "1.1rem" }}>{c.avatar}</div>
                  <div>
                    <div className="font-semibold" style={{ color: C.dark, fontFamily: "'Playfair Display',serif", fontSize: "1rem" }}>{c.name}</div>
                    <div className="text-xs tracking-wide uppercase" style={{ color: C.rose, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em" }}>{c.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">{Array.from({length:5}).map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: C.gold }} />)}</div>
                <p className="text-sm leading-relaxed italic" style={{ color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>"{c.text}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ MID CTA BANNER ════════════════════════ */
function CTABannerMid() {
  return (
    <section className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#1c0500 0%,#4a0e20 35%,#8a2a50 65%,#4a0e20 85%,#1c0500 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-30%", right: "-10%", background: "radial-gradient(circle,rgba(181,68,110,0.35),transparent 65%)", filter: "blur(70px)", animation: "floatA 14s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "-20%", left: "-8%", background: "radial-gradient(circle,rgba(201,144,122,0.3),transparent 65%)", filter: "blur(55px)", animation: "floatB 17s ease-in-out infinite 2s" }} />
      </div>
      <Particles dark />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <Reveal direction="scale">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs tracking-widest uppercase border"
            style={{ background: "rgba(181,68,110,0.2)", borderColor: "rgba(201,144,122,0.3)", color: "#f5c4a8", fontFamily: "'DM Sans',sans-serif" }}>
            <Wand2 className="w-3.5 h-3.5" /> Book Your Beauty Session Today
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 700 }}>
            Ready to Look &amp; Feel
            <span style={{ display: "block", background: "linear-gradient(135deg,#f5c4a8,#fde8d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Your Most Beautiful Self?
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,205,185,0.75)", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
            Slots are limited — book your appointment at RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO today and experience Chittorgarh&apos;s finest beauty studio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="#appointment"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: "0 10px 50px rgba(181,68,110,0.55)", fontFamily: "'DM Sans',sans-serif" }}>
              <Sparkles className="w-5 h-5" /> Book My Appointment
            </a>
            <a href={WA_HREF} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.4)", color: "#7fffa0", fontFamily: "'DM Sans',sans-serif" }}>
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════ COMPLIMENT 2 — Marquee ════════════════ */
function ComplimentMarquee() {
  const doubled = [...COMP_MARQUEE, ...COMP_MARQUEE];
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "#fffaf5" }}>
      <Orbs count={2} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-12">
        <SectionHead badge={<><Quote className="w-3.5 h-3.5"/>Client Voices</>}
          title="Praise That" accent="Inspires Us"
          sub="Every kind word motivates us to deliver even more beauty, care, and excellence." />
      </div>
      <div className="overflow-hidden py-1">
        <div className="flex gap-4 marquee-strip" style={{ width: "max-content" }}>
          {doubled.map((c, i) => (
            <div key={i} className="flex-shrink-0 w-64 sm:w-72 rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.95)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 6px 28px rgba(181,68,110,0.07)" }}>
              <div className="flex gap-0.5 mb-3">{Array.from({length:5}).map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: C.rose }} />)}</div>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#3d1010", fontFamily: "'DM Sans',sans-serif" }}>"{c.quote}"</p>
              <div className="flex items-center gap-2 pt-3" style={{ borderTop: `1px solid ${C.pinkBrd}` }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})` }}>{c.author[0]}</div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: C.dark, fontFamily: "'DM Sans',sans-serif" }}>{c.author}</div>
                  <div className="text-xs" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>{c.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        {COMP_MARQUEE.slice(2, 4).map((c, i) => (
          <Reveal key={i} delay={0.3 + i * 0.15} direction={i === 0 ? "left" : "right"}>
            <div className="rounded-2xl sm:rounded-3xl p-6 flex gap-4 items-start"
              style={{ background: "rgba(255,255,255,0.95)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 8px 38px rgba(181,68,110,0.08)" }}>
              <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, fontSize: "1.05rem" }}>{c.author[0]}</div>
              <div>
                <div className="flex gap-0.5 mb-2">{Array.from({length:5}).map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: C.rose }} />)}</div>
                <p className="text-sm leading-relaxed mb-2 italic" style={{ color: "#3d1010", fontFamily: "'DM Sans',sans-serif" }}>"{c.quote}"</p>
                <div className="text-xs font-semibold" style={{ color: C.rose, fontFamily: "'DM Sans',sans-serif" }}>{c.author} · {c.tag}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════ STATS ══════════════════════════════════ */
function StatsSection() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "linear-gradient(145deg,#1c0500 0%,#4e1030 40%,#8a2040 70%,#4e1030 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(181,68,110,0.22),transparent 70%)" }} />
      <Particles dark />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <Reveal direction="down">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs tracking-widest uppercase border"
              style={{ background: "rgba(181,68,110,0.2)", borderColor: "rgba(201,144,122,0.35)", color: "#f5c4a8", fontFamily: "'DM Sans',sans-serif" }}>
              <Flower2 className="w-3.5 h-3.5" /> Our Achievements
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(1.8rem,4vw,2.9rem)", fontWeight: 700 }}>
              Numbers That Tell{" "}
              <span style={{ background: "linear-gradient(135deg,#f5c4a8,#fde8d8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Our Story</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.09} direction="scale">
              <div className="rounded-2xl sm:rounded-3xl p-5 text-center transition-all duration-400 hover:-translate-y-2"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", border: "1px solid rgba(201,144,122,0.22)", animation: "borderGlow 4s ease-in-out infinite", animationDelay: `${i * 0.5}s` }}>
                <div className="text-2xl sm:text-3xl mb-3">{s.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", color: "#f5c4a8", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 700, lineHeight: 1 }}>{s.metric}</div>
                <div className="text-xs mt-2" style={{ color: "rgba(255,205,185,0.58)", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ COMPLIMENT 3 — Instagram ══════════════ */
function ComplimentInstagram() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(145deg,#fdeee5 0%,#fffaf5 50%,#fdeee5 100%)" }}>
      <Orbs count={3} />
      <Particles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Instagram className="w-3.5 h-3.5"/>Instagram Love</>}
          title="Shared by Our" accent="Community"
          sub="Real posts from real clients — our community speaks louder than any advertisement." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {COMP_INSTAGRAM.map((c, i) => (
            <Reveal key={i} delay={i * 0.1} direction="up">
              <div className="relative rounded-2xl sm:rounded-3xl p-6 transition-all duration-400 hover:-translate-y-2"
                style={{ background: "rgba(255,255,255,0.9)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 8px 36px rgba(181,68,110,0.08)" }}>
                <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: `1px solid ${C.pinkBrd}` }}>
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: "linear-gradient(135deg,#E1306C,#833AB4,#F77737)" }}>IG</div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: C.dark, fontFamily: "'DM Sans',sans-serif" }}>{c.handle}</div>
                    <div className="text-xs" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>via Instagram</div>
                  </div>
                  <Instagram className="w-5 h-5 ml-auto flex-shrink-0" style={{ color: "#E1306C" }} />
                </div>
                <div className="text-2xl mb-3">{c.emoji}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#3d1010", fontFamily: "'DM Sans',sans-serif" }}>{c.text}</p>
                <div className="mt-4 flex items-center gap-1 flex-wrap">
                  {Array.from({length:5}).map((_,j) => <Star key={j} className="w-3 h-3 fill-current" style={{ color: C.rose }} />)}
                  <span className="text-xs ml-1" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>via @riyas_glitz</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ COMPLIMENT 4 — Quotes ═════════════════ */
function ComplimentQuotes() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#1c0500 0%,#4a0e20 40%,#7a2040 70%,#1c0500 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(181,68,110,0.18),transparent 70%)" }} />
      <Particles dark />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <Reveal direction="down">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs tracking-widest uppercase border"
              style={{ background: "rgba(181,68,110,0.2)", borderColor: "rgba(201,144,122,0.35)", color: "#f5c4a8", fontFamily: "'DM Sans',sans-serif" }}>
              <Quote className="w-3.5 h-3.5" /> Words of Beauty
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(1.8rem,4vw,2.9rem)", fontWeight: 700 }}>
              The Philosophy of <span style={{ color: "#f5c4a8", fontStyle: "italic" }}>{SHORT}</span>
            </h2>
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          {COMP_QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 0.2} direction={i === 0 ? "left" : "right"}>
              <div className="rounded-2xl sm:rounded-3xl p-7 sm:p-10 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(18px)", border: "1px solid rgba(201,144,122,0.25)" }}>
                <div className="absolute top-4 left-6 opacity-10" style={{ fontFamily: "'Playfair Display',serif", fontSize: "8rem", color: "#f5c4a8", lineHeight: 1, fontWeight: 700 }}>"</div>
                <p className="relative z-10 text-base sm:text-xl leading-relaxed mb-5"
                  style={{ color: "rgba(255,215,195,0.92)", fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>"{q.quote}"</p>
                <div className="relative z-10 text-xs sm:text-sm"
                  style={{ color: "rgba(201,144,122,0.8)", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.06em" }}>{q.attribution}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ APPOINTMENT ═══════════════════════════ */
function AppointmentSection() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Riya! I'd like to book an appointment at RIYA'S GLITZ.%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0ADate: ${form.date}%0AMessage: ${form.message}`;
    window.open(`${WA_HREF}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const inputSt: React.CSSProperties = {
    background: "#fff5ee", border: `1px solid ${C.pinkBrd}`, color: C.dark, fontFamily: "'DM Sans',sans-serif",
  };

  return (
    <section id="appointment" className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#fffaf5 0%,#fdf5f0 100%)" }}>
      <Orbs count={3} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><Clock className="w-3.5 h-3.5"/>Book Appointment</>}
          title="Reserve Your" accent="Beauty Session"
          sub="Fill in your details and Riya will personally confirm your booking via WhatsApp." />
        <Reveal delay={0.22} direction="up">
          <form onSubmit={handleSubmit} className="rounded-2xl sm:rounded-3xl p-6 sm:p-10"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 24px 80px rgba(181,68,110,0.11)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name",    key: "name",  type: "text", ph: "Your Name" },
                { label: "Phone Number", key: "phone", type: "tel",  ph: "+91 XXXXX XXXXX" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} required value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-pink-200"
                    style={inputSt} />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>Service Required</label>
              <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-pink-200"
                style={{ ...inputSt, color: form.service ? C.dark : "#9e6050" }}>
                <option value="">Select a service…</option>
                {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>Preferred Date</label>
              <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-pink-200"
                style={inputSt} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>Additional Notes</label>
              <textarea rows={3} placeholder="Tell us about your event, look inspiration, or special requests…"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none focus:ring-2 focus:ring-pink-200"
                style={inputSt} />
            </div>
            <button type="submit"
              className="mt-6 w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: "0 8px 40px rgba(181,68,110,0.38)", fontFamily: "'DM Sans',sans-serif" }}>
              {submitted
                ? <><Check className="w-5 h-5" /> Request Sent via WhatsApp!</>
                : <><MessageCircle className="w-5 h-5" /> Book via WhatsApp</>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════ FINAL CTA ══════════════════════════════ */
function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(145deg,#fdeee5 0%,#fffaf5 40%,#fdeee5 100%)" }}>
      <Orbs count={4} />
      <Particles />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <Reveal direction="up">
          <div style={{ fontFamily: "'Great Vibes',cursive", color: C.rose, fontSize: "clamp(2rem,5vw,3.4rem)", marginBottom: 6 }}>
            Your Glow-Up Starts Here
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: C.dark, fontSize: "clamp(1.8rem,4.5vw,3rem)", fontWeight: 700 }}>
            Make Every Occasion
            <span style={{ display: "block", color: C.rose, fontStyle: "italic" }}>Unforgettably Beautiful</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "#7a3020", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
            Join 300+ happy clients in Chittorgarh who trust RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO for makeup, hair, skin, and nails.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="#appointment"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: "0 12px 50px rgba(181,68,110,0.42)", fontFamily: "'DM Sans',sans-serif" }}>
              <Sparkles className="w-5 h-5" /> Book Appointment Now
            </a>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.82)", border: `1px solid rgba(181,68,110,0.3)`, color: C.rose, fontFamily: "'DM Sans',sans-serif", backdropFilter: "blur(12px)" }}>
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
          </div>
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3">
            {["Premium Products","300+ Happy Clients","5★ Rated Studio","Makeup · Hair · Skin · Nails","Chittorgarh, J&K"].map(b => (
              <div key={b} className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm"
                style={{ background: "rgba(255,255,255,0.9)", border: `1px solid rgba(181,68,110,0.2)`, color: "#5c1010", fontFamily: "'DM Sans',sans-serif" }}>
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.rose }} /> {b}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════ MAP & CONTACT ══════════════════════════ */
function MapSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "#fffaf5" }}>
      <Orbs count={2} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHead badge={<><MapPin className="w-3.5 h-3.5"/>Find Us</>}
          title="Visit Our" accent="Studio"
          sub="Come experience the magic of RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO in person, right in the heart of Chittorgarh." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          <Reveal direction="left">
            <div className="flex flex-col gap-4">
              {[
                { icon: <MapPin       className="w-5 h-5"/>, label: "Address",   val: ADDRESS,                       href: null },
                { icon: <Phone        className="w-5 h-5"/>, label: "Phone",     val: PHONE,                         href: PHONE_HREF },
                { icon: <Instagram    className="w-5 h-5"/>, label: "Instagram", val: "instagram.com",               href: IG_HREF },
                { icon: <MessageCircle className="w-5 h-5"/>,label: "WhatsApp",  val: "+91 7889972434",              href: WA_HREF },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4 rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.95)", border: `1px solid ${C.pinkBrd}`, boxShadow: "0 4px 20px rgba(181,68,110,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg,${C.pinkBg},#fff5ee)`, color: C.rose }}>{c.icon}</div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: "#9e6050", fontFamily: "'DM Sans',sans-serif" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                          className="text-sm break-words hover:underline" style={{ color: C.dark, fontFamily: "'DM Sans',sans-serif" }}>{c.val}</a>
                      : <p className="text-sm" style={{ color: C.dark, fontFamily: "'DM Sans',sans-serif" }}>{c.val}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden w-full"
              style={{ boxShadow: "0 20px 70px rgba(181,68,110,0.14)", border: `1px solid ${C.pinkBrd}` }}>
              <iframe title={`${BRAND} — Chittorgarh Rajasthan`} src={MAP_SRC}
                width="100%" height="360" style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ FOOTER ════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-10 sm:py-12 overflow-hidden"
      style={{ background: "#1c0500", borderTop: "1px solid rgba(181,68,110,0.2)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom,rgba(181,68,110,0.1),transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})` }}>
              <span style={{ fontFamily: "'Great Vibes',cursive", color: "#fff", fontSize: 22 }}>R</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Great Vibes',cursive", color: "#f5c4a8", fontSize: 20 }}>RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO</div>
              <div style={{ color: "rgba(245,196,168,0.42)", fontSize: 8, letterSpacing: "0.15em", fontFamily: "'DM Sans',sans-serif" }}>MAKE UP · HAIR · SKIN · NAILS · JAMMU J&amp;K</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 flex-wrap justify-center">
            {NAV_LINKS.slice(0, 5).map(l => (
              <a key={l.label} href={l.href} className="text-xs transition-colors hover:text-orange-300"
                style={{ color: "rgba(245,196,168,0.48)", fontFamily: "'DM Sans',sans-serif" }}>{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[
              { href: IG_HREF,    icon: <Instagram      className="w-4 h-4"/>, label: "Instagram" },
              { href: WA_HREF,    icon: <MessageCircle  className="w-4 h-4"/>, label: "WhatsApp" },
              { href: PHONE_HREF, icon: <Phone          className="w-4 h-4"/>, label: "Call" },
            ].map(s => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(181,68,110,0.22)", color: "#f5c4a8", border: "1px solid rgba(201,144,122,0.2)" }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-7 pt-5 text-center text-xs"
          style={{ color: "rgba(245,196,168,0.28)", borderTop: "1px solid rgba(181,68,110,0.14)", fontFamily: "'DM Sans',sans-serif" }}>
          © 2026 RIYA'S GLITZ MAKE UP &amp; NAIL STUDIO · Pratap Nagar, Chittorgarh, Rajasthan 312001 · {PHONE} · All rights reserved
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════ FLOATING BUTTONS ══════════════════════ */
function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
      <a href={WA_HREF} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 6px 28px rgba(37,211,102,0.52)" }}>
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
      <a href={IG_HREF} target="_blank" rel="noreferrer" aria-label="Follow on Instagram"
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg,#E1306C,#833AB4,#F77737)", boxShadow: "0 6px 28px rgba(225,48,108,0.48)" }}>
        <Instagram className="w-6 h-6 text-white" />
      </a>
      <a href={PHONE_HREF} aria-label="Call Now"
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: `linear-gradient(135deg,${C.rose},${C.gold})`, boxShadow: "0 6px 28px rgba(181,68,110,0.52)" }}>
        <Phone className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
