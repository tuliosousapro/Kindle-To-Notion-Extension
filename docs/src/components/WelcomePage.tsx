import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  ArrowRight, 
  ExternalLink, 
  Settings, 
  Database, 
  Key, 
  Zap,
  ChevronLeft,
  HelpCircle,
  FileText,
  Book,
  AlertCircle,
  MessageSquare,
  Twitter,
  Linkedin,
  Github,
  Share2,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  X
} from "lucide-react";

// --- Custom Icons ---
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

// --- Components ---
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void, key?: any }) => (
  <div className="border-b border-muted-slate/10 last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-4"
      aria-expanded={isOpen}
    >
      <span className={`text-lg font-bold transition-colors font-display ${isOpen ? 'text-kindle-orange' : 'text-jet-black group-hover:text-kindle-orange'}`}>
        {question}
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-kindle-orange' : 'text-muted-slate'}`} />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="pb-6 px-4 text-carbon-gray leading-relaxed">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FlagBase = ({ children, viewBox = "0 0 640 480" }: { children: React.ReactNode, viewBox?: string }) => (
  <svg viewBox={viewBox} className="w-full h-full block" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">{children}</svg>
);

const FlagAU = () => (
  <FlagBase>
    <rect width="640" height="480" fill="#00008b"/>
    <path fill="#fff" d="m180 0 20 50 45-25-25 45 50 20-50 20 25 45-45-25-20 50-20-50-45 25 25-45-50-20 50-20-25-45 45 25zM480 40l10 25 23-13-13 23 25 10-25 10 13 23-23-13-10 25-10-25-23 13 13-23-25-10 25-10-13-23 23 13zM400 180l10 25 23-13-13 23 25 10-25 10 13 23-23-13-10 25-10-25-23 13 13-23-25-10 25-10-13-23 23 13zM560 200l10 25 23-13-13 23 25 10-25 10 13 23-23-13-10 25-10-25-23 13 13-23-25-10 25-10-13-23 23 13zM480 320l10 25 23-13-13 23 25 10-25 10 13 23-23-13-10 25-10-25-23 13 13-23-25-10 25-10-13-23 23 13zM480 180l6 15 14-8-8 14 15 6-15 6 8 14-14-8-6 15-6-15-14 8 8-14-15-6 15-6-8-14 14 8z"/>
    <path fill="#fff" d="M0 0v240h320V0H0z"/><path d="M0 0l320 240M320 0L0 240" stroke="#fff" strokeWidth="40"/><path d="M0 0l320 240M320 0L0 240" stroke="#e81123" strokeWidth="26"/><path d="M160 0v240M0 120h320" stroke="#fff" strokeWidth="60"/><path d="M160 0v240M0 120h320" stroke="#e81123" strokeWidth="40"/>
  </FlagBase>
);

const FlagBR = () => (
  <FlagBase>
    <rect width="640" height="480" fill="#009b3a"/><path fill="#fedf00" d="M320 40L40 240l280 200 280-200z"/><circle fill="#3e4095" cx="320" cy="240" r="105"/><path fill="#fff" d="M216 230c40-15 100-25 208-10 0 0-50-25-208 10z"/>
  </FlagBase>
);

const FlagCA = () => (
  <FlagBase>
    <rect width="640" height="480" fill="#f00"/><rect x="160" width="320" height="480" fill="#fff"/><path fill="#f00" d="M320 80l20 60 60-10-20 60 50 30-50 30 20 60-60-10-20 60-20-60-60 10 20-60-50-30 50-30-20-60 60 10z"/>
  </FlagBase>
);

const FlagFR = () => (
  <FlagBase>
    <rect width="213.3" height="480" fill="#002395"/><rect x="213.3" width="213.4" height="480" fill="#fff"/><rect x="426.7" width="213.3" height="480" fill="#ed2939"/>
  </FlagBase>
);

