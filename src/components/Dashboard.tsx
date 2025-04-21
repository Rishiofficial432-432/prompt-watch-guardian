
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
  Cell
} from "recharts";
import { DashboardData } from "@/types/models";

interface DashboardProps {
  data: DashboardData;
}

export const Dashboard = ({ data }: DashboardProps) => {
  const { totalFlagged, categoryBreakdown, recentScores } = data;
  
  const categoryData = [
    { name: "Biosafety", value: categoryBreakdown.biosafety, color: "#9b87f5" },
    { name: "Cybersecurity", value: categoryBreakdown.cybersecurity, color: "#0EA5E9" }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Flagged Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalFlagged}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Risk Categories</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="value" nameKey="name">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 row-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Latest Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={recentScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 10 }} 
                angle={-45} 
                textAnchor="end"
                height={50}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
