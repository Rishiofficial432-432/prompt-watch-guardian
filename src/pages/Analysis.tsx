
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Activity, AlertCircle, FileText } from "lucide-react";

const Analysis = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Analysis Dashboard</h1>
        <p className="text-muted-foreground">Analyze your data and get insights</p>
        
        <Tabs defaultValue="realtime" className="w-full mt-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="realtime">Realtime</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="predictive">Predictive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="realtime" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Live Analysis
                  </CardTitle>
                  <CardDescription>
                    Real-time data processing and analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-40 w-full bg-accent/30 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Live Chart Visualization</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Start Monitoring
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    Evaluate current security posture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Overall Risk</span>
                        <span className="font-medium">Medium</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2.5">
                        <div className="bg-primary/80 h-2.5 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Threat Level</span>
                        <span className="font-medium">Low</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2.5">
                        <div className="bg-primary/80 h-2.5 rounded-full w-[25%]"></div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="historical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Analysis</CardTitle>
                <CardDescription>
                  Review past data and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-accent/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Historical Data Visualization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="predictive" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Analysis</CardTitle>
                <CardDescription>
                  AI-powered prediction models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-accent/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Predictive Models Visualization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Current Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Schedule Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Configure Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
