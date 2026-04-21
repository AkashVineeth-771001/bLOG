import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  ArrowRight, 
  Menu, 
  X, 
  GraduationCap,
  PenTool,
  Globe,
  Feather,
  Quote
} from 'lucide-react';

// --- Types ---
interface Article {
  id: number;
  title: string;
  source: string;
  location?: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: 'Print' | 'Digital';
  link: string;
  imageUrl: string;
}

// --- Mock Data ---
const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Marvel at India’s military prowess",
    source: "The New Indian Express",
    location: "Thiruvananthapuram",
    date: "30 Aug 2024",
    readTime: "2 min read",
    excerpt: "An exploration of India's defense capabilities showcased at the latest military exhibition.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/thiruvananthapuram/2024/Aug/30/marvel-at-indias-military-prowess",
    imageUrl: "https://i.postimg.cc/52z3n2t3/militry-prowess.jpg"
  },
  {
    id: 2,
    title: "Market recovers from rain and landslides in Kerala",
    source: "The New Indian Express",
    location: "Thiruvananthapuram",
    date: "15 Aug 2024",
    readTime: "1 min read",
    excerpt: "Reporting on the resilience of local markets as they bounce back from severe weather conditions.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/thiruvananthapuram/2024/Aug/15/market-recovers-from-rain-and-landslides-in-kerala",
    imageUrl: "https://i.postimg.cc/59Zpvz4V/Market-recovers-from-rain.jpg"
  },
  {
    id: 3,
    title: "A stall that is another world of books",
    source: "The New Indian Express",
    location: "Thiruvananthapuram",
    date: "10 Aug 2024",
    readTime: "2 min read",
    excerpt: "A feature on a unique bookstore that offers a sanctuary for bibliophiles in the city.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/thiruvananthapuram/2024/Aug/10/a-stall-that-is-another-world-of-books",
    imageUrl: "https://i.postimg.cc/wvRLTWsW/a-stall.jpg"
  },
  {
    id: 4,
    title: "Curtains come down on IDSFFK, but the magic lingers on",
    source: "The New Indian Express",
    location: "Kochi",
    date: "01 Aug 2024",
    readTime: "2 min read",
    excerpt: "The closing ceremony of the International Documentary and Short Film Festival of Kerala.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/kochi/2024/Aug/01/curtains-come-down-on-idsffk-but-the-magic-lingers-on",
    imageUrl: "https://i.postimg.cc/wMct7nxh/cutains-come-down.jpg"
  },
  {
    id: 5,
    title: "Animated wonders",
    source: "The New Indian Express",
    location: "Kochi",
    date: "31 Jul 2024",
    readTime: "2 min read",
    excerpt: "Exploring the world of animation and its growing influence in the regional film industry.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/kochi/2024/Jul/31/animated-wonders",
    imageUrl: "https://i.postimg.cc/7LFbXqf2/Screenshot-2026-04-20-123306.jpg"
  },
  {
    id: 6,
    title: "Rain doesn’t bring down festival fever: IDSFFK on Day four",
    source: "The New Indian Express",
    location: "Kochi",
    date: "31 Jul 2024",
    readTime: "2 min read",
    excerpt: "Despite the downpour, the spirit of cinema remains high at the IDSFFK festival.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/kochi/2024/Jul/31/rain-doesnt-bring-down-festival-fever-idsffk-on-day-four",
    imageUrl: "https://i.postimg.cc/vZjmHGLb/Screenshot-2026-04-20-123352.jpg"
  },
  {
    id: 7,
    title: "Touching themes keep the audience hooked at IDSFFK",
    source: "The New Indian Express",
    location: "Thiruvananthapuram",
    date: "28 Jul 2024",
    readTime: "1 min read",
    excerpt: "A look at the emotional narratives that are resonating with viewers at this year's festival.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/thiruvananthapuram/2024/Jul/28/touching-themes-keep-the-audience-hooked-at-idsffk",
    imageUrl: "https://i.postimg.cc/vBGwGKK0/Screenshot-2026-04-20-123603.jpg"
  },
  {
    id: 8,
    title: "Finding cinematic gems",
    source: "The New Indian Express",
    location: "Thiruvananthapuram",
    date: "26 Jul 2024",
    readTime: "4 min read",
    excerpt: "Discovering hidden masterpieces in the diverse lineup of the International Film Festival.",
    category: 'Print',
    link: "https://www.newindianexpress.com/cities/thiruvananthapuram/2024/Jul/26/finding--gems",
    imageUrl: "https://i.postimg.cc/PrgctcpM/Screenshot-2026-04-20-123710.jpg"
  },
  {
    id: 9,
    title: "Trees Old and Young, Sprouting a Shady Boon for Simple Sheep",
    source: "Medium",
    date: "Aug 2024",
    readTime: "5 min read",
    excerpt: "A poetic reflection on nature, growth, and the simple cycles of life.",
    category: 'Digital',
    link: "https://medium.com/@akashVineeth/trees-old-and-young-sprouting-a-shady-boon-for-simple-sheep-70df408b9ac9",
    imageUrl: "https://images.pexels.com/photos/36740946/pexels-photo-36740946.jpeg"
  },
  {
    id: 10,
    title: "The Art of Endurance",
    source: "Medium",
    date: "Jul 2024",
    readTime: "6 min read",
    excerpt: "Exploring the psychological and physical facets of persistence in the modern age.",
    category: 'Digital',
    link: "https://medium.com/@akashVineeth/the-art-of-endurance-bc80685f7c92",
    imageUrl: "https://images.pexels.com/photos/19421169/pexels-photo-19421169.jpeg"
  },
  {
    id: 11,
    title: "God of Religion",
    source: "Medium",
    date: "Jun 2024",
    readTime: "8 min read",
    excerpt: "A deep dive into the intersections of faith, culture, and personal belief systems.",
    category: 'Digital',
    link: "https://medium.com/@akashVineeth/god-of-religion-fe00f4380238",
    imageUrl: "https://images.pexels.com/photos/7495477/pexels-photo-7495477.jpeg"
  },
  {
    id: 12,
    title: "The Basterds You Idolise",
    source: "Medium",
    date: "May 2024",
    readTime: "7 min read",
    excerpt: "An analytical exploration of cinema's most compelling anti-heroes and the complex psychology behind our fascination with morally ambiguous characters.",
    category: 'Digital',
    link: "https://medium.com/@akashVineeth/the-basterds-you-idolise-d9c34e5892db",
    imageUrl: "https://images.pexels.com/photos/29011480/pexels-photo-29011480.jpeg"
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Perspectives', href: '#perspectives' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-midnight/80 backdrop-blur-lg py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a href="#" className="font-serif text-xl font-bold tracking-tight">
          Akash <span className="text-gold italic font-normal">Vineeth</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold hover:text-gold transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-xl md:hidden py-10 flex flex-col items-center space-y-6 border-b border-white/5"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif mb-6"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-accent max-w-2xl text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '40px' }}
      viewport={{ once: true }}
      className="h-[2px] bg-gold mt-8"
    />
  </div>
);

