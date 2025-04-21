
import { User } from "lucide-react";

const AboutDeveloper = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
    <div className="bg-background/90 rounded-xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 mb-4">
        <img 
          src="/lovable-uploads/4ff3afac-bfd0-4903-883b-efe761302fea.png" 
          alt="Developer Portrait" 
          className="rounded-full shadow-lg object-cover w-36 h-36 border-4 border-primary"
        />
        <div className="flex items-center gap-2">
          <User className="text-primary w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">About the Developer</h2>
        </div>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-xl font-semibold text-primary">Smit</p>
        <p className="text-lg">Founder & Full Stack Developer</p>
        <p className="text-lg">AVEON AI INDIA</p>
        <p className="text-md text-muted-foreground">
          This project is developed and maintained by a passionate developer dedicated to safe, responsible, and innovative AI solutions.
        </p>
      </div>
    </div>
  </div>
);

export default AboutDeveloper;

