
import { PromptData, RiskAnalysisResult, FlaggedItem, DashboardData } from "../types/models";

// Simulates the regex patterns that would be in the Python backend
const riskPatterns = {
  biosafety: [
    { pattern: /\b(bioweapon|pathogen|virus synthesis|CRISPR|gene editing)\b/gi, severity: 70, description: "Potential biosafety risk related to pathogen engineering" },
    { pattern: /\b(gain of function|designer virus|pandemic potential)\b/gi, severity: 85, description: "High biosafety risk related to enhanced pathogens" },
    { pattern: /\b(toxin|ricin|botulinum|anthrax|plague)\b/gi, severity: 80, description: "Biological toxin reference detected" },
    { pattern: /\b(viral genome|synthetic biology|bioreactor|fermentation)\b/gi, severity: 40, description: "Moderate biosafety risk related to biological engineering" }
  ],
  cybersecurity: [
    { pattern: /\b(exploit|vulnerability|SQL injection|XSS|cross-site|buffer overflow)\b/gi, severity: 75, description: "Potential cybersecurity exploit technique" },
    { pattern: /\b(malware|ransomware|botnet|rootkit|keylogger|backdoor)\b/gi, severity: 80, description: "Malicious software reference" },
    { pattern: /\b(password|credentials|authentication bypass|privilege escalation)\b/gi, severity: 65, description: "Authentication security risk" },
    { pattern: /\b(DDoS|denial of service|zero-day|0day|firewall bypass)\b/gi, severity: 70, description: "Network attack methodology" }
  ]
};

// Mock database for storing analysis results
let promptHistory: PromptData[] = [];

export const analyzePrompt = (prompt: string, output: string): PromptData => {
  const flaggedItems: FlaggedItem[] = [];
  let itemId = 0;
  
  // Scan for biosafety risks
  riskPatterns.biosafety.forEach(pattern => {
    const matches = [...prompt.matchAll(pattern.pattern), ...output.matchAll(pattern.pattern)];
    matches.forEach(match => {
      flaggedItems.push({
        id: `flag-${itemId++}`,
        category: 'biosafety',
        severity: pattern.severity,
        description: pattern.description,
        match: match[0]
      });
    });
  });
  
  // Scan for cybersecurity risks
  riskPatterns.cybersecurity.forEach(pattern => {
    const matches = [...prompt.matchAll(pattern.pattern), ...output.matchAll(pattern.pattern)];
    matches.forEach(match => {
      flaggedItems.push({
        id: `flag-${itemId++}`,
        category: 'cybersecurity',
        severity: pattern.severity,
        description: pattern.description,
        match: match[0]
      });
    });
  });
  
  // Calculate overall risk score (0-100)
  const overallScore = flaggedItems.length === 0 
    ? 0 
    : Math.min(
        100, 
        Math.round(flaggedItems.reduce((sum, item) => sum + item.severity, 0) / flaggedItems.length)
      );
  
  // Count items by category
  const categoryCounts = {
    biosafety: flaggedItems.filter(item => item.category === 'biosafety').length,
    cybersecurity: flaggedItems.filter(item => item.category === 'cybersecurity').length
  };
  
  const riskAnalysis: RiskAnalysisResult = {
    overallScore,
    flaggedItems,
    categoryCounts
  };
  
  const newPromptData: PromptData = {
    id: `prompt-${Date.now()}`,
    prompt,
    output,
    timestamp: new Date().toISOString(),
    riskAnalysis
  };
  
  // Add to history
  promptHistory.push(newPromptData);
  
  return newPromptData;
};

export const getDashboardData = (): DashboardData => {
  const totalFlagged = promptHistory.filter(p => p.riskAnalysis.flaggedItems.length > 0).length;
  
  const categoryBreakdown = {
    biosafety: promptHistory.reduce((sum, p) => sum + p.riskAnalysis.categoryCounts.biosafety, 0),
    cybersecurity: promptHistory.reduce((sum, p) => sum + p.riskAnalysis.categoryCounts.cybersecurity, 0)
  };
  
  const recentScores = promptHistory
    .slice(-10) // Only show the last 10 entries
    .map(p => ({
      timestamp: new Date(p.timestamp).toLocaleTimeString(),
      score: p.riskAnalysis.overallScore
    }));
  
  return {
    totalFlagged,
    categoryBreakdown,
    recentScores
  };
};

export const exportToCSV = (): string => {
  if (promptHistory.length === 0) {
    return "No data to export";
  }
  
  const headers = [
    "Timestamp",
    "Prompt",
    "Output",
    "Overall Risk Score",
    "Biosafety Flags",
    "Cybersecurity Flags"
  ].join(",");
  
  const rows = promptHistory.map(entry => [
    entry.timestamp,
    `"${entry.prompt.replace(/"/g, '""')}"`,
    `"${entry.output.replace(/"/g, '""')}"`,
    entry.riskAnalysis.overallScore,
    entry.riskAnalysis.categoryCounts.biosafety,
    entry.riskAnalysis.categoryCounts.cybersecurity
  ].join(","));
  
  return [headers, ...rows].join("\n");
};

export const clearHistory = (): void => {
  promptHistory = [];
};
