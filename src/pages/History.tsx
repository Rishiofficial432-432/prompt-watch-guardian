
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Search, Download, History as HistoryIcon, Filter } from "lucide-react";
import { format } from "date-fns";

const History = () => {
  const [date, setDate] = useState<Date>();

  const historyItems = [
    { id: 1, action: "Login Attempt", user: "admin@guardrail.ai", status: "success", timestamp: "Today, 10:23 AM", details: "Successful login from IP 192.168.1.105" },
    { id: 2, action: "Rule Change", user: "admin@guardrail.ai", status: "warning", timestamp: "Today, 9:45 AM", details: "Modified firewall rules for external access" },
    { id: 3, action: "Analysis Run", user: "system", status: "info", timestamp: "Today, 8:30 AM", details: "Scheduled security analysis completed" },
    { id: 4, action: "Alert Triggered", user: "system", status: "error", timestamp: "Yesterday, 11:52 PM", details: "Critical security vulnerability detected in application" },
    { id: 5, action: "User Created", user: "admin@guardrail.ai", status: "success", timestamp: "Yesterday, 4:17 PM", details: "New user account created: developer@guardrail.ai" },
    { id: 6, action: "Settings Changed", user: "admin@guardrail.ai", status: "info", timestamp: "Yesterday, 2:05 PM", details: "Updated notification preferences" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'info':
      default:
        return <Badge className="bg-blue-500">Info</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Activity History</h1>
            <p className="text-muted-foreground">Review past activities and system events</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Activity Log</CardTitle>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8 w-full sm:w-[250px]"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-[180px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Select>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 divide-y">
                    {historyItems.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <HistoryIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.action}</h3>
                              <p className="text-sm text-muted-foreground">Performed by {item.user}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 self-end md:self-auto">
                            {getStatusBadge(item.status)}
                            <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="system" className="mt-6">
                <div className="rounded-md border">
                  <div className="p-4 text-center text-muted-foreground">
                    <p>System logs filtered view</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="user" className="mt-6">
                <div className="rounded-md border">
                  <div className="p-4 text-center text-muted-foreground">
                    <p>User activity logs filtered view</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <div className="rounded-md border">
                  <div className="p-4 text-center text-muted-foreground">
                    <p>Security events filtered view</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="text-sm text-muted-foreground">
              Showing 6 of 56 records
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default History;
