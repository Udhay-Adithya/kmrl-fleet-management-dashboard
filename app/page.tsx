"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/status-badge"
import { InfoTooltip } from "@/components/info-tooltip"
import { mockTrainsets, mockKPIData, mockInductionDecisions, getTrainsetsByStatus } from "@/lib/mock-data"
import { getTooltip } from "@/lib/tooltips"
import { Train, Wrench, Clock, AlertTriangle, TrendingUp, Users, DollarSign, Activity, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const activeTrainsets = getTrainsetsByStatus("active")
  const maintenanceTrainsets = getTrainsetsByStatus("maintenance")
  const standbyTrainsets = getTrainsetsByStatus("standby")
  const outOfServiceTrainsets = getTrainsetsByStatus("out-of-service")

  const totalTrainsets = mockTrainsets.length
  const availableTrainsets = activeTrainsets.length + standbyTrainsets.length
  const availabilityPercentage = Math.round((availableTrainsets / totalTrainsets) * 100)

  // Calculate urgent issues
  const urgentIssues = mockTrainsets.filter(
    (trainset) =>
      trainset.issues.length > 0 || new Date(trainset.fitnessExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  ).length

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
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Fleet Operations Dashboard</h1>
                  <p className="text-muted-foreground text-sm sm:text-base">Real-time fleet status and induction planning for Kochi Metro</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Badge variant="outline" className="text-green-600 w-fit">
                    <Activity className="mr-1 h-3 w-3" />
                    System Online
                  </Badge>
                  <Badge variant="secondary" className="w-fit text-xs sm:text-sm">Last Updated: {new Date().toLocaleTimeString()}</Badge>
                </div>
              </div>

              <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Total Fleet
                      <InfoTooltip content={getTooltip("trainset")} />
                    </CardTitle>
                    <Train className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalTrainsets} </div>
                    <p className="text-xs text-muted-foreground">{availableTrainsets} available for service</p>
                    <Progress value={availabilityPercentage} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Fleet Availability
                      <InfoTooltip content={getTooltip("fleetAvailability")} />
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockKPIData.availability}%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-green-600">Above target</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      On-Time Performance
                      <InfoTooltip content={getTooltip("onTimePerformance")} />
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockKPIData.punctuality}%</div>
                    <p className="text-xs text-muted-foreground">Target: 95%</p>
                    <Progress value={mockKPIData.punctuality} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Urgent Issues</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{urgentIssues}</div>
                    <p className="text-xs text-muted-foreground">Require immediate attention</p>
                    {urgentIssues > 0 && (
                      <Badge variant="destructive" className="mt-2 text-xs">
                        Action Required
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      Active Service
                      <InfoTooltip content={getTooltip("activeService")} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{activeTrainsets.length}</div>
                    <div className="mt-2 space-y-1">
                      {activeTrainsets.slice(0, 2).map((trainset) => (
                        <div key={trainset.id} className="flex items-center justify-between text-sm">
                          <span>{trainset.number}</span>
                          <StatusBadge status={trainset.status} />
                        </div>
                      ))}
                      {activeTrainsets.length > 2 && (
                        <p className="text-xs text-muted-foreground">+{activeTrainsets.length - 2} more</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      Maintenance
                      <InfoTooltip content={getTooltip("maintenanceMode")} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{maintenanceTrainsets.length}</div>
                    <div className="mt-2 space-y-1">
                      {maintenanceTrainsets.map((trainset) => (
                        <div key={trainset.id} className="flex items-center justify-between text-sm">
                          <span>{trainset.number}</span>
                          <Badge variant="secondary" className="text-xs">
                            {trainset.jobCards.open} open
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      Standby
                      <InfoTooltip content={getTooltip("standbyMode")} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{standbyTrainsets.length}</div>
                    <div className="mt-2 space-y-1">
                      {standbyTrainsets.map((trainset) => (
                        <div key={trainset.id} className="flex items-center justify-between text-sm">
                          <span>{trainset.number}</span>
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            Ready
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      Out of Service
                      <InfoTooltip content={getTooltip("outOfService")} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">{outOfServiceTrainsets.length}</div>
                    <div className="mt-2 space-y-1">
                      {outOfServiceTrainsets.map((trainset) => (
                        <div key={trainset.id} className="flex items-center justify-between text-sm">
                          <span>{trainset.number}</span>
                          <Badge variant="destructive" className="text-xs">
                            {trainset.issues.length} issues
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common fleet management operations</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Link href="/planner">
                      <Button className="w-full justify-start" size="lg">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Generate Tomorrow's Induction Plan
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/trainsets">
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                        <Train className="mr-2 h-4 w-4" />
                        View All Trainsets
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/simulation">
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                        <Activity className="mr-2 h-4 w-4" />
                        Run What-If Simulation
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Today's Induction Recommendations
                      <InfoTooltip content={getTooltip("induction")} />
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      AI-generated decisions for optimal fleet utilization
                      <InfoTooltip content={getTooltip("aiOptimization")} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockInductionDecisions.slice(0, 4).map((decision) => {
                        const trainset = mockTrainsets.find((t) => t.id === decision.trainsetId)
                        if (!trainset) return null

                        return (
                          <div
                            key={decision.trainsetId}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border gap-2"
                          >
                            <div className="flex items-center gap-3">
                              <div className="font-medium">{trainset.number}</div>
                              <StatusBadge status={decision.recommendation as any} />
                              <Badge variant="outline" className="text-xs">
                                {decision.confidence}% confidence
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">Priority {decision.priority}</div>
                          </div>
                        )
                      })}
                      <Link href="/planner">
                        <Button variant="ghost" className="w-full mt-2">
                          View Full Plan <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Maintenance Efficiency
                      <InfoTooltip content={getTooltip("maintenanceEfficiency")} />
                    </CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockKPIData.maintenanceEfficiency}%</div>
                    <p className="text-xs text-muted-foreground">Average completion time: 4.2 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Cost Savings
                      <InfoTooltip content={getTooltip("costSavings")} />
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockKPIData.costSavings}%</div>
                    <p className="text-xs text-muted-foreground">Compared to manual planning</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      Passenger Satisfaction
                      <InfoTooltip content={getTooltip("passengerSatisfaction")} />
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockKPIData.passengerSatisfaction}/5</div>
                    <p className="text-xs text-muted-foreground">Based on 2,847 responses</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
