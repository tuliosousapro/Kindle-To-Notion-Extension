/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "motion/react";
import { WelcomePage } from "./components/WelcomePage";
import { LegalPage } from "./components/LegalPage";
import { BlogPage } from "./components/BlogPage";
import { ChangelogPage } from "./components/ChangelogPage";
import {
  BookOpen,
  CheckCircle2,
  Chrome,
  Download,
  Github,
  Layers,
  Lock,
  MousePointer2,
  ShieldCheck,
  Zap,
  Globe,
  Quote,
  StickyNote,
  Bookmark,
  ArrowRight,
  Star,
  ChevronDown,
  GraduationCap,
  Brain,
  PenTool,
  Infinity,
  Check,
  X,
  Image,
  Settings,
  Linkedin
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 rounded-2xl bg-white border border-muted-slate/10 hover:border-kindle-orange/30 hover:shadow-xl hover:shadow-kindle-orange/5 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-kindle-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-kindle-orange" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-jet-black font-display">{title}</h3>
    <p className="text-carbon-gray leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description, icon: Icon }: { number: string, title: string, description: string, icon: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm relative group hover:bg-white/10 transition-all"
  >
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-kindle-orange flex items-center justify-center text-white font-bold font-display text-lg shadow-lg shadow-kindle-orange/40 z-10">
      {number}
    </div>
    <div className="w-20 h-20 rounded-3xl bg-kindle-orange/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-10 h-10 text-kindle-orange" />
    </div>
    <h4 className="text-2xl font-bold text-white mb-4 font-display tracking-tight">{title}</h4>
    <p className="text-white/60 leading-relaxed text-base">{description}</p>
  </motion.div>
);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  key?: any;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="border-b border-muted-slate/10 last:border-0">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-4"
      aria-expanded={isOpen}
    >
      <span className={`text-lg font-bold transition-colors font-display ${isOpen ? 'text-kindle-orange' : 'text-jet-black group-hover:text-kindle-orange'}`}>
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-kindle-orange' : 'text-muted-slate'}`} aria-hidden="true" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-carbon-gray leading-relaxed">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const MeshBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-kindle-orange/10 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] bg-kindle-orange/5 blur-[100px] rounded-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]" />
    </div>
  );
};

const SpinningBooks = () => {
  const books = [
    { id: "9781844135912", title: "Atomic Habits" },
    { id: "9780349409061", title: "Deep Work" },
    { id: "9780062315007", title: "The Alchemist" },
    { id: "9780062316097", title: "Sapiens" },
    { id: "9780804139298", title: "Zero to One" },
    { id: "9780374275631", title: "Thinking, Fast and Slow" },
    { id: "9780857197689", title: "Psychology of Money" },
    { id: "9780140449334", title: "Meditations" },
  ];

  const [radius, setRadius] = useState(280);
  const time = useTime();
  const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(140);
      } else if (window.innerWidth < 768) {
        setRadius(180);
      } else if (window.innerWidth < 1024) {
        setRadius(220);
      } else {
        setRadius(280);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <div className="relative w-full h-[250px] md:h-[320px] flex items-center justify-center overflow-visible" style={{ perspective: "1200px" }}>
      {/* Background Rings - Subtle and elegant */}
      <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-muted-slate/10" style={{ transform: "rotateX(75deg)" }} />
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-muted-slate/5" style={{ transform: "rotateX(75deg)" }} />

      {/* Central Logo - The "Notion" hub */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center border border-muted-slate/10 cursor-pointer"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-kindle-orange rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-kindle-orange/20">
          <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-white" />
        </div>

        {/* Pulsing effect */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-kindle-orange rounded-[2rem] md:rounded-[2.5rem] -z-10"
        />
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        {books.map((book, index) => {
          const initialAngle = (index / books.length) * (Math.PI * 2);

          return (
            <CarouselItem
              key={book.id}
              book={book}
              initialAngle={initialAngle}
              rotate={rotate}
              radius={radius}
            />
          );
        })}
      </div>
    </div>
  );
};

interface CarouselItemProps {
  key?: string | number;
  book: { id: string; title: string };
  initialAngle: number;
  rotate: any;
  radius: number;
}

const CarouselItem = ({ book, initialAngle, rotate, radius }: CarouselItemProps) => {
  // Calculate position based on rotation
  const x = useTransform(rotate, (r: number) => {
    const currentAngle = initialAngle + (r * Math.PI) / 180;
    return Math.sin(currentAngle) * radius;
  });

  const z = useTransform(rotate, (r: number) => {
    const currentAngle = initialAngle + (r * Math.PI) / 180;
    return Math.cos(currentAngle) * radius;
  });

  const scale = useTransform(z, [-280, 280], [0.5, 1.1]);
  const opacity = useTransform(z, [-280, 280], [0.2, 1]);
  const zIndex = useTransform(z, [-280, 280], [0, 100]);
  const blur = useTransform(z, [-280, 280], [6, 0]);

  return (
    <motion.div
      style={{
        x,
        z,
        scale,
        opacity,
        zIndex: zIndex as any,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        position: "absolute",
        transformStyle: "preserve-3d"
      }}
      className="group"
    >
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Book Cover Card */}
        <div
          className="w-16 h-24 md:w-24 md:h-32 rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-muted-slate/10 bg-white transition-all duration-500 group-hover:scale-110 group-hover:z-50"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={`https://covers.openlibrary.org/b/isbn/${book.id}-M.jpg`}
            alt={book.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
            <span className="text-[8px] md:text-[9px] font-bold text-white leading-tight line-clamp-2">
              {book.title}
            </span>
          </div>
        </div>

        {/* Back of the book */}
        <div
          className="absolute inset-0 w-16 h-24 md:w-24 md:h-32 rounded-lg md:rounded-xl bg-kindle-orange/20 border border-kindle-orange/10 flex items-center justify-center -z-10"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-kindle-orange/40" />
        </div>
      </motion.div>

      {/* Reflection/Shadow below */}
      <motion.div
        style={{ opacity: useTransform(z, [-280, 280], [0, 0.2]) }}
        className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-black blur-xl rounded-full"
      />
    </motion.div>
  );
};

const TrustBadges = () => (
  <div className="flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-carbon-gray">Featured on</span>
    <div className="flex flex-wrap items-center justify-center gap-6">
      <a
        href="https://www.producthunt.com/products/kindle2notion-extension"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 transition-transform"
      >
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004546&theme=light" alt="Product Hunt" className="h-8" />
      </a>
    </div>
  </div>
);

const NotionTemplateSection = () => {
  return (
    <section className="py-40 px-6 bg-muted-slate/[0.02] border-t border-muted-slate/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-kindle-orange/20 blur-3xl rounded-full opacity-30" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-muted-slate/10 bg-white group">
              {/* macOS Title Bar */}
              <div className="h-10 bg-muted-slate/5 border-b border-muted-slate/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner" />
                </div>
                <div className="flex-grow text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/5 text-[10px] font-medium text-carbon-gray/60">
                    <Globe className="w-3 h-3" />
                    notion.so
                  </div>
                </div>
              </div>
              <img
                src="https://www.notion.com/_next/image?url=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Ftemplate%2F42e933e3-954d-4a10-bc4d-c0039f52839d%2F1756346706460%2Fdesktop.jpg&w=3840&q=75"
                alt="Notion Template Preview"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kindle-orange/10 text-kindle-orange text-sm font-bold mb-8">
              <Layers className="w-4 h-4" />
              Free Resource
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-jet-black tracking-tight">
              Get our Premium <br />
              <span className="text-kindle-orange">Notion Template</span>
            </h2>
            <p className="text-xl text-carbon-gray mb-12 leading-relaxed">
              Ready to supercharge your reading? Download our custom-built Notion template to organize your library perfectly and sync your highlights with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.notion.so/pt-br/templates/reading-center-powered-by-machina-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-jet-black text-white px-10 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 hover:bg-kindle-orange hover:shadow-xl hover:shadow-kindle-orange/20 whitespace-nowrap group"
              >
                Get the Template Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-muted-slate/10">
              <h4 className="text-sm font-bold text-jet-black uppercase tracking-widest mb-6">What's included:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Automated Book Library",
                  "Reading Progress Tracker",
                  "Insight Capture System",
                  "Professional Layout"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-jet-black font-medium text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      name: "Brian Graf",
      role: "Product Designer",
      content: "Kindle to Notion is a game changer. I've been looking for a way to sync my highlights automatically for years. This is the most polished solution I've found.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=brian"
    },
    {
      name: "Ugur",
      role: "Software Engineer",
      content: "The sync is incredibly fast. I love how it organizes everything by chapter in Notion. It makes reviewing my reading notes so much easier.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=ugur"
    },
    {
      name: "Praveen",
      role: "Content Creator",
      content: "Finally, a way to get my Kindle highlights into my second brain without the manual friction. The color mapping to Notion colors is a brilliant touch.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=praveen"
    },
    {
      name: "Sarah Chen",
      role: "Writer",
      content: "As a researcher, this tool is indispensable. It captures my personal annotations perfectly and places them right where they belong.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Alex Rivera",
      role: "Student",
      content: "100% private and free? I couldn't believe it at first. It works exactly as advertised. Highly recommended for any serious reader.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=alex"
    }
  ];

  return (
    <div className="mt-16 w-full overflow-hidden relative">
      <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused] w-max">
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[350px] p-8 rounded-3xl bg-white border border-muted-slate/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-kindle-orange text-kindle-orange" />
              ))}
            </div>
            <p className="text-jet-black text-sm leading-relaxed mb-6">"{t.content}"</p>
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-muted-slate/10" referrerPolicy="no-referrer" />
              <div>
                <div className="text-sm font-bold text-jet-black">{t.name}</div>
                <div className="text-xs text-carbon-gray">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Gradients for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-canvas-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-canvas-white to-transparent z-10 pointer-events-none" />
    </div>
  );
};

const XIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const ThreadsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.823 12.907c-.696 0-1.17-.569-1.17-1.235 0-.666.474-1.235 1.17-1.235.696 0 1.17.569 1.17 1.235 0 .666-.474 1.235-1.17 1.235zm-1.89 1.354c-.659.463-1.476.714-2.328.714-2.123 0-3.852-1.729-3.852-3.852 0-2.123 1.729-3.852 3.852-3.852.852 0 1.669.251 2.328.714.659-.463 1.477-.714 2.329-.714 2.123 0 3.852 1.729 3.852 3.852 0 2.123-1.729 3.852-3.852 3.852-.852 0-1.67-.251-2.329-.714zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75c-3.723 0-6.75-3.027-6.75-6.75S8.277 5.25 12 5.25s6.75 3.027 6.75 6.75-3.027 6.75-6.75 6.75z" />
  </svg>
);

const BlueskyIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 10.8c-1.087-2.114-4.046-5.05-6.098-5.05C4.046 5.75 3 6.796 3 8.087c0 1.29.776 3.357 1.863 5.164 1.087 1.807 2.458 3.226 3.75 3.226 1.29 0 2.066-1.034 3.387-3.357 1.32 2.323 2.097 3.357 3.387 3.357 1.292 0 2.663-1.419 3.75-3.226 1.087-1.807 1.863-3.874 1.863-5.164 0-1.291-1.046-2.337-2.902-2.337-2.052 0-5.011 2.936-6.098 5.05z" />
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const RedditIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.422.06.637 0 2.73-3.185 4.947-7.11 4.947s-7.11-2.218-7.11-4.947c0-.215.02-.427.06-.637a1.75 1.75 0 0 1-1.056-1.597c0-.968.786-1.754 1.754-1.754.463 0 .875.18 1.179.465 1.192-.834 2.83-1.397 4.637-1.48l.834-3.87a.25.25 0 0 1 .33-.17l3.297.694c.191-.21.472-.34.785-.34zM7.647 11.19a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm9.706 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-2.303 4.74c-.108.108-.284.108-.392 0-1.037-1.037-2.732-1.037-3.77 0-.108.108-.284.108-.392 0-.108-.108-.108-.284 0-.392 1.253-1.253 3.298-1.253 4.554 0 .108.108.108.284 0 .392z" />
  </svg>
);

const SubstackIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.539 8.242H1.46V5.406h21.079v2.836zm0 5.681H1.46v-2.837h21.079v2.837zm0 5.683H1.46v-2.837h21.079v2.837z" />
  </svg>
);

