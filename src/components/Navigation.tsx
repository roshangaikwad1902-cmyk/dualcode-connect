import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Activity, Search, ArrowRightLeft, Upload, BarChart3, Shield } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", icon: Activity, label: "Dashboard", description: "Overview & Menu" },
    { to: "/search", icon: Search, label: "Search Codes", description: "NAMASTE & ICD-11" },
    { to: "/translate", icon: ArrowRightLeft, label: "Translate", description: "Code Mapping" },
    { to: "/abha", icon: Shield, label: "ABHA", description: "Consent Management" },
    { to: "/upload", icon: Upload, label: "Upload", description: "EMR Integration" },
    { to: "/analytics", icon: BarChart3, label: "Analytics", description: "Mapping Insights" },
  ];

  return (
    <nav className="w-full bg-card border-b shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">AYUSH-ICD11</h1>
              <p className="text-xs text-muted-foreground">Dual Coding System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link key={item.to} to={item.to}>
                  <Card className={`p-3 transition-all duration-300 hover:shadow-hover cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-primary text-primary-foreground shadow-medical' 
                      : 'hover:bg-muted'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <div className="hidden md:block">
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;