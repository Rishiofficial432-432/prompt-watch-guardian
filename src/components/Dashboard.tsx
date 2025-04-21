
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Legend
} from "recharts";
import { DashboardData } from "@/types/models";
import { TrendingUp, TrendingDown, ChartPie, ChartBar, ChartLine } from "lucide-react";

interface DashboardProps {
  data: DashboardData;
}

function getRiskColor(val: number) {
  if (val >= 70) return "#EA4C4C";    // High
  if (val >= 40) return "#F7B955";    // Medium
  return "#4CAF50";                   // Low
}

export const Dashboard = ({ data }: DashboardProps) => {
  const { totalFlagged, categoryBreakdown, recentScores } = data;

  const categoryData = [
    { name: "Biosafety", value: categoryBreakdown.biosafety, fill: "#9b87f5" },
    { name: "Cybersecurity", value: categoryBreakdown.cybersecurity, fill: "#0EA5E9" }
  ];

  const latestScore = recentScores.length > 0 ? recentScores[recentScores.length - 1].score : 0;
  const prevScore = recentScores.length > 1 ? recentScores[recentScores.length - 2].score : null;
  const hasIncreased = prevScore !== null ? latestScore > prevScore : null;

  // For Pie chart insight: overall splits
  const pieTotal = categoryData.reduce((a, b) => a + (b.value || 0), 0);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
      {/* Overall Score Gauge */}
      <Card className="glass flex flex-col justify-center items-center card-animated-border">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="flex flex-col items-center gap-1 text-lg font-semibold">
            <span>
              <ChartPie className="inline w-5 h-5 text-[#9b87f5] mb-1" />
            </span>
            Current Safety Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <Gauge score={latestScore} />
            <div className={`mt-3 flex items-center gap-1
                ${hasIncreased == null
                ? "text-gray-400"
                : hasIncreased
                  ? "text-green-500"
                  : "text-[#EA4C4C]"} animate-fade-in`}>
              {hasIncreased == null ? null : hasIncreased ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {prevScore !== null &&
                <span className="text-xs"> {latestScore - prevScore >= 0 ? '+' : ''}{latestScore - prevScore} pts</span>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Risk Count + Pie */}
      <Card className="glass card-animated-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ChartBar className="inline w-5 h-5 text-[#0ea5e9]" />
            Flagged Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold tracking-tight pb-2 text-transparent bg-clip-text
            bg-gradient-to-r from-[#0EA5E9] to-[#9b87f5]">
            {totalFlagged}
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={25}
                outerRadius={40}
                dataKey="value"
                isAnimationActive
                label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
              >
                {categoryData.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
              </Pie>
              <Legend iconType="circle" layout="horizontal" align="center" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground text-center pt-1">
            Shows ratio of risk types. Total flagged = {pieTotal}
          </div>
        </CardContent>
      </Card>

      {/* Score Trendline: Soft Anim, glass, OneUI */}
      <Card className="glass card-animated-border col-span-1 row-span-2 flex flex-col justify-between">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ChartLine className="inline w-5 h-5 text-[#9b87f5]" />
            Recent Safety Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <ResponsiveContainer width="100%" height={145}>
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
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 8 }}/>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#9b87f5"
                strokeWidth={3}
                dot={{ r: 4, fill: "#9b87f5" }}
                activeDot={{ r: 8, fill: "#0EA5E9", className: "pulse" }}
                className="animate-fade-in"
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground mt-2 text-right">
            Latest score: <span className="font-medium">{latestScore}</span>/100
          </div>
          {/* Optional: Overlay GIF on chart, e.g. Windows 11 style */}
          <div className="flex justify-end">
            <img src="/win11-live.gif" alt="Windows 11 live visual" className="w-16 h-10 rounded-xl shadow-lg mt-2" style={{objectFit:"cover", opacity:0.55}} onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}}/>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};


// ------- Gauge for safety Score --------
function Gauge({ score }: { score: number }) {
  // Circular gauge (SVG), with soft anim
  const radius = 34, stroke = 7;
  const normalized = Math.min(100, Math.max(0, score));
  const circ = 2 * Math.PI * radius;
  const offset = circ - (normalized / 100) * circ;
  const color = getRiskColor(normalized);

  return (
    <svg width={85} height={85} className="block mb-1 fade-in pulse" style={{filter:'drop-shadow(0 0 0.4rem #0002)'}}>
      <circle
        cx={42.5}
        cy={42.5}
        r={radius}
        stroke="#eaeaea"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={42.5}
        cy={42.5}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.7s cubic-bezier(.7,.2,0,1), stroke 0.5s",
          filter: `drop-shadow(0 0 6px ${color}60)`
        }}
      />
      <text
        x="50%" y="53%" textAnchor="middle"
        fontSize="1.6rem" fontWeight="bold"
        fill="hsl(var(--foreground))"
        style={{filter: "brightness(1.15)"}}
      >
        {score}
      </text>
    </svg>
  );
}