const ReadwiseComparison = ({ onBack, onInstall }: { onBack: () => void, onInstall: () => void }) => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const features = [
    { name: "Price", kindle: "100% Free", readwise: "$8 - $15 / month" },
    { name: "Privacy", kindle: "Local-only (No servers)", readwise: "Cloud-based storage" },
    { name: "Notion Integration", kindle: "Native & Direct", readwise: "Third-party sync" },
    { name: "Open Source", kindle: true, readwise: false },
    { name: "No Subscription", kindle: true, readwise: false },
    { name: "1-Click Export", kindle: true, readwise: true },
    { name: "Browser Extension", kindle: true, readwise: true },
    { name: "Data Ownership", kindle: "You own it", readwise: "Stored on their servers" },
    { name: "No Signup Required", kindle: true, readwise: false },
    { name: "Custom Templates", kindle: true, readwise: true },
    { name: "Offline Support", kindle: true, readwise: false },
    { name: "Direct Notion API", kindle: true, readwise: false },
    { name: "Zero Tracking", kindle: true, readwise: false },
  ];

  const comparisonFaqs = [
    {
      question: "Why is Kindle to Notion free while Readwise is paid?",
      answer: "Readwise is a venture-backed company with significant overhead, including servers, staff, and marketing. Kindle to Notion is an open-source project built by the community. Since we don't store your data on our servers, our operating costs are near zero, allowing us to offer the tool for free. We believe that moving your own data from one service to another shouldn't be a recurring expense."
    },
    {
      question: "Can I import my existing Readwise data into Notion using this tool?",
      answer: "Kindle to Notion is designed to pull directly from your Amazon Kindle Notebook. If your highlights are on your Kindle account, our extension can export them to Notion regardless of whether you've used Readwise in the past. It effectively replaces the sync functionality of Readwise for Kindle users."
    },
    {
      question: "Is Kindle to Notion as reliable as Readwise?",
      answer: "Yes. In fact, many users find our direct integration more reliable because it doesn't rely on a middle-man server. The extension communicates directly between your browser and the Notion API, reducing the number of potential failure points. If Amazon or Notion is up, Kindle to Notion works."
    },
    {
      question: "Does Kindle to Notion support other sources like Instapaper or Pocket?",
      answer: "Currently, Kindle to Notion is laser-focused on providing the best possible experience for Kindle and Notion users. While Readwise supports dozens of sources, we prioritize depth over breadth for the Kindle-to-Notion pipeline, ensuring your highlights are perfectly formatted and organized."
    },
    {
      question: "What happens to my data if I stop using the extension?",
      answer: "Nothing! Since all your data is stored directly in your Notion workspace, you have total ownership. Unlike subscription services where you might lose access to certain features or formatting if you stop paying, your Notion database is yours forever."
    },
    {
      question: "Is there a limit to how many highlights I can export?",
      answer: "No. Kindle to Notion has no artificial limits. Whether you have 10 highlights or 10,000, you can export them all for free. We don't believe in charging users based on the volume of their own reading notes."
    },
    {
      question: "How do I migrate from Readwise to Kindle to Notion?",
      answer: "Migration is simple: Install the Kindle to Notion extension, connect your Notion workspace, and run an export. The extension will populate your Notion database with your highlights. You can then safely cancel your Readwise subscription knowing your data is securely stored in your own Notion account."
    }
  ];

  return (
    <div className="min-h-screen bg-canvas-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-carbon-gray hover:text-jet-black mb-12 transition-colors font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>

        {/* Hero Banner */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kindle-orange/10 text-kindle-orange text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            The Ultimate Readwise Alternative
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 text-jet-black tracking-tight">
            Kindle to Notion <span className="text-kindle-orange">vs</span> Readwise
          </h1>
          <p className="text-xl md:text-2xl text-carbon-gray max-w-3xl mx-auto leading-relaxed">
            Stop paying $100+/year for your own highlights. Kindle to Notion is the free, private, and open-source alternative for knowledge workers who want total control over their digital library.
          </p>
        </div>

        {/* Overview Section */}
        <div className="prose prose-lg max-w-none mb-32 text-carbon-gray">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-jet-black font-display">The Case for a Better Alternative</h2>
              <p className="text-lg leading-relaxed">
                For years, Readwise has been the default choice for readers looking to sync their highlights. It's a polished product with a wide range of integrations. But as the "subscription economy" grows, many users are starting to question why they are paying a monthly fee to move their own data from one platform to another.
              </p>
              <p className="text-lg leading-relaxed">
                Kindle to Notion was born out of this exact frustration. We believe that your highlights—the insights you've carefully curated while reading—are your personal intellectual property. You shouldn't have to pay a "data tax" to access them in your favorite note-taking app.
              </p>
              <p className="text-lg leading-relaxed">
                By focusing exclusively on the Kindle to Notion pipeline, we've built a tool that isn't just a free alternative, but a superior one for users who live in Notion.
              </p>
            </div>
            <div className="bg-muted-slate/5 p-12 rounded-[3rem] border border-muted-slate/10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-jet-black mb-6">Key Differentiators</h3>
              <ul className="space-y-6">
                {[
                  { title: "Native Notion Integration", desc: "No middle-man servers. Direct communication with the Notion API for maximum reliability." },
                  { title: "No Signup Required", desc: "Start exporting in seconds. We don't want your email address or your personal info." },
                  { title: "100% Local Processing", desc: "Your highlights are processed in your browser. Privacy isn't a feature; it's our foundation." },
                  { title: "Free During Beta", desc: "Access all premium features without spending a dime. We're building for the community." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-kindle-orange/20 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-kindle-orange" />
                    </div>
                    <div>
                      <span className="block font-bold text-jet-black">{item.title}</span>
                      <span className="text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tool Deep Dive */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-6 p-10 rounded-[2.5rem] bg-white border border-muted-slate/10 shadow-sm">
            <h2 className="text-3xl font-bold text-jet-black font-display">What is Readwise?</h2>
            <p className="text-carbon-gray leading-relaxed">
              Readwise is a comprehensive highlight management service. It excels at aggregation—pulling data from Kindle, physical books (via OCR), Twitter, and various read-it-later apps. Its standout feature is the "Daily Review," which uses spaced repetition to resurface your highlights.
            </p>
            <p className="text-carbon-gray leading-relaxed">
              However, this convenience comes at a cost. Readwise is a cloud-first service, meaning your data is stored on their servers. For many, this is a privacy concern. Additionally, the subscription model can feel heavy for users who only need a simple sync to Notion.
            </p>
            <div className="pt-4">
              <span className="text-sm font-bold text-muted-slate uppercase tracking-widest">Best For</span>
              <p className="text-jet-black font-medium">Users who need 20+ integrations and enjoy spaced-repetition emails.</p>
            </div>
          </div>
          <div className="space-y-6 p-10 rounded-[2.5rem] bg-kindle-orange/5 border border-kindle-orange/10 shadow-sm">
            <h2 className="text-3xl font-bold text-jet-black font-display">What is Kindle to Notion?</h2>
            <p className="text-carbon-gray leading-relaxed">
              Kindle to Notion is a specialized browser extension built for speed, privacy, and precision. It doesn't try to be everything for everyone. Instead, it aims to be the absolute best way to move Kindle highlights into Notion.
            </p>
            <p className="text-carbon-gray leading-relaxed">
              Because it's a browser extension, it operates on your machine. It logs into your Kindle account locally and sends data directly to Notion. There is no central server, no database of your highlights, and no tracking. It's a utility in the purest sense of the word.
            </p>
            <div className="pt-4">
              <span className="text-sm font-bold text-kindle-orange uppercase tracking-widest">Best For</span>
              <p className="text-jet-black font-medium">Notion power users who value privacy, speed, and zero monthly costs.</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-32">
          <h2 className="text-4xl font-display font-bold mb-12 text-center text-jet-black">The Ultimate Comparison</h2>
          <div className="bg-white rounded-[2.5rem] border border-muted-slate/10 shadow-2xl shadow-muted-slate/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted-slate/5">
                    <th className="py-8 px-8 text-sm font-bold text-jet-black uppercase tracking-widest text-left">Feature</th>
                    <th className="py-8 px-8 text-sm font-bold text-kindle-orange uppercase tracking-widest text-center bg-kindle-orange/5">Kindle to Notion</th>
                    <th className="py-8 px-8 text-sm font-bold text-jet-black uppercase tracking-widest text-center">Readwise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted-slate/5">
                  {features.map((feature, i) => (
                    <tr key={i} className="hover:bg-muted-slate/[0.02] transition-colors">
                      <td className="py-6 px-8 font-medium text-jet-black">{feature.name}</td>
                      <td className="py-6 px-8 text-center bg-kindle-orange/[0.02]">
                        {typeof feature.kindle === 'boolean' ? (
                          feature.kindle ? <Check className="w-5 h-5 text-kindle-orange mx-auto" /> : <X className="w-5 h-5 text-muted-slate mx-auto" />
                        ) : (
                          <span className="font-bold text-kindle-orange">{feature.kindle}</span>
                        )}
                      </td>
                      <td className="py-6 px-8 text-center">
                        {typeof feature.readwise === 'boolean' ? (
                          feature.readwise ? <Check className="w-5 h-5 text-jet-black mx-auto" /> : <X className="w-5 h-5 text-muted-slate mx-auto" />
                        ) : (
                          <span className="text-carbon-gray">{feature.readwise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Content Sections to reach 2000 words */}
        <div className="space-y-32 mb-32">
          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Problem with Subscription Fatigue</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                In today's digital landscape, it seems like every utility requires a monthly subscription. From your weather app to your text editor, the costs add up quickly. Readwise, while excellent, is another $100-$190 per year. For many students, researchers, and casual readers, this is a significant expense for a service that essentially automates a copy-paste task.
              </p>
              <p>
                Kindle to Notion challenges this model. We believe that core productivity utilities should be accessible to everyone. By leveraging the power of modern browsers and the Notion API, we can provide the same high-quality sync without the need for expensive server infrastructure. This allows us to keep the tool free while maintaining a high standard of performance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">Why Local-First Software is the Future</h2>
            <div className="bg-jet-black rounded-[3rem] p-12 md:p-20 text-canvas-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-kindle-orange/5 blur-[120px] rounded-full -ml-48 -mb-48" />
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-kindle-orange">Your Data, Your Machine</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    When you use a cloud service like Readwise, you are handing over your reading history to a third party. While they have strict privacy policies, the data still exists on their servers. If they are hacked, or if they change their terms, your data is at risk.
                  </p>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Kindle to Notion uses a "local-first" approach. The extension runs in your browser and communicates directly with Amazon and Notion. Your highlights are never uploaded to our servers because we don't have any. This isn't just about privacy; it's about security and peace of mind.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-kindle-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Zero Data Collection</h4>
                      <p className="text-white/50">We don't track what you read, how much you read, or when you read. Your intellectual life is private.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-kindle-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Maximum Speed</h4>
                      <p className="text-white/50">By removing the middle-man server, we reduce latency. Your highlights sync as fast as your internet connection allows.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black text-center">How Kindle to Notion Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Authentication", desc: "The extension uses your existing browser session to securely access your Kindle Notebook. No passwords are ever shared with us." },
                { step: "02", title: "Extraction", desc: "Our engine parses the Kindle Notebook DOM in real-time, identifying books, authors, and individual highlights with high precision." },
                { step: "03", title: "Syncing", desc: "Data is formatted into Notion-ready blocks and sent directly to your Notion database via their official API." }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-3xl bg-white border border-muted-slate/10 shadow-sm">
                  <span className="text-5xl font-display font-bold text-kindle-orange/20 block mb-6">{item.step}</span>
                  <h4 className="text-xl font-bold text-jet-black mb-4">{item.title}</h4>
                  <p className="text-carbon-gray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-32 bg-jet-black rounded-[4rem] p-12 md:p-24 text-canvas-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-16 text-center tracking-tight">The Cost of Knowledge</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-kindle-orange">Readwise Pricing</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Full Plan</span>
                    <span className="text-2xl font-bold">$15.99 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Lite Plan</span>
                    <span className="text-2xl font-bold">$8.99 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Annual Total</span>
                    <span className="text-3xl font-bold text-kindle-orange">$100 - $190</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 italic leading-relaxed">
                  * Prices as of 2026. Readwise often increases prices for new subscribers. This cost repeats every single year.
                </p>
              </div>
              <div className="p-10 rounded-[2.5rem] bg-kindle-orange/20 border border-kindle-orange/30 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-kindle-orange">Kindle to Notion</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Standard Use</span>
                    <span className="text-2xl font-bold">$0.00 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Unlimited Exports</span>
                    <span className="text-2xl font-bold">$0.00 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Annual Total</span>
                    <span className="text-3xl font-bold text-white">$0.00</span>
                  </div>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  Kindle to Notion is free during beta and will remain free for core features. We believe your highlights belong to you, not a subscription service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases & Verdict */}
        <div className="mb-32 grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <h2 className="text-4xl font-display font-bold text-jet-black">Who is it for?</h2>
            <div className="space-y-10">
              {[
                { title: "The Notion Power User", desc: "If Notion is your primary tool for knowledge management, Kindle to Notion is the most direct and customizable way to build your library. We support custom database properties and perfect formatting." },
                { title: "The Privacy-Conscious Reader", desc: "If you're uncomfortable with third-party companies storing your reading habits and personal notes, our local-first approach is the only secure choice. Your data stays on your machine." },
                { title: "The Budget-Minded Scholar", desc: "Why pay $100/year for a feature that should be free? Save your money for more books and use Kindle to Notion for your exports. It's a no-brainer for students and researchers." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-kindle-orange/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-kindle-orange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-jet-black text-xl mb-2">{item.title}</h4>
                    <p className="text-carbon-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-muted-slate/10 shadow-xl shadow-muted-slate/5">
            <h3 className="text-3xl font-bold mb-8 text-jet-black font-display">The Verdict</h3>
            <p className="text-carbon-gray leading-relaxed mb-8 text-lg">
              Readwise is a great tool if you need to aggregate highlights from 10+ different sources and want a daily review email. It's a "lifestyle" app for highlights.
            </p>
            <p className="text-jet-black font-bold leading-relaxed mb-10 text-lg">
              However, if your goal is simply to get your Kindle highlights into Notion for study, work, or personal growth, Kindle to Notion is the superior choice. It's faster, more private, and completely free.
            </p>
            <div className="p-8 bg-kindle-orange/5 rounded-[2rem] border border-kindle-orange/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-kindle-orange font-bold text-sm uppercase tracking-widest">Winner</p>
                <Zap className="w-6 h-6 text-kindle-orange" />
              </div>
              <p className="text-jet-black font-bold text-3xl">Kindle to Notion</p>
              <p className="text-carbon-gray mt-4 text-sm">Best for Notion users who value privacy and simplicity.</p>
            </div>
          </div>
        </div>

        {/* Deep Dive Sections to reach 2000 words */}
        <div className="space-y-32 mb-32">
          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Notion Advantage: Why a Native Sync Matters</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                Notion is more than just a note-taking app; it's a flexible workspace that allows you to build custom databases, dashboards, and relational systems. When you sync your Kindle highlights to Notion, you aren't just storing text; you're building a structured knowledge base.
              </p>
              <p>
                Generic sync tools often treat Notion as a simple document store. They dump your highlights into a page and call it a day. Kindle to Notion is different. Because we focus exclusively on Notion, we can leverage its database features to their full potential. We support custom properties, relational links between books and authors, and a clean, block-based structure that makes your highlights easy to search, filter, and reference in other parts of your workspace.
              </p>
              <p>
                Imagine having a "Master Highlights" database where you can see every insight you've ever had, filtered by book, author, or even the date you read it. With Kindle to Notion, this isn't just a possibility; it's the default experience.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Future of Personal Knowledge Management (PKM)</h2>
            <div className="prose prose-lg max-w-none text-carbon-gray">
              <p className="text-lg leading-relaxed mb-6">
                Personal Knowledge Management is undergoing a revolution. We are moving away from centralized, siloed services and toward decentralized, user-owned systems. The "Second Brain" movement, popularized by Tiago Forte and others, emphasizes the importance of having a permanent, searchable archive of your thoughts and learnings.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                In this new era, the tools we use must be as durable as the knowledge they store. Subscription-based services introduce "platform risk"—the possibility that the service will disappear, increase its prices, or change its features in a way that breaks your workflow.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Kindle to Notion is built on the principle of durability. By using an open-source extension to move data into a platform you control (Notion), you are future-proofing your knowledge. Even if the extension were to stop being updated tomorrow, your data remains safely in your Notion account. This is the ultimate form of digital sovereignty.
              </p>
              <p className="text-lg leading-relaxed">
                As we continue to develop Kindle to Notion, we remain committed to these core values: privacy, simplicity, and community-driven development. We aren't just building a tool; we're building a bridge to a more open and accessible future for readers everywhere.
              </p>
            </div>
          </section>
        </div>

        {/* FAQ Section - Accordion Style */}
        <section className="py-32 px-6 bg-muted-slate/[0.03] rounded-[4rem] mb-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-jet-black tracking-tight">Frequently Asked Questions</h2>
              <p className="text-xl text-carbon-gray">Everything you need to know about switching</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-muted-slate/10 shadow-sm">
              {comparisonFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQIndex === index}
                  onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Exact Homepage Style */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto rounded-[4rem] bg-jet-black p-20 md:p-32 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tight text-canvas-white">
                Ready to build your<br />
                <span className="text-kindle-orange">knowledge library?</span>
              </h2>
              <p className="text-canvas-white/60 text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                Join thousands of avid readers who have automated their knowledge management. Build a permanent archive of your insights today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={onInstall}
                  className="w-full sm:w-auto bg-kindle-orange text-white px-14 py-7 rounded-2xl font-bold text-2xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-kindle-orange/20 hover:scale-105 active:scale-100"
                >
                  <Chrome className="w-8 h-8" />
                  Add to Chrome
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Sharing */}
        <div className="mt-32 text-center">
          <p className="text-sm font-bold text-jet-black uppercase tracking-widest mb-8">Spread the word</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'X', icon: XIcon, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://kindletonotion.com")}&text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨")}` },
              { name: 'Threads', icon: ThreadsIcon, color: '#000000', url: `https://threads.net/intent/post?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'Bluesky', icon: BlueskyIcon, color: '#0085ff', url: `https://bsky.app/intent/compose?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Facebook', icon: FacebookIcon, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Reddit', icon: RedditIcon, color: '#FF4500', url: `https://www.reddit.com/submit?url=${encodeURIComponent("https://kindletonotion.com")}&title=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion!")}` },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-muted-slate/10 hover:border-muted-slate/20 hover:shadow-lg transition-all group"
              >
                <platform.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <span className="font-bold text-jet-black text-sm">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClippingsComparison = ({ onBack, onInstall }: { onBack: () => void, onInstall: () => void }) => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const features = [
    { name: "Price", kindle: "100% Free", clippings: "$1.99 / month (Pro)" },
    { name: "Sync Method", kindle: "Direct Cloud Sync", clippings: "Manual File Upload" },
    { name: "Privacy", kindle: "Local-only (No servers)", clippings: "Cloud-based storage" },
    { name: "Notion Integration", kindle: "Native & Direct", clippings: "Export-based" },
    { name: "No Signup Required", kindle: true, clippings: false },
    { name: "Browser Extension", kindle: true, clippings: false },
    { name: "1-Click Export", kindle: true, clippings: false },
    { name: "Data Ownership", kindle: "You own it", clippings: "Stored on their servers" },
    { name: "Custom Templates", kindle: true, clippings: true },
    { name: "Offline Support", kindle: true, clippings: false },
    { name: "Direct Notion API", kindle: true, clippings: false },
    { name: "Zero Tracking", kindle: true, clippings: false },
  ];

  const comparisonFaqs = [
    {
      question: "Is Kindle to Notion really better than Clippings.io?",
      answer: "For Notion users, yes. Clippings.io is a great tool for general highlight management, but it often requires you to manually plug in your Kindle and upload a 'My Clippings.txt' file. Kindle to Notion automates this by pulling directly from your Amazon cloud notebook, saving you time and effort."
    },
    {
      question: "Why should I choose Kindle to Notion over a paid tool like Clippings.io?",
      answer: "The primary reasons are automation, privacy, and cost. Kindle to Notion is 100% free, processes your data locally (no cloud storage), and doesn't require you to create an account. It's a more streamlined experience for those who just want their highlights in Notion."
    },
    {
      question: "Does Clippings.io support Notion?",
      answer: "Yes, Clippings.io supports Notion, but it's part of their paid 'Pro' plan. Kindle to Notion offers a more robust, native-feeling integration with Notion for free, including custom database properties and better formatting."
    },
    {
      question: "Can I use Kindle to Notion without an internet connection?",
      answer: "You need an internet connection to sync with the Amazon cloud and the Notion API. However, unlike Clippings.io, you don't need to physically connect your Kindle to your computer to get your highlights."
    },
    {
      question: "What makes Kindle to Notion more private?",
      answer: "Clippings.io stores your highlights on their servers. Kindle to Notion is a browser extension that processes everything on your machine. Your highlights go directly from Amazon to Notion without ever touching our servers."
    },
    {
      question: "Is Kindle to Notion easy to set up?",
      answer: "Incredibly easy. Just install the extension, connect your Notion workspace, and you're ready to go. No signup, no email verification, and no complex configuration."
    },
    {
      question: "How do I migrate my highlights from Clippings.io?",
      answer: "Since your highlights are already on your Kindle account, you don't need to 'migrate' anything from Clippings.io. Just run an export with Kindle to Notion, and it will pull all your highlights directly into your Notion database."
    }
  ];

  return (
    <div className="min-h-screen bg-canvas-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-carbon-gray hover:text-jet-black mb-12 transition-colors font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>

        {/* Hero Banner */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kindle-orange/10 text-kindle-orange text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            The Best Clippings.io Alternative
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 text-jet-black tracking-tight">
            Kindle to Notion <span className="text-kindle-orange">vs</span> Clippings.io
          </h1>
          <p className="text-xl md:text-2xl text-carbon-gray max-w-3xl mx-auto leading-relaxed">
            Stop manually uploading files. Kindle to Notion is the free, automated, and private alternative for readers who want a seamless bridge to their Second Brain.
          </p>
        </div>

        {/* Overview Section */}
        <div className="prose prose-lg max-w-none mb-32 text-carbon-gray">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-jet-black font-display">A Modern Approach to Highlights</h2>
              <p className="text-lg leading-relaxed">
                Clippings.io has been a staple in the Kindle community for a long time. It's a reliable tool for extracting highlights from your Kindle's internal storage. But the way we read and manage information has changed. We no longer want to hunt for USB cables and manually upload text files.
              </p>
              <p className="text-lg leading-relaxed">
                Kindle to Notion represents the next generation of highlight management. By leveraging the Amazon cloud and a powerful browser extension, we've removed the friction from the export process. It's faster, more secure, and built specifically for the modern Notion-centric workflow.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're a student, a researcher, or a lifelong learner, Kindle to Notion provides a more elegant solution for building your digital library without the overhead of a traditional web application.
              </p>
            </div>
            <div className="bg-muted-slate/5 p-12 rounded-[3rem] border border-muted-slate/10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-jet-black mb-6">Why Switch?</h3>
              <ul className="space-y-6">
                {[
                  { title: "No More File Uploads", desc: "Sync directly from your Kindle Notebook in the cloud. No USB cables required." },
                  { title: "Native Notion Experience", desc: "Built specifically for Notion's database structure. Perfect formatting every time." },
                  { title: "Total Data Privacy", desc: "Your highlights stay on your machine. We never see, store, or track your data." },
                  { title: "Completely Free", desc: "No 'Pro' plans or hidden fees. Access all features for free during our beta." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-kindle-orange/20 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-kindle-orange" />
                    </div>
                    <div>
                      <span className="block font-bold text-jet-black">{item.title}</span>
                      <span className="text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tool Deep Dive */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-6 p-10 rounded-[2.5rem] bg-white border border-muted-slate/10 shadow-sm">
            <h2 className="text-3xl font-bold text-jet-black font-display">What is Clippings.io?</h2>
            <p className="text-carbon-gray leading-relaxed">
              Clippings.io is a web-based service that allows you to manage and export your Kindle highlights. It primarily works by having you upload the `My Clippings.txt` file from your Kindle device. It offers various export formats, including PDF, Excel, and Notion.
            </p>
            <p className="text-carbon-gray leading-relaxed">
              While it's a solid tool, the manual nature of the file upload can be a bottleneck. Furthermore, many of its best features, including the Notion integration, are locked behind a monthly subscription. It's a good general-purpose tool, but it lacks the specialized automation of a modern extension.
            </p>
            <div className="pt-4">
              <span className="text-sm font-bold text-muted-slate uppercase tracking-widest">Best For</span>
              <p className="text-jet-black font-medium">Users who prefer a web dashboard and don't mind manual file management.</p>
            </div>
          </div>
          <div className="space-y-6 p-10 rounded-[2.5rem] bg-kindle-orange/5 border border-kindle-orange/10 shadow-sm">
            <h2 className="text-3xl font-bold text-jet-black font-display">What is Kindle to Notion?</h2>
            <p className="text-carbon-gray leading-relaxed">
              Kindle to Notion is a high-performance browser extension that automates the entire sync process. It pulls your highlights directly from the Amazon cloud, meaning you never have to plug in your Kindle or touch a text file.
            </p>
            <p className="text-carbon-gray leading-relaxed">
              It's built with a "Notion-first" philosophy. Every feature is designed to make your highlights look and function perfectly within your Notion workspace. Best of all, it's 100% free and operates entirely on your local machine, ensuring your privacy is never compromised.
            </p>
            <div className="pt-4">
              <span className="text-sm font-bold text-kindle-orange uppercase tracking-widest">Best For</span>
              <p className="text-jet-black font-medium">Readers who want a fast, automated, and private way to build their Notion library.</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-32">
          <h2 className="text-4xl font-display font-bold mb-12 text-center text-jet-black">Feature-by-Feature Comparison</h2>
          <div className="bg-white rounded-[2.5rem] border border-muted-slate/10 shadow-2xl shadow-muted-slate/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted-slate/5">
                    <th className="py-8 px-8 text-sm font-bold text-jet-black uppercase tracking-widest text-left">Feature</th>
                    <th className="py-8 px-8 text-sm font-bold text-kindle-orange uppercase tracking-widest text-center bg-kindle-orange/5">Kindle to Notion</th>
                    <th className="py-8 px-8 text-sm font-bold text-jet-black uppercase tracking-widest text-center">Clippings.io</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted-slate/5">
                  {features.map((feature, i) => (
                    <tr key={i} className="hover:bg-muted-slate/[0.02] transition-colors">
                      <td className="py-6 px-8 font-medium text-jet-black">{feature.name}</td>
                      <td className="py-6 px-8 text-center bg-kindle-orange/[0.02]">
                        {typeof feature.kindle === 'boolean' ? (
                          feature.kindle ? <Check className="w-5 h-5 text-kindle-orange mx-auto" /> : <X className="w-5 h-5 text-muted-slate mx-auto" />
                        ) : (
                          <span className="font-bold text-kindle-orange">{feature.kindle}</span>
                        )}
                      </td>
                      <td className="py-6 px-8 text-center">
                        {typeof feature.clippings === 'boolean' ? (
                          feature.clippings ? <Check className="w-5 h-5 text-jet-black mx-auto" /> : <X className="w-5 h-5 text-muted-slate mx-auto" />
                        ) : (
                          <span className="text-carbon-gray">{feature.clippings}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Content Sections to reach 2000 words */}
        <div className="space-y-32 mb-32">
          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The End of the 'My Clippings.txt' Era</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                For a decade, the `My Clippings.txt` file was the only way to get highlights off a Kindle. It was a clunky, manual process that required a USB cable and a computer. Tools like Clippings.io were built to make this file easier to read and export. They did a great job for the time, but the technology has moved on.
              </p>
              <p>
                Amazon now syncs all your highlights to the cloud automatically. Kindle to Notion taps into this cloud sync, allowing you to export your highlights from any computer with a browser. You don't need your Kindle device nearby, and you certainly don't need to hunt for a cable. This is the freedom that modern readers deserve.
              </p>
              <p>
                By moving away from file-based exports, we've also eliminated the risk of data corruption or lost files. Your highlights are always safe in the cloud, and Kindle to Notion is the most efficient way to bring them into your Notion workspace.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">Why Privacy is Non-Negotiable</h2>
            <div className="bg-jet-black rounded-[3rem] p-12 md:p-20 text-canvas-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-kindle-orange/5 blur-[120px] rounded-full -ml-48 -mt-48" />
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-kindle-orange">Your Intellectual Life is Private</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    When you upload your highlights to a web app, you are trusting them with your most personal thoughts and insights. Many users don't realize that their highlights are being stored in a database that they don't control.
                  </p>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Kindle to Notion is built on a different philosophy. We believe that your highlights should never leave your machine unless they are going to a destination you've chosen (like Notion). Our extension processes everything locally. We don't have a database of your highlights because we don't want one. Your privacy is our priority.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-kindle-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Local-Only Processing</h4>
                      <p className="text-white/50">Data is processed in your browser and sent directly to Notion. No middle-man servers.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <X className="w-6 h-6 text-kindle-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">No Signup Required</h4>
                      <p className="text-white/50">We don't need your email or personal info. Just install and start syncing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Power of Native Notion Integration</h2>
            <div className="prose prose-lg max-w-none text-carbon-gray">
              <p className="text-lg leading-relaxed mb-6">
                Notion is a powerful tool, but it can be difficult to get data into it correctly. Generic export tools often produce messy results that require manual cleanup. Kindle to Notion is built specifically for Notion, meaning we understand its block-based structure and database properties.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our extension allows you to map Kindle data (like book title, author, and highlight text) to specific Notion properties. This means your database stays organized and searchable from day one. You can even use custom templates to ensure every book page looks exactly the way you want it.
              </p>
              <p className="text-lg leading-relaxed">
                Compared to the basic export features of Clippings.io, Kindle to Notion offers a much more integrated and professional experience for serious Notion users. It's the difference between a simple copy-paste and a native-feeling feature.
              </p>
            </div>
          </section>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-32 bg-jet-black rounded-[4rem] p-12 md:p-24 text-canvas-white relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mb-48" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-16 text-center tracking-tight">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-kindle-orange">Clippings.io Pricing</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Free Plan</span>
                    <span className="text-2xl font-bold">Limited <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Pro Plan</span>
                    <span className="text-2xl font-bold">$1.99 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Annual Total (Pro)</span>
                    <span className="text-3xl font-bold text-kindle-orange">$23.88</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 italic leading-relaxed">
                  * While affordable, Clippings.io still requires a recurring subscription for its best features, including Notion sync.
                </p>
              </div>
              <div className="p-10 rounded-[2.5rem] bg-kindle-orange/20 border border-kindle-orange/30 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-kindle-orange">Kindle to Notion</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Standard Use</span>
                    <span className="text-2xl font-bold">$0.00 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Unlimited Exports</span>
                    <span className="text-2xl font-bold">$0.00 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Annual Total</span>
                    <span className="text-3xl font-bold text-white">$0.00</span>
                  </div>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  Kindle to Notion is free during beta and will remain free for core features. We believe that moving your own data should never be a paid service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases & Verdict */}
        <div className="mb-32 grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <h2 className="text-4xl font-display font-bold text-jet-black">Who is it for?</h2>
            <div className="space-y-10">
              {[
                { title: "The Efficiency Seeker", desc: "If you're tired of hunting for USB cables and manually uploading text files, Kindle to Notion's cloud-based sync will save you hours of work." },
                { title: "The Privacy Advocate", desc: "If you don't want your reading history stored on a third-party server, our local-only approach is the most secure way to manage your highlights." },
                { title: "The Notion Architect", desc: "If you've built a complex Second Brain in Notion, our native integration and custom property mapping will ensure your highlights fit perfectly into your system." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-kindle-orange/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-kindle-orange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-jet-black text-xl mb-2">{item.title}</h4>
                    <p className="text-carbon-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-muted-slate/10 shadow-xl shadow-muted-slate/5">
            <h3 className="text-3xl font-bold mb-8 text-jet-black font-display">The Verdict</h3>
            <p className="text-carbon-gray leading-relaxed mb-8 text-lg">
              Clippings.io is a solid, old-school tool that works well if you prefer manual file management and don't mind a small monthly fee for Notion exports.
            </p>
            <p className="text-jet-black font-bold leading-relaxed mb-10 text-lg">
              However, for the modern reader who wants speed, privacy, and a native Notion experience, Kindle to Notion is the clear winner. It's faster, more secure, and completely free.
            </p>
            <div className="p-8 bg-kindle-orange/5 rounded-[2rem] border border-kindle-orange/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-kindle-orange font-bold text-sm uppercase tracking-widest">Winner</p>
                <Zap className="w-6 h-6 text-kindle-orange" />
              </div>
              <p className="text-jet-black font-bold text-3xl">Kindle to Notion</p>
              <p className="text-carbon-gray mt-4 text-sm">Best for Notion users who want a modern, automated workflow.</p>
            </div>
          </div>
        </div>

        {/* Deep Dive Sections to reach 2000 words */}
        <div className="space-y-32 mb-32">
          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Future of Digital Reading and Knowledge Retention</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                Reading is only half the battle. The real value of a book lies in the insights you retain and the connections you make between different ideas. In the physical world, we used highlighters and sticky notes. In the digital world, we have the opportunity to build something much more powerful: a relational knowledge base.
              </p>
              <p>
                Kindle to Notion is designed to facilitate this transition. By making it effortless to move your highlights into Notion, we are helping you build a "Second Brain" that grows with every book you read. This isn't just about storage; it's about active engagement with the material.
              </p>
              <p>
                When your highlights are in Notion, they are no longer static text. They are dynamic blocks that can be linked to other notes, projects, and tasks. This level of integration is what separates a casual reader from a serious student of life.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">Why Open Source and Community-Driven Tools Win</h2>
            <div className="prose prose-lg max-w-none text-carbon-gray">
              <p className="text-lg leading-relaxed mb-6">
                The productivity space is crowded with venture-backed startups that prioritize growth and monetization over user experience and privacy. These tools often start free, only to lock core features behind a paywall once they've captured enough users.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Kindle to Notion is different. As an open-source project, our code is transparent and our goals are aligned with the community. We aren't building a business; we're building a utility. This means we can focus on what actually matters: speed, reliability, and privacy.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                By choosing an open-source alternative, you are supporting a more open and accessible digital ecosystem. You are also ensuring that the tools you rely on are built to last, not just to be sold.
              </p>
              <p className="text-lg leading-relaxed">
                We invite you to join our community on GitHub, contribute to the code, and help us shape the future of highlight management. Together, we can build a tool that truly serves the needs of readers everywhere.
              </p>
            </div>
          </section>
        </div>

        {/* FAQ Section - Accordion Style */}
        <section className="py-32 px-6 bg-muted-slate/[0.03] rounded-[4rem] mb-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-jet-black tracking-tight">Frequently Asked Questions</h2>
              <p className="text-xl text-carbon-gray">Everything you need to know about switching</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-muted-slate/10 shadow-sm">
              {comparisonFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQIndex === index}
                  onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Exact Homepage Style */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto rounded-[4rem] bg-jet-black p-20 md:p-32 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tight text-canvas-white">
                Ready to build your<br />
                <span className="text-kindle-orange">knowledge library?</span>
              </h2>
              <p className="text-canvas-white/60 text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                Join thousands of avid readers who have automated their knowledge management. Build a permanent archive of your insights today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={onInstall}
                  className="w-full sm:w-auto bg-kindle-orange text-white px-14 py-7 rounded-2xl font-bold text-2xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-kindle-orange/20 hover:scale-105 active:scale-100"
                >
                  <Chrome className="w-8 h-8" />
                  Add to Chrome
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Sharing */}
        <div className="mt-32 text-center">
          <p className="text-sm font-bold text-jet-black uppercase tracking-widest mb-8">Spread the word</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'X', icon: XIcon, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://kindletonotion.com")}&text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨")}` },
              { name: 'Threads', icon: ThreadsIcon, color: '#000000', url: `https://threads.net/intent/post?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'Bluesky', icon: BlueskyIcon, color: '#0085ff', url: `https://bsky.app/intent/compose?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Facebook', icon: FacebookIcon, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Reddit', icon: RedditIcon, color: '#FF4500', url: `https://www.reddit.com/submit?url=${encodeURIComponent("https://kindletonotion.com")}&title=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion!")}` },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-muted-slate/10 hover:border-muted-slate/20 hover:shadow-lg transition-all group"
              >
                <platform.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <span className="font-bold text-jet-black text-sm">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SnippetComparison = ({ onBack, onInstall }: { onBack: () => void, onInstall: () => void }) => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const features = [
    { name: "Price", kindle: "100% Free", snippet: "$2.99 / month" },
    { name: "Privacy", kindle: "Local-only (No servers)", snippet: "Cloud-based storage" },
    { name: "Notion Integration", kindle: "Native & Direct", snippet: "Supported (Paid)" },
    { name: "Signup Required", kindle: false, snippet: true },
    { name: "Open Source", kindle: true, snippet: false },
    { name: "Browser Extension", kindle: true, snippet: true },
    { name: "1-Click Export", kindle: true, snippet: true },
    { name: "Data Ownership", kindle: "You own it", snippet: "Stored on their servers" },
    { name: "Custom Templates", kindle: true, snippet: true },
    { name: "Offline Support", kindle: true, snippet: false },
    { name: "Direct Notion API", kindle: true, snippet: false },
    { name: "Zero Tracking", kindle: true, snippet: false },
  ];

  const comparisonFaqs = [
    {
      question: "Is Kindle to Notion really better than Snippet?",
      answer: "For Notion users who value privacy and simplicity, yes. Snippet is a broader tool for web and Kindle highlights, but it requires a subscription for Notion sync and stores your data on their servers. Kindle to Notion is specialized for the Kindle-to-Notion pipeline, offering it for free and processing everything locally."
    },
    {
      question: "Why should I choose Kindle to Notion over Snippet?",
      answer: "The primary reasons are privacy, cost, and native integration. Kindle to Notion doesn't require an account, is completely free, and sends data directly to Notion without any middle-man servers. If you live in Notion, it's the more direct and secure choice."
    },
    {
      question: "Does Snippet support Notion?",
      answer: "Yes, Snippet supports Notion, but it's part of their paid subscription. Kindle to Notion provides a more robust and customizable Notion integration for free."
    },
    {
      question: "Can I use Kindle to Notion without an internet connection?",
      answer: "You need an internet connection to sync with the Amazon cloud and the Notion API. However, since we don't have our own servers, there's one less failure point compared to cloud-based tools like Snippet."
    },
    {
      question: "What makes Kindle to Notion more private?",
      answer: "Snippet stores your highlights on their servers. Kindle to Notion is a browser extension that processes everything on your machine. Your highlights go directly from Amazon to Notion without ever touching our servers."
    },
    {
      question: "Is Kindle to Notion easy to set up?",
      answer: "Incredibly easy. Just install the extension, connect your Notion workspace, and you're ready to go. No signup, no email verification, and no complex configuration."
    },
    {
      question: "How do I migrate my highlights from Snippet?",
      answer: "Since your highlights are already on your Kindle account, you don't need to 'migrate' anything from Snippet. Just run an export with Kindle to Notion, and it will pull all your highlights directly into your Notion database."
    }
  ];

  return (
    <div className="min-h-screen bg-canvas-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-carbon-gray hover:text-jet-black mb-12 transition-colors font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </button>

        {/* Hero Banner */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kindle-orange/10 text-kindle-orange text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            The Best Snippet Alternative
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 text-jet-black tracking-tight">
            Kindle to Notion <span className="text-kindle-orange">vs</span> Snippet
          </h1>
          <p className="text-xl md:text-2xl text-carbon-gray max-w-3xl mx-auto leading-relaxed">
            Stop paying for your own highlights. Kindle to Notion is the free, private, and open-source alternative for readers who want a direct bridge to Notion.
          </p>
        </div>

        {/* Overview Section */}
        <div className="prose prose-lg max-w-none mb-32 text-carbon-gray">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-jet-black font-display">A Focused Solution for Notion Users</h2>
              <p className="text-lg leading-relaxed">
                Snippet (gosnippet.com) is a versatile tool that allows you to capture highlights from the web and Kindle. It's a great all-in-one solution for some. However, for users who primarily use Notion as their knowledge base, Snippet introduces unnecessary complexity and cost.
              </p>
              <p className="text-lg leading-relaxed">
                Kindle to Notion was built with a singular focus: to be the best possible bridge between Kindle and Notion. By narrowing our scope, we've been able to create a tool that is faster, more private, and completely free.
              </p>
              <p className="text-lg leading-relaxed">
                We believe that your reading notes are your personal intellectual property. You shouldn't have to pay a monthly fee to access them in your own digital workspace. Kindle to Notion gives you that freedom.
              </p>
            </div>
            <div className="bg-muted-slate/5 p-12 rounded-[3rem] border border-muted-slate/10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-jet-black mb-6">Why Kindle to Notion?</h3>
              <ul className="space-y-6">
                {[
                  { title: "Native Notion Integration", desc: "Built specifically for Notion's database structure. No middle-man servers." },
                  { title: "No Signup Required", desc: "We don't want your email or personal info. Just install and start syncing." },
                  { title: "100% Local Processing", desc: "Your highlights are processed in your browser. Privacy is our foundation." },
                  { title: "Free During Beta", desc: "Access all features for free. We're building for the community, not for profit." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-kindle-orange/20 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-kindle-orange" />
                    </div>
                    <div>
                      <span className="block font-bold text-jet-black">{item.title}</span>
                      <span className="text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tool Deep Dive */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-6 p-10 rounded-[2.5rem] bg-white border border-muted-slate/10 shadow-sm">
            <h2 className="text-3xl font-bold text-jet-black font-display">What is Snippet?</h2>
            <p className="text-carbon-gray leading-relaxed">
              Snippet is a highlight management tool that supports both web and Kindle highlights. It offers a web dashboard where you can organize your notes and export them to various platforms, including Notion.
            </p>
            <p className="text-carbon-gray leading-relaxed">
              While Snippet is a capable tool, it follows a traditional SaaS model. This means your data is stored on their servers, and you need to pay a monthly subscription to unlock many of its best features, including the Notion sync. For many, this is an unnecessary recurring cost.
            </p>
            <div className="pt-4">
              <span className="text-sm font-bold text-muted-slate uppercase tracking-widest">Best For</span>
              <p className="text-jet-black font-medium">Users who need to capture highlights from many different web sources.</p>
            </div>
          </div>
          <div className="space-y-6 p-10 rounded-[2.5rem] bg-kindle-orange/5 border border-kindle-orange/10 shadow-sm">
            <h2 className="text-3xl font-bold text-jet-black font-display">What is Kindle to Notion?</h2>
            <p className="text-carbon-gray leading-relaxed">
              Kindle to Notion is a specialized utility designed for one thing: getting your Kindle highlights into Notion as efficiently as possible. It's a browser extension that works locally, ensuring maximum privacy and speed.
            </p>
            <p className="text-carbon-gray leading-relaxed">
              Because it's open-source and local-first, it eliminates the need for accounts, subscriptions, and cloud storage. It's a direct, secure, and free bridge that puts you in total control of your reading data.
            </p>
            <div className="pt-4">
              <span className="text-sm font-bold text-kindle-orange uppercase tracking-widest">Best For</span>
              <p className="text-jet-black font-medium">Notion power users who want a free, private, and automated Kindle sync.</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-32">
          <h2 className="text-4xl font-display font-bold mb-12 text-center text-jet-black">Feature-by-Feature Comparison</h2>
          <div className="bg-white rounded-[2.5rem] border border-muted-slate/10 shadow-2xl shadow-muted-slate/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted-slate/5">
                    <th className="py-8 px-8 text-sm font-bold text-jet-black uppercase tracking-widest text-left">Feature</th>
                    <th className="py-8 px-8 text-sm font-bold text-kindle-orange uppercase tracking-widest text-center bg-kindle-orange/5">Kindle to Notion</th>
                    <th className="py-8 px-8 text-sm font-bold text-jet-black uppercase tracking-widest text-center">Snippet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted-slate/5">
                  {features.map((feature, i) => (
                    <tr key={i} className="hover:bg-muted-slate/[0.02] transition-colors">
                      <td className="py-6 px-8 font-medium text-jet-black">{feature.name}</td>
                      <td className="py-6 px-8 text-center bg-kindle-orange/[0.02]">
                        {typeof feature.kindle === 'boolean' ? (
                          feature.kindle ? <Check className="w-5 h-5 text-kindle-orange mx-auto" /> : <X className="w-5 h-5 text-muted-slate mx-auto" />
                        ) : (
                          <span className="font-bold text-kindle-orange">{feature.kindle}</span>
                        )}
                      </td>
                      <td className="py-6 px-8 text-center">
                        {typeof feature.snippet === 'boolean' ? (
                          feature.snippet ? <Check className="w-5 h-5 text-jet-black mx-auto" /> : <X className="w-5 h-5 text-muted-slate mx-auto" />
                        ) : (
                          <span className="text-carbon-gray">{feature.snippet}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Content Sections to reach 2000 words */}
        <div className="space-y-32 mb-32">
          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Hidden Cost of 'All-in-One' Tools</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                Tools like Snippet attempt to be a central hub for all your highlights. While this sounds convenient, it often leads to a "jack of all trades, master of none" scenario. For Notion users, this means a sync process that isn't quite optimized for Notion's unique database features. When a tool tries to support dozens of export destinations, the specific nuances of each one are often lost.
              </p>
              <p>
                Furthermore, the cost of maintaining a complex, multi-source cloud platform is passed on to the user. You aren't just paying for the Kindle sync; you're paying for the entire infrastructure, the marketing team, and the profit margins of a venture-backed startup. Kindle to Notion avoids this by focusing on one thing and doing it perfectly. By staying local, we eliminate the overhead and pass the savings (100% of them) on to you.
              </p>
              <p>
                We believe that the best tools are the ones that fit seamlessly into your existing workflow without adding friction or cost. Kindle to Notion is that tool for the Kindle-to-Notion pipeline. It doesn't try to be your web clipper or your read-it-later app. It just wants to be the most reliable bridge for your Kindle highlights.
              </p>
              <p>
                In the modern productivity landscape, we are seeing a shift towards "unbundling." Users are moving away from bloated all-in-one platforms in favor of specialized, high-performance utilities that do one job exceptionally well. Kindle to Notion is at the forefront of this movement, providing a streamlined experience that respects your time and your wallet.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">Why Privacy is the Ultimate Feature</h2>
            <div className="bg-jet-black rounded-[3rem] p-12 md:p-20 text-canvas-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-kindle-orange/5 blur-[120px] rounded-full -mr-48 -mt-48" />
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-kindle-orange">Your Thoughts, Your Control</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Every highlight you make is a reflection of your interests, your studies, and your personal growth. This data is incredibly personal. When you use a cloud-based tool like Snippet, you are entrusting this data to a third party. You are essentially giving them a map of your intellectual life.
                  </p>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Kindle to Notion is built on the principle of digital sovereignty. By processing your data locally and sending it directly to Notion, we ensure that you are the only one with access to your highlights. No servers, no tracking, no risk. This is the highest level of privacy possible in a digital tool.
                  </p>
                  <p className="text-white/70 text-lg leading-relaxed">
                    In an era where data breaches are common and user data is often sold to the highest bidder, local-first software is not just a preference—it's a necessity. We believe that your reading habits should be your business, and no one else's.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-kindle-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Local-First Architecture</h4>
                      <p className="text-white/50">Your data never touches our servers. It stays on your machine, where it belongs. This eliminates the risk of server-side data leaks.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <X className="w-6 h-6 text-kindle-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Zero Data Collection</h4>
                      <p className="text-white/50">We don't track your reading habits or your personal info. Your intellectual life is private and stays that way.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Impact of Subscription Fatigue</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                We live in the age of the subscription. From entertainment to productivity, every tool seems to want a piece of your monthly budget. While $2.99 or $9.99 might seem small in isolation, the cumulative effect of these recurring costs is significant. It's what we call "subscription fatigue."
              </p>
              <p>
                Knowledge management should be a lifelong pursuit, not a monthly expense. By making Kindle to Notion free, we are removing the financial barrier to building a digital library. You shouldn't have to decide which tools to keep based on your monthly cash flow.
              </p>
              <p>
                Our commitment to staying free is rooted in the belief that basic data portability should be a right, not a service. Moving your own highlights from one platform (Amazon) to another (Notion) is a fundamental operation that shouldn't be monetized.
              </p>
              <p>
                By choosing Kindle to Notion, you are opting out of the subscription cycle. You are choosing a tool that respects your financial independence as much as your data privacy. This allows you to invest your resources where they matter most: in more books and better learning materials.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">Building a Sustainable Knowledge Base</h2>
            <div className="prose prose-lg max-w-none text-carbon-gray">
              <p className="text-lg leading-relaxed mb-6">
                A knowledge base is only as good as the data it contains. To build a truly valuable "Second Brain," you need a reliable and consistent way to capture information. Subscription-based tools introduce a point of failure: if you stop paying, you lose the automation. This can lead to gaps in your knowledge base and a fragmented intellectual history.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Kindle to Notion provides a sustainable solution. Because it's free and open-source, you can rely on it for the long term. Your knowledge management workflow shouldn't be dependent on a monthly budget or the survival of a startup's business model.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                By using a direct, native-feeling sync, you are also ensuring that your data is formatted correctly and consistently. This makes it easier to search, filter, and reference your highlights in the future. We leverage the Notion API to its fullest extent, ensuring that your highlights are not just text, but structured data that can be used in complex databases.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                As we continue to improve Kindle to Notion, we remain committed to the values of the open web: privacy, accessibility, and user empowerment. We aren't just building a tool; we're building a more open future for readers. We believe that the tools we use to think should be as open and accessible as the ideas they help us manage.
              </p>
              <p className="text-lg leading-relaxed">
                In the long run, the most valuable knowledge bases will be the ones built on open standards and private data. Kindle to Notion is designed to help you build exactly that. It's a tool for the long-term thinker, the lifelong learner, and the digital gardener who wants to see their insights flourish over decades, not just months.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">The Philosophy of the Digital Garden</h2>
            <div className="grid md:grid-cols-2 gap-12 text-carbon-gray leading-relaxed text-lg">
              <p>
                The concept of a "Digital Garden" is a metaphor for a personal space on the web where you cultivate ideas over time. Unlike a blog, which is chronological and ephemeral, a digital garden is topological and evergreen. It's a place where notes are linked, refined, and grown.
              </p>
              <p>
                Kindle to Notion is the perfect tool for the digital gardener. By automating the "planting" of your highlights into Notion, we give you more time for the "cultivation"—the linking, the summarizing, and the synthesizing of ideas.
              </p>
              <p>
                When you aren't bogged down by the mechanics of data entry, you can focus on the higher-level work of thinking. This is where the real breakthroughs happen. This is where a collection of highlights becomes a body of knowledge.
              </p>
              <p>
                We believe that everyone should have the tools to build their own digital garden. By providing a free and private bridge between Kindle and Notion, we are lowering the barrier to entry for this powerful way of working and thinking.
              </p>
            </div>
          </section>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-32 bg-jet-black rounded-[4rem] p-12 md:p-24 text-canvas-white relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mb-48" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-16 text-center tracking-tight">Simple, Honest Pricing</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-kindle-orange">Snippet Pricing</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Monthly Plan</span>
                    <span className="text-2xl font-bold">$2.99 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Annual Plan</span>
                    <span className="text-2xl font-bold">$29.99 <span className="text-sm font-normal text-white/40">/ yr</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Annual Total</span>
                    <span className="text-3xl font-bold text-kindle-orange">$29.99</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 italic leading-relaxed">
                  * While Snippet is more affordable than Readwise, it still requires a recurring subscription for Notion sync and cloud storage.
                </p>
              </div>
              <div className="p-10 rounded-[2.5rem] bg-kindle-orange/20 border border-kindle-orange/30 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-kindle-orange">Kindle to Notion</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Standard Use</span>
                    <span className="text-2xl font-bold">$0.00 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/60">Unlimited Exports</span>
                    <span className="text-2xl font-bold">$0.00 <span className="text-sm font-normal text-white/40">/ mo</span></span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold">Annual Total</span>
                    <span className="text-3xl font-bold text-white">$0.00</span>
                  </div>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  Kindle to Notion is free during beta and will remain free for core features. We believe that moving your own data should never be a paid service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases & Verdict */}
        <div className="mb-32 grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <h2 className="text-4xl font-display font-bold text-jet-black">Who is it for?</h2>
            <div className="space-y-10">
              {[
                { title: "The Notion Power User", desc: "If Notion is your primary tool for knowledge management, Kindle to Notion is the most direct and customizable way to build your library." },
                { title: "The Privacy-Conscious Reader", desc: "If you're uncomfortable with third-party companies storing your reading habits, our local-first approach is the only secure choice." },
                { title: "The Budget-Minded Scholar", desc: "Why pay for a feature that should be free? Save your money for more books and use Kindle to Notion for your exports." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-kindle-orange/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-kindle-orange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-jet-black text-xl mb-2">{item.title}</h4>
                    <p className="text-carbon-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-muted-slate/10 shadow-xl shadow-muted-slate/5">
            <h3 className="text-3xl font-bold mb-8 text-jet-black font-display">The Verdict</h3>
            <p className="text-carbon-gray leading-relaxed mb-8 text-lg">
              Snippet is a good tool if you need to capture highlights from many different web sources and want a central web dashboard.
            </p>
            <p className="text-jet-black font-bold leading-relaxed mb-10 text-lg">
              However, for the Notion user who wants a fast, private, and free way to sync their Kindle highlights, Kindle to Notion is the superior choice. It's more direct, more secure, and costs nothing.
            </p>
            <div className="p-8 bg-kindle-orange/5 rounded-[2rem] border border-kindle-orange/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-kindle-orange font-bold text-sm uppercase tracking-widest">Winner</p>
                <Zap className="w-6 h-6 text-kindle-orange" />
              </div>
              <p className="text-jet-black font-bold text-3xl">Kindle to Notion</p>
              <p className="text-carbon-gray mt-4 text-sm">Best for Notion users who value privacy and simplicity.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section - Accordion Style */}
        <section className="py-32 px-6 bg-muted-slate/[0.03] rounded-[4rem] mb-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-jet-black tracking-tight">Frequently Asked Questions</h2>
              <p className="text-xl text-carbon-gray">Everything you need to know about switching</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-muted-slate/10 shadow-sm">
              {comparisonFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQIndex === index}
                  onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Exact Homepage Style */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto rounded-[4rem] bg-jet-black p-20 md:p-32 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tight text-canvas-white">
                Ready to build your<br />
                <span className="text-kindle-orange">knowledge library?</span>
              </h2>
              <p className="text-canvas-white/60 text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                Join thousands of avid readers who have automated their knowledge management. Build a permanent archive of your insights today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={onInstall}
                  className="w-full sm:w-auto bg-kindle-orange text-white px-14 py-7 rounded-2xl font-bold text-2xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-kindle-orange/20 hover:scale-105 active:scale-100"
                >
                  <Chrome className="w-8 h-8" />
                  Add to Chrome
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Sharing */}
        <div className="mt-32 text-center">
          <p className="text-sm font-bold text-jet-black uppercase tracking-widest mb-8">Spread the word</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'X', icon: XIcon, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://kindletonotion.com")}&text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨")}` },
              { name: 'Threads', icon: ThreadsIcon, color: '#000000', url: `https://threads.net/intent/post?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'Bluesky', icon: BlueskyIcon, color: '#0085ff', url: `https://bsky.app/intent/compose?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Facebook', icon: FacebookIcon, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Reddit', icon: RedditIcon, color: '#FF4500', url: `https://www.reddit.com/submit?url=${encodeURIComponent("https://kindletonotion.com")}&title=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion!")}` },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-muted-slate/10 hover:border-muted-slate/20 hover:shadow-lg transition-all group"
              >
                <platform.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <span className="font-bold text-jet-black text-sm">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingShare = () => {
  const shareUrl = "https://kindletonotion.com";
  const shareText = "Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨";

  const links = [
    {
      name: 'X',
      icon: XIcon,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'text-black'
    },
    {
      name: 'Threads',
      icon: ThreadsIcon,
      url: `https://threads.net/intent/post?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: 'text-black'
    },
    {
      name: 'Bluesky',
      icon: BlueskyIcon,
      url: `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: 'text-[#0085ff]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'text-[#0077B5]'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-[#1877F2]'
    },
    {
      name: 'Reddit',
      icon: RedditIcon,
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      color: 'text-[#FF4500]'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 bottom-32 z-50 hidden lg:flex flex-col gap-2"
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white shadow-lg border border-muted-slate/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          title={`Share on ${link.name}`}
        >
          <link.icon className={`w-4 h-4 ${link.color}`} />
        </a>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'welcome' | 'privacy' | 'terms' | 'readwise-comparison' | 'clippings-comparison' | 'snippet-comparison' | 'blog' | 'changelog'>('landing');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/alternative/readwise.html' || path === '/alternative/readwise') {
      setCurrentPage('readwise-comparison');
    } else if (path === '/alternative/clippings.html' || path === '/alternative/clippings') {
      setCurrentPage('clippings-comparison');
    } else if (path === '/alternative/snippet.html' || path === '/alternative/snippet') {
      setCurrentPage('snippet-comparison');
    }
  }, []);

  useEffect(() => {
    if (currentPage === 'readwise-comparison') {
      document.title = "Kindle to Notion vs Readwise: Best Free Readwise Alternative (2026)";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Looking for the best free Readwise alternative? Kindle to Notion is the top-rated free, private, and open-source way to export Kindle highlights to Notion. Compare Kindle to Notion vs Readwise and discover the best kindle highlight export tool for free.');
      }
    } else if (currentPage === 'clippings-comparison') {
      document.title = "Kindle to Notion vs Clippings.io: Best Free Clippings.io Alternative (2026)";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Looking for the best free Clippings.io alternative? Kindle to Notion is the top-rated free, private, and open-source way to export Kindle highlights to Notion. Compare Kindle to Notion vs Clippings.io and discover the best kindle highlight export tool for free.');
      }
    } else if (currentPage === 'snippet-comparison') {
      document.title = "Kindle to Notion vs Snippet: Best Free Snippet Alternative (2026)";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Looking for the best free Snippet alternative? Kindle to Notion is the top-rated free, private, and open-source way to export Kindle highlights to Notion. Compare Kindle to Notion vs Snippet and discover the best kindle highlight export tool for free.');
      }
    } else {
      document.title = "Kindle To Notion - Export Highlights in 1 Click";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Export your Kindle highlights to Notion in one click. The best free and private bridge between Kindle and Notion.');
      }
    }
  }, [currentPage]);

  const [browserInfo, setBrowserInfo] = useState({ name: "Chrome", icon: Chrome });
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is it really free?",
      answer: "Yes! Kindle to Notion is 100% free and open source. No premium tiers, no hidden costs, no subscriptions."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. Your data never leaves your device. We don't have servers, don't collect data, and can't see your highlights. It's just you and Notion."
    },
    {
      question: "Do I need a Notion account?",
      answer: "Yes, you need a free Notion account. Notion is where your highlights will be saved."
    },
    {
      question: "Does it work with my Amazon region?",
      answer: "We support 12 regions: US, UK, Canada, Germany, France, Spain, Italy, Japan, Australia, India, Mexico, and Brazil."
    },
    {
      question: "What if I already exported a book?",
      answer: "No problem! Re-export anytime. The extension detects existing highlights and only adds new ones — no duplicates."
    },
    {
      question: "What browsers are supported?",
      answer: "We support all Chromium-based browsers including Chrome, Brave, Arc, Edge, and Orion. We also have a native extension for Firefox."
    },
    {
      question: "Can I group highlights by chapter?",
      answer: "Yes! As of v1.7.0, Kindle to Notion automatically groups your highlights by chapter and includes precise page/location references."
    },
    {
      question: "How do I connect my Notion database?",
      answer: "You can use our seamless 1-click OAuth integration (v1.8.0) or set up a manual internal integration. Both methods are secure and easy."
    },
    {
      question: "Is there a limit to how many highlights I can export?",
      answer: "No. Kindle to Notion has no artificial limits. Whether you have 10 highlights or 10,000, you can export them all for free."
    }
  ];

  useEffect(() => {
    const updateMeta = () => {
      let title = "Kindle To Notion | One-Click Kindle Highlight Export to Notion";
      let description = "Bridge your Kindle reading ecosystem with Notion. Extract highlights, notes, and metadata directly into a structured Notion database with one click. Free, private, and fast.";

      switch (currentPage) {
        case 'welcome':
          title = "Welcome to Kindle To Notion | Setup Guide";
          description = "Get started with Kindle To Notion. Follow our simple setup guide to start exporting your Kindle highlights to Notion in seconds.";
          break;
        case 'privacy':
          title = "Privacy Policy | Kindle To Notion";
          description = "Our commitment to your privacy. Kindle To Notion is a local-first extension that never tracks your data or stores your highlights on our servers.";
          break;
        case 'terms':
          title = "Terms of Service | Kindle To Notion";
          description = "Terms and conditions for using Kindle To Notion. Simple, transparent, and user-focused.";
          break;
        case 'readwise-comparison':
          title = "Kindle To Notion vs Readwise | The Free, Local-First Alternative";
          description = "Compare Kindle To Notion and Readwise. Discover why a free, local-first, and direct Notion integration might be the better choice for your reading workflow.";
          break;
        case 'clippings-comparison':
          title = "Kindle To Notion vs Clippings.io | Modern Kindle Export Alternative";
          description = "Discover a better way to export Kindle highlights. Compare Kindle To Notion with Clippings.io and see the benefits of direct Notion sync.";
          break;
        case 'snippet-comparison':
          title = "Kindle To Notion vs Snippet | The Ultimate Kindle to Notion Alternative";
          description = "Looking for a Snippet alternative? Compare Kindle To Notion and Snippet. Learn why local-only processing and direct Notion API access matter.";
          break;
      }

      document.title = title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        const baseUrl = "https://ais-dev-fkxiylxhbqrmrlqcp4ggjk-604092565861.us-east1.run.app";
        let path = "/";
        switch (currentPage) {
          case 'welcome': path = "/welcome"; break;
          case 'privacy': path = "/privacy"; break;
          case 'terms': path = "/terms"; break;
          case 'readwise-comparison': path = "/alternative/readwise.html"; break;
          case 'clippings-comparison': path = "/alternative/clippings.html"; break;
          case 'snippet-comparison': path = "/alternative/snippet.html"; break;
        }
        canonical.setAttribute('href', baseUrl + path);
      }
    };

    updateMeta();
  }, [currentPage]);

  useEffect(() => {
    const ua = navigator.userAgent;

    // Detection order is important as some browsers include other browser names in UA
    if (/Edg\//i.test(ua)) {
      setBrowserInfo({ name: "Edge", icon: Globe });
    } else if (/Firefox/i.test(ua)) {
      setBrowserInfo({ name: "Firefox", icon: Globe });
    } else if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) {
      setBrowserInfo({ name: "Chrome", icon: Chrome });
    } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
      setBrowserInfo({ name: "Safari", icon: Globe });
    } else {
      // Default fallback
      setBrowserInfo({ name: "Chrome", icon: Chrome });
    }
  }, []);

  const BrowserIcon = browserInfo.icon;

  return (
    <div className="min-h-screen bg-canvas-white text-jet-black font-sans selection:bg-kindle-orange/20">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-muted-slate/10 bg-canvas-white/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main navigation">
          <button
            onClick={() => {
              setCurrentPage('landing');
              window.scrollTo(0, 0);
              window.history.pushState({}, '', '/');
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg p-1"
            aria-label="KindleToNotion Home"
          >
            <div className="w-10 h-10 bg-kindle-orange rounded-xl flex items-center justify-center shadow-lg shadow-kindle-orange/20">
              <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-jet-black">KindleToNotion</span>
          </button>
          <div className="hidden md:flex items-center gap-10">
            {currentPage === 'landing' && (
              <div className="flex items-center gap-10 text-sm font-semibold text-carbon-gray">
                <a href="#features" className="hover:text-kindle-orange transition-colors focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-2 py-1">Features</a>
                <a href="#how-it-works" className="hover:text-kindle-orange transition-colors focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-2 py-1">Workflow</a>
                <a href="#faq" className="hover:text-kindle-orange transition-colors focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-2 py-1">FAQ</a>
              </div>
            )}
            <button
              onClick={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
              className="flex items-center gap-2 px-6 py-2.5 bg-kindle-orange text-white text-sm font-bold rounded-xl shadow-lg shadow-kindle-orange/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all focus:ring-2 focus:ring-offset-2 focus:ring-kindle-orange"
            >
              <BrowserIcon className="w-4 h-4" aria-hidden="true" />
              Get Extension
            </button>
          </div>
        </nav>
      </header>

      {currentPage === 'welcome' ? (
        <WelcomePage onBack={() => setCurrentPage('landing')} />
      ) : currentPage === 'blog' ? (
        <BlogPage onBack={() => {
          setCurrentPage('landing');
          window.scrollTo(0, 0);
          window.history.pushState({}, '', '/');
        }} />
      ) : currentPage === 'changelog' ? (
        <ChangelogPage onBack={() => {
          setCurrentPage('landing');
          window.scrollTo(0, 0);
          window.history.pushState({}, '', '/');
        }} />
      ) : currentPage === 'privacy' || currentPage === 'terms' ? (
        <LegalPage type={currentPage} onBack={() => setCurrentPage('landing')} />
      ) : currentPage === 'readwise-comparison' ? (
        <ReadwiseComparison
          onBack={() => {
            setCurrentPage('landing');
            window.scrollTo(0, 0);
            window.history.pushState({}, '', '/');
          }}
          onInstall={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
        />
      ) : currentPage === 'clippings-comparison' ? (
        <ClippingsComparison
          onBack={() => {
            setCurrentPage('landing');
            window.scrollTo(0, 0);
            window.history.pushState({}, '', '/');
          }}
          onInstall={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
        />
      ) : currentPage === 'snippet-comparison' ? (
        <SnippetComparison
          onBack={() => {
            setCurrentPage('landing');
            window.scrollTo(0, 0);
            window.history.pushState({}, '', '/');
          }}
          onInstall={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
        />
      ) : (
        <main>
          {/* Hero Section */}
          <section className="pt-48 pb-24 px-6 relative overflow-hidden" aria-labelledby="hero-title">
            <MeshBackground />
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 -mb-4 rounded-full bg-kindle-orange/5 border border-kindle-orange/10 text-kindle-orange text-xs font-bold tracking-widest uppercase z-10">
                    <Zap className="w-3 h-3" aria-hidden="true" />
                    v1.9.2 • Open Source & Free
                  </div>
                  <h1 id="hero-title" className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.05] text-jet-black">
                    Export Kindle Highlights to<br />
                    <span className="text-kindle-orange">Notion in 1 Click</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-carbon-gray max-w-2xl mb-12 leading-relaxed">
                    Stop losing your best ideas. Send your Kindle highlights to Notion with one click. No more manual typing. Just your notes, perfectly organized.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <button
                      onClick={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
                      className="w-full sm:w-auto bg-kindle-orange text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[0px]"
                    >
                      <BrowserIcon className="w-6 h-6" />
                      Add to {browserInfo.name}
                    </button>
                  </div>

                  <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-jet-black/70">
                      <ShieldCheck className="w-5 h-5 text-kindle-orange" />
                      100% Private - No Data Collection
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-jet-black/70">
                      <Lock className="w-5 h-5 text-kindle-orange" />
                      Encrypted Local Storage
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-jet-black/70">
                      <Globe className="w-5 h-5 text-kindle-orange" />
                      Multi-Region Support
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col items-center">
                    <TrustBadges />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative flex flex-col items-center mt-32 w-full"
                >
                  <div className="text-center mb-0 max-w-2xl mx-auto z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kindle-orange/10 text-kindle-orange text-[10px] font-bold tracking-widest uppercase mb-2">
                      <Layers className="w-3 h-3" />
                      Visual Knowledge Hub
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-jet-black tracking-tight leading-tight">
                      All your book insights living inside <br className="hidden md:block" />
                      <span className="text-kindle-orange">your second brain.</span>
                    </h2>
                  </div>
                  <div className="relative w-full max-w-4xl flex items-center justify-center -mt-8">
                    <SpinningBooks />
                  </div>
                </motion.div>
              </div>

              <SocialProof />
            </div>
          </section>

          {/* Direct Value Section */}
          <section className="py-40 px-6 bg-muted-slate/[0.03]">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-jet-black tracking-tight">
                  Read it once.<br />
                  <span className="text-kindle-orange">Keep it forever.</span>
                </h2>
                <p className="text-xl md:text-2xl text-carbon-gray mb-16 leading-relaxed max-w-2xl mx-auto">
                  Your Kindle notes are trapped. We set them free. Send everything to Notion automatically so you can actually use what you read.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 text-left">
                  <div className="p-10 rounded-3xl bg-white border border-muted-slate/10">
                    <div className="text-kindle-orange font-bold text-sm mb-4 uppercase tracking-widest">The Old Way</div>
                    <p className="text-carbon-gray text-base italic leading-relaxed">"Copying and pasting by hand. It's slow, boring, and you'll probably never do it."</p>
                  </div>
                  <div className="p-10 rounded-3xl bg-jet-black text-canvas-white shadow-xl">
                    <div className="text-kindle-orange font-bold text-sm mb-4 uppercase tracking-widest">The KindleToNotion Way</div>
                    <p className="text-canvas-white/80 text-base leading-relaxed">"One click and you're done. Your notes are safe in Notion, easy to find, and ready to use."</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="py-40 px-6 bg-muted-slate/[0.02]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-jet-black tracking-tight">Everything you need.</h2>
                <p className="text-xl md:text-2xl text-carbon-gray">Simple, fast, and built for people who love to read.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="p-10 rounded-[2rem] bg-white border border-muted-slate/10 hover:border-kindle-orange/30 transition-all group shadow-sm hover:shadow-xl flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-kindle-orange/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Brain className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Remember Everything</h3>
                  <p className="text-carbon-gray leading-relaxed flex-grow">We show you your best notes every day so you never forget what you read. It's like a workout for your brain.</p>
                </div>

                {/* Feature 2 */}
                <div className="p-10 rounded-[2rem] bg-white border border-muted-slate/10 hover:border-kindle-orange/30 transition-all group shadow-sm hover:shadow-xl flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-kindle-orange/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Quote className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Keep Your Colors</h3>
                  <p className="text-carbon-gray leading-relaxed flex-grow">Your blue, yellow, and red highlights look exactly the same in Notion.</p>
                </div>

                {/* Feature 3 */}
                <div className="p-10 rounded-[2rem] bg-white border border-muted-slate/10 hover:border-kindle-orange/30 transition-all group shadow-sm hover:shadow-xl flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-kindle-orange/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <StickyNote className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Keep Your Notes</h3>
                  <p className="text-carbon-gray leading-relaxed flex-grow">Your personal thoughts are saved right next to your highlights.</p>
                </div>

                {/* Feature 4 */}
                <div className="p-10 rounded-[2rem] bg-white border border-muted-slate/10 hover:border-kindle-orange/30 transition-all group shadow-sm hover:shadow-xl flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-kindle-orange/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Download className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Export All at Once</h3>
                  <p className="text-carbon-gray leading-relaxed flex-grow">Send your whole library to Notion with a single click.</p>
                </div>

                {/* Feature 5 */}
                <div className="p-10 rounded-[2rem] bg-white border border-muted-slate/10 hover:border-kindle-orange/30 transition-all group shadow-sm hover:shadow-xl flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-kindle-orange/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Globe className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Works Everywhere</h3>
                  <p className="text-carbon-gray leading-relaxed flex-grow">Supports Amazon stores in the US, UK, Canada, Brazil, India, Japan, and more.</p>
                </div>

                {/* Feature 6 */}
                <div className="p-10 rounded-[2rem] bg-white border border-muted-slate/10 hover:border-kindle-orange/30 transition-all group shadow-sm hover:shadow-xl flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-kindle-orange/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Complete Data</h3>
                  <p className="text-carbon-gray leading-relaxed flex-grow">We export everything you need: Author name, Book Title, and Book cover. Your Notion database will look like a professional library.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="py-40 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-jet-black tracking-tight">Built for People Who Love to Read</h2>
                <p className="text-xl md:text-2xl text-carbon-gray max-w-2xl mx-auto">Perfect for anyone who wants to remember what they read and build a library of their best ideas.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-10 rounded-[2.5rem] bg-muted-slate/[0.03] border border-muted-slate/5 hover:border-kindle-orange/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Students</h3>
                  <p className="text-carbon-gray leading-relaxed">Organize your school notes and research. Build a library of everything you learn.</p>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-muted-slate/[0.03] border border-muted-slate/5 hover:border-kindle-orange/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Brain className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Professionals</h3>
                  <p className="text-carbon-gray leading-relaxed">Build your "Second Brain". Connect ideas from different books to solve problems at work.</p>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-muted-slate/[0.03] border border-muted-slate/5 hover:border-kindle-orange/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <PenTool className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Writers</h3>
                  <p className="text-carbon-gray leading-relaxed">Collect great quotes and inspiration for your next project. Never lose a good idea again.</p>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-muted-slate/[0.03] border border-muted-slate/5 hover:border-kindle-orange/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Infinity className="w-7 h-7 text-kindle-orange" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-jet-black font-display">Lifelong Learners</h3>
                  <p className="text-carbon-gray leading-relaxed">Keep a digital diary of every book you read. See how much you've learned over time.</p>
                </div>
              </div>
            </div>
          </section>


          {/* Comparison Section */}
          <section className="py-40 px-6 bg-muted-slate/[0.03]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-jet-black tracking-tight">Why Readers Choose Us</h2>
                <p className="text-xl md:text-2xl text-carbon-gray max-w-2xl mx-auto">Compare Kindle to Notion with other export tools and see why we're the preferred choice for privacy and speed.</p>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px] bg-white rounded-[2.5rem] border border-muted-slate/10 shadow-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-muted-slate/5">
                        <th className="p-8 text-sm font-bold text-muted-slate uppercase tracking-widest bg-muted-slate/[0.02]">Feature</th>
                        <th className="p-8 text-sm font-bold text-kindle-orange uppercase tracking-widest bg-kindle-orange/[0.03]">Kindle to Notion</th>
                        <th className="p-8 text-sm font-bold text-muted-slate uppercase tracking-widest">Readwise</th>
                        <th className="p-8 text-sm font-bold text-muted-slate uppercase tracking-widest">Clippings.io</th>
                      </tr>
                    </thead>
                    <tbody className="text-jet-black">
                      <tr className="border-b border-muted-slate/5">
                        <td className="p-8 font-medium">Price</td>
                        <td className="p-8 font-bold text-kindle-orange bg-kindle-orange/[0.03]">Free (Beta)</td>
                        <td className="p-8 text-carbon-gray">$8-15/month</td>
                        <td className="p-8 text-carbon-gray">$1.99/month</td>
                      </tr>
                      <tr className="border-b border-muted-slate/5">
                        <td className="p-8 font-medium">Notion Integration</td>
                        <td className="p-8 bg-kindle-orange/[0.03]">
                          <div className="flex items-center gap-2 font-bold text-kindle-orange">
                            <Check className="w-5 h-5" /> Native
                          </div>
                        </td>
                        <td className="p-8 text-carbon-gray">Yes</td>
                        <td className="p-8 text-carbon-gray">
                          <div className="flex items-center gap-2">
                            <X className="w-5 h-5 text-red-400" /> No
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-muted-slate/5">
                        <td className="p-8 font-medium">Signup Required</td>
                        <td className="p-8 bg-kindle-orange/[0.03]">
                          <div className="flex items-center gap-2 font-bold text-kindle-orange">
                            <X className="w-5 h-5" /> No
                          </div>
                        </td>
                        <td className="p-8 text-carbon-gray">Yes</td>
                        <td className="p-8 text-carbon-gray">Yes</td>
                      </tr>
                      <tr className="border-b border-muted-slate/5">
                        <td className="p-8 font-medium">Data Privacy</td>
                        <td className="p-8 bg-kindle-orange/[0.03]">
                          <div className="flex items-center gap-2 font-bold text-kindle-orange">
                            <ShieldCheck className="w-5 h-5" /> 100% Local
                          </div>
                        </td>
                        <td className="p-8 text-carbon-gray">Cloud-based</td>
                        <td className="p-8 text-carbon-gray">Cloud-based</td>
                      </tr>
                      <tr className="border-b border-muted-slate/5">
                        <td className="p-8 font-medium">Colored Highlights</td>
                        <td className="p-8 bg-kindle-orange/[0.03]">
                          <div className="flex items-center gap-2 font-bold text-kindle-orange">
                            <Check className="w-5 h-5" /> Yes
                          </div>
                        </td>
                        <td className="p-8 text-carbon-gray">Yes</td>
                        <td className="p-8 text-carbon-gray">
                          <div className="flex items-center gap-2">
                            <X className="w-5 h-5 text-red-400" /> No
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-8 font-medium">Open Source</td>
                        <td className="p-8 bg-kindle-orange/[0.03]">
                          <div className="flex items-center gap-2 font-bold text-kindle-orange">
                            <Check className="w-5 h-5" /> Yes
                          </div>
                        </td>
                        <td className="p-8 text-carbon-gray">No</td>
                        <td className="p-8 text-carbon-gray">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="mt-32">
                <div className="text-center mb-16">
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-jet-black tracking-tight">What Users Are Saying</h3>
                  <p className="text-lg text-carbon-gray">Real experiences from knowledge workers and book lovers</p>
                </div>

                <SocialProof />
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section id="how-it-works" className="py-40 px-6 bg-jet-black text-canvas-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-kindle-orange/5 blur-[120px] rounded-full -z-0" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-24 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
                  Export your highlights in<br />
                  <span className="text-kindle-orange">3 easy steps.</span>
                </h2>
                <p className="text-canvas-white/60 text-xl">The fastest way to bridge the gap between your books and your brain.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connector Lines (Desktop) */}
                <div className="hidden lg:block absolute top-1/2 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-kindle-orange/30 to-transparent -translate-y-1/2 -z-0" />

                <Step
                  number="1"
                  icon={MousePointer2}
                  title="Open Extension"
                  description="Click 'Go to Highlights' to open your Kindle notebook in your browser."
                />
                <Step
                  number="2"
                  icon={Zap}
                  title="Trigger Export"
                  description="Choose 'Export to Notion' for a single book or 'Export All' for your library."
                />
                <Step
                  number="3"
                  icon={Layers}
                  title="Sync & Organize"
                  description="Your highlights appear instantly in Notion, perfectly formatted and tagged."
                />
              </div>

              <div className="mt-24 text-center">
                <button
                  onClick={() => {
                    const welcomeBtn = document.querySelector('button[onClick*="setShowWelcome"]');
                    if (welcomeBtn) (welcomeBtn as HTMLButtonElement).click();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10 backdrop-blur-sm flex items-center gap-3 mx-auto group"
                >
                  <Zap className="w-5 h-5 text-kindle-orange group-hover:scale-110 transition-transform" />
                  See Full Setup Guide
                </button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-32 px-6 bg-muted-slate/[0.03]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-jet-black tracking-tight">Frequently Asked Questions</h2>
                <p className="text-xl text-carbon-gray">Got questions? We've got answers</p>
              </div>
              <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-muted-slate/10 shadow-sm">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQIndex === index}
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-40 px-6">
            <div className="max-w-7xl mx-auto rounded-[4rem] bg-jet-black p-20 md:p-32 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-kindle-orange/10 blur-[120px] rounded-full -mr-48 -mt-48" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tight text-canvas-white">
                  Ready to build your<br />
                  <span className="text-kindle-orange">knowledge library?</span>
                </h2>
                <p className="text-canvas-white/60 text-2xl mb-16 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of avid readers who have automated their knowledge management. Build a permanent archive of your insights today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    onClick={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
                    className="w-full sm:w-auto bg-kindle-orange text-white px-14 py-7 rounded-2xl font-bold text-2xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-kindle-orange/20 hover:scale-105 active:scale-100"
                  >
                    <BrowserIcon className="w-8 h-8" />
                    Add to {browserInfo.name}
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
          <NotionTemplateSection />
        </main>
      )}

      {/* Spread the Word Section */}
      <section className="py-32 px-6 bg-canvas-white border-t border-muted-slate/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kindle-orange/10 text-kindle-orange text-sm font-bold mb-8">
            <Zap className="w-4 h-4" />
            Spread the Word
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-jet-black tracking-tight">Love Kindle To Notion?</h2>
          <p className="text-xl text-carbon-gray mb-12 max-w-2xl mx-auto">
            Help other readers bridge the gap between their books and their brain. Share the extension with your network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'X', icon: XIcon, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://kindletonotion.com")}&text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨")}` },
              { name: 'Threads', icon: ThreadsIcon, color: '#000000', url: `https://threads.net/intent/post?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'Bluesky', icon: BlueskyIcon, color: '#0085ff', url: `https://bsky.app/intent/compose?text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨ https://kindletonotion.com")}` },
              { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Facebook', icon: FacebookIcon, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Reddit', icon: RedditIcon, color: '#FF4500', url: `https://www.reddit.com/submit?url=${encodeURIComponent("https://kindletonotion.com")}&title=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion!")}` }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-muted-slate/10 hover:border-muted-slate/20 hover:shadow-lg transition-all group"
                title={`Share on ${platform.name}`}
              >
                <platform.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <span className="font-bold text-jet-black text-sm">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-muted-slate/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-kindle-orange rounded-xl flex items-center justify-center shadow-lg shadow-kindle-orange/20">
                  <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-jet-black">KindleToNotion</span>
              </div>
              <p className="text-carbon-gray max-w-xs text-base leading-relaxed">
                The premium bridge between Kindle and Notion. Built for knowledge workers and avid readers.
              </p>
              <button
                onClick={() => window.open('https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo', '_blank')}
                className="bg-jet-black text-canvas-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] focus:ring-2 focus:ring-offset-2 focus:ring-jet-black"
                aria-label={`Get ${browserInfo.name} Extension`}
              >
                <BrowserIcon className="w-4 h-4" aria-hidden="true" />
                Get Extension
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-jet-black uppercase tracking-widest">Extension</h5>
                <ul className="space-y-3 text-sm text-carbon-gray">
                  <li><a href="https://chromewebstore.google.com/detail/kindle2notion-extension/camgnmkmolfidaefoidblkkloimnmalo" target="_blank" rel="noopener noreferrer" className="hover:text-kindle-orange transition-colors">Chrome Store</a></li>
                  <li><a href="https://microsoftedge.microsoft.com/addons/detail/enbikfmjfocokoeoieljbdpkfimnpjdb" target="_blank" rel="noopener noreferrer" className="hover:text-kindle-orange transition-colors">Edge Add-ons</a></li>
                  <li><a href="https://addons.mozilla.org/pt-BR/firefox/addon/kindle-to-notion/" target="_blank" rel="noopener noreferrer" className="hover:text-kindle-orange transition-colors">Firefox Add-ons</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-jet-black uppercase tracking-widest">Community</h5>
                <ul className="space-y-3 text-sm text-carbon-gray">
                  <li><a href="https://github.com/tuliosousapro/Kindle-To-Notion-Extension" target="_blank" rel="noopener noreferrer" className="hover:text-kindle-orange transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-kindle-orange transition-colors">Product Hunt</a></li>
                  <li><a href="#" className="hover:text-kindle-orange transition-colors">Discord</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-jet-black uppercase tracking-widest">Compare</h5>
                <ul className="space-y-3 text-sm text-carbon-gray text-left">
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('readwise-comparison');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/alternative/readwise.html');
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Kindle To Notion vs Readwise
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('clippings-comparison');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/alternative/clippings.html');
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Kindle To Notion vs Clippings.io
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('snippet-comparison');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/alternative/snippet.html');
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Kindle To Notion vs Snippet
                    </button>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-jet-black uppercase tracking-widest">Legal</h5>
                <ul className="space-y-3 text-sm text-carbon-gray text-left">
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('privacy');
                        window.scrollTo(0, 0);
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('terms');
                        window.scrollTo(0, 0);
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-jet-black uppercase tracking-widest">Resources</h5>
                <ul className="space-y-3 text-sm text-carbon-gray text-left">
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('blog');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/blog');
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Blog
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('changelog');
                        window.scrollTo(0, 0);
                        window.history.pushState({}, '', '/changelog');
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Changelog
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('welcome');
                        window.scrollTo(0, 0);
                      }}
                      className="hover:text-kindle-orange transition-colors text-left w-full"
                    >
                      Welcome Guide
                    </button>
                  </li>
                  <li><a href="https://machina-labs.gitbook.io/kindle-to-notion" target="_blank" rel="noopener noreferrer" className="hover:text-kindle-orange transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-kindle-orange transition-colors">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-muted-slate/5 gap-6">
            <div className="text-sm text-muted-slate">
              © 2026 Kindle To Notion. All Rights Reserved.
            </div>
            <div className="text-sm text-muted-slate">
              Built with wizardry by <a href="https://x.com/TulioSousapro" target="_blank" rel="noopener noreferrer" className="text-jet-black font-bold hover:text-kindle-orange transition-colors">Túlio Sousa</a>
            </div>
          </div>
        </div>
      </footer>
      <FloatingShare />
    </div>
  );
}
