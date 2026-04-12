import { motion } from "motion/react";
import { ChevronLeft, Zap, Calendar, Tag, ArrowRight, History } from "lucide-react";

// @ts-ignore
import rawChangelog from "../../../CHANGELOG.md?raw";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: 'major' | 'minor' | 'patch';
  changes: string[];
}

function parseChangelog(markdown: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const versionRegex = /^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/;
  const sections = markdown.split(/\r?\n## \[ /);
  
  // Custom titles matching the old hardcoded ones for flavor
  const titleMap: Record<string, string> = {
    "1.8.0": "The Global Sync Update",
    "1.7.2": "Stability & Performance",
    "1.7.0": "Notion Template Integration",
    "1.6.0": "Initial Public Release"
  };

  // Process each section that corresponds to a release
  // (index 0 is the prologue: "# Changelog...")
  for (let i = 1; i < sections.length; i++) {
    const rawSection = '## [' + sections[i];
    const lines = rawSection.split('\n');
    const firstLine = lines[0];
    const match = firstLine.match(versionRegex);
    if (!match) continue;
    
    const versionMatch = match[1];
    const dateMatch = match[2];
    
    // Parse date reliably without timezone offset bugs
    const dateParts = dateMatch.split('-');
    const dateObj = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    let type: 'major' | 'minor' | 'patch' = 'patch';
    if (versionMatch.endsWith('.0.0')) type = 'major';
    else if (versionMatch.endsWith('.0')) type = 'minor';
    
    const currentTitle = titleMap[versionMatch] || "Release v" + versionMatch;
    
    const changes: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      // Extract bullet points
      if (trimmed.startsWith('- ')) {
        // Strip markdown bold if present, actually let's keep the "**" inside 
        // since the old page didn't use react-markdown it will render text exactly.
        // Actually the old data didn't have bold markdown in it. If there is, we might 
        // want to strip or render html. Let's see if we should strip markdown bold just in case:
        let text = trimmed.substring(2).trim();
        text = text.replace(/\*\*(.*?)\*\*/g, '$1');
        text = text.replace(/`(.*?)`/g, '$1');
        changes.push(text);
      }
    }
    
    entries.push({
      version: "v" + versionMatch,
      date: formattedDate,
      title: currentTitle,
      type,
      changes
    });
  }
  return entries;
}

const CHANGELOG_DATA: ChangelogEntry[] = parseChangelog(rawChangelog);

interface ChangelogPageProps {
  onBack: () => void;
}

export const ChangelogPage = ({ onBack }: ChangelogPageProps) => {
  return (
    <main className="min-h-screen bg-canvas-white pt-48 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kindle-orange/10 text-kindle-orange text-[10px] font-bold tracking-widest uppercase mb-4">
              <History className="w-3 h-3" aria-hidden="true" />
              Product Updates
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-jet-black mb-6 tracking-tight">
              Changelog<span className="text-kindle-orange">.</span>
            </h1>
            <p className="text-xl text-carbon-gray">
              The latest updates, improvements, and fixes to Kindle To Notion.
            </p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-carbon-gray hover:text-kindle-orange transition-colors group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-2 py-1"
            aria-label="Back to Home"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Home
          </button>
        </div>

        <div className="space-y-16" role="list">
          {CHANGELOG_DATA.map((entry, index) => (
            <motion.div 
              key={entry.version}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 border-l-2 border-muted-slate/10 pb-4 last:border-0 last:pb-0"
              role="listitem"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-kindle-orange shadow-[0_0_10px_rgba(255,153,0,0.3)]" aria-hidden="true" />
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-jet-black font-display">{entry.version}</span>
                <div className="flex items-center gap-2 text-sm font-bold text-carbon-gray/60">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Released on </span>{entry.date}
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  entry.type === 'major' ? 'bg-kindle-orange text-white' : 
                  entry.type === 'minor' ? 'bg-jet-black text-white' : 
                  'bg-muted-slate/10 text-carbon-gray'
                }`}>
                  {entry.type} update
                </span>
              </div>

              <h3 className="text-xl font-bold text-jet-black mb-6 font-display">{entry.title}</h3>
              
              <ul className="space-y-4">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-carbon-gray leading-relaxed">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-kindle-orange/40 shrink-0" aria-hidden="true" />
                    {change}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-32 p-12 rounded-[2.5rem] bg-muted-slate/5 border border-muted-slate/10 text-center" aria-labelledby="cta-title">
          <h3 id="cta-title" className="text-2xl font-bold text-jet-black mb-4 font-display">Want to see a specific feature?</h3>
          <p className="text-carbon-gray mb-8 max-w-lg mx-auto">
            We're building this for you. Join our community and help shape the future of Kindle To Notion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://github.com/TulioSousa/kindle2notion-extension/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-jet-black text-white font-bold rounded-xl hover:bg-jet-black/90 transition-all flex items-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-jet-black"
            >
              Request Feature
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <button 
              onClick={onBack}
              className="px-8 py-4 bg-white text-jet-black font-bold rounded-xl border border-muted-slate/10 hover:bg-muted-slate/5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-muted-slate/20"
            >
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