const FlagDE = () => (
  <FlagBase>
    <rect width="640" height="160" fill="#000"/><rect y="160" width="640" height="160" fill="#d00"/><rect y="320" width="640" height="160" fill="#ffce00"/>
  </FlagBase>
);

const FlagIN = () => (
  <FlagBase>
    <rect width="640" height="160" fill="#f93"/><rect y="160" width="640" height="160" fill="#fff"/><rect y="320" width="640" height="160" fill="#128807"/><circle fill="none" stroke="#000080" strokeWidth="2" cx="320" cy="240" r="60"/><circle fill="#000080" cx="320" cy="240" r="10"/><path fill="#000080" d="M320 180l5 60-5 60-5-60zM260 240l60 5 60-5-60-5z"/>
  </FlagBase>
);

const FlagIT = () => (
  <FlagBase>
    <rect width="213.3" height="480" fill="#009246"/><rect x="213.3" width="213.4" height="480" fill="#fff"/><rect x="426.7" width="213.3" height="480" fill="#ce2b37"/>
  </FlagBase>
);

const FlagJP = () => (
  <FlagBase>
    <rect width="640" height="480" fill="#fff"/><circle fill="#bc002d" cx="320" cy="240" r="144"/>
  </FlagBase>
);

const FlagMX = () => (
  <FlagBase>
    <rect width="213.3" height="480" fill="#006847"/><rect x="213.3" width="213.4" height="480" fill="#fff"/><rect x="426.7" width="213.3" height="480" fill="#ce1126"/><circle fill="#630" cx="320" cy="240" r="40"/>
  </FlagBase>
);

const FlagES = () => (
  <FlagBase>
    <rect width="640" height="120" fill="#c60b1e"/><rect y="120" width="640" height="240" fill="#ffc400"/><rect y="360" width="640" height="120" fill="#c60b1e"/><circle fill="#c60b1e" cx="160" cy="240" r="40"/>
  </FlagBase>
);

const FlagUK = () => (
  <FlagBase>
    <rect width="640" height="480" fill="#012169"/><path d="M0 0l640 480M640 0L0 480" stroke="#fff" strokeWidth="60"/><path d="M0 0l640 480M640 0L0 480" stroke="#c8102e" strokeWidth="40"/><path d="M320 0v480M0 240h640" stroke="#fff" strokeWidth="100"/><path d="M320 0v480M0 240h640" stroke="#c8102e" strokeWidth="60"/>
  </FlagBase>
);

const FlagUS = () => (
  <FlagBase>
    <rect width="640" height="480" fill="#fff"/><path fill="#b22234" d="M0 0h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0zm0 73.8h640v36.9H0z"/><rect width="256" height="258.5" fill="#3c3b6e"/><circle fill="#fff" cx="30" cy="30" r="5"/><circle fill="#fff" cx="80" cy="30" r="5"/><circle fill="#fff" cx="130" cy="30" r="5"/><circle fill="#fff" cx="180" cy="30" r="5"/><circle fill="#fff" cx="230" cy="30" r="5"/>
  </FlagBase>
);

// --- Data ---
const GUIDES_DATA = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of setting up Kindle To Notion and your first sync.",
    icon: Zap,
    content: [
      {
        title: "Initial Setup",
        steps: [
          { title: "Install the Extension", description: "Download Kindle To Notion from the Chrome Web Store, Edge Add-ons, or Firefox Add-ons." },
          { title: "Connect to Notion", description: "Create a Notion Internal Integration and copy your Secret Token into the extension popup." },
          { title: "Select your Database", description: "Share your reading database with your integration and paste the Database ID into the extension." }
        ],
        tips: ["Use our official Notion template for the best experience.", "Make sure your database has the required properties (Title, Author, URL)."]
      }
    ]
  },
  {
    id: "advanced-tips",
    title: "Advanced Tips",
    description: "Master the extension with power-user features and shortcuts.",
    icon: Lightbulb,
    content: [
      {
        title: "Power User Workflows",
        steps: [
          { title: "Multi-Region Sync", description: "The extension automatically detects your Amazon region. You can sync from .com, .co.uk, .com.br, and more without changing settings." },
          { title: "Incremental Syncing", description: "Kindle To Notion only adds new highlights, so you don't have to worry about duplicates when you sync the same book multiple times." }
        ],
        tips: ["Pin the extension to your browser toolbar for 1-click access.", "Check the 'Knowledge Base' on our blog for deep dives into productivity workflows."]
      }
    ]
  },
  {
    id: "notion-best-practices",
    title: "Notion Best Practices",
    description: "How to organize your highlights for long-term knowledge management.",
    icon: Settings,
    content: [
      {
        title: "Organizing your Second Brain",
        steps: [
          { title: "Progressive Summarization", description: "Once highlights are in Notion, use bolding and highlighting to distill the most important points over time." },
          { title: "Relational Databases", description: "Link your reading database to your 'Projects' or 'Areas' databases in Notion to make your notes actionable." }
        ],
        tips: ["Add a 'Status' property to track books you are currently reading vs. finished.", "Use Gallery View in Notion to see your book covers in a beautiful grid."]
      }
    ]
  }
];

const FAQS = [
  { question: "Is it really free?", answer: "Yes! Kindle to Notion is 100% free and open source. No premium tiers, no hidden costs, no subscriptions." },
  { question: "Is my data safe?", answer: "Absolutely. Your data never leaves your device. We don't have servers, don't collect data, and can't see your highlights. It's just you and Notion." },
  { question: "Do I need a Notion account?", answer: "Yes, you need a free Notion account. Notion is where your highlights will be saved." },
  { question: "Does it work with my Amazon region?", answer: "We support 12 regions: US, UK, Canada, Germany, France, Spain, Italy, Japan, Australia, India, Mexico, and Brazil." },
  { question: "What if I already exported a book?", answer: "No problem! Re-export anytime. The extension detects existing highlights and only adds new ones — no duplicates." },
  { question: "What browsers are supported?", answer: "We support all Chromium-based browsers including Chrome, Brave, Arc, Edge, and Orion. We also have a native extension for Firefox." }
];

interface WelcomePageProps {
  onBack: () => void;
}

