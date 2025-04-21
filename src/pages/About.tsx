
import { Book, Info, User } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gradient-to-b from-background to-background/90">
    <Tabs defaultValue="project" className="w-full max-w-3xl">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="project" className="text-base">
          <Book className="w-5 h-5 mr-2 text-primary" /> 
          About Truth Guard
        </TabsTrigger>
        <TabsTrigger value="developer" className="text-base">
          <User className="w-5 h-5 mr-2 text-primary" /> 
          The Developer
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="project" className="space-y-6">
        <Card className="glass rounded-xl shadow-lg border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Book className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Truth Guard</h2>
            </div>
            
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              <span className="font-semibold text-primary">Truth Guard</span> is an advanced AI-powered tool for safety analysis of Large Language Model (LLM) outputs, helping users flag risky or unsafe content reliably and efficiently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Key Features
                </h3>
                <ul className="space-y-3 ml-6 list-disc text-muted-foreground">
                  <li>Real-time textual risk analysis and flagging</li>
                  <li>Advanced biosafety and cybersecurity analysis</li>
                  <li>Comprehensive dashboard and report history</li>
                  <li>Custom rules and alert configuration</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To provide researchers, organizations, and AI developers with powerful tools to ensure the safety and reliability of AI outputs, promoting responsible innovation in artificial intelligence.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Link to="/dashboard">
                <Button className="gap-2">
                  <Shield className="w-5 h-5" />
                  Explore Safety Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="developer" className="space-y-6">
        <Card className="glass rounded-xl shadow-lg border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/4ff3afac-bfd0-4903-883b-efe761302fea.png" 
                  alt="Smit - Developer Portrait" 
                  className="rounded-full shadow-lg object-cover w-48 h-48 border-4 border-primary/30"
                />
              </div>
              
              <div className="space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-3xl font-bold text-primary">Smit</h3>
                  <p className="text-xl font-medium">Founder & Full Stack Developer</p>
                  <p className="text-lg text-muted-foreground">AVEON AI INDIA</p>
                </div>
                
                <div className="max-w-xl">
                  <p className="text-muted-foreground leading-relaxed">
                    As the founder of AVEON AI INDIA, Smit brings extensive expertise in AI safety, 
                    full-stack development, and a passion for responsible AI innovation. 
                    With Truth Guard, he aims to provide developers and organizations 
                    with powerful tools to ensure AI technologies are developed safely and ethically.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-1" /> Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4 mr-1" /> More About AVEON AI
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

export default About;
