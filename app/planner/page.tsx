"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { InfoTooltip } from "@/components/info-tooltip"
import { mockInductionDecisions, getTrainsetById } from "@/lib/mock-data"
import { getTooltip } from "@/lib/tooltips"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  RefreshCw,
  Download,
  Send,
  Info,
  Target,
  Zap,
  Calendar,
} from "lucide-react"

export default function PlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGenerated, setLastGenerated] = useState(new Date())

  const handleGeneratePlan = async () => {
    setIsGenerating(true)
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setLastGenerated(new Date())
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "service":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "standby":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "maintenance":
        return <Wrench className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const totalTrainsets = mockInductionDecisions.length
  const serviceRecommendations = mockInductionDecisions.filter((d) => d.recommendation === "service").length
  const maintenanceRecommendations = mockInductionDecisions.filter((d) => d.recommendation === "maintenance").length
  const standbyRecommendations = mockInductionDecisions.filter((d) => d.recommendation === "standby").length
  const conflictsCount = mockInductionDecisions.filter((d) => d.conflicts.length > 0).length

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                    Induction Decision Planner
                    <InfoTooltip content={getTooltip("induction")} />
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base flex items-center gap-2">
                    AI-powered recommendations for optimal trainset allocation and scheduling
                    <InfoTooltip content={getTooltip("aiOptimization")} />
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Badge variant="outline" className="text-green-600 w-fit">
                    <Brain className="mr-1 h-3 w-3" />
                    AI Optimized
                  </Badge>
                  <Button onClick={handleGeneratePlan} disabled={isGenerating} className="w-fit">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Regenerate Plan
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Plan Summary */}
              <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Service Allocation
                      <InfoTooltip content={getTooltip("activeService")} />
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{serviceRecommendations}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((serviceRecommendations / totalTrainsets) * 100)}% of fleet
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Maintenance Queue
                      <InfoTooltip content={getTooltip("maintenanceMode")} />
                    </CardTitle>
                    <Wrench className="h-4 w-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{maintenanceRecommendations}</div>
                    <p className="text-xs text-muted-foreground">Scheduled for service</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Standby Reserve
                      <InfoTooltip content={getTooltip("standbyMode")} />
                    </CardTitle>
                    <Clock className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{standbyRecommendations}</div>
                    <p className="text-xs text-muted-foreground">Ready for deployment</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Conflicts Detected
                      <InfoTooltip content={getTooltip("conflictDetection")} />
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{conflictsCount}</div>
                    <p className="text-xs text-muted-foreground">Require attention</p>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Metadata */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Plan Details
                    <InfoTooltip content={getTooltip("planningHorizon")} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <div className="text-sm font-medium">Generated</div>
                      <div className="text-sm text-muted-foreground">
                        {lastGenerated.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        Planning Horizon
                        <InfoTooltip content={getTooltip("planningHorizon")} />
                      </div>
                      <div className="text-sm text-muted-foreground">Next 24 hours</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        Optimization Score
                        <InfoTooltip content={getTooltip("optimizationScore")} />
                      </div>
                      <div className="text-sm text-green-600 font-medium">94.2% efficiency</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="mr-2 h-4 w-4" />
                      Share with Team
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Conflicts Alert */}
              {conflictsCount > 0 && (
                <Alert className="mt-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800 dark:text-yellow-200">
                    {conflictsCount} Conflicts Detected
                  </AlertTitle>
                  <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                    Some recommendations have potential conflicts that may require manual review or override.
                  </AlertDescription>
                </Alert>
              )}

              {/* Induction Recommendations */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Ranked Induction Recommendations
                    <InfoTooltip content={getTooltip("induction")} />
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    AI-generated decisions based on fitness certificates, job cards, branding priorities, mileage
                    balancing, cleaning schedules, and stabling geometry
                    <InfoTooltip content={getTooltip("multiObjectiveOptimization")} />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInductionDecisions.map((decision, index) => {
                      const trainset = getTrainsetById(decision.trainsetId)
                      if (!trainset) return null

                      return (
                        <div key={decision.trainsetId} className="rounded-lg border p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                {decision.priority}
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <div className="flex items-center gap-2">
                                  {getRecommendationIcon(decision.recommendation)}
                                  <div>
                                    <div className="font-medium text-sm sm:text-base">
                                      {trainset.number} - {trainset.name}
                                    </div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">{trainset.location}</div>
                                  </div>
                                </div>
                                <StatusBadge status={decision.recommendation as any} />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                              <div className="text-left sm:text-right">
                                <div className={`text-sm font-medium ${getConfidenceColor(decision.confidence)} flex items-center gap-1`}>
                                  {decision.confidence}% confidence
                                  <InfoTooltip content={getTooltip("confidenceScore")} />
                                </div>
                                <Progress value={decision.confidence} className="w-16 sm:w-20 mt-1" />
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Decision Analysis: {trainset.number} - {trainset.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Detailed reasoning and factors considered for this recommendation
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <Target className="h-4 w-4" />
                                        Recommendation
                                      </h4>
                                      <div className="flex items-center gap-2">
                                        <StatusBadge status={decision.recommendation as any} />
                                        <span className="text-sm">Priority {decision.priority}</span>
                                        <Badge variant="outline" className={getConfidenceColor(decision.confidence)}>
                                          {decision.confidence}% confidence
                                        </Badge>
                                      </div>
                                    </div>

                                    <Separator />

                                    <div>
                                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Supporting Factors
                                      </h4>
                                      <ul className="space-y-1">
                                        {decision.reasoning.map((reason, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-sm">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                            {reason}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {decision.conflicts.length > 0 && (
                                      <>
                                        <Separator />
                                        <div>
                                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            Potential Conflicts
                                          </h4>
                                          <ul className="space-y-1">
                                            {decision.conflicts.map((conflict, idx) => (
                                              <li key={idx} className="flex items-start gap-2 text-sm">
                                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                                                {conflict}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </>
                                    )}

                                    <Separator />

                                    <div>
                                      <h4 className="font-semibold mb-2">Trainset Status</h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <div className="font-medium">Current Status</div>
                                          <StatusBadge status={trainset.status} />
                                        </div>
                                        <div>
                                          <div className="font-medium">Availability</div>
                                          <div>{trainset.availability}%</div>
                                        </div>
                                        <div>
                                          <div className="font-medium">Open Job Cards</div>
                                          <div>{trainset.jobCards.open}</div>
                                        </div>
                                        <div>
                                          <div className="font-medium">Branding Priority</div>
                                          <div className="capitalize">{trainset.branding.priority}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>

                          {/* Quick reasoning preview */}
                          <div className="mt-3 pl-12">
                            <div className="text-sm text-muted-foreground">
                              <strong>Key factors:</strong> {decision.reasoning.slice(0, 2).join(", ")}
                              {decision.reasoning.length > 2 && "..."}
                            </div>
                            {decision.conflicts.length > 0 && (
                              <div className="text-sm text-yellow-600 mt-1">
                                <AlertTriangle className="inline h-3 w-3 mr-1" />
                                <strong>Conflicts:</strong> {decision.conflicts[0]}
                                {decision.conflicts.length > 1 && ` +${decision.conflicts.length - 1} more`}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
