import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Database
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Analytics = () => {
  // Mapping gaps data for pie chart
  const mappingData = [
    { name: 'Mapped Codes', value: 80, color: 'hsl(var(--primary))' },
    { name: 'Unmapped Codes', value: 20, color: 'hsl(var(--destructive))' },
  ];

  // System performance data
  const performanceData = [
    { metric: 'Search Accuracy', value: 94, target: 95 },
    { metric: 'Translation Speed', value: 87, target: 90 },
    { metric: 'Code Coverage', value: 80, target: 85 },
    { metric: 'User Satisfaction', value: 92, target: 90 }
  ];

  // Usage statistics
  const usageStats = [
    { category: 'Fever/Jwara', namaste: 45, icd: 42 },
    { category: 'Respiratory', namaste: 38, icd: 35 },
    { category: 'Digestive', namaste: 32, icd: 28 },
    { category: 'Neurological', namaste: 25, icd: 22 },
    { category: 'Cardiac', namaste: 18, icd: 16 }
  ];

  const keyMetrics = [
    { 
      title: "Total Code Pairs", 
      value: "1,247", 
      change: "+12%", 
      icon: Database,
      color: "text-primary"
    },
    { 
      title: "Mapping Accuracy", 
      value: "92%", 
      change: "+5%", 
      icon: Target,
      color: "text-secondary"
    },
    { 
      title: "Active Translations", 
      value: "234", 
      change: "+8%", 
      icon: TrendingUp,
      color: "text-accent"
    },
    { 
      title: "Coverage Gap", 
      value: "20%", 
      change: "-3%", 
      icon: AlertTriangle,
      color: "text-destructive"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Mapping gaps analysis and system performance metrics for dual-coding system
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                    <Badge variant={metric.change.startsWith('+') ? 'default' : 'destructive'} className="mt-1">
                      {metric.change} vs last month
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapping Gaps Pie Chart */}
        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Mapping Coverage Overview</span>
            </CardTitle>
            <CardDescription>
              Visual representation of code mapping completion status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mappingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mappingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">80%</div>
                <div className="text-sm text-muted-foreground">Mapped Codes</div>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">20%</div>
                <div className="text-sm text-muted-foreground">Unmapped Codes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span>System Performance Metrics</span>
            </CardTitle>
            <CardDescription>
              Key performance indicators and target achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceData.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {metric.value}% / {metric.target}%
                    </span>
                    {metric.value >= metric.target ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                </div>
                <Progress value={metric.value} className="h-3" />
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}% | 
                  Status: {metric.value >= metric.target ? 'Achieved' : 'Below Target'}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Usage Statistics */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-accent" />
            <span>Code Usage by Medical Category</span>
          </CardTitle>
          <CardDescription>
            Comparison of NAMASTE and ICD-11 code usage across medical categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="namaste" fill="hsl(var(--secondary))" name="NAMASTE Codes" />
                <Bar dataKey="icd" fill="hsl(var(--primary))" name="ICD-11 Codes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Demo Example */}
      <Card className="bg-accent/10 border-accent">
        <CardHeader>
          <CardTitle className="text-accent-foreground">Demo Analytics Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="font-medium">Sample Dashboard Output:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-primary">Pie Chart Data:</div>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Mapped Codes: 80%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Unmapped Codes: 20%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-medium text-secondary">Performance Stats:</div>
                <div className="space-y-1 mt-1">
                  <div>• Mapping Accuracy: 92%</div>
                  <div>• System Coverage: 80%</div>
                  <div>• Translation Speed: 87%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;