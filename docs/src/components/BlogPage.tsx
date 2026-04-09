import { motion } from "motion/react";
import { Calendar, User, Clock, ArrowRight, ChevronLeft, BookOpen, Zap, Brain } from "lucide-react";
import { useState } from "react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How to Build a Second Brain with Kindle and Notion",
    excerpt: "Learn the exact workflow to transform your passive reading into an active knowledge management system using Kindle To Notion.",
    content: `
      Reading is one of the best ways to acquire knowledge, but most of it is lost if we don't have a system to capture and organize it. 
      In this guide, we'll explore how to use the 'Building a Second Brain' methodology by Tiago Forte, specifically tailored for Kindle readers using Notion.
      
      ### Step 1: Active Highlighting
      When reading on your Kindle, don't just highlight everything. Focus on:
      - Surprising information
      - Useful insights
      - Inspiring quotes
      - Things that resonate with your current projects
      
      ### Step 2: The Capture
      This is where Kindle To Notion comes in. Instead of manually typing your notes, use the extension to sync everything to your Notion database in seconds.
      
      ### Step 3: Organize and Distill
      Once your highlights are in Notion, use the 'Progressive Summarization' technique to make them more useful for your future self.
    `,
    author: "Túlio Sousa",
    date: "April 5, 2026",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "2",
    title: "Kindle To Notion v1.8.0: What's New?",
    excerpt: "Discover the latest features in our biggest update yet, including multi-region support and enhanced sync speeds.",
    content: `
      We are thrilled to announce the release of Kindle To Notion v1.8.0! This update is a result of months of feedback from our amazing community of readers.
      
      ### Key Highlights:
      - **Multi-Region Support**: Now supporting Kindle notebooks from all Amazon regions (.com, .co.uk, .com.br, etc.).
      - **Enhanced Sync Engine**: We've optimized the export process, making it up to 3x faster for large libraries.
      - **Improved Formatting**: Better handling of special characters and book metadata.
      - **Open Source Transparency**: We've moved to a fully open-source model to ensure your data privacy.
    `,
    author: "KindleToNotion Team",
    date: "March 28, 2026",
    readTime: "3 min read",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "3",
    title: "5 Notion Templates for Avid Readers",
    excerpt: "Maximize your reading productivity with these hand-picked Notion templates designed for book tracking and highlight management.",
    content: `
      Notion is a blank canvas, which can be overwhelming. To help you get started, we've curated the best reading-focused templates.
      
      1. **The Ultimate Reading Hub**: A comprehensive dashboard for your library.
      2. **Machina Labs Reading Center**: Our official template optimized for Kindle To Notion.
      3. **The Simple Tracker**: For those who want a minimal list of books read.
      4. **Deep Work Log**: Focused on technical books and learning outcomes.
      5. **The Quote Archive**: A beautiful gallery view of your favorite highlights.
    `,
    author: "Sarah Jenkins",
    date: "March 15, 2026",
    readTime: "7 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=1000"
  }
];

interface BlogPageProps {
  onBack: () => void;
}

