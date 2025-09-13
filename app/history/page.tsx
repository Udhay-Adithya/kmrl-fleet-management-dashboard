"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/status-badge"
import { mockHistory, getTrainsetById, type HistoryEntry } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Search,
  CalendarIcon,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Wrench,
  User,
  FileText,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import { format } from "date-fns"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all")
  const [decisionFilter, setDecisionFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [sortBy, setSortBy] = useState<string>("date")

  // Filter and sort history entries
  const filteredHistory = mockHistory
    .filter((entry) => {
      const trainset = getTrainsetById(entry.trainsetId)
      const matchesSearch =
        trainset?.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainset?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.notes.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesOutcome = outcomeFilter === "all" || entry.outcome === outcomeFilter
      const matchesDecision = decisionFilter === "all" || entry.decision === decisionFilter

      const entryDate = new Date(entry.date)
      const matchesDateRange =
        (!dateRange.from || entryDate >= dateRange.from) && (!dateRange.to || entryDate <= dateRange.to)

      return matchesSearch && matchesOutcome && matchesDecision && matchesDateRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "trainset":
          const trainsetA = getTrainsetById(a.trainsetId)
          const trainsetB = getTrainsetById(b.trainsetId)
          return (trainsetA?.number || "").localeCompare(trainsetB?.number || "")
        case "outcome":
          return a.outcome.localeCompare(b.outcome)
        default:
          return 0
      }
    })

  const getOutcomeIcon = (outcome: HistoryEntry["outcome"]) => {
    switch (outcome) {
      case "successful":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getOutcomeBadge = (outcome: HistoryEntry["outcome"]) => {
    switch (outcome) {
      case "successful":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Successful
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Partial
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Failed
          </Badge>
        )
    }
  }

  const getDecisionIcon = (decision: HistoryEntry["decision"]) => {
    switch (decision) {
      case "service":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "standby":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "maintenance":
        return <Wrench className="h-4 w-4 text-yellow-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate summary statistics
  const totalEntries = filteredHistory.length
  const successfulEntries = filteredHistory.filter((entry) => entry.outcome === "successful").length
  const partialEntries = filteredHistory.filter((entry) => entry.outcome === "partial").length
  const failedEntries = filteredHistory.filter((entry) => entry.outcome === "failed").length
  const successRate = totalEntries > 0 ? Math.round((successfulEntries / totalEntries) * 100) : 0

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Decision History & Logs</h1>
                  <p className="text-muted-foreground">
                    Track and analyze past induction decisions and their operational outcomes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {filteredHistory.length} of {mockHistory.length} entries
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Summary Statistics */}
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalEntries}</div>
                    <p className="text-xs text-muted-foreground">In selected period</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{successRate}%</div>
                    <p className="text-xs text-muted-foreground">{successfulEntries} successful outcomes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Partial Outcomes</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{partialEntries}</div>
                    <p className="text-xs text-muted-foreground">
                      {totalEntries > 0 ? Math.round((partialEntries / totalEntries) * 100) : 0}% of decisions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Failed Outcomes</CardTitle>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{failedEntries}</div>
                    <p className="text-xs text-muted-foreground">
                      {totalEntries > 0 ? Math.round((failedEntries / totalEntries) * 100) : 0}% of decisions
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search history..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <Select value={decisionFilter} onValueChange={setDecisionFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Decision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Decisions</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="standby">Standby</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Outcomes</SelectItem>
                      <SelectItem value="successful">Successful</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => setDateRange(range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="trainset">Trainset</SelectItem>
                      <SelectItem value="outcome">Outcome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* History Table */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Decision History
                  </CardTitle>
                  <CardDescription>Chronological record of induction decisions and outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Trainset</TableHead>
                        <TableHead>Decision</TableHead>
                        <TableHead>Outcome</TableHead>
                        <TableHead>Supervisor</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((entry) => {
                        const trainset = getTrainsetById(entry.trainsetId)

                        return (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{formatDate(entry.date)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{trainset?.number}</div>
                                <div className="text-sm text-muted-foreground">{trainset?.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDecisionIcon(entry.decision)}
                                <StatusBadge status={entry.decision as any} />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getOutcomeIcon(entry.outcome)}
                                {getOutcomeBadge(entry.outcome)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{entry.supervisor}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate text-sm text-muted-foreground">{entry.notes}</div>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Decision Details</DialogTitle>
                                    <DialogDescription>
                                      Complete information for decision made on {formatDateTime(entry.date)}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Decision Information</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Date & Time:</span>
                                            <span>{formatDateTime(entry.date)}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Trainset:</span>
                                            <span>
                                              {trainset?.number} - {trainset?.name}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Decision:</span>
                                            <StatusBadge status={entry.decision as any} />
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Outcome:</span>
                                            {getOutcomeBadge(entry.outcome)}
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Supervisor:</span>
                                            <span>{entry.supervisor}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Trainset Status (at time)</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span>{trainset?.location}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Availability:</span>
                                            <span>{trainset?.availability}%</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Mileage:</span>
                                            <span>{trainset?.mileage.toLocaleString()} km</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Open Job Cards:</span>
                                            <span>{trainset?.jobCards.open}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Outcome Notes</h4>
                                      <div className="p-3 rounded-lg bg-muted text-sm">{entry.notes}</div>
                                    </div>

                                    {entry.outcome !== "successful" && (
                                      <div>
                                        <h4 className="font-semibold mb-2 text-yellow-600">Lessons Learned</h4>
                                        <div className="text-sm text-muted-foreground">
                                          {entry.outcome === "partial"
                                            ? "Consider additional buffer time for maintenance activities and verify all prerequisites before scheduling."
                                            : "Review decision criteria and ensure all critical factors are properly weighted in future recommendations."}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