interface ArticleCardProps {
  article: Article;
  index: number;
  key?: any;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    whileHover={{ y: -12 }}
    className="glass overflow-hidden rounded-2xl flex flex-col h-full group transition-all duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5"
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={article.imageUrl} 
        alt={article.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-midnight bg-gold px-4 py-1.5 rounded-sm">
          {article.source}
        </span>
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-2 mb-4">
        {article.location && (
          <>
            <span className="w-1 h-3 bg-gold rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-soft-white">{article.location}</span>
          </>
        )}
      </div>
      
      <h3 className="text-xl md:text-2xl font-serif mb-4 group-hover:text-gold transition-colors leading-tight">
        {article.title}
      </h3>
      
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-accent mb-6 font-medium">
        <span>Akash Vineeth</span>
        <span className="opacity-30">•</span>
        <span>{article.date}</span>
        <span className="opacity-30">•</span>
        <span>{article.readTime}</span>
      </div>

      <p className="text-sm text-accent mb-8 flex-grow leading-relaxed font-light line-clamp-3">
        {article.excerpt}
      </p>
      
      <a 
        href={article.link} 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-gold hover:text-soft-white transition-all group/link"
      >
        Read Full Piece <ArrowRight size={14} className="ml-3 group-hover/link:translate-x-1 transition-transform" />
      </a>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-midnight selection:bg-gold selection:text-midnight">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-8 light-leak">
        <div className="crepuscular-rays" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/50 to-midnight" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>
        
        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-10 flex justify-center"
          >
            <Feather size={32} className="text-gold/60" strokeWidth={1} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/80">
              Journalist <span className="mx-2 opacity-30">•</span> Storyteller <span className="mx-2 opacity-30">•</span> Reporter
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 tracking-tight leading-none relative"
          >
            <div className="absolute inset-0 bg-gold/5 blur-[100px] -z-10 rounded-full" />
            Akash <span className="text-gold italic font-normal">Vineeth</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-xl text-accent mb-12 max-w-2xl mx-auto font-serif italic opacity-80"
          >
            "Finding a meaning to life through the simplicity of words."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <div className="h-[1px] w-12 bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <div className="h-[1px] w-12 bg-white/10" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.a 
              href="#portfolio" 
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#ffffff",
                color: "#0F0F0F",
                boxShadow: "0 25px 50px -12px rgba(197, 157, 95, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gold text-midnight text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-2xl shadow-gold/10 inline-block"
            >
              Explore My Work
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-4 block">
              Background
            </span>
            <h2 className="text-5xl md:text-7xl font-serif mb-12">About Me</h2>
            
            <div className="space-y-10 text-lg md:text-xl text-accent leading-relaxed font-light">
              <p>
                A dedicated journalist and mass communication professional with a passion for uncovering stories that matter. With a <span className="text-soft-white font-bold">Bachelor of Arts in Journalism and Mass Communication</span> from Amity University Mumbai, I've honed my craft from the classroom to the fast-paced newsroom of <span className="text-gold italic">The New Indian Express</span>.
              </p>
              
              <div className="relative pl-10 py-4 border-l border-gold/30">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-midnight p-1">
                  <Quote size={20} className="text-gold/60" fill="currentColor" />
                </div>
                <p className="font-serif italic text-soft-white text-xl md:text-2xl leading-relaxed opacity-90">
                  I believe in the art of storytelling, turning complex events into compelling narratives that inform, engage, and inspire.
                </p>
              </div>
              
              <p>
                Using my background in Mass Communication and experience at The New Indian Express, I capture the details others overlook. I offer professional writing and editorial support on a sliding scale, ensuring impactful storytelling is accessible to everyone.
              </p>
            </div>

            {/* Expertise Section */}
            <div className="pt-16 mt-16 border-t border-white/5">
              <div className="flex items-center gap-5 mb-10 text-gold">
                <PenTool size={28} strokeWidth={1.5} />
                <h3 className="text-2xl font-serif">Core Expertise</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {['Investigative Reporting', 'Feature Writing', 'Digital Storytelling', 'Editorial Strategy', 'Media Ethics', 'Public Relations'].map(skill => (
                  <span key={skill} className="px-5 py-2.5 bg-white/5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/5 hover:border-gold/30 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Print Media Highlights" 
            subtitle="Featured articles published in The New Indian Express, covering social issues, urban development, and heritage."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ARTICLES.filter(a => a.category === 'Print').map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Perspectives Section */}
      <section id="perspectives" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <SectionHeading 
              title="Medium Insights" 
              subtitle="Digital-first commentary and personal reflections on the evolving media landscape."
            />
            <a 
              href="https://medium.com/@akashVineeth" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold hover:text-soft-white transition-all mb-16 md:mb-0 group"
            >
              Visit Medium Profile <Globe size={16} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {ARTICLES.filter(a => a.category === 'Digital').map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass rounded-[2rem] overflow-hidden grid lg:grid-cols-2 border border-white/5 shadow-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="p-12 md:p-20 bg-white/[0.02]"
            >
              <h2 className="text-5xl font-serif mb-10">Let's Connect</h2>
              <p className="text-accent mb-16 text-lg font-light leading-relaxed">
                Open for collaborations, editorial assignments, and investigative leads. Reach out directly or via the form.
              </p>
              
              <div className="space-y-10">
                <motion.a 
                  whileHover={{ x: 10 }}
                  href="mailto:akash771001@gmail.com" 
                  className="flex items-center gap-8 group"
                >
                  <div className="w-14 h-14 rounded-full glass flex items-center justify-center group-hover:bg-gold group-hover:text-midnight transition-all duration-500">
                    <Mail size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2 font-bold">Email</p>
                    <p className="text-xl font-serif">akash771001@gmail.com</p>
                  </div>
                </motion.a>
                
                <div className="flex gap-6 pt-6">
                  {[
                    { icon: <Linkedin size={22} strokeWidth={1.5} />, href: "https://www.linkedin.com/in/akash-vineeth-9233b7235/" },
                    { icon: <Instagram size={22} strokeWidth={1.5} />, href: "https://www.instagram.com/akash_vineeth_/" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-midnight transition-all duration-500"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="p-12 md:p-20 border-l border-white/5"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Name</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-gold/50 transition-all font-light"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Email</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="email" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-gold/50 transition-all font-light"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Subject</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-gold/50 transition-all font-light"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Message</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    rows={5}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 focus:outline-none focus:border-gold/50 transition-all resize-none font-light"
                    placeholder="Your message..."
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gold text-midnight text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all duration-500 shadow-xl shadow-gold/5"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="font-serif text-lg font-bold tracking-tight">
            Akash <span className="text-gold italic font-normal">Vineeth</span>
          </div>
          <p className="text-accent text-[11px] uppercase tracking-[0.2em] font-medium opacity-60">
            © {new Date().getFullYear()} Akash Vineeth. All rights reserved.
          </p>
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
