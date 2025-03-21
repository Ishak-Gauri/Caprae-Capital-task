"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  Filter,
  Search,
  Settings,
  Trash,
  Upload,
  RefreshCw,
  PlusCircle,
  FileSpreadsheet,
  FileJson,
  FileSpreadsheetIcon as FileCsv,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Users,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LeadVisualizer } from "@/components/lead-visualizer"
import { NetworkGraph } from "@/components/network-graph"

// Mock data for demonstration
const mockLeads = [
  {
    id: 1,
    name: "John Smith",
    title: "CTO",
    company: "TechCorp Inc.",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/johnsmith",
    website: "techcorp.com",
    industry: "Software",
    employees: "50-200",
    location: "San Francisco, CA",
    lastContact: "Never",
    score: 87,
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "VP of Marketing",
    company: "Growth Solutions",
    email: "sarah.j@growthsolutions.io",
    phone: "+1 (555) 987-6543",
    linkedin: "linkedin.com/in/sarahjohnson",
    website: "growthsolutions.io",
    industry: "Marketing",
    employees: "10-50",
    location: "New York, NY",
    lastContact: "Never",
    score: 92,
    verified: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "CEO",
    company: "Innovate Partners",
    email: "m.chen@innovatepartners.com",
    phone: "+1 (555) 456-7890",
    linkedin: "linkedin.com/in/michaelchen",
    website: "innovatepartners.com",
    industry: "Venture Capital",
    employees: "10-50",
    location: "Boston, MA",
    lastContact: "Never",
    score: 78,
    verified: false,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    title: "Head of Sales",
    company: "SalesPro Solutions",
    email: "emily@salespro.co",
    phone: "+1 (555) 234-5678",
    linkedin: "linkedin.com/in/emilyrodriguez",
    website: "salespro.co",
    industry: "Sales",
    employees: "10-50",
    location: "Austin, TX",
    lastContact: "Never",
    score: 85,
    verified: true,
  },
  {
    id: 5,
    name: "David Kim",
    title: "CIO",
    company: "DataSystems Inc.",
    email: "david.kim@datasystems.net",
    phone: "+1 (555) 876-5432",
    linkedin: "linkedin.com/in/davidkim",
    website: "datasystems.net",
    industry: "Data & Analytics",
    employees: "200-500",
    location: "Seattle, WA",
    lastContact: "Never",
    score: 90,
    verified: true,
  },
]

