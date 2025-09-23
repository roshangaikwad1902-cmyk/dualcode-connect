import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRightLeft, CheckCircle, AlertCircle, ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TranslateCodes = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [translation, setTranslation] = useState(null);
  const [open, setOpen] = useState(false);

  // Dummy NAMASTE codes
  const namasteCodes = [
    { code: "NMT123", term: "Jwara" },
    { code: "NMT456", term: "Jwar Roga" },
    { code: "NMT789", term: "Ushna Roga" },
    { code: "NMT321", term: "Shwasa Roga" },
    { code: "NMT654", term: "Kasa Roga" }
  ];

  // Dummy translation mappings
  const translations = {
    "NMT123": {
      icdCode: "ICD11:1A00",
      icdTerm: "Typhoid Fever",
      confidence: 92,
      description: "High confidence mapping based on symptom correlation and clinical context",
      status: "verified"
    },
    "NMT456": {
      icdCode: "ICD11:1A01",
      icdTerm: "Paratyphoid Fever",
      confidence: 87,
      description: "Good mapping confidence with minor semantic variations",
      status: "verified"
    },
    "NMT789": {
      icdCode: "ICD11:1A02",
      icdTerm: "Viral Fever",
      confidence: 78,
      description: "Moderate confidence - may require clinical validation",
      status: "pending"
    },
    "NMT321": {
      icdCode: "ICD11:CA03",
      icdTerm: "Asthma",
      confidence: 95,
      description: "Excellent mapping with strong clinical correlation",
      status: "verified"
    },
    "NMT654": {
      icdCode: "ICD11:CA04",
      icdTerm: "Cough",
      confidence: 85,
      description: "Good confidence mapping for respiratory symptoms",
      status: "verified"
    }
  };

  const handleTranslate = () => {
    if (selectedCode && translations[selectedCode]) {
      setTranslation(translations[selectedCode]);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-yellow-600";
    return "text-orange-600";
  };

  const getConfidenceVariant = (confidence) => {
    if (confidence >= 90) return "default";
    if (confidence >= 80) return "secondary";
    return "destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Code Translation</h1>
        <p className="text-muted-foreground">
          Translate AYUSH codes to ICD-11 with confidence scores
        </p>
      </div>

      {/* Translation Interface */}
      <Card className="bg-gradient-card shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            <span>Code Translation Engine</span>
          </CardTitle>
          <CardDescription>
            Select AYUSH code for ICD-11 mapping
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">AYUSH Code</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedCode
                      ? namasteCodes.find((code) => code.code === selectedCode)?.term
                      : "Select code..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search codes..." className="h-9" />
                    <CommandEmpty>No codes found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {namasteCodes.map((code) => (
                          <CommandItem
                            key={code.code}
                            value={code.code}
                            onSelect={(currentValue) => {
                              setSelectedCode(currentValue === selectedCode ? "" : currentValue);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCode === code.code ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {code.code} - {code.term}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-center justify-center">
              <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <div>
              <Button 
                onClick={handleTranslate} 
                disabled={!selectedCode}
                 className="bg-gradient-primary hover:shadow-hover transition-all duration-300"
               >
                 Translate
               </Button>
             </div>
           </div>
        </CardContent>
      </Card>

      {/* Translation Results */}
      {translation && (
        <Card className="shadow-hover border-primary/20">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Translation Result</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Source Code */}
              <div className="space-y-3">
                <h3 className="font-semibold text-secondary flex items-center space-x-2">
                  <span>Source (AYUSH)</span>
                </h3>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <Badge variant="secondary" className="mb-2">{selectedCode}</Badge>
                  <div className="font-medium">
                    {namasteCodes.find(c => c.code === selectedCode)?.term}
                  </div>
                </div>
              </div>

              {/* Target Code */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary flex items-center space-x-2">
                  <span>Target (ICD-11)</span>
                </h3>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Badge variant="default" className="mb-2">{translation.icdCode}</Badge>
                  <div className="font-medium">{translation.icdTerm}</div>
                </div>
              </div>
            </div>

            {/* Confidence Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>Mapping Confidence</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <Badge variant={getConfidenceVariant(translation.confidence)}>
                    {translation.confidence}%
                  </Badge>
                </div>
                
                <Progress 
                  value={translation.confidence} 
                  className="h-3"
                />
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> {translation.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs font-medium">Status:</span>
                    <Badge variant={translation.status === 'verified' ? 'default' : 'secondary'}>
                      {translation.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Example */}
      <Card className="bg-accent/10 border-accent">
        <CardHeader>
          <CardTitle className="text-accent-foreground">Demo Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="font-medium">Example:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-secondary">Input:</div>
                <div className="mt-1">Jwara (NMT123)</div>
              </div>
              <div>
                <div className="font-medium text-primary">Output:</div>
                <div className="mt-1">
                  <div>Typhoid Fever (ICD11:1A00)</div>
                  <div className="text-green-600 font-medium">Confidence: 92%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslateCodes;