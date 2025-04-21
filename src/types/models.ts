
export interface PromptData {
  id: string;
  prompt: string;
  output: string;
  timestamp: string;
  riskAnalysis: RiskAnalysisResult;
}

export interface RiskAnalysisResult {
  overallScore: number;
  flaggedItems: FlaggedItem[];
  categoryCounts: {
    biosafety: number;
    cybersecurity: number;
  };
}

export interface FlaggedItem {
  id: string;
  category: 'biosafety' | 'cybersecurity'; 
  severity: number;
  description: string;
  match: string;
}

export interface DashboardData {
  totalFlagged: number;
  categoryBreakdown: {
    biosafety: number;
    cybersecurity: number;
  };
  recentScores: {
    timestamp: string;
    score: number;
  }[];
}