export const BlogPage = ({ onBack }: BlogPageProps) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <main className="min-h-screen bg-canvas-white pt-32 pb-24 px-6" aria-labelledby="post-title">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-carbon-gray hover:text-kindle-orange transition-colors mb-12 group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg p-1"
            aria-label="Back to blog list"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Blog
          </button>

          <article className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kindle-orange/10 text-kindle-orange text-xs font-bold mb-6">
              {selectedPost.category}
            </div>
            <h1 id="post-title" className="text-4xl md:text-6xl font-display font-bold text-jet-black mb-8 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-carbon-gray">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Author:</span> {selectedPost.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Published on:</span> {selectedPost.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Reading time:</span> {selectedPost.readTime}
              </div>
            </div>
          </article>

          <div className="rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-jet-black/5">
            <img 
              src={selectedPost.image} 
              alt="" 
              aria-hidden="true"
              className="w-full h-[400px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-lg max-w-none text-carbon-gray leading-relaxed space-y-6">
            {selectedPost.content.split('\n').map((paragraph, i) => {
              if (paragraph.trim().startsWith('###')) {
                return <h2 key={i} className="text-2xl font-bold text-jet-black mt-12 mb-4 font-display">{paragraph.replace('###', '').trim()}</h2>;
              }
              if (paragraph.trim().startsWith('-')) {
                return <li key={i} className="ml-6">{paragraph.replace('-', '').trim()}</li>;
              }
              if (paragraph.trim().startsWith('**')) {
                return <p key={i} className="font-bold text-jet-black">{paragraph.replace(/\*\*/g, '').trim()}</p>;
              }
              if (paragraph.trim()) {
                return <p key={i}>{paragraph.trim()}</p>;
              }
              return null;
            })}
          </div>

          <section className="mt-24 pt-12 border-t border-muted-slate/10" aria-labelledby="newsletter-title">
            <div className="bg-muted-slate/5 rounded-3xl p-12 text-center">
              <h3 id="newsletter-title" className="text-2xl font-bold text-jet-black mb-4 font-display">Enjoyed this article?</h3>
              <p className="text-carbon-gray mb-8">Subscribe to our newsletter for more tips on reading and productivity.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="post-email" className="sr-only">Email address</label>
                <input 
                  id="post-email"
                  type="email" 
                  required
                  placeholder="your@email.com" 
                  className="flex-1 px-6 py-4 rounded-xl border border-muted-slate/10 focus:outline-none focus:ring-2 focus:ring-kindle-orange/20"
                />
                <button type="submit" className="px-8 py-4 bg-kindle-orange text-white font-bold rounded-xl hover:bg-kindle-orange/90 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-kindle-orange">
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas-white pt-48 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-jet-black mb-6 tracking-tight">
              Kindle To Notion <span className="text-kindle-orange">Blog.</span>
            </h1>
            <p className="text-xl text-carbon-gray">
              Insights, updates, and tutorials to help you build a better second brain.
            </p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-carbon-gray hover:text-kindle-orange transition-colors group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg p-1"
            aria-label="Back to home page"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Home
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12" role="list">
          {SAMPLE_POSTS.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-[2rem] p-2"
              role="listitem"
              tabIndex={0}
              aria-labelledby={`post-title-${post.id}`}
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo(0, 0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPost(post);
                  window.scrollTo(0, 0);
                }
              }}
            >
              <div className="relative rounded-[2rem] overflow-hidden mb-8 aspect-[16/10]">
                <img 
                  src={post.image} 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-jet-black text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {post.category}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-carbon-gray uppercase tracking-widest">
                  <span className="sr-only">Date:</span> {post.date}
                  <span className="w-1 h-1 rounded-full bg-muted-slate/30" aria-hidden="true" />
                  <span className="sr-only">Read time:</span> {post.readTime}
                </div>
                <h3 id={`post-title-${post.id}`} className="text-2xl font-bold text-jet-black group-hover:text-kindle-orange transition-colors font-display leading-tight">
                  {post.title}
                </h3>
                <p className="text-carbon-gray line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-kindle-orange font-bold text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="mt-40 relative overflow-hidden rounded-[3rem] bg-jet-black p-12 md:p-24 text-center" aria-labelledby="community-title">
          <div className="absolute top-0 left-0 w-full h-full bg-kindle-orange/5 blur-[120px] rounded-full" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold mb-8">
              <Zap className="w-4 h-4 text-kindle-orange" aria-hidden="true" />
              Join the Community
            </div>
            <h2 id="community-title" className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
              Master your knowledge.
            </h2>
            <p className="text-white/60 text-lg mb-12">
              Get the latest updates and productivity tips delivered straight to your inbox. No spam, just value.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="community-email" className="sr-only">Email address</label>
              <input 
                id="community-email"
                type="email" 
                required
                placeholder="your@email.com" 
                className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 transition-all"
              />
              <button type="submit" className="px-10 py-5 bg-kindle-orange text-white font-bold rounded-2xl hover:bg-kindle-orange/90 transition-all shadow-xl shadow-kindle-orange/20 focus:ring-2 focus:ring-offset-2 focus:ring-kindle-orange focus:ring-offset-jet-black">
                Join Now
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};
