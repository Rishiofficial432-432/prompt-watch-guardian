
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiskScoreIndicator } from "./RiskScoreIndicator";
import { FlaggedItem, RiskAnalysisResult } from "@/types/models";

interface RiskAnalysisPanelProps {
  analysisResult: RiskAnalysisResult | null;
}

export const RiskAnalysisPanel = ({ analysisResult }: RiskAnalysisPanelProps) => {
  if (!analysisResult) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">
            Enter a prompt and output to analyze potential risks.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { overallScore, flaggedItems, categoryCounts } = analysisResult;

  const getCategoryColor = (category: string) => {
    return category === "biosafety" ? "bg-purple-600" : "bg-blue-600";
  };

  const getSeverityClass = (severity: number) => {
    if (severity >= 70) return "bg-risk-high";
    if (severity >= 40) return "bg-risk-medium";
    return "bg-risk-low";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Risk Analysis</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-600 text-white">
              Bio: {categoryCounts.biosafety}
            </Badge>
            <Badge variant="outline" className="bg-blue-600 text-white">
              Cyber: {categoryCounts.cybersecurity}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {flaggedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <RiskScoreIndicator score={0} size="lg" />
            <p className="mt-4 text-muted-foreground text-center">
              No risks detected in this prompt and output.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <RiskScoreIndicator score={overallScore} size="lg" />
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {flaggedItems.map((item: FlaggedItem) => (
                  <div 
                    key={item.id} 
                    className="bg-secondary rounded-lg p-3 border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <Badge className={getSeverityClass(item.severity)}>
                        Severity: {item.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{item.description}</p>
                    <div className="bg-background/50 p-2 rounded text-xs font-mono">
                      "{item.match}"
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