export function LeadGenScraper() {
  const [activeTab, setActiveTab] = useState("search")
  const [isScrapingActive, setIsScrapingActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [leads, setLeads] = useState(mockLeads)
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("company")
  const [minQualityScore, setMinQualityScore] = useState([70])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [complianceMode, setComplianceMode] = useState(true)
  const [enrichmentLevel, setEnrichmentLevel] = useState("standard")
  const [showVisualization, setShowVisualization] = useState(false)
  const [selectedLead, setSelectedLead] = useState<(typeof mockLeads)[0] | null>(null)

  // Simulate scraping process
  const startScraping = () => {
    setIsScrapingActive(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScrapingActive(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Toggle lead selection
  const toggleLeadSelection = (id: number) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]))
  }

  // Select all leads
  const selectAllLeads = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(leads.map((lead) => lead.id))
    }
  }

  // Filter leads based on search query and filters
  const filteredLeads = leads.filter((lead) => {
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (searchType === "company" && !lead.company.toLowerCase().includes(query)) {
        return false
      } else if (searchType === "name" && !lead.name.toLowerCase().includes(query)) {
        return false
      } else if (searchType === "title" && !lead.title.toLowerCase().includes(query)) {
        return false
      }
    }

    // Apply quality score filter
    if (lead.score < minQualityScore[0]) {
      return false
    }

    // Apply verification filter
    if (showVerifiedOnly && !lead.verified) {
      return false
    }

    return true
  })

  // View lead details
  const viewLeadDetails = (lead: (typeof mockLeads)[0]) => {
    setSelectedLead(lead)
    setShowVisualization(true)
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showVisualization && selectedLead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl h-[80vh] bg-card rounded-lg shadow-lg overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <Button variant="ghost" size="icon" onClick={() => setShowVisualization(false)}>
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
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="h-full">
                <LeadVisualizer lead={selectedLead} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="search"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            <Search className="mr-2 h-4 w-4" />
            Search & Scrape
          </TabsTrigger>
          <TabsTrigger
            value="leads"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            <Users className="mr-2 h-4 w-4" />
            Leads ({leads.length})
          </TabsTrigger>
          <TabsTrigger
            value="enrichment"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Enrichment
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden border-primary/20">
              <CardHeader>
                <CardTitle>Find New Leads</CardTitle>
                <CardDescription>Search for companies or individuals and extract contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Select defaultValue={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Search by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="name">Person Name</SelectItem>
                      <SelectItem value="title">Job Title</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder={`Enter ${searchType}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={startScraping}
                    disabled={isScrapingActive || !searchQuery}
                    className="bg-primary hover:bg-primary/90 transition-all"
                  >
                    {isScrapingActive ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Scraping...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Find Leads
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Advanced Filters</Label>
                    <Button variant="ghost" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Industries</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Company Size</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sizes</SelectItem>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      <Label>Minimum Quality Score: {minQualityScore}</Label>
                      <Badge variant={minQualityScore[0] >= 80 ? "default" : "secondary"}>
                        {minQualityScore[0] >= 90
                          ? "Excellent"
                          : minQualityScore[0] >= 80
                            ? "Good"
                            : minQualityScore[0] >= 70
                              ? "Average"
                              : "Low"}
                      </Badge>
                    </div>
                    <Slider
                      defaultValue={[70]}
                      max={100}
                      step={1}
                      value={minQualityScore}
                      onValueChange={setMinQualityScore}
                      className="py-4"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="compliance"
                      checked={complianceMode}
                      onCheckedChange={(checked) => setComplianceMode(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="compliance" className="flex items-center">
                        GDPR & Privacy Compliance Mode
                        <Badge className="ml-2" variant="outline">
                          Recommended
                        </Badge>
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Only collect publicly available business information
                      </p>
                    </div>
                  </div>
                </div>

                {isScrapingActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2 pt-4"
                  >
                    <div className="flex justify-between text-sm">
                      <span>Scraping in progress...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>Import leads from external sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-lg p-6 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="mx-auto bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upload File</h3>
                      <p className="text-sm text-muted-foreground">CSV, Excel, or JSON</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-lg p-6 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="mx-auto bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Website URL Scraping</h3>
                      <p className="text-sm text-muted-foreground">Extract leads from websites</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Your Leads</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="View" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Leads</SelectItem>
                        <SelectItem value="new">New Leads</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search leads..."
                    className="max-w-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified-only"
                      checked={showVerifiedOnly}
                      onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
                    />
                    <Label htmlFor="verified-only">Verified only</Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedLeads.length > 0 && selectedLeads.length === leads.length}
                          onCheckedChange={selectAllLeads}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.length > 0 ? (
                      filteredLeads.map((lead) => (
                        <TableRow
                          key={lead.id}
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => viewLeadDetails(lead)}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedLeads.includes(lead.id)}
                              onCheckedChange={() => toggleLeadSelection(lead.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium flex items-center">
                              {lead.name}
                              {lead.verified && <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />}
                            </div>
                            <div className="text-sm text-muted-foreground">{lead.title}</div>
                          </TableCell>
                          <TableCell>
                            <div>{lead.company}</div>
                            <div className="text-sm text-muted-foreground">{lead.location}</div>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{lead.industry}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              className="font-medium"
                              variant={lead.score >= 90 ? "default" : lead.score >= 80 ? "secondary" : "outline"}
                            >
                              {lead.score}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No leads found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  Showing {filteredLeads.length} of {leads.length} leads
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled={selectedLeads.length === 0}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Select defaultValue="csv">
                    <SelectTrigger className="w-[130px] h-9">
                      <SelectValue placeholder="Export" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">
                        <div className="flex items-center">
                          <FileCsv className="mr-2 h-4 w-4" />
                          CSV
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center">
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </div>
                      </SelectItem>
                      <SelectItem value="json">
                        <div className="flex items-center">
                          <FileJson className="mr-2 h-4 w-4" />
                          JSON
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-[400px]"
          >
            <Card className="border-primary/20 h-full">
              <CardHeader>
                <CardTitle>Lead Network Visualization</CardTitle>
                <CardDescription>Interactive visualization of your leads and their connections</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[300px]">
                <NetworkGraph leads={filteredLeads} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="enrichment" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Data Enrichment</CardTitle>
                <CardDescription>Enhance your lead data with additional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Enrichment Level</Label>
                  <Select defaultValue={enrichmentLevel} onValueChange={setEnrichmentLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (Email, Phone)</SelectItem>
                      <SelectItem value="standard">Standard (+ Social Profiles)</SelectItem>
                      <SelectItem value="advanced">Advanced (+ Company Data)</SelectItem>
                      <SelectItem value="premium">Premium (All Available Data)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-4">
                  <Label>Data Sources</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="source-web" defaultChecked />
                      <div>
                        <Label htmlFor="source-web">Web Scraping</Label>
                        <p className="text-sm text-muted-foreground">Public websites and directories</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="source-social" defaultChecked />
                      <div>
                        <Label htmlFor="source-social">Social Media</Label>
                        <p className="text-sm text-muted-foreground">Professional networks and profiles</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="source-news" defaultChecked />
                      <div>
                        <Label htmlFor="source-news">News & Press</Label>
                        <p className="text-sm text-muted-foreground">Recent company mentions and updates</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="source-tech" defaultChecked />
                      <div>
                        <Label htmlFor="source-tech">Technology Stack</Label>
                        <p className="text-sm text-muted-foreground">Tools and platforms used</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Verification</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Phone Verification</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Company Data Verification</Label>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 transition-all">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Enrich Selected Leads
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>AI-Powered Lead Insights</CardTitle>
                <CardDescription>Generate valuable insights about your leads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Buying Intent</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">68%</div>
                        <p className="text-sm text-muted-foreground">Average across all leads</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Growth Signals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">Companies showing growth</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Ideal Customer Fit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-sm text-muted-foreground">Match to your ICP</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Generate Detailed AI Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Scraping Settings</CardTitle>
                <CardDescription>Configure how the lead generation tool operates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rate-limit">Scraping Speed</Label>
                    <Badge variant="outline">Default: Medium</Badge>
                  </div>
                  <Select defaultValue="medium">
                    <SelectTrigger id="rate-limit">
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow (More Stealth)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="fast">Fast (More Aggressive)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Faster speeds may trigger rate limits on some websites
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Proxy Settings</Label>
                    <Badge variant="outline">Recommended</Badge>
                  </div>
                  <Select defaultValue="rotating">
                    <SelectTrigger>
                      <SelectValue placeholder="Select proxy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Proxy</SelectItem>
                      <SelectItem value="rotating">Rotating Proxies</SelectItem>
                      <SelectItem value="dedicated">Dedicated Proxies</SelectItem>
                      <SelectItem value="residential">Residential Proxies</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Using proxies helps avoid IP blocks and improves scraping reliability
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Compliance Settings</Label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gdpr-compliance" defaultChecked />
                      <div>
                        <Label htmlFor="gdpr-compliance">GDPR Compliance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Only collect business contact information that is publicly available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="robots-txt" defaultChecked />
                      <div>
                        <Label htmlFor="robots-txt">Respect robots.txt</Label>
                        <p className="text-sm text-muted-foreground">Follow website crawling policies</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="rate-limiting" defaultChecked />
                      <div>
                        <Label htmlFor="rate-limiting">Intelligent Rate Limiting</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically adjust scraping speed based on website response
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data Retention</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 transition-all">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/50 rounded-lg p-4 border">
        <div className="flex items-start space-x-4">
          <div className="bg-yellow-500/20 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Important Notice on Web Scraping</h3>
            <p className="text-sm text-muted-foreground">
              This tool is designed for legitimate business lead generation. Always ensure you comply with website terms
              of service, privacy laws (including GDPR, CCPA), and ethical scraping practices. We recommend using this
              tool only for publicly available business information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

