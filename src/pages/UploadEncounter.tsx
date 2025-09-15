import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle2, Database } from "lucide-react";

const UploadEncounter = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    namasteCode: "",
    icdCode: "",
    diagnosis: "",
    notes: ""
  });
  const [isUploaded, setIsUploaded] = useState(false);
  const { toast } = useToast();

  // Dummy code pairs for selection
  const codePairs = [
    { 
      namaste: { code: "NMT123", term: "Jwara" },
      icd: { code: "ICD11:1A00", term: "Typhoid Fever" }
    },
    { 
      namaste: { code: "NMT456", term: "Jwar Roga" },
      icd: { code: "ICD11:1A01", term: "Paratyphoid Fever" }
    },
    { 
      namaste: { code: "NMT321", term: "Shwasa Roga" },
      icd: { code: "ICD11:CA03", term: "Asthma" }
    },
    { 
      namaste: { code: "NMT654", term: "Kasa Roga" },
      icd: { code: "ICD11:CA04", term: "Cough" }
    }
  ];

  const handleCodePairSelect = (value) => {
    const pair = codePairs.find(p => p.namaste.code === value);
    if (pair) {
      setFormData(prev => ({
        ...prev,
        namasteCode: pair.namaste.code,
        icdCode: pair.icd.code,
        diagnosis: `${pair.namaste.term} / ${pair.icd.term}`
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate upload
    setIsUploaded(true);
    toast({
      title: "Encounter Uploaded Successfully",
      description: "Patient record stored with dual coding system",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsUploaded(false);
      setFormData({
        patientId: "",
        namasteCode: "",
        icdCode: "",
        diagnosis: "",
        notes: ""
      });
    }, 3000);
  };

  const isFormValid = formData.patientId && formData.namasteCode && formData.icdCode;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Upload Patient Encounter</h1>
        <p className="text-muted-foreground">
          Store patient encounters with dual NAMASTE and ICD-11 coding for EMR integration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-medical">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Encounter Data Entry</span>
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Complete patient encounter with dual coding system
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {!isUploaded ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      placeholder="Enter patient identifier (e.g., P12345)"
                      value={formData.patientId}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Diagnosis Code Pair</Label>
                    <Select onValueChange={handleCodePairSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diagnosis with dual coding" />
                      </SelectTrigger>
                      <SelectContent>
                        {codePairs.map((pair, index) => (
                          <SelectItem key={index} value={pair.namaste.code}>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{pair.namaste.code}</Badge>
                              <span>+</span>
                              <Badge variant="default">{pair.icd.code}</Badge>
                              <span>- {pair.namaste.term}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.namasteCode && formData.icdCode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                      <div>
                        <Label className="text-secondary">NAMASTE Code</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{formData.namasteCode}</Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-primary">ICD-11 Code</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="default">{formData.icdCode}</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis Description</Label>
                    <Input
                      id="diagnosis"
                      placeholder="Detailed diagnosis description"
                      value={formData.diagnosis}
                      onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Clinical Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional clinical observations and notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300"
                    disabled={!isFormValid}
                  >
                    Upload to EMR System
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-600">Upload Successful!</h3>
                    <p className="text-muted-foreground mt-2">
                      Patient encounter has been stored with dual coding system
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-left">
                    <div className="text-sm space-y-2">
                      <div><strong>Patient ID:</strong> {formData.patientId}</div>
                      <div><strong>NAMASTE Code:</strong> {formData.namasteCode}</div>
                      <div><strong>ICD-11 Code:</strong> {formData.icdCode}</div>
                      <div><strong>Diagnosis:</strong> {formData.diagnosis}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <span>Dual Coding Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div>
                    <strong>Traditional Integration:</strong> Preserves AYUSH medical knowledge
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <strong>Global Standards:</strong> Ensures ICD-11 compliance
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <strong>Interoperability:</strong> Seamless data exchange
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/10 border-accent">
            <CardHeader>
              <CardTitle className="text-accent-foreground">Demo Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div><strong>Patient ID:</strong> P12345</div>
                <div><strong>NAMASTE:</strong> Jwara (NMT123)</div>
                <div><strong>ICD-11:</strong> Typhoid Fever (ICD11:1A00)</div>
                <div><strong>Result:</strong> Record stored with dual coding (demo)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadEncounter;