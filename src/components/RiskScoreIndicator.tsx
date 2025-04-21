
import { cn } from "@/lib/utils";

interface RiskScoreIndicatorProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: boolean;
}

export const RiskScoreIndicator = ({ 
  score, 
  size = "md", 
  label = true 
}: RiskScoreIndicatorProps) => {
  const getRiskLevel = (score: number) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return "risk-high";
    if (score >= 40) return "risk-medium";
    return "risk-low";
  };

  const sizeClasses = {
    sm: "text-sm w-10 h-10",
    md: "text-xl w-16 h-16",
    lg: "text-3xl w-24 h-24"
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white",
          sizeClasses[size],
          `bg-${getRiskColor(score)}`
        )}
      >
        {score}
      </div>
      {label && (
        <div className="mt-1 text-xs font-medium">
          {getRiskLevel(score)} Risk
        </div>
      )}
    </div>
  );
};
