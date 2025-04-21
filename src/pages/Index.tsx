import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptInputPanel } from "@/components/PromptInputPanel";
import { RiskAnalysisPanel } from "@/components/RiskAnalysisPanel";
import { Dashboard as DashboardComponent } from "@/components/Dashboard";
import { getDashboardData, exportToCSV, clearHistory } from "@/services/mockBackend";
import { PromptData, DashboardData, RiskAnalysisResult } from "@/types/models";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDown,
  Download,
  FileText,
  Shield,
  Bell,
  Settings,
  User,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<RiskAnalysisResult | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalFlagged: 0,
    categoryBreakdown: { biosafety: 0, cybersecurity: 0 },
    recentScores: []
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnalysisResult = (result: PromptData) => {
    setAnalysisResult(result.riskAnalysis);
    setDashboardData(getDashboardData());

    toast({
      title: "Analysis Complete",
      description: `Safety score: ${result.riskAnalysis.overallScore}/100`,
      variant: result.riskAnalysis.overallScore < 50 ? "destructive" : "default",
    });
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

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `truthguard-export-${new Date().toISOString().slice(0, 10)}.csv`);
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

  const navLinks = [
    { icon: <Shield />, label: "Dashboard", path: "/dashboard" },
    { icon: <Search />, label: "Analysis", path: "/analysis" },
    { icon: <Bell />, label: "Alerts", path: "/alerts" },
    { icon: <Calendar />, label: "History", path: "/history" },
    { icon: <FileText />, label: "Reports", path: "/reports" },
    { icon: <Shield />, label: "Rules", path: "/rules" },
    { icon: <Info />, label: "About", path: "/about" },
    { icon: <User />, label: "About Developer", path: "/about-developer" },
  ];

  const secondaryLinks = [
    { icon: <User />, label: "Account", path: "/account" },
    { icon: <Settings />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />

      <div className="flex-1 overflow-y-auto">
        <header className="border-b border-border/40 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold slide-in-left">Truth Guard Visualizer</h1>

              <div className="hidden md:flex items-center gap-4">
                <Link to="/dashboard" className={`text-sm text-muted-foreground hover:text-foreground animate-underline ${location.pathname === "/dashboard" ? "text-primary font-semibold" : ""}`}>Dashboard</Link>
                <Link to="/analysis" className={`text-sm text-muted-foreground hover:text-foreground animate-underline ${location.pathname === "/analysis" ? "text-primary font-semibold" : ""}`}>Analysis</Link>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground animate-underline">Documentation</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative glass p-2 rounded-full cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary"></span>
              </div>

              <Button variant="outline" size="sm" onClick={handleClearHistory}>
                Clear History
              </Button>

              <Button size="sm" className="action-button" onClick={handleExportCSV}>
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-6">
              <Card className="glass card-animated-border overflow-hidden">
                <CardContent className="p-0">
                  <PromptInputPanel onAnalysisResult={handleAnalysisResult} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass card-animated-border overflow-hidden min-h-[300px]">
                <CardContent className="p-0">
                  <RiskAnalysisPanel analysisResult={analysisResult} />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            <Button 
              variant="default" 
              size="lg" 
              className="px-7 py-3 font-bold text-lg shadow-2xl" 
              onClick={() => navigate("/dashboard")}
            >
              <Shield className="w-5 h-5 mr-2" /> Open Safety Dashboard
            </Button>
          </div>
        </main>

        <footer className="border-t border-border/40 py-6 mt-8 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Truth Guard Visualizer — Advanced LLM Safety Analysis Tool © 2025
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground animate-underline">Privacy Policy</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground animate-underline">Terms of Service</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground animate-underline">Documentation</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Index;
