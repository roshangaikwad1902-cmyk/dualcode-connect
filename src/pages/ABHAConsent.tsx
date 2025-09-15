import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle2, XCircle, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const ABHAConsent = () => {
  const [abhaId, setAbhaId] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  // Load saved consent status on component mount
  useEffect(() => {
    const savedConsent = localStorage.getItem("abhaConsent");
    const savedAbhaId = localStorage.getItem("abhaId");
    if (savedConsent) {
      setConsentGiven(savedConsent === "true");
      setIsSaved(true);
    }
    if (savedAbhaId) {
      setAbhaId(savedAbhaId);
    }
  }, []);

  const handleSaveConsent = () => {
    if (!abhaId.trim()) {
      toast({
        title: "ABHA ID Required",
        description: "Please enter a valid ABHA ID",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage (in real app, this would be API call)
    localStorage.setItem("abhaConsent", consentGiven.toString());
    localStorage.setItem("abhaId", abhaId);
    setIsSaved(true);

    toast({
      title: "Consent Preferences Saved",
      description: consentGiven 
        ? "Data sharing enabled for EMR integration" 
        : "Data sharing disabled. Upload access restricted.",
    });
  };

  const getConsentStatus = () => {
    if (!isSaved) return { text: "Not Set", variant: "secondary" as const, icon: null };
    if (consentGiven) return { 
      text: "Allowed", 
      variant: "default" as const, 
      icon: <CheckCircle2 className="w-4 h-4" /> 
    };
    return { 
      text: "Denied", 
      variant: "destructive" as const, 
      icon: <XCircle className="w-4 h-4" /> 
    };
  };

  const status = getConsentStatus();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">ABHA Consent Management</h1>
        <p className="text-muted-foreground">
          Configure your Ayushman Bharat Health Account (ABHA) consent preferences for EMR data sharing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consent Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-medical">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Consent Configuration</span>
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Set your data sharing preferences for healthcare integration
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="abhaId">ABHA ID</Label>
                <Input
                  id="abhaId"
                  placeholder="Enter your 14-digit ABHA ID (e.g., 12-3456-7890-1234)"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  maxLength={17}
                />
                <p className="text-xs text-muted-foreground">
                  Demo: Use any 14-digit number format
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="consent-toggle" className="text-base font-medium">
                    Data Sharing Consent
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow EMR systems to access your health records for dual coding
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${consentGiven ? 'text-green-600' : 'text-red-600'}`}>
                    {consentGiven ? 'Allow' : 'Deny'}
                  </span>
                  <Switch
                    id="consent-toggle"
                    checked={consentGiven}
                    onCheckedChange={setConsentGiven}
                  />
                </div>
              </div>

              {isSaved && (
                <div className={`p-4 rounded-lg ${
                  consentGiven ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {status.icon}
                    <span className={`font-medium ${
                      consentGiven ? 'text-green-800' : 'text-red-800'
                    }`}>
                      Current Status: {status.text}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    consentGiven ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {consentGiven 
                      ? 'You can proceed with encounter uploads and EMR integration.'
                      : 'Encounter uploads are blocked until consent is provided.'}
                  </p>
                </div>
              )}

              <Button 
                onClick={handleSaveConsent}
                className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300"
                disabled={!abhaId.trim()}
              >
                Save Consent Preferences
              </Button>

              {isSaved && consentGiven && (
                <Link to="/upload">
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Proceed to Encounter Upload
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Current Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <Badge variant={status.variant} className="text-sm px-3 py-1">
                  {status.icon && <span className="mr-1">{status.icon}</span>}
                  {status.text}
                </Badge>
                {abhaId && (
                  <div className="text-sm">
                    <strong>ABHA ID:</strong> {abhaId}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/10 border-accent">
            <CardHeader>
              <CardTitle className="text-accent-foreground">About ABHA Consent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <strong>Privacy Control:</strong> You decide who accesses your health data
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <strong>Interoperability:</strong> Enables seamless healthcare data exchange
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <strong>Dual Coding:</strong> Supports AYUSH + ICD-11 integration
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ABHAConsent;