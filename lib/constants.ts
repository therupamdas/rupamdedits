export const SITE = {
  name:     "Rupam Edits",
  tagline:  "Motion Is The Message",
  location: "Kolkata, India",
  email:    "rupam1624@gmail.com",
  whatsapp: "919XXXXXXXXX", // replace with your number, no +
  instagram:"https://instagram.com/rupam_edits",
  youtube:  "https://youtube.com/@rupam_edits",
  linkedin: "https://linkedin.com/in/rupam",
}

export const NAV_LINKS = [
  { label: "Work",     href: "#work"       },
  { label: "Services", href: "#services"   },
  { label: "AI Guide", href: "#ai-section" },
  { label: "Contact",  href: "#contact"    },
  { label: "Portal",   href: "/portal"     },
]

export const TICKER_ITEMS = [
  "Video Editing", "Reels & Shorts", "Brand Commercials",
  "Event Films", "Music Videos", "48h Turnaround",
  "Kolkata, India", "Open for Projects",
  "Color Grading", "Motion Graphics",
]

export const STATS = [
  { n: "50+",  label: "Projects"     },
  { n: "48h",  label: "Avg Delivery" },
  { n: "100%", label: "Satisfaction" },
]

export const PROJECTS = [
  {
    id: "1", title: "Nike x Creator Drop",
    client: "@nikeindia", category: "commercial",
    tag: "Commercial · Reel", color: "c1",
    meta: "@nikeindia · Commercial · 2024",
  },
  {
    id: "2", title: "After Midnight",
    client: "@artistname", category: "music",
    tag: "Music · Visual", color: "c2",
    meta: "@artistname · Music Video · 2024",
  },
  {
    id: "3", title: "Sunburn Goa 2024",
    client: "@sunburnfestival", category: "event",
    tag: "Event · Film", color: "c3",
    meta: "@sunburnfestival · Event Film · 2024",
  },
  {
    id: "4", title: "Myntra Brand Reel",
    client: "@myntra", category: "reel",
    tag: "Brand · Reel", color: "c4",
    meta: "@myntra · Reel · 2025",
  },
  {
    id: "5", title: "Boat Audio Launch",
    client: "@boatnirvana", category: "commercial",
    tag: "Product · Commercial", color: "c5",
    meta: "@boatnirvana · Commercial · 2025",
  },
  {
    id: "6", title: "TCS Summit Film",
    client: "@tcs", category: "event",
    tag: "Corporate · Film", color: "c6",
    meta: "Tata Consultancy · Event · 2025",
  },
]

export const SERVICES = [
  {
    num: "01", featured: true,
    badge: "Most Popular",
    name: "Reels & Shorts",
    desc: "Scroll-stopping short-form content for Instagram, YouTube Shorts, and TikTok. Sound design, transitions, and color grading included.",
    price: "₹3,000", unit: "/ reel",
  },
  {
    num: "02", featured: false,
    name: "Brand Commercial",
    desc: "Full production edit for brand campaigns. Voiceover sync, motion graphics, delivery in all formats and aspect ratios.",
    price: "₹12,000", unit: "/ video",
  },
  {
    num: "03", featured: false,
    name: "Event Film",
    desc: "Weddings, concerts, corporate events. Cinematic edit with music sync and color. Delivered in 4K.",
    price: "₹8,000", unit: "/ event",
  },
  {
    num: "04", featured: false,
    name: "Rush Delivery",
    desc: "Need it in 24 hours? Rush slots available with priority editing, same-day delivery, and unlimited revisions.",
    price: "+50%", unit: "/ rush fee",
  },
]

export const AI_SYSTEM_PROMPT = `You are Rupam's AI assistant on his video editing portfolio website. Answer questions from potential clients. Be warm, direct, and concise (2-4 sentences max). Never invent specific client names.

About Rupam:
- Based in Kolkata, India. 2+ years experience, 50+ projects.
- Specialty: Instagram reels, brand commercials, event films, music videos
- Style: Fast-paced, high energy, precise sound design, cinematic color grading
- Tools: Adobe Premiere Pro, After Effects, DaVinci Resolve

Pricing:
- Reels / Shorts: ₹3,000 per reel (most popular)
- Brand Commercial: ₹12,000 per video
- Event Film: ₹8,000 per event  
- Rush delivery 24h: +50% surcharge

Process:
- Client shares footage via Google Drive link
- Rupam edits, shares draft via private client portal
- 2 rounds of revisions included
- Final delivery in any format/resolution

Turnaround:
- Standard: 48h for reels, 4–5 days for commercials/events
- Rush: 24h (surcharge applies)
- Replies to inquiries within 4 hours`