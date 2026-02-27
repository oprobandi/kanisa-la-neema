import { useState, useEffect } from "react";
import {
  Clock, Heart, Users, BookOpen, MapPin, Play, PlayCircle,
  Music, Globe, Anchor, Zap, Baby, Flower2, MessageCircle,
  Menu, X, ChevronRight, Mail, Phone, Facebook, Youtube,
  Instagram, Twitter, Star, Download, Cross, Send
} from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; }

  :root {
    --purple-deep: #3B0764;
    --purple-main: #581C87;
    --purple-mid: #7C3AED;
    --gold: #D97706;
    --gold-light: #F59E0B;
    --gold-pale: #FEF3C7;
  }

  body { font-family: 'Nunito', sans-serif; }
  h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; }

  @keyframes goldenPulse {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(1.12); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.15); }
    50% { transform: scale(1); }
    75% { transform: scale(1.1); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes pingGreen {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(2.2); opacity: 0; }
  }

  .golden-pulse {
    position: absolute;
    inset: -60px;
    background: radial-gradient(ellipse at center, #D9770650 0%, #F59E0B20 40%, transparent 70%);
    animation: goldenPulse 4s ease-in-out infinite;
    pointer-events: none;
    border-radius: 50%;
  }

  .fade-in-up {
    animation: fadeInUp 0.7s ease forwards;
  }

  .stagger-1 { animation-delay: 0.1s; opacity: 0; }
  .stagger-2 { animation-delay: 0.2s; opacity: 0; }
  .stagger-3 { animation-delay: 0.3s; opacity: 0; }
  .stagger-4 { animation-delay: 0.4s; opacity: 0; }
  .stagger-5 { animation-delay: 0.5s; opacity: 0; }
  .stagger-6 { animation-delay: 0.6s; opacity: 0; }

  .heart-beat { animation: heartBeat 1.5s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg, #D97706, #F59E0B, #FCD34D, #D97706);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .float-anim { animation: float 3s ease-in-out infinite; }

  .ministry-card:hover {
    border-color: #D97706 !important;
    box-shadow: 0 0 0 2px #D97706, 0 20px 40px rgba(88,28,135,0.3) !important;
  }

  .dot-grid {
    background-image: radial-gradient(circle, #ffffff18 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .cross-pattern {
    background-image: 
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-overlay { opacity: 0; transition: opacity 0.35s ease; }

  .wa-tooltip {
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s ease;
    pointer-events: none;
    white-space: nowrap;
  }

  .wa-btn:hover .wa-tooltip {
    opacity: 1;
    transform: translateX(0);
  }

  .ping-ring {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: #22c55e;
    animation: pingGreen 1.8s ease-out infinite;
  }

  .nav-link {
    position: relative;
    font-weight: 600;
    font-size: 0.875rem;
    color: #3B0764;
    transition: color 0.2s;
    letter-spacing: 0.03em;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #D97706;
    transition: width 0.3s ease;
  }

  .nav-link:hover { color: #D97706; }
  .nav-link:hover::after { width: 100%; }

  .glass-card {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.18);
  }

  .give-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.15);
  }

  .event-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(88,28,135,0.2);
  }

  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NAV_LINKS = ["Home","About","Ministries","Sermons","Events","Give","Contact"];

const SERVICES = [
  { icon: Clock, name: "Sunday Main Service", time: "8:00 AM & 10:30 AM", venue: "Community Hall, Thika Road" },
  { icon: BookOpen, name: "Wednesday Bible Study", time: "6:30 PM", venue: "Church Conference Room" },
  { icon: Zap, name: "Friday Youth Service", time: "5:00 PM", venue: "Youth Centre, Lower Hall" },
];

const MINISTRIES = [
  { icon: Baby, name: "Children's Church", desc: "Nurturing young hearts in faith, fun, and God's Word every Sunday morning." },
  { icon: Zap, name: "Youth Ministry", desc: "Empowering the next generation through worship, mentorship, and community." },
  { icon: Flower2, name: "Women's Fellowship", desc: "A sisterhood built on prayer, discipleship, and uplifting one another." },
  { icon: Anchor, name: "Men's Ministry", desc: "Building godly men of integrity, purpose, and servant leadership." },
  { icon: Music, name: "Worship Team", desc: "Leading the congregation into the presence of God through Spirit-filled music." },
  { icon: Globe, name: "Outreach", desc: "Bringing the love of Christ to communities across Nairobi and beyond." },
];

const VALUES = [
  { icon: Heart, label: "Compassion", text: "We love our neighbours as ourselves." },
  { icon: Users, label: "Community", text: "We grow together in faith and fellowship." },
  { icon: BookOpen, label: "Scripture", text: "God's Word is our foundation and guide." },
];

const TESTIMONIALS = [
  {
    name: "Grace Wambui",
    role: "Member since 2018",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150",
    text: "Nimepata familia yangu hapa. This church changed my life completely. The love and support I received during my darkest season was truly God's grace.",
  },
  {
    name: "Samuel Mwangi",
    role: "Deacon",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150",
    text: "The Bible Study changed how I understand Scripture. Mungu ametufunua mengi through Pastor's teachings. I am eternally grateful.",
  },
  {
    name: "Esther Akinyi",
    role: "Youth Leader",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150",
    text: "Kanisa hili ni nyumba yangu ya pili. The Youth Ministry gave me purpose, confidence, and deep roots in Christ. I wouldn't trade it for anything.",
  },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1438232992991-995b671e5c96?w=600",
  "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=600",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600",
  "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600",
];

const EVENTS = [
  {
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600",
    date: "Mar 15, 2025",
    title: "Annual Worship Concert",
    location: "Community Hall, Thika Rd",
    time: "6:00 PM – 10:00 PM",
  },
  {
    img: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600",
    date: "Apr 5, 2025",
    title: "Easter Sunrise Service",
    location: "Uhuru Park, Nairobi",
    time: "5:30 AM – 8:00 AM",
  },
  {
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
    date: "May 20, 2025",
    title: "Community Outreach Day",
    location: "Kawangware, Nairobi",
    time: "9:00 AM – 4:00 PM",
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));

    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* ─── ANNOUNCEMENT BAR ─────────────────────────────── */}
      <div className="text-center py-2 px-4 text-sm font-semibold tracking-wide" style={{ background: "#581C87", color: "#D97706" }}>
        🕊️ Sunday Services: 8:00 AM &amp; 10:30 AM &nbsp;|&nbsp; Venue: Community Hall, Thika Road, Nairobi
      </div>

      {/* ─── NAVBAR ──────────────────────────────────────── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`} style={{ background: "#fff", borderBottom: scrolled ? "1px solid #e5e7eb" : "none" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#581C87,#7C3AED)" }}>
              <span className="text-white font-bold text-lg" style={{ fontFamily: "Cormorant Garamond, serif" }}>✝</span>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
              Kanisa la Neema
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#services" className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(90deg,#D97706,#F59E0B)" }}>
              Join Us Sunday
            </a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2" onClick={() => setNavOpen(!navOpen)} style={{ color: "#581C87" }}>
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="lg:hidden px-4 pb-4 pt-2 flex flex-col gap-3" style={{ borderTop: "1px solid #f3e8ff" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="py-2 font-semibold text-sm" style={{ color: "#3B0764" }} onClick={() => setNavOpen(false)}>{l}</a>
            ))}
            <a href="#services" className="mt-2 text-center py-2 rounded-full text-sm font-bold text-white" style={{ background: "#D97706" }}>Join Us Sunday</a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section id="home" className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b671e5c96?w=1600"
          alt="Church interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(59,7,100,0.82) 0%, rgba(88,28,135,0.75) 60%, rgba(59,7,100,0.9) 100%)" }} />

        {/* Golden rays */}
        <div className="golden-pulse" style={{ top: "30%", left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "conic-gradient(from 0deg, transparent 0deg, rgba(217,119,6,0.07) 30deg, transparent 60deg, rgba(245,158,11,0.06) 120deg, transparent 150deg, rgba(217,119,6,0.07) 240deg, transparent 270deg)", borderRadius: "50%", animation: "goldenPulse 6s ease-in-out infinite", pointerEvents: "none" }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="fade-in-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6" style={{ background: "rgba(217,119,6,0.2)", border: "1px solid rgba(217,119,6,0.5)", color: "#FCD34D" }}>
            🕊️ Welcome Home
          </div>
          <h1 className="fade-in-up stagger-2 text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white" style={{ fontFamily: "Cormorant Garamond, serif", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            Karibu Kanisa<br />
            <span className="shimmer-text">la Neema</span>
          </h1>
          <p className="fade-in-up stagger-3 text-lg sm:text-xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            A place of worship, community, and transformative grace in Nairobi, Kenya.
          </p>
          <div className="fade-in-up stagger-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="px-8 py-4 rounded-full text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl inline-flex items-center justify-center gap-2" style={{ background: "linear-gradient(90deg,#D97706,#F59E0B)", boxShadow: "0 4px 20px rgba(217,119,6,0.4)" }}>
              Join This Sunday <ChevronRight size={18} />
            </a>
            <a href="#sermon" className="px-8 py-4 rounded-full text-base font-bold transition-all hover:scale-105 inline-flex items-center justify-center gap-2" style={{ border: "2px solid rgba(217,119,6,0.7)", color: "#FCD34D", background: "rgba(88,28,135,0.4)", backdropFilter: "blur(8px)" }}>
              <Play size={18} /> Watch Live
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 float-anim" style={{ color: "rgba(253,224,71,0.7)" }}>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
            <div className="w-1.5 h-3 rounded-full bg-current" style={{ animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ─── SERVICE TIMES STRIP ───────────────────────────── */}
      <section id="services" style={{ background: "#581C87" }} className="py-12 px-4 dot-grid">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i} className={`fade-in-up stagger-${i + 1} bg-white rounded-2xl p-6 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FEF3C7" }}>
                <s.icon size={22} style={{ color: "#D97706" }} />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: "#3B0764", fontFamily: "Cormorant Garamond, serif" }}>{s.name}</h3>
              <p className="font-bold text-base mb-1" style={{ color: "#D97706" }}>{s.time}</p>
              <p className="text-sm" style={{ color: "#6b7280" }}>{s.venue}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4" style={{ background: "#faf5ff" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal relative">
            <div className="absolute -inset-3 rounded-2xl" style={{ background: "linear-gradient(135deg,#D97706,#F59E0B)", opacity: 0.25, filter: "blur(8px)" }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ border: "4px solid #D97706" }}>
              <img src="https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800" alt="Congregation" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl overflow-hidden shadow-xl" style={{ border: "3px solid #fff" }}>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200" alt="Praise" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Our Story · Hadithi Yetu</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6 leading-tight" style={{ color: "#3B0764", fontFamily: "Cormorant Garamond, serif" }}>
              Rooted in Grace,<br />Growing Together
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#4b5563" }}>
              Founded in 2004 by Pastor James Kariuki along the vibrant corridors of Thika Road, Outreach Community Church began as a small prayer group of twelve believers with a God-sized vision. Today, we are a thriving family of over 1,500 members spanning every generation.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#4b5563" }}>
              Our mission is simple: <em>Love God, Love People, Serve the World.</em> Through discipleship, worship, and community outreach, we are transforming lives one heart at a time — right here in Nairobi, and across Kenya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {VALUES.map((v, i) => (
                <div key={i} className="text-center p-4 rounded-xl transition-all hover:scale-105" style={{ background: "#f3e8ff" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: "#FEF3C7" }}>
                    <v.icon size={18} style={{ color: "#D97706" }} />
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: "#3B0764" }}>{v.label}</p>
                  <p className="text-xs" style={{ color: "#6b7280" }}>{v.text}</p>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105 hover:shadow-lg" style={{ background: "linear-gradient(90deg,#581C87,#7C3AED)" }}>
              Meet Our Pastors <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── MINISTRIES ───────────────────────────────────── */}
      <section id="ministries" className="py-24 px-4 cross-pattern" style={{ background: "#3B0764" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Departments &amp; Ministries</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#fff" }}>
              Find Your <span className="shimmer-text">Calling</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#c4b5fd" }}>Every member has a gift. Find your place to serve, grow, and flourish within our community.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINISTRIES.map((m, i) => (
              <div key={i} className={`ministry-card fade-in-up stagger-${i + 1} rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer`} style={{ border: "1px solid rgba(124,58,237,0.4)" }}>
                <div className="p-5" style={{ background: "linear-gradient(135deg,#581C87,#7C3AED)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(217,119,6,0.2)", border: "1px solid rgba(217,119,6,0.4)" }}>
                    <m.icon size={22} style={{ color: "#FCD34D" }} />
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Cormorant Garamond, serif" }}>{m.name}</h3>
                </div>
                <div className="p-5" style={{ background: "rgba(59,7,100,0.6)", backdropFilter: "blur(8px)" }}>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#c4b5fd" }}>{m.desc}</p>
                  <button className="text-sm font-bold px-4 py-1.5 rounded-full transition-all hover:scale-105" style={{ background: "rgba(217,119,6,0.15)", border: "1px solid #D97706", color: "#FCD34D" }}>
                    Join Ministry →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIFE 4 LIFE MISSIONARY SECTION ───────────────── */}
      <section id="life4life" className="py-24 px-4" style={{ background: "#faf5ff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Church Department</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
              Life 4 Life <span style={{ background: "linear-gradient(90deg,#D97706,#F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Missionaries</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "#6b7280" }}>
              Every December, our dedicated Life 4 Life team packs up and heads into the remotest corners of Kenya — bringing the Gospel, medical aid, food, and hope to communities that rarely hear "you are loved."
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <div className="scroll-reveal order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5" style={{ background: "#FEF3C7", color: "#D97706" }}>
                🌍 Annual December Mission · Every Year
              </div>
              <h3 className="text-3xl font-bold mb-4 leading-snug" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
                Taking the Gospel to Kenya's Forgotten Corners
              </h3>
              <p className="mb-4 leading-relaxed" style={{ color: "#4b5563" }}>
                Founded by Elder Ruth Njeri in 2011, Life 4 Life has conducted missionary expeditions to Turkana, Marsabit, Tana River, West Pokot, and Kajiado Counties — reaching over 12,000 people with the love of Christ.
              </p>
              <p className="mb-6 leading-relaxed" style={{ color: "#4b5563" }}>
                Each mission combines <strong>evangelism</strong>, <strong>community health clinics</strong>, <strong>children's programmes</strong>, and <strong>food distribution</strong>. Volunteers from all ministries unite for three weeks of life-changing service.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { num: "14+", label: "Years of Mission" },
                  { num: "12K+", label: "Lives Touched" },
                  { num: "18", label: "Counties Reached" },
                  { num: "200+", label: "Volunteers Yearly" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl p-4 text-center transition-all hover:scale-105" style={{ background: "#f3e8ff" }}>
                    <p className="text-3xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif", color: "#D97706" }}>{stat.num}</p>
                    <p className="text-sm font-semibold" style={{ color: "#581C87" }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105 hover:shadow-lg" style={{ background: "linear-gradient(90deg,#D97706,#F59E0B)" }}>
                Join the December Mission <ChevronRight size={16} />
              </a>
            </div>

            <div className="scroll-reveal order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600" alt="Missionary work Kenya" className="rounded-2xl w-full h-48 object-cover col-span-2 transition-all hover:scale-105 hover:shadow-xl" style={{ border: "3px solid #D97706" }} />
                <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400" alt="Children outreach" className="rounded-2xl w-full h-36 object-cover transition-all hover:scale-105 hover:shadow-xl" />
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400" alt="Community gathering" className="rounded-2xl w-full h-36 object-cover transition-all hover:scale-105 hover:shadow-xl" />
              </div>
            </div>
          </div>

          {/* Mission timeline */}
          <div className="scroll-reveal rounded-2xl p-8 mt-6" style={{ background: "linear-gradient(135deg,#3B0764,#581C87)" }}>
            <h4 className="text-2xl font-bold text-white text-center mb-8" style={{ fontFamily: "Cormorant Garamond, serif" }}>Past Mission Destinations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { year: "Dec 2024", place: "Turkana County", focus: "Water & Evangelism" },
                { year: "Dec 2023", place: "Marsabit County", focus: "Medical Clinics" },
                { year: "Dec 2022", place: "Tana River", focus: "Food Relief & Gospel" },
                { year: "Dec 2021", place: "West Pokot", focus: "Children & Schools" },
                { year: "Dec 2020", place: "Kajiado County", focus: "Maasai Outreach" },
                { year: "Dec 2019", place: "Kilifi County", focus: "Coastal Evangelism" },
              ].map((m, i) => (
                <div key={i} className="glass-card rounded-xl p-4 transition-all hover:scale-105">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(217,119,6,0.25)", color: "#FCD34D" }}>{m.year}</span>
                  <p className="font-bold text-white mt-2 text-sm" style={{ fontFamily: "Cormorant Garamond, serif" }}>{m.place}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#c4b5fd" }}>{m.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENTS ───────────────────────────────────────── */}
      <section id="events" className="py-24 px-4" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>What's Coming Up</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
              Upcoming <span className="shimmer-text">Events</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((ev, i) => (
              <div key={i} className="event-card rounded-2xl overflow-hidden transition-all duration-300 scroll-reveal" style={{ boxShadow: "0 8px 30px rgba(88,28,135,0.12)", border: "1px solid #f3e8ff" }}>
                <div className="relative">
                  <img src={ev.img} alt={ev.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#D97706", color: "#fff" }}>{ev.date}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>{ev.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm mb-1.5" style={{ color: "#6b7280" }}>
                    <MapPin size={14} style={{ color: "#D97706" }} /> {ev.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm mb-4" style={{ color: "#6b7280" }}>
                    <Clock size={14} style={{ color: "#D97706" }} /> {ev.time}
                  </div>
                  <button className="w-full py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(90deg,#581C87,#7C3AED)" }}>
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERMON ────────────────────────────────────────── */}
      <section id="sermon" className="py-24 px-4 dot-grid" style={{ background: "#faf5ff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Word for This Week</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>Latest Sermon</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-reveal rounded-3xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(88,28,135,0.12)" }}>
            <div className="relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=800" alt="Sermon" className="w-full h-72 lg:h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(59,7,100,0.45)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ background: "rgba(217,119,6,0.9)", boxShadow: "0 0 0 8px rgba(217,119,6,0.25)" }}>
                  <PlayCircle size={40} color="#fff" />
                </div>
              </div>
            </div>
            <div className="p-8 lg:pr-12">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Sunday, 9 March 2025</span>
              <h3 className="text-3xl font-bold mt-2 mb-2 leading-snug" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
                "The Unshakeable Promise of God's Love"
              </h3>
              <p className="font-semibold text-sm mb-1" style={{ color: "#581C87" }}>Pastor James Kariuki</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "#FEF3C7", color: "#D97706" }}>
                <BookOpen size={12} /> John 3:16 — Romans 8:38-39
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#6b7280" }}>
                In a world full of uncertainty, God's love stands as an anchor for our souls. This powerful message explores the depth, breadth, and height of a love that nothing — not death, nor life, nor principalities — can separate us from.
              </p>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105 hover:shadow-lg" style={{ background: "linear-gradient(90deg,#D97706,#F59E0B)" }}>
                <Play size={16} /> Listen / Watch Sermon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GIVE ─────────────────────────────────────────── */}
      <section id="give" className="py-24 px-4" style={{ background: "linear-gradient(135deg,#D97706 0%,#F59E0B 50%,#FBBF24 100%)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="scroll-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart size={32} className="heart-beat" style={{ color: "#7C2D12", fill: "#7C2D12" }} />
              <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
                Toa kwa Furaha
              </h2>
            </div>
            <p className="text-xl font-semibold mb-2" style={{ color: "#3B0764" }}>Give Joyfully</p>
            <p className="mb-12 max-w-xl mx-auto text-base" style={{ color: "#78350F" }}>
              "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7. Support God's work through any of these convenient channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📱", title: "M-Pesa", details: [
                  "Paybill: 400200",
                  "Account No: KANISA",
                  "Till No: 8054321",
                ]
              },
              {
                icon: "🏦", title: "Bank Transfer", details: [
                  "Equity Bank",
                  "A/C: 0110293847562",
                  "Branch: Thika Road",
                ]
              },
              {
                icon: "💳", title: "Online via Card", details: [
                  "Visa / Mastercard",
                  "Secure payment portal",
                  "give.kanisalaneema.ke",
                ]
              },
            ].map((g, i) => (
              <div key={i} className="give-card bg-white rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer" style={{ boxShadow: "0 8px 25px rgba(120,53,15,0.15)" }}>
                <div className="text-4xl mb-3">{g.icon}</div>
                <h4 className="font-bold text-xl mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>{g.title}</h4>
                {g.details.map((d, j) => <p key={j} className="text-sm mb-1" style={{ color: "#4b5563" }}>{d}</p>)}
                <button className="mt-4 w-full py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(90deg,#581C87,#7C3AED)" }}>
                  Give Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4" style={{ background: "#3B0764" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Ushuhuda</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 text-white" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Member <span className="shimmer-text">Testimonies</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-105 fade-in-up stagger-${i + 1}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#D97706" color="#D97706" />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "#e9d5ff" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" style={{ border: "2px solid #D97706" }} />
                  <div>
                    <p className="font-bold text-sm text-white">{t.name}</p>
                    <p className="text-xs" style={{ color: "#c4b5fd" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ──────────────────────────────────────── */}
      <section id="gallery" className="py-24 px-4" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal">
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Picha za Kanisa</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#3B0764" }}>
              Life at <span className="shimmer-text">Kanisa la Neema</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 scroll-reveal">
            {GALLERY_IMGS.map((src, i) => (
              <div key={i} className="gallery-item relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ aspectRatio: "1 / 1" }}>
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                <div className="gallery-overlay absolute inset-0 flex items-center justify-center" style={{ background: "rgba(59,7,100,0.75)" }}>
                  <Heart size={36} fill="#D97706" color="#D97706" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────── */}
      <section id="contact" className="py-24 px-4 cross-pattern" style={{ background: "#581C87" }}>
        <div className="max-w-3xl mx-auto text-center scroll-reveal">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#D97706" }}>Jiunge Nasi</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4 text-white" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Join Our Community
          </h2>
          <p className="mb-8" style={{ color: "#c4b5fd" }}>Subscribe for sermons, devotionals, event updates, and more delivered to your inbox every week.</p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}
            />
            <button className="px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105 flex items-center gap-2" style={{ background: "linear-gradient(90deg,#D97706,#F59E0B)" }}>
              <Send size={15} /> Subscribe
            </button>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Youtube, label: "YouTube" },
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "Twitter" },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#" title={label} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#FCD34D" }}>
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* App Store buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {["App Store", "Google Play"].map(store => (
              <button key={store} className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Download size={18} style={{ color: "#FCD34D" }} />
                <div className="text-left">
                  <div className="text-xs" style={{ color: "#c4b5fd" }}>Download on</div>
                  <div className="text-sm font-bold text-white">{store}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer style={{ background: "#3B0764" }} className="pt-16 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(217,119,6,0.3)" }}>
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#581C87,#7C3AED)" }}>
                <span className="text-white font-bold text-lg">✝</span>
              </div>
              <span className="font-bold text-lg text-white" style={{ fontFamily: "Cormorant Garamond, serif" }}>Kanisa la Neema</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c4b5fd" }}>
              Outreach Community Church — a family of faith rooted in grace, love, and the transforming power of God's Word.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: "#FCD34D" }}>
              <Phone size={14} /> +254 799 644 100
            </div>
            <div className="flex items-center gap-2 text-sm mt-1" style={{ color: "#FCD34D" }}>
              <Mail size={14} /> info@kanisalaneema.ke
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Service Times</h4>
            {[
              ["Sunday", "8:00 AM & 10:30 AM"],
              ["Wednesday", "6:30 PM (Bible Study)"],
              ["Friday", "5:00 PM (Youth)"],
            ].map(([day, time]) => (
              <div key={day} className="flex justify-between text-sm mb-2" style={{ color: "#c4b5fd" }}>
                <span>{day}</span><span style={{ color: "#FCD34D" }}>{time}</span>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
            {["Home","About Us","Ministries","Sermons","Events","Give","Life 4 Life","Contact"].map(link => (
              <a key={link} href="#" className="block text-sm mb-2 transition-colors hover:text-yellow-400" style={{ color: "#c4b5fd" }}>
                {link}
              </a>
            ))}
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Find Us</h4>
            <p className="text-sm mb-3" style={{ color: "#c4b5fd" }}>Community Hall, Thika Road<br />Near Roysambu Estate<br />Nairobi, Kenya</p>
            <div className="rounded-xl overflow-hidden h-36 bg-purple-900 flex items-center justify-center" style={{ border: "2px solid rgba(217,119,6,0.4)" }}>
              <div className="text-center">
                <MapPin size={24} style={{ color: "#D97706", margin: "0 auto 6px" }} />
                <p className="text-xs" style={{ color: "#c4b5fd" }}>Thika Road, Nairobi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scripture divider */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right,transparent,#D97706)" }} />
            <span style={{ color: "#D97706", fontSize: "1.5rem" }}>✝</span>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left,transparent,#D97706)" }} />
          </div>
          <p className="italic text-sm max-w-xl mx-auto mb-1" style={{ color: "#FCD34D" }}>
            "Kwa maana jinsi hii Mungu aliupenda ulimwengu, hata akamtoa Mwanawe wa pekee, ili kila mtu amwaminiye asipotee, bali awe na uzima wa milele."
          </p>
          <p className="text-xs font-bold" style={{ color: "#D97706" }}>— Yohana 3:16 (John 3:16)</p>
        </div>

        <div className="text-center text-xs" style={{ color: "#7c3aed" }}>
          © 2025 Kanisa la Neema — Outreach Community Church. All Rights Reserved. Made with <Heart size={11} className="inline" style={{ color: "#D97706", fill: "#D97706" }} /> in Nairobi, Kenya.
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ────────────────────────────── */}
      <div className="wa-btn fixed flex items-center gap-2" style={{ bottom: "28px", right: "28px", zIndex: 9999 }}>
        <div className="wa-tooltip px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: "#128C7E", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          Contact Developer 💬
        </div>
        <a
          href="https://wa.me/254799644100"
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all hover:scale-110"
          style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
        >
          <div className="ping-ring" />
          <MessageCircle size={26} color="#fff" fill="#fff" style={{ position: "relative", zIndex: 1 }} />
        </a>
      </div>
    </>
  );
}
