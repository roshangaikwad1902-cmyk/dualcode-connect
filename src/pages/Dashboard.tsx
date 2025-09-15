import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowRightLeft, Upload, BarChart3, Stethoscope, Globe } from "lucide-react";

const Dashboard = () => {
  const menuItems = [
    {
      title: "Search Codes",
      description: "Search AYUSH NAMASTE and ICD-11 terminology with autocomplete",
      icon: Search,
      link: "/search",
      color: "bg-gradient-primary"
    },
    {
      title: "Translate Codes",
      description: "Map NAMASTE codes to ICD-11 with confidence scoring",
      icon: ArrowRightLeft,
      link: "/translate",
      color: "bg-gradient-secondary"
    },
    {
      title: "Upload Encounter",
      description: "Store patient encounters with dual coding system",
      icon: Upload,
      link: "/upload",
      color: "bg-gradient-primary"
    },
    {
      title: "Analytics Dashboard",
      description: "View mapping gaps and system performance metrics",
      icon: BarChart3,
      link: "/analytics",
      color: "bg-gradient-secondary"
    }
  ];

  const stats = [
    { label: "NAMASTE Codes", value: "1,247", icon: Stethoscope },
    { label: "ICD-11 Mappings", value: "956", icon: Globe },
    { label: "Mapping Accuracy", value: "92%", icon: ArrowRightLeft },
    { label: "Active Encounters", value: "234", icon: Upload }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dual-Coding Terminology System
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Bridging AYUSH NAMASTE traditional medicine codes with ICD-11 international standards 
          for seamless healthcare interoperability
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={index} to={item.link}>
              <Card className="h-full bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer group">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary group-hover:text-primary-dark transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Open Module
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Demo Notice */}
      <Card className="bg-accent/10 border-accent">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-accent-foreground">Prototype Demo</h3>
              <p className="text-sm text-muted-foreground">
                This is a demonstration prototype with dummy data for showcasing dual-coding capabilities. 
                All outputs are simulated for evaluation purposes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;