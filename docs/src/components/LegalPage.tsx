import { motion } from "motion/react";
import { ArrowLeft, Shield, FileText, Lock, Scale, Globe } from "lucide-react";

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export const LegalPage = ({ type, onBack }: LegalPageProps) => {
  const content = {
    privacy: {
      title: "Kindle2Notion Extension Privacy Policy",
      icon: Shield,
      lastUpdated: "October 15, 2025",
      intro: "This Privacy Policy outlines how the Kindle2Notion Extension (\"we,\" \"us,\" or \"our\") collects, uses, protects, and shares your data. Our goal is to ensure transparency and safeguard your privacy while enabling the extension’s functionality.",
      sections: [
        {
          title: "1. Data We Collect",
          content: (
            <div className="space-y-4">
              <p>We collect only what’s necessary to export your Kindle highlights and notes to Notion:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Kindle Highlights and Notes</strong>: Text, book titles, authors, and cover image URLs from <code className="bg-black/5 px-1.5 py-0.5 rounded text-sm">https://ler.amazon.com.br/notebook</code> and <code className="bg-black/5 px-1.5 py-0.5 rounded text-sm">https://read.amazon.com/notebook</code>. Used to transfer your data to Notion.</li>
                <li><strong>Notion Integration Data</strong>: Your Notion API token and database ID, provided by you. Needed to connect and send data to your Notion account.</li>
                <li><strong>Technical Data</strong>: Browser version, IP address, and error logs. Helps us improve the extension and fix issues.</li>
              </ul>
              <p>We don’t collect personal info (e.g., name or email) unless you share it for support.</p>
            </div>
          ),
          icon: Shield
        },
        {
          title: "2. How We Use Your Data",
          content: (
            <div className="space-y-4">
              <p>Your data is used solely to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Export Kindle highlights and notes to Notion.</li>
                <li>Enhance the extension’s performance and troubleshoot problems.</li>
                <li>Assist you if you reach out for support.</li>
              </ul>
              <p>We do <strong>not</strong> use your data for ads or sell it to anyone.</p>
            </div>
          ),
          icon: FileText
        },
        {
          title: "3. Data Sharing",
          content: (
            <div className="space-y-4">
              <p>We share your data only when essential:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>With Notion</strong>: To complete the export process via their API.</li>
                <li><strong>For Legal Reasons</strong>: If required by law or to prevent harm (e.g., fraud).</li>
              </ul>
              <p>No other parties get your data—no analytics, no marketers.</p>
            </div>
          ),
          icon: Scale
        },
        {
          title: "4. Data Security",
          content: (
            <div className="space-y-4">
              <p>We protect your data with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>HTTPS</strong>: Secure data transmission to Notion.</li>
                <li><strong>Local Storage</strong>: Notion API token and database ID stored encrypted in Chrome’s local storage.</li>
                <li><strong>In-Memory Processing</strong>: Kindle data is processed during export and not saved.</li>
              </ul>
              <p>No system is 100% secure, but we take every reasonable step to keep your data safe.</p>
            </div>
          ),
          icon: Lock
        },
        {
          title: "5. Web Browsing Activity",
          content: (
            <div className="space-y-4">
              <p>We access your browsing <strong>only</strong> on:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><code className="bg-black/5 px-1.5 py-0.5 rounded text-sm">https://ler.amazon.com.br/notebook</code></li>
                <li><code className="bg-black/5 px-1.5 py-0.5 rounded text-sm">https://read.amazon.com/notebook</code></li>
              </ul>
              <p>This is necessary to retrieve your highlights and notes. No other sites are monitored.</p>
            </div>
          ),
          icon: Globe
        },
        {
          title: "6. Your Rights",
          content: (
            <div className="space-y-4">
              <p>You control your data:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Manage</strong>: Edit or delete your Notion token and database ID in the extension’s popup.</li>
                <li><strong>Delete</strong>: Email us to remove any support-related data.</li>
                <li><strong>Stop</strong>: Uninstall the extension to end all data collection.</li>
              </ul>
              <p>See “Contact Us” below for details.</p>
            </div>
          ),
          icon: Shield
        },
        {
          title: "7. Data Retention",
          content: (
            <div className="space-y-4">
              <p>We keep data only as long as needed:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Kindle Data</strong>: Deleted after export (no storage).</li>
                <li><strong>Technical Logs</strong>: Kept for 30 days, then erased (anonymized unless tied to support).</li>
                <li><strong>Support Info</strong>: Removed after resolution or upon request.</li>
              </ul>
            </div>
          ),
          icon: FileText
        },
        {
          title: "8. Limited Use Compliance",
          content: (
            <div className="space-y-4">
              <p>We follow Chrome Web Store’s Limited Use rules:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Data is used only for the extension’s purpose.</li>
                <li>No ads, no credit checks, no unauthorized transfers.</li>
                <li>Human access is limited to support (with consent) or legal/security needs.</li>
              </ul>
            </div>
          ),
          icon: Scale
        },
        {
          title: "9. Policy Updates",
          content: (
            <div className="space-y-4">
              <p>We may revise this policy as needed. Check back here (linked in the extension popup and Chrome Web Store) for the latest version.</p>
            </div>
          ),
          icon: FileText
        },
        {
          title: "10. Contact Us",
          content: (
            <div className="space-y-4">
              <p>Questions or requests? Reach us at:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Email</strong>: contato@tuliosousa.pro</li>
                <li><strong>Website</strong>: <a href="https://github.com/tuliosousapro/Kindle-To-Notion-Extension" className="text-kindle-orange hover:underline" target="_blank" rel="noopener noreferrer">Kindle To Notion Extension</a></li>
              </ul>
              <p><strong>By using Kindle2Notion, you accept this policy. If you disagree, please don’t use the extension.</strong></p>
            </div>
          ),
          icon: Shield
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      icon: FileText,
      lastUpdated: "April 7, 2026",
      intro: "By using the Kindle To Notion extension, you agree to these terms.",
      sections: [
        {
          title: "License",
          content: <p>Kindle To Notion is software with All Rights Reserved. Unauthorized copying, modification, or distribution is prohibited.</p>,
          icon: Scale
        },
        {
          title: "Disclaimer of Warranty",
          content: <p>The software is provided 'as is', without warranty of any kind, express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability.</p>,
          icon: Shield
        },
        {
          title: "Usage Policy",
          content: <p>You agree to use this extension in compliance with Amazon's and Notion's terms of service. We are not responsible for any account restrictions or data loss resulting from the use of this tool.</p>,
          icon: FileText
        }
      ]
    }
  };

  const activeContent = content[type];

  return (
    <main 
      className="pt-32 pb-20 px-6 min-h-screen bg-canvas-white"
      aria-labelledby="legal-title"
    >
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-carbon-gray hover:text-kindle-orange transition-colors mb-12 group focus:outline-none focus:ring-2 focus:ring-kindle-orange/50 rounded-lg px-2 py-1"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-kindle-orange/10 flex items-center justify-center">
            <activeContent.icon className="w-6 h-6 text-kindle-orange" aria-hidden="true" />
          </div>
          <div>
            <h1 id="legal-title" className="text-4xl font-display font-bold text-jet-black">{activeContent.title}</h1>
            <p className="text-sm text-carbon-gray">Last updated: {activeContent.lastUpdated}</p>
          </div>
        </div>

        {activeContent.intro && (
          <div className="mt-8 text-lg text-carbon-gray leading-relaxed">
            {activeContent.intro}
          </div>
        )}

        <div className="space-y-12 mt-16">
          {activeContent.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-muted-slate/[0.03] border border-muted-slate/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="w-5 h-5 text-kindle-orange" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-jet-black font-display">{section.title}</h2>
              </div>
              <div className="text-carbon-gray leading-relaxed text-base">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-jet-black text-canvas-white">
          <p className="text-sm opacity-60 leading-relaxed">
            If you have any questions about our {activeContent.title.toLowerCase()}, please contact us via our GitHub repository by opening an issue.
          </p>
        </div>
      </div>
    </main>
  );
};
