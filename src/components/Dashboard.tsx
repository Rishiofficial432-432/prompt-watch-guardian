
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { DashboardData } from "@/types/models";
import { 
  TrendingUp, 
  TrendingDown, 
  ChartPie, 
  ChartBar, 
  ChartLine, 
  Activity, 
  AlertCircle, 
  Clock, 
  Shield, 
  ArrowUp, 
  ArrowDown, 
  Calendar,
  Info
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface DashboardProps {
  data: DashboardData;
}

function getRiskColor(val: number) {
  if (val >= 70) return "#EA4C4C";    // High
  if (val >= 40) return "#F7B955";    // Medium
  return "#4CAF50";                   // Low
}

// Mock data for the enhanced dashboard
const mockTimeData = [
  { name: "Jan", biosafety: 40, cybersecurity: 24 },
  { name: "Feb", biosafety: 30, cybersecurity: 13 },
  { name: "Mar", biosafety: 20, cybersecurity: 38 },
  { name: "Apr", biosafety: 27, cybersecurity: 39 },
  { name: "May", biosafety: 18, cybersecurity: 48 },
  { name: "Jun", biosafety: 23, cybersecurity: 38 },
  { name: "Jul", biosafety: 34, cybersecurity: 43 },
];

const riskDistribution = [
  { name: "Very Low", value: 15 },
  { name: "Low", value: 30 },
  { name: "Medium", value: 35 },
  { name: "High", value: 12 },
  { name: "Critical", value: 8 },
];

const recentActivities = [
  { id: 1, action: "High risk prompt detected", time: "2 mins ago", severity: "high" },
  { id: 2, action: "System scan completed", time: "15 mins ago", severity: "low" },
  { id: 3, action: "New rule added: Bio-Risk-XCV", time: "1 hour ago", severity: "medium" },
  { id: 4, action: "Export completed", time: "3 hours ago", severity: "low" },
  { id: 5, action: "Critical vulnerability detected", time: "Yesterday", severity: "high" },
];

const COLORS = ['#4CAF50', '#8BC34A', '#F7B955', '#FF9800', '#EA4C4C'];

export const Dashboard = ({ data }: DashboardProps) => {
  const { totalFlagged, categoryBreakdown, recentScores } = data;
  const [showTooltip, setShowTooltip] = useState(false);

  const categoryData = [
    { name: "Biosafety", value: categoryBreakdown.biosafety, fill: "#9b87f5" },
    { name: "Cybersecurity", value: categoryBreakdown.cybersecurity, fill: "#0EA5E9" }
  ];

  const latestScore = recentScores.length > 0 ? recentScores[recentScores.length - 1].score : 0;
  const prevScore = recentScores.length > 1 ? recentScores[recentScores.length - 2].score : null;
  const hasIncreased = prevScore !== null ? latestScore > prevScore : null;

  // For Pie chart insight: overall splits
  const pieTotal = categoryData.reduce((a, b) => a + (b.value || 0), 0);
  
  // Calculate weekly change
  const weeklyChange = prevScore !== null ? ((latestScore - prevScore) / prevScore * 100).toFixed(1) : '0';

  return (
    <section className="space-y-6 fade-in">
      {/* Overview Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Safety Score" 
          value={latestScore} 
          change={hasIncreased} 
          changeValue={prevScore !== null ? latestScore - prevScore : 0}
          icon={<Shield className="text-primary" />}
          tooltip="Current overall safety score based on recent analyses"
        />
        
        <StatsCard 
          title="Flagged Prompts" 
          value={totalFlagged} 
          change={true} 
          changeValue={3}
          icon={<AlertCircle className="text-[#EA4C4C]" />}
          tooltip="Total number of prompts that triggered safety concerns"
        />
        
        <StatsCard 
          title="Weekly Change" 
          value={`${weeklyChange}%`} 
          change={Number(weeklyChange) >= 0} 
          changeValue={0}
          icon={<Activity className="text-[#8BC34A]" />}
          tooltip="Percentage change in safety score over the past week"
        />
        
        <StatsCard 
          title="Risk Level" 
          value={getRiskLevel(latestScore)} 
          change={null} 
          changeValue={0}
          icon={<Info className="text-[#0EA5E9]" />}
          tooltip="Current risk assessment level based on safety score"
          customColor={getRiskColor(latestScore)}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Safety Score Gauge */}
        <Card className="glass md:col-span-1 card-animated-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5 text-[#9b87f5]" />
              Safety Overview
            </CardTitle>
            <CardDescription>Current safety assessment and score</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center">
              <Gauge score={latestScore} />
              <div className={`mt-2 flex items-center gap-1.5
                ${hasIncreased == null
                ? "text-gray-400"
                : hasIncreased
                  ? "text-green-500"
                  : "text-[#EA4C4C]"} animate-fade-in`}>
                {hasIncreased == null ? null : hasIncreased ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {prevScore !== null &&
                  <span className="text-sm font-medium"> {latestScore - prevScore >= 0 ? '+' : ''}{latestScore - prevScore} pts</span>}
              </div>
              
              <div className="w-full mt-4">
                <div className="flex justify-between mb-1 text-xs">
                  <span>Risk Category</span>
                  <span className="font-medium">{getRiskLevel(latestScore)}</span>
                </div>
                <Progress value={getInverseScore(latestScore)} 
                  className="h-2 bg-gray-100" 
                  indicatorClassName={getProgressColor(latestScore)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Category Breakdown */}
        <Card className="glass md:col-span-1 card-animated-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ChartPie className="h-5 w-5 text-[#0ea5e9]" />
              Risk Categories
            </CardTitle>
            <CardDescription>Distribution of risk by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive
                  animationDuration={1200}
                  animationBegin={300}
                >
                  {categoryData.map((entry, idx) => <Cell key={idx} fill={entry.fill} className="pulse" />)}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} issues`, name]} />
                <Legend 
                  formatter={(value, entry) => <span className="text-xs font-medium">{value}</span>}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass md:col-span-1 card-animated-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-[#9b87f5]" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system activities and alerts</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[180px] px-6">
              <ul className="space-y-2 py-1 stagger-fade-in">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-center justify-between text-sm border-b border-border/40 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getSeverityColor(activity.severity)}`}></span>
                      <span>{activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Historical Risk Trends (charts row) */}
        <Card className="glass md:col-span-2 card-animated-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ChartLine className="h-5 w-5 text-[#0ea5e9]" />
              Risk Trends
            </CardTitle>
            <CardDescription>Historical risk patterns by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockTimeData}>
                <defs>
                  <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorCyber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="biosafety" 
                  name="Biosafety" 
                  stroke="#9b87f5" 
                  fillOpacity={1} 
                  fill="url(#colorBio)" 
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="cybersecurity" 
                  name="Cybersecurity" 
                  stroke="#0EA5E9" 
                  fillOpacity={1} 
                  fill="url(#colorCyber)" 
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Legend 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="glass md:col-span-1 card-animated-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ChartBar className="h-5 w-5 text-[#9b87f5]" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Breakdown by risk severity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart 
                data={riskDistribution}
                barCategoryGap={5}
                barGap={2}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip cursor={{ fill: 'rgba(200, 200, 250, 0.1)' }} />
                <Bar 
                  dataKey="value" 
                  name="Count" 
                  animationDuration={1500}
                  animationBegin={500}
                  radius={[4, 4, 0, 0]}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Score Trends */}
        <Card className="glass md:col-span-3 card-animated-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-[#0ea5e9]" />
              Recent Safety Scores
            </CardTitle>
            <CardDescription>Detailed view of safety score evolution</CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={recentScores}>
                <CartesianGrid strokeDasharray="2 3" strokeOpacity={0.25}/>
                <XAxis 
                  dataKey="timestamp"
                  tick={{ fontSize: 9 }} 
                  angle={-25}
                  tickLine={false}
                  axisLine={false}
                  height={35}
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid rgba(180, 190, 230, 0.3)' }} 
                  formatter={(value) => [`${value}/100`, 'Safety Score']}
                  cursor={{ stroke: '#9b87f5', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#9b87f5"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#9b87f5" }}
                  activeDot={{ r: 8, fill: "#0EA5E9", className: "pulse" }}
                  className="animate-fade-in"
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* Optional: Overlay GIF on chart, e.g. Windows 11 style */}
            <div className="flex justify-end">
              <img src="/win11-live.gif" alt="Windows 11 live visual" className="w-16 h-10 rounded-xl shadow-lg mt-2" style={{objectFit:"cover", opacity:0.55}} onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}}/>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeValue, 
  icon, 
  tooltip,
  customColor 
}: { 
  title: string, 
  value: string | number, 
  change: boolean | null, 
  changeValue: number, 
  icon: React.ReactNode,
  tooltip: string,
  customColor?: string 
}) => {
  const [showTip, setShowTip] = useState(false);
  
  return (
    <Card className="glass card-animated-border">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 
              className="text-2xl font-bold mt-1" 
              style={customColor ? {color: customColor} : {}}
            >
              {value}
            </h3>
            {change !== null && (
              <div className={`flex items-center mt-1 text-xs ${change ? 'text-green-500' : 'text-[#EA4C4C]'}`}>
                {change ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                <span>{changeValue} {change ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </div>
          <div 
            className="relative p-2 rounded-full bg-background/50"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
          >
            {icon}
            {showTip && (
              <div className="absolute right-0 top-full mt-2 z-10 p-2 text-xs bg-foreground text-background rounded-md shadow-lg whitespace-nowrap scale-in">
                {tooltip}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Gauge Component
function Gauge({ score }: { score: number }) {
  const radius = 60, stroke = 10;
  const normalized = Math.min(100, Math.max(0, score));
  const circ = 2 * Math.PI * radius;
  const offset = circ - (normalized / 100) * circ;
  const color = getRiskColor(normalized);

  return (
    <div className="relative flex justify-center items-center">
      <svg width={140} height={140} className="block mb-1 fade-in pulse" style={{filter:'drop-shadow(0 0 0.4rem #0002)'}}>
        <circle
          cx={70}
          cy={70}
          r={radius}
          stroke="#eaeaea"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={70}
          cy={70}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(.7,.2,0,1), stroke 0.8s",
            filter: `drop-shadow(0 0 6px ${color}60)`
          }}
        />
        <text
          x="50%" y="53%" textAnchor="middle"
          fontSize="2rem" fontWeight="bold"
          fill="hsl(var(--foreground))"
          style={{filter: "brightness(1.15)"}}
        >
          {score}
        </text>
        <text
          x="50%" y="70%" textAnchor="middle"
          fontSize="0.7rem" fontWeight="normal"
          fill="hsl(var(--muted-foreground))"
        >
          out of 100
        </text>
      </svg>
    </div>
  );
}

// Utility functions
function getRiskLevel(score: number): string {
  if (score >= 80) return "Safe";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Caution";
  if (score >= 20) return "Risky";
  return "Critical";
}

function getInverseScore(score: number): number {
  return 100 - score;
}

function getProgressColor(score: number): string {
  if (score >= 80) return "bg-[#4CAF50]";
  if (score >= 60) return "bg-[#8BC34A]";
  if (score >= 40) return "bg-[#F7B955]";
  if (score >= 20) return "bg-[#FF9800]";
  return "bg-[#EA4C4C]";
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case "high": return "bg-[#EA4C4C]";
    case "medium": return "bg-[#F7B955]";
    case "low": return "bg-[#4CAF50]";
    default: return "bg-muted";
  }
}
