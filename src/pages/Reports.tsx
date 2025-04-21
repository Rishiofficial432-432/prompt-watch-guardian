
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Calendar, BarChart4, ChevronRight, Clock, Eye } from "lucide-react";

const Reports = () => {
  const recentReports = [
    { id: 1, title: "Monthly Security Assessment", type: "security", date: "Apr 20, 2025", status: "completed" },
    { id: 2, title: "Quarterly Compliance Audit", type: "compliance", date: "Apr 15, 2025", status: "completed" },
    { id: 3, title: "Weekly Performance Analysis", type: "performance", date: "Apr 14, 2025", status: "completed" },
    { id: 4, title: "Threat Intelligence Brief", type: "security", date: "Apr 10, 2025", status: "completed" },
  ];

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case 'security':
        return <Badge className="bg-blue-500/80">Security</Badge>;
      case 'compliance':
        return <Badge className="bg-purple-500/80">Compliance</Badge>;
      case 'performance':
        return <Badge className="bg-green-500/80">Performance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Generate and access detailed system reports</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Reports</CardTitle>
                    <CardDescription>
                      Access your most recently generated reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border divide-y">
                      {recentReports.map((report) => (
                        <div key={report.id} className="p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{report.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{report.date}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {getReportTypeBadge(report.type)}
                              <Button variant="outline" size="sm" className="h-8">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-1">
                      View All Reports
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Report Analytics</CardTitle>
                    <CardDescription>
                      Overview of your report generation patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 w-full bg-accent/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <BarChart4 className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-muted-foreground">Report Generation Trends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scheduled" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>
                      Manage your automated report generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border divide-y">
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Weekly Security Summary</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Every Monday at 8:00 AM</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className="bg-blue-500/80">Security</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Monthly Compliance Report</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>1st of every month at 9:00 AM</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className="bg-purple-500/80">Compliance</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Schedule New Report
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Templates</CardTitle>
                    <CardDescription>
                      Choose from pre-configured report templates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                        <h3 className="font-medium">Security Assessment</h3>
                        <p className="text-sm text-muted-foreground mt-1">Comprehensive security posture evaluation</p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                        <h3 className="font-medium">Compliance Audit</h3>
                        <p className="text-sm text-muted-foreground mt-1">Regulatory compliance verification</p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                        <h3 className="font-medium">Performance Analysis</h3>
                        <p className="text-sm text-muted-foreground mt-1">System performance and optimization</p>
                      </div>
                      
                      <div className="border rounded-md p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                        <h3 className="font-medium">Executive Summary</h3>
                        <p className="text-sm text-muted-foreground mt-1">High-level overview for management</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Download className="mr-2 h-4 w-4" />
                  Export All Reports
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-left">
                  <Eye className="mr-2 h-4 w-4" />
                  View Archive
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-left">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Report Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Security Reports</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="w-full h-2 bg-accent mt-1 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full w-[60%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Compliance Reports</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="w-full h-2 bg-accent mt-1 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full w-[40%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Performance Reports</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="w-full h-2 bg-accent mt-1 rounded-full">
                      <div className="h-full bg-green-500 rounded-full w-[25%]"></div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
