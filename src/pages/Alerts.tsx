
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, AlertTriangle, CheckCircle, Clock, Settings } from "lucide-react";

const Alerts = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Alert Management</h1>
            <p className="text-muted-foreground">Configure and monitor system alerts</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="alerts-mode" 
                checked={alertsEnabled} 
                onCheckedChange={setAlertsEnabled} 
              />
              <label htmlFor="alerts-mode" className="text-sm font-medium">
                {alertsEnabled ? 'Alerts Enabled' : 'Alerts Disabled'}
              </label>
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full mt-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="active">
              Active
              <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">4</Badge>
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Configure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-lg">Critical Security Threat Detected</CardTitle>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 15 minutes ago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Unusual authentication patterns detected from IP 192.168.1.143, potential brute force attack in progress.</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button size="sm">Take Action</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <CardTitle className="text-lg">High Server Load</CardTitle>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">Warning</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 42 minutes ago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>System load has exceeded 85% for more than 10 minutes. This may impact performance.</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button size="sm" variant="secondary">Investigate</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">Database Backup Required</CardTitle>
                    </div>
                    <Badge className="bg-blue-500/80">Information</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 2 hours ago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Scheduled database backup has not run in the last 48 hours. Manual backup recommended.</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button size="sm" variant="outline">Backup Now</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alerts History</CardTitle>
                <CardDescription>
                  Review past alerts and responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">System Update Complete</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 11:23 PM</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">User Account Locked</p>
                        <p className="text-sm text-muted-foreground">Apr 20, 2025 at 8:14 AM</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">Unusual Network Activity</p>
                        <p className="text-sm text-muted-foreground">Apr 19, 2025 at 3:42 PM</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Load More History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>
                  Customize how and when you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">Authentication and access attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Performance Alerts</p>
                      <p className="text-sm text-muted-foreground">System load and response times</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Alerts</p>
                      <p className="text-sm text-muted-foreground">Updates and scheduled tasks</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Alerts;
