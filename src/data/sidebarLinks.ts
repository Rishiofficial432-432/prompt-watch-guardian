
import {
  Shield,
  Search,
  Bell,
  Calendar,
  FileText,
  Info,
  User,
  Settings,
} from "lucide-react";

export const navLinks = [
  { icon: Shield, label: "Dashboard", path: "/dashboard" },
  { icon: Search, label: "Analysis", path: "/analysis" },
  { icon: Bell, label: "Alerts", path: "/alerts" },
  { icon: Calendar, label: "History", path: "/history" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Shield, label: "Rules", path: "/rules" },
  { icon: Info, label: "About", path: "/about" },
  { icon: User, label: "About Developer", path: "/about-developer" },
];

export const secondaryLinks = [
  { icon: User, label: "Account", path: "/account" },
  { icon: Settings, label: "Settings", path: "/settings" },
];
