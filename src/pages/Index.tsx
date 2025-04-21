
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptInputPanel } from "@/components/PromptInputPanel";
import { RiskAnalysisPanel } from "@/components/RiskAnalysisPanel";
import { Dashboard } from "@/components/Dashboard";
import { getDashboardData, exportToCSV, clearHistory } from "@/services/mockBackend";
import { PromptData, DashboardData, RiskAnalysisResult } from "@/types/models";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDown, Download, FileText } from "lucide-react";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<RiskAnalysisResult | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalFlagged: 0,
    categoryBreakdown: { biosafety: 0, cybersecurity: 0 },
    recentScores: []
  });
  const { toast } = useToast();

  const handleAnalysisResult = (result: PromptData) => {
    setAnalysisResult(result.riskAnalysis);
    setDashboardData(getDashboardData());
  };

  const handleExportCSV = () => {
    const csvContent = exportToCSV();
    
    if (csvContent === "No data to export") {
      toast({
        title: "Nothing to Export",
        description: "No data available to export.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `guardrail-export-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "CSV file has been downloaded.",
    });
  };

  const handleClearHistory = () => {
    clearHistory();
    setAnalysisResult(null);
    setDashboardData({
      totalFlagged: 0,
      categoryBreakdown: { biosafety: 0, cybersecurity: 0 },
      recentScores: []
    });
    
    toast({
      title: "History Cleared",
      description: "All analysis history has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <h1 className="text-xl font-bold">Guardrail Visualizer</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleClearHistory}>
              Clear History
            </Button>
            <Button size="sm" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Input */}
          <div className="space-y-6">
            <PromptInputPanel onAnalysisResult={handleAnalysisResult} />
          </div>
          
          {/* Right Panel: Analysis & Dashboard */}
          <div className="space-y-6">
            <RiskAnalysisPanel analysisResult={analysisResult} />
            <h2 className="text-xl font-semibold mt-6">Safety Dashboard</h2>
            <Dashboard data={dashboardData} />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Guardrail Visualizer — Local LLM Safety Analysis Tool
        </div>
      </footer>
    </div>
  );
};

export default Index;
