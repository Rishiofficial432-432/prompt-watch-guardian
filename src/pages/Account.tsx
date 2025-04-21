
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Key, Bell, Shield, LogOut, Lock, CreditCard, HelpCircle } from "lucide-react";

const Account = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Summary Card */}
          <Card className="flex-1">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg bg-primary/20 text-primary">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">Admin User</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      admin@guardrail.ai
                      <Badge className="ml-2">Administrator</Badge>
                    </CardDescription>
                  </div>
                </div>
                <Button>Edit Profile</Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input id="email" type="email" defaultValue="admin@guardrail.ai" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="jobTitle" className="text-sm font-medium">Job Title</label>
                  <Input id="jobTitle" defaultValue="System Administrator" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">Department</label>
                  <Input id="department" defaultValue="IT Security" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">System display language</p>
                  </div>
                  <div className="w-[150px]">
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Theme Preference</p>
                    <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                  </div>
                  <div className="w-[150px]">
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option>System Default</option>
                      <option>Light Mode</option>
                      <option>Dark Mode</option>
                    </select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Time Zone</p>
                    <p className="text-sm text-muted-foreground">Set your local time zone</p>
                  </div>
                  <div className="w-[150px]">
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option>UTC (GMT+0)</option>
                      <option>EST (GMT-5)</option>
                      <option>PST (GMT-8)</option>
                      <option>CET (GMT+1)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Update Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Change Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Enhance your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require a code in addition to your password</p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Questions</p>
                    <p className="text-sm text-muted-foreground">Set up security questions for account recovery</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login History</p>
                    <p className="text-sm text-muted-foreground">View your recent login activity</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical security events and breaches</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Switch id="security-email" defaultChecked />
                      <label htmlFor="security-email" className="text-sm">Email</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="security-push" defaultChecked />
                      <label htmlFor="security-push" className="text-sm">Push</label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Maintenance and feature updates</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Switch id="updates-email" defaultChecked />
                      <label htmlFor="updates-email" className="text-sm">Email</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="updates-push" />
                      <label htmlFor="updates-push" className="text-sm">Push</label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reports Ready</p>
                    <p className="text-sm text-muted-foreground">Notifications when reports are generated</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Switch id="reports-email" defaultChecked />
                      <label htmlFor="reports-email" className="text-sm">Email</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="reports-push" defaultChecked />
                      <label htmlFor="reports-push" className="text-sm">Push</label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Plan</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary">Enterprise</Badge>
                      <p className="text-sm text-muted-foreground">$199/month</p>
                    </div>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium mb-2">Payment Method</p>
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Billing History</p>
                  <div className="border rounded-md divide-y">
                    <div className="flex justify-between items-center p-3">
                      <div>
                        <p className="text-sm font-medium">April 2025</p>
                        <p className="text-xs text-muted-foreground">Invoice #INV-2025-04</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-medium">$199.00</p>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3">
                      <div>
                        <p className="text-sm font-medium">March 2025</p>
                        <p className="text-xs text-muted-foreground">Invoice #INV-2025-03</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-medium">$199.00</p>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button variant="outline" className="w-full">Cancel Subscription</Button>
                <Button className="w-full">Manage Billing</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start">
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Configure Alerts
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Get Help
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible account actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-sm text-muted-foreground">Sign out from all devices</p>
              </div>
              <Button variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
