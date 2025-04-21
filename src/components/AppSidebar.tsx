
import { useLocation, Link } from "react-router-dom";
import { navLinks, secondaryLinks } from "@/data/sidebarLinks";
import { Separator } from "@/components/ui/separator";
import { User, Shield } from "lucide-react";
import { useState } from "react";

const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function AppSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={`glass h-screen ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out flex flex-col border-r border-border/40`}>
      <div className="p-4 flex items-center justify-between border-b border-border/40">
        <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && <h1 className="text-lg font-bold slide-in-left">Truth Guard</h1>}
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav>
          <ul className="space-y-2">
            {navLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-all duration-200 w-full
                      ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'hover:bg-background/80'}
                      focus:outline-none focus:ring-2 focus:ring-ring`}
                  >
                    <span><Icon className="w-5 h-5" /></span>
                    {!sidebarCollapsed && <span className="slide-in-left">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Separator className="my-4" />

          <ul className="space-y-2">
            {secondaryLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-2 rounded-lg text-sm hover:bg-background/80 transition-all duration-200 w-full
                      ${location.pathname === item.path ? 'bg-primary/10 text-primary' : ''}
                      focus:outline-none focus:ring-2 focus:ring-ring`}
                  >
                    <span><Icon className="w-5 h-5" /></span>
                    {!sidebarCollapsed && <span className="slide-in-left">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-border/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-foreground/10 flex items-center justify-center">
            <User className="w-4 h-4 text-accent-foreground" />
          </div>
          {!sidebarCollapsed && (
            <div className="text-sm slide-in-left">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@truthguard.ai</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