export const WelcomePage = ({ onBack }: WelcomePageProps) => {
  const [setupMethod, setSetupMethod] = useState<'oauth' | 'manual'>('oauth');
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const manualSteps = [
    { number: "1", title: "Create a Notion Integration", description: "Go to Notion's integrations page and create a new integration. Copy the \"Internal Integration Token\".", buttonText: "Open Notion Integrations", buttonLink: "https://www.notion.so/my-integrations", icon: Key },
    { number: "2", title: "Set Up Your Database", description: "Create or select a Notion database with at least \"Title\" and \"Author\" properties. Share it with your integration.", subtext: "Database ID is in the URL: notion.so/DATABASE_ID?v=...", icon: Database },
    { number: "3", title: "Configure the Extension", description: "Click the extension icon, go to Settings, and enter your details. Supports multiple Kindle regions.", list: ["Notion API Token", "Database ID", "Title Property Name", "Author Property Name", "Your Kindle Region"], regions: [{ country: "Australia", icon: FlagAU }, { country: "Brazil", icon: FlagBR }, { country: "Canada", icon: FlagCA }, { country: "France", icon: FlagFR }, { country: "Germany", icon: FlagDE }, { country: "India", icon: FlagIN }, { country: "Italy", icon: FlagIT }, { country: "Japan", icon: FlagJP }, { country: "Mexico", icon: FlagMX }, { country: "Spain", icon: FlagES }, { country: "United Kingdom", icon: FlagUK }, { country: "United States", icon: FlagUS }], icon: Settings },
    { number: "4", title: "Export Your Highlights!", description: "Navigate to your Kindle highlights page, click the extension icon, and hit \"Export to Notion\".", buttonText: "Go to Kindle Highlights", buttonLink: "https://read.amazon.com/notebook", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-canvas-white text-jet-black font-sans selection:bg-kindle-orange/20 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-carbon-gray hover:text-kindle-orange transition-colors mb-12 group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-2 py-1">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Home</span>
        </button>

        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-kindle-orange/10 mb-8">
            <BookOpen className="w-8 h-8 text-kindle-orange" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-jet-black">
            Welcome to <span className="text-kindle-orange">Kindle to Notion</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-carbon-gray max-w-2xl mx-auto leading-relaxed">
            Everything you need to bridge the gap between reading and remembering. Let's get you set up in minutes.
          </motion.p>
        </div>

        {/* Quick Start Guide */}
        <section id="quick-start" className="bg-white rounded-[3rem] border border-muted-slate/10 p-8 md:p-16 shadow-2xl shadow-muted-slate/5 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-jet-black">Quick Start Guide</h2>
            <p className="text-carbon-gray">Choose your preferred way to connect the extension</p>
          </div>

          <div className="flex p-1 bg-muted-slate/5 rounded-2xl mb-16 max-w-md mx-auto">
            <button onClick={() => setSetupMethod('oauth')} className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${setupMethod === 'oauth' ? 'bg-white text-kindle-orange shadow-lg shadow-kindle-orange/5' : 'text-carbon-gray hover:text-jet-black'}`}>
              <Zap className="w-4 h-4" /> OAuth (Easy)
            </button>
            <button onClick={() => setSetupMethod('manual')} className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${setupMethod === 'manual' ? 'bg-white text-kindle-orange shadow-lg shadow-kindle-orange/5' : 'text-carbon-gray hover:text-jet-black'}`}>
              <Settings className="w-4 h-4" /> Manual
            </button>
          </div>

          {setupMethod === 'oauth' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="bg-kindle-orange/5 rounded-[2.5rem] p-10 border border-kindle-orange/10 text-center md:text-left">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-24 h-24 rounded-3xl bg-kindle-orange flex items-center justify-center shadow-xl shadow-kindle-orange/20 flex-shrink-0">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-bold text-jet-black mb-4">The Easy Way: OAuth</h3>
                    <p className="text-carbon-gray text-lg leading-relaxed mb-8">Connect your Notion account in seconds. No tokens, no database IDs. Just click and connect.</p>
                    <button className="bg-kindle-orange text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-kindle-orange/90 transition-all shadow-xl shadow-kindle-orange/20 flex items-center gap-3 mx-auto md:mx-0">
                      Connect with Notion <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-20">
              {manualSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-kindle-orange flex items-center justify-center text-white font-bold font-display text-2xl shadow-lg shadow-kindle-orange/20">{step.number}</div>
                  <div className="flex-grow space-y-6">
                    <h3 className="text-2xl font-bold text-jet-black mb-3 font-display flex items-center gap-3"><step.icon className="w-6 h-6 text-kindle-orange/40" />{step.title}</h3>
                    <p className="text-carbon-gray text-lg leading-relaxed max-w-2xl">{step.description}</p>
                    {step.regions && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-8">
                        {step.regions.map((region, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-7 rounded border border-muted-slate/10 overflow-hidden"><region.icon /></div>
                            <span className="text-[10px] font-bold text-carbon-gray">{region.country}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {step.buttonText && <a href={step.buttonLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-muted-slate/5 hover:bg-kindle-orange/10 text-jet-black hover:text-kindle-orange font-bold rounded-xl transition-all group">{step.buttonText}<ExternalLink className="w-4 h-4" /></a>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Detailed Guides Section */}
        <div className="space-y-32 mb-32">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-jet-black mb-6">Master your Workflow</h2>
            <p className="text-xl text-carbon-gray">Deep dives into productivity and knowledge management.</p>
          </div>
          {GUIDES_DATA.map((guide) => (
            <section key={guide.id} id={guide.id} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-jet-black flex items-center justify-center"><guide.icon className="w-7 h-7 text-white" /></div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-jet-black">{guide.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-12">
                  {guide.content.map((block, i) => (
                    <div key={i} className="space-y-8">
                      <h4 className="text-xl font-bold text-jet-black font-display border-b border-muted-slate/10 pb-4">{block.title}</h4>
                      <div className="space-y-8">
                        {block.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex gap-6">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-kindle-orange/10 text-kindle-orange flex items-center justify-center font-bold text-sm">{stepIndex + 1}</div>
                            <div className="space-y-2">
                              <h5 className="font-bold text-jet-black">{step.title}</h5>
                              <p className="text-carbon-gray leading-relaxed text-sm">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-8 rounded-[2.5rem] bg-kindle-orange/5 border border-kindle-orange/10 h-fit">
                  <h4 className="text-lg font-bold text-jet-black mb-6 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-kindle-orange" /> Pro Tips</h4>
                  <ul className="space-y-4">
                    {guide.content[0].tips?.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-carbon-gray text-sm leading-relaxed"><CheckCircle2 className="w-4 h-4 text-kindle-orange shrink-0 mt-0.5" />{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-jet-black mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-carbon-gray">Got questions? We've got answers</p>
          </div>
          <div className="bg-white rounded-[2rem] p-8 border border-muted-slate/10 shadow-sm max-w-3xl mx-auto">
            {FAQS.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openFAQIndex === index} onClick={() => { setOpenFAQIndex(openFAQIndex === index ? null : index); }} />
            ))}
          </div>
        </section>

        {/* Social Sharing */}
        <section className="mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kindle-orange/10 text-kindle-orange text-sm font-bold mb-8">
            <Share2 className="w-4 h-4" /> Spread the Word
          </div>
          <h2 className="text-4xl font-display font-bold mb-8 text-jet-black">Love Kindle To Notion?</h2>
          <p className="text-xl text-carbon-gray mb-12 max-w-2xl mx-auto">Help other readers bridge the gap between their books and their brain.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'X', icon: XIcon, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://kindletonotion.com")}&text=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion! 📚✨")}` },
              { name: 'LinkedIn', icon: Linkedin, color: '#0077B5', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Facebook', icon: FacebookIcon, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://kindletonotion.com")}` },
              { name: 'Reddit', icon: RedditIcon, color: '#FF4500', url: `https://www.reddit.com/submit?url=${encodeURIComponent("https://kindletonotion.com")}&title=${encodeURIComponent("Export your Kindle highlights to Notion in 1 click with Kindle To Notion!")}` }
            ].map((platform) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-muted-slate/10 hover:border-muted-slate/20 hover:shadow-lg transition-all group">
                <platform.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <span className="font-bold text-jet-black text-sm">{platform.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Need Help? */}
        <section className="bg-jet-black rounded-[3rem] p-12 text-white text-center">
          <div className="w-16 h-16 rounded-2xl bg-kindle-orange/20 flex items-center justify-center mx-auto mb-8">
            <HelpCircle className="w-8 h-8 text-kindle-orange" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-6">Still have questions?</h2>
          <p className="text-white/60 mb-12 max-w-xl mx-auto">Our community and documentation are here to support your journey.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="https://machina-labs.gitbook.io/kindle-to-notion" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left">
              <FileText className="w-6 h-6 text-kindle-orange" />
              <div><div className="font-bold">Documentation</div><div className="text-xs text-white/40">Full setup guides</div></div>
            </a>
            <a href="https://github.com/tuliosousapro/Kindle-To-Notion-Extension/issues" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left">
              <AlertCircle className="w-6 h-6 text-kindle-orange" />
              <div><div className="font-bold">Report Issues</div><div className="text-xs text-white/40">Found a bug?</div></div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
