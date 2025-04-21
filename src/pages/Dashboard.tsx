
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart4, 
  AlertTriangle, 
  Activity, 
  Shield, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  FileText,
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">System overview and key metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Last updated: Just now
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Security Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">87/100</div>
                  <Badge className="bg-green-500">Good</Badge>
                </div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+3 from last week</span>
                </div>
              </div>
              <div className="w-full bg-secondary/20 h-2 rounded-full mt-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">4</div>
                  <Badge variant="outline" className="border-amber-500 text-amber-500">Warning</Badge>
                </div>
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+2 since yesterday</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                  <div className="font-bold">1</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Warning</div>
                  <div className="font-bold">3</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Load
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">42%</div>
                  <Badge className="bg-green-500">Normal</Badge>
                </div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>-5% from peak hours</span>
                </div>
              </div>
              <div className="w-full bg-secondary/20 h-2 rounded-full mt-4">
                <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Protected Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">1,284</div>
                  <Badge className="bg-primary">Total</Badge>
                </div>
                <div className="flex items-center mt-1 text-muted-foreground text-sm">
                  <span>98% Coverage</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                  <div className="font-bold">86</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Standard</div>
                  <div className="font-bold">1,198</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>
                  Performance metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-accent/30 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <BarChart4 className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">Security Metrics Visualization</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Last 7 Days</Button>
                <Button variant="outline" size="sm">Last 30 Days</Button>
                <Button variant="outline" size="sm">Last Quarter</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 hover:bg-accent/50 rounded-md transition-colors">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Critical Security Alert</p>
                      <p className="text-sm text-muted-foreground">Unusual authentication patterns detected</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">High Priority</Badge>
                        <span className="text-xs text-muted-foreground">15 minutes ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 hover:bg-accent/50 rounded-md transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Security Rules Updated</p>
                      <p className="text-sm text-muted-foreground">Admin updated 3 security rules</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">System Change</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 hover:bg-accent/50 rounded-md transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                      <Activity className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">System Analysis Complete</p>
                      <p className="text-sm text-muted-foreground">Weekly security scan completed successfully</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">Automated</Badge>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>
                  Current protection status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Authentication Security</span>
                    <span className="font-medium text-sm">92%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary/20 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Data Protection</span>
                    <span className="font-medium text-sm">85%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary/20 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Threat Prevention</span>
                    <span className="font-medium text-sm">78%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary/20 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Vulnerability Management</span>
                    <span className="font-medium text-sm">65%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary/20 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Improve Security</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Run Security Scan
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View All Alerts
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  System Performance
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Security Report</p>
                      <p className="text-xs text-muted-foreground">Every Monday at 9 AM</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Compliance Report</p>
                      <p className="text-xs text-muted-foreground">1st of each month</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
