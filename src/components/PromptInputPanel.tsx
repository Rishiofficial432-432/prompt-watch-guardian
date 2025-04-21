
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { analyzePrompt } from "@/services/mockBackend";
import { useToast } from "@/components/ui/use-toast";

interface PromptInputPanelProps {
  onAnalysisResult: (result: any) => void;
}

export const PromptInputPanel = ({ onAnalysisResult }: PromptInputPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!prompt.trim() || !output.trim()) {
      toast({
        title: "Incomplete Input",
        description: "Please provide both a prompt and an output to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate a delay for "processing"
    setTimeout(() => {
      try {
        const result = analyzePrompt(prompt, output);
        onAnalysisResult(result);
        
        toast({
          title: "Analysis Complete",
          description: `Risk Score: ${result.riskAnalysis.overallScore}/100`,
        });
      } catch (error) {
        toast({
          title: "Analysis Failed",
          description: "An error occurred during analysis.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 800);
  };

  const handleClear = () => {
    setPrompt("");
    setOutput("");
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>LLM Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter the prompt sent to the LLM..."
            className="min-h-[150px] resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </CardContent>
      </Card>
      
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>LLM Output</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter the response from the LLM..."
            className="min-h-[150px] resize-none"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>Clear</Button>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
