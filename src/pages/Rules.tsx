
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Search, PlusCircle, Shield, AlertTriangle, Info, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Rules = () => {
  const [expandedRule, setExpandedRule] = useState<number | null>(null);
  
  const ruleSets = [
    { id: 1, name: "Default Security Rules", count: 12, active: true },
    { id: 2, name: "Compliance Framework", count: 8, active: true },
    { id: 3, name: "Custom Rules", count: 5, active: true },
  ];
  
  const securityRules = [
    { 
      id: 1, 
      name: "Block Suspicious Authentication Attempts", 
      description: "Blocks IP addresses after 5 failed login attempts within 10 minutes", 
      severity: "high", 
      category: "authentication", 
      enabled: true 
    },
    { 
      id: 2, 
      name: "Prevent Sensitive Data Access", 
      description: "Restricts access to sensitive data based on user role and authentication status", 
      severity: "critical", 
      category: "data", 
      enabled: true 
    },
    { 
      id: 3, 
      name: "Enforce Strong Passwords", 
      description: "Requires passwords to meet complexity requirements", 
      severity: "medium", 
      category: "authentication", 
      enabled: true 
    },
    { 
      id: 4, 
      name: "Monitor API Usage", 
      description: "Tracks and limits API requests to prevent abuse", 
      severity: "medium", 
      category: "api", 
      enabled: true 
    },
    { 
      id: 5, 
      name: "Detect Unusual Behavior Patterns", 
      description: "Identifies abnormal user activity that may indicate compromise", 
      severity: "high", 
      category: "behavior", 
      enabled: false 
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'authentication':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Authentication</Badge>;
      case 'data':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Data</Badge>;
      case 'api':
        return <Badge variant="outline" className="border-green-500 text-green-500">API</Badge>;
      case 'behavior':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Behavior</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Rules Management</h1>
            <p className="text-muted-foreground">Configure and manage security rules and policies</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              Import Rules
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rule Sets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ruleSets.map((ruleSet) => (
                  <div key={ruleSet.id} className="flex items-center justify-between group py-2">
                    <div>
                      <p className="font-medium">{ruleSet.name}</p>
                      <p className="text-sm text-muted-foreground">{ruleSet.count} rules</p>
                    </div>
                    <Switch checked={ruleSet.active} />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Rule Sets
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <span>Critical Rules</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Info className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>Medium Rules</span>
                  </div>
                  <span className="font-medium">12</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <span>Enabled Rules</span>
                  </div>
                  <span className="font-medium">20</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Security Rules</CardTitle>
                  
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search rules..."
                      className="pl-8 w-full md:w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full md:w-[400px] grid-cols-4">
                    <TabsTrigger value="all">All Rules</TabsTrigger>
                    <TabsTrigger value="enabled">Enabled</TabsTrigger>
                    <TabsTrigger value="disabled">Disabled</TabsTrigger>
                    <TabsTrigger value="high">High Priority</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                      {securityRules.map((rule) => (
                        <AccordionItem key={rule.id} value={`rule-${rule.id}`}>
                          <AccordionTrigger>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full pr-4 text-left">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full ${rule.enabled ? 'bg-primary/20' : 'bg-muted'} flex items-center justify-center`}>
                                  <Shield className={`h-4 w-4 ${rule.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                                <div>
                                  <h3 className="font-medium">{rule.name}</h3>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                {getCategoryBadge(rule.category)}
                                {getSeverityBadge(rule.severity)}
                                <Switch checked={rule.enabled} className="ml-2" />
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-2 pb-4 px-4 bg-accent/30 rounded-md">
                              <p className="mb-4">{rule.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Rule Configuration</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Rule ID:</span>
                                      <span>{rule.id}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Category:</span>
                                      <span>{rule.category}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Severity:</span>
                                      <span>{rule.severity}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Status:</span>
                                      <span>{rule.enabled ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Actions</h4>
                                  <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                      Edit Rule
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                      View History
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start text-red-500">
                                      Delete Rule
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                  
                  <TabsContent value="enabled" className="mt-6">
                    <div className="p-4 text-center text-muted-foreground">
                      <p>Enabled rules filtered view</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="disabled" className="mt-6">
                    <div className="p-4 text-center text-muted-foreground">
                      <p>Disabled rules filtered view</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="high" className="mt-6">
                    <div className="p-4 text-center text-muted-foreground">
                      <p>High priority rules filtered view</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 25 rules
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
