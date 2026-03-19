import { useState, useEffect, useRef } from "react";
import "./App.css"
const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", category: "landscape", title: "Alpine Silence" },
  { id: 2, src: "https://images.unsplash.com/photo-1531804055935-76f44d7caaf4?w=800&q=80", category: "portrait", title: "Golden Hour" },
  { id: 3, src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80", category: "street", title: "City Pulse" },
  { id: 4, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", category: "landscape", title: "Forest Breath" },
  { id: 5, src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", category: "portrait", title: "Soft Focus" },
  { id: 6, src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", category: "street", title: "Urban Geometry" },
  { id: 7, src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80", category: "landscape", title: "Desert Dusk" },
  { id: 8, src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&q=80", category: "portrait", title: "Studio Light" },
  { id: 9, src: "https://images.unsplash.com/photo-1499336315816-097655dcfbda?w=800&q=80", category: "street", title: "Rain & Neon" },
];

const plans = [
  {
    name: "Essentials",
    price: "45000",
    desc: "Wedding Package",
    features: ["3-days shoot", "40 sheet album", "Online gallery", "3 hour video","1-day candid","1-day drone"],
    accent: "#C8A97E",
  },
  {
    name: "Signature",
    price: "65000",
    desc: "Premium Wedding Package",
    features: ["3-days shoot", "45 sheet album", "Online gallery", "4 hour video","2-day candid","1-day drone","instant cinematic reels",],
    accent: "#E8D5B7",
    featured: true,
  },
  {
    name: "Platinum",
    price: "100000",
    desc: "Full-day storytelling",
    features: ["3-days shoot", "50 sheet album", "Online gallery", "5 hour video","2-day candid","2-day drone","instant cinematic reels","cinemtic video 10-15 minutes","Pre-Wedding shoot"],
    accent: "#C8A97E",
  },
];

const botResponses = {
  hello: "Welcome! I'm here to help you book a session or answer any questions about our photography services. What can I do for you?",
  hi: "Hey there! Ready to capture something beautiful? Ask me about our packages, availability, or how to book!",
  price: "Our packages start at very low price point it depends on what you want. Which suits you best?",
  pricing: "Our packages start at 45000 for the Essentials (3hr video, 40 sheet album,candid,drone ), 65000 for Signature (4hr video, 45 sheet album,Candid,Drone,cinematic), and 100000 for Legacy (5hr video, 50 sheet album,prewedding,highlights). Which suits you best?",
  book: "Awesome! To book a session, fill in the contact form below or call us directly. We usually respond within 24 hours. Which package were you thinking?",
  booking: "To book, use the contact form in the Contact section or email us at Anvistudio464114@gmail.com. Our calendar fills up fast — especially weekends!",
  portrait: "Portrait sessions are one of our specialties! Soft light, genuine emotion, timeless frames. The Essentials or Signature package works great for portraits.",
  landscape: "We love landscape work — early mornings, golden hour, dramatic skies. Check out our gallery for some recent shots!",
  wedding: "Weddings are magical! We recommend the Legacy package for full-day coverage. We're booked months in advance, so reach out early!",
  available: "Our availability changes weekly. Drop a date in the contact form and we'll confirm within 24 hours!",
  turnaround: "Edited photos are typically delivered within 7–10 business days. Legacy clients get a same-week preview!",
  gallery: "Our gallery showcases landscapes, portraits, and street photography. Scroll up to explore — hover over any image to see the title!",
  contact: "You can reach us via the contact form below, or email Anvistudio464114@gmail.com. We're also on Instagram @Anvi_studios.",
  default: "Great question! For detailed info, feel free to drop us a message in the Contact section or email Anvistudio464114@gmail.com. I'm best at answering questions about pricing, booking, and sessions!",
};

function getBot(msg) {
  const lower = msg.toLowerCase();
  for (const key of Object.keys(botResponses)) {
    if (key !== "default" && lower.includes(key)) return botResponses[key];
  }
  return botResponses.default;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Anvi, your photography assistant. Ask me anything about sessions, pricing, or booking ✨" },
  ]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filtered = activeFilter === "all" ? photos : photos.filter((p) => p.category === activeFilter);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: getBot(input) }]);
    }, 600);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormSent(false), 4000);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      

      {/* NAV */}
      <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("hero")}>
          Anvi<span>Studio</span>
        </div>
        <div className="nav-links">
          {["gallery", "pricing", "contact"].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)}>
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">Visual Storytelling</div>
            <h1 className="hero-title">
              Light finds
              <em>every truth</em>
            </h1>
            <p className="hero-sub">
              We craft photographs that hold time still — raw emotion, cinematic light, and compositions that speak before words can.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("gallery")}>
                View Work
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("pricing")}>
                See Packages
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-grid">
              {photos.slice(0, 4).map((p) => (
                <div key={p.id}>
                  <img src={p.src} alt={p.title} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="hero-overlay" />
          </div>
          <div className="hero-stat-bar">
            {[["800+", "Sessions"], ["12", "Years"], ["98%", "Satisfaction"]].map(([n, l]) => (
              <div className="stat" key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <div className="gallery-header">
          <div>
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">
              Curated <em>moments</em>
            </h2>
          </div>
          <div className="filters">
            {["all", "landscape", "portrait", "street"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery-grid">
          {filtered.map((photo) => (
            <div key={photo.id} className="gallery-item" onClick={() => setLightbox(photo)}>
              <img src={photo.src} alt={photo.title} loading="lazy" />
              <div className="gallery-overlay">
                <div className="gallery-category">{photo.category}</div>
                <div className="gallery-photo-title">{photo.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img className="lightbox-img" src={lightbox.src} alt={lightbox.title} />
          <div className="lightbox-caption">
            <p>{lightbox.category}</p>
            <h3>{lightbox.title}</h3>
          </div>
        </div>
      )}

      {/* PRICING */}
      <section id="pricing">
        <div className="section-label">Investment</div>
        <h2 className="section-title">
          Choose your <em>experience</em>
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: 480, lineHeight: 1.7 }}>
          Every package includes our full creative process — from scouting to delivery. No hidden fees, no surprises.
        </p>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card ${plan.featured ? "featured" : ""}`}>
              <div className="pricing-name">{plan.name}</div>
              <div className="pricing-desc">{plan.desc}</div>
              <div className="pricing-price">{plan.price}</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button className="btn-pricing" onClick={() => scrollTo("contact")}>
                Book This Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label">Connect</div>
        <h2 className="section-title">
          Let's create <em>together</em>
        </h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Start a conversation</h3>
            <p>
              Whether you have a vision in mind or just a feeling, we'd love to hear from you. Every great photograph begins with a conversation.
            </p>
            {[
              { icon: "✉", label: "Email", value: "Anvistudio464114@gmail.com" },
              { icon: "☎", label: "Phone", value: "+917389998401" },
              { icon: "⌖", label: "Studio", value: "Lateri,Vidisha,M.P." },
              { icon: "◷", label: "Hours", value: "Mon–sun, 10am – 10pm" },
            ].map((d) => (
              <div key={d.label} className="contact-detail">
                <div className="contact-detail-icon">{d.icon}</div>
                <div className="contact-detail-text">
                  <span>{d.label}</span>
                  <p>{d.value}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <inpu
                  type="text" required placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email" required placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                required placeholder="Tell us about your vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {formSent ? (
              <div className="form-success">✓ Message received — we'll be in touch within 24 hours.</div>
            ) : (
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Send Message
              </button>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Anvi<span>Studio</span></div>
        <div className="footer-copy">© 2026 AnviStudio. All rights reserved.</div>
        <div className="footer-socials">
          {["ig", "tw", "be"].map((s) => (
            <button key={s} className="social-btn">{s.toUpperCase()}</button>
          ))}
        </div>
      </footer>

      {/* CHATBOT */}
      <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)}>
        {chatOpen ? "✕" : "💬"}
      </button>

      {chatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">L</div>
              <div>
                <div className="chat-name">Anvi</div>
                <div className="chat-status">● Online</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setChatOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>{m.text}</div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-suggestions">
            {["Pricing", "Booking", "Gallery"].map((s) => (
              <button key={s} className="suggest-btn" onClick={() => {
                setInput(s);
                setTimeout(() => {
                  const userMsg = { from: "user", text: s };
                  setMessages((m) => [...m, userMsg]);
                  setInput("");
                  setTimeout(() => {
                    setMessages((m) => [...m, { from: "bot", text: getBot(s) }]);
                  }, 500);
                }, 0);
              }}>{s}</button>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="chat-send" onClick={sendMessage}>→</button>
          </div>
        </div>
      )}
    </>
  );
}