import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Stethoscope, Globe } from "lucide-react";

const SearchCodes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Dummy data for demonstration
  const namasteResults = [
    { code: "NMT123", term: "Jwara", description: "Fever condition in AYUSH", category: "Symptoms" },
    { code: "NMT456", term: "Jwar Roga", description: "Fever disease complex", category: "Disease" },
    { code: "NMT789", term: "Ushna Roga", description: "Heat-related disorders", category: "Syndrome" }
  ];

  const icdResults = [
    { code: "ICD11:1A00", term: "Typhoid Fever", description: "Systemic infection caused by Salmonella", category: "Infectious Disease" },
    { code: "ICD11:1A01", term: "Paratyphoid Fever", description: "Similar to typhoid fever", category: "Infectious Disease" },
    { code: "ICD11:1A02", term: "Viral Fever", description: "Fever of viral origin", category: "Viral Infection" }
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Search Medical Codes</h1>
        <p className="text-muted-foreground">
          Search AYUSH & ICD-11 databases
        </p>
      </div>

      {/* Search Interface */}
      <Card className="bg-gradient-card shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-primary" />
            <span>Dual Terminology Search</span>
          </CardTitle>
          <CardDescription>
            Type medical conditions for dual results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Type disease or condition (e.g., 'Fever', 'Diabetes', 'Headache')"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 text-lg py-6"
            />
          </div>
          
          {searchTerm && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Searching for:</span>
              <Badge variant="outline">{searchTerm}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NAMASTE Results */}
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-secondary text-secondary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5" />
                <span>AYUSH NAMASTE Codes</span>
              </CardTitle>
              <CardDescription className="text-secondary-foreground/80">
                Traditional medicine terminology matches
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {namasteResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{result.code}</Badge>
                        <Badge variant="outline">{result.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-primary">{result.term}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ICD-11 Results */}
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>ICD-11 Codes</span>
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                International classification matches
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {icdResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="default">{result.code}</Badge>
                        <Badge variant="outline">{result.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-primary">{result.term}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Demo Example */}
      <Card className="bg-accent/10 border-accent">
        <CardHeader>
          <CardTitle className="text-accent-foreground">Demo Example Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="font-medium">Search Input: "Fever"</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-secondary">NAMASTE Results:</div>
                <div className="space-y-1 mt-1">
                  <div>• Jwara (NMT123)</div>
                  <div>• Jwar Roga (NMT456)</div>
                  <div>• Ushna Roga (NMT789)</div>
                </div>
              </div>
              <div>
                <div className="font-medium text-primary">ICD-11 Results:</div>
                <div className="space-y-1 mt-1">
                  <div>• Typhoid Fever (ICD11:1A00)</div>
                  <div>• Paratyphoid Fever (ICD11:1A01)</div>
                  <div>• Viral Fever (ICD11:1A02)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchCodes;