
import { Book, Info } from "lucide-react";

const About = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
    <div className="bg-background/90 rounded-xl shadow-xl p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-4">
        <Book className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold">About Truth Guard</h2>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        <span className="font-semibold">Truth Guard</span> is an advanced AI-powered tool for safety analysis of Large Language Model (LLM) outputs, helping users flag risky or unsafe content reliably and efficiently.
      </p>
      <ul className="list-disc ml-6 mt-6 space-y-2">
        <li>
          Real-time textual risk analysis and flagging of biosafety, cybersecurity, and other categories.
        </li>
        <li>
          Dashboard, report history, alerts, custom rules, and downloadable CSV analysis.
        </li>
        <li>
          Developed for research, compliance, and enterprise AI safety workflows.
        </li>
        <li>
          UX-focused, private, and open to extensibility.
        </li>
      </ul>
    </div>
  </div>
);

export default About;
