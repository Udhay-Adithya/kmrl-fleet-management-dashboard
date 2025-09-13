"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { InfoTooltip } from "@/components/info-tooltip"
import { getTooltip } from "@/lib/tooltips"
import {
  Zap,
  Play,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Settings,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  BarChart3,
} from "lucide-react"

interface SimulationParams {
  maintenanceCapacity: number
  cleaningSlots: number
  emergencyReserve: number
  brandingPriority: boolean
  weatherConditions: string
  passengerDemand: string
  maintenanceUrgency: number
}

export default function SimulationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [params, setParams] = useState<SimulationParams>({
    maintenanceCapacity: 4,
    cleaningSlots: 6,
    emergencyReserve: 2,
    brandingPriority: true,
    weatherConditions: "normal",
    passengerDemand: "normal",
    maintenanceUrgency: 50,
  })

  const [simulationResults, setSimulationResults] = useState({
    availability: 78.5,
    efficiency: 92.3,
    costImpact: -5.2,
    riskScore: 23,
    serviceTrainsets: 3,
    maintenanceTrainsets: 2,
    standbyTrainsets: 1,
    conflicts: 1,
  })

  const runSimulation = async () => {
    setIsRunning(true)
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock results based on parameters
    const newResults = {
      availability: Math.max(60, Math.min(95, 75 + (params.emergencyReserve - 2) * 5 + Math.random() * 10)),
      efficiency: Math.max(70, Math.min(98, 85 + (params.maintenanceCapacity - 4) * 3 + Math.random() * 8)),
      costImpact: (params.maintenanceCapacity - 4) * -2.5 + (params.cleaningSlots - 6) * -1.2 + Math.random() * 3 - 1.5,
      riskScore: Math.max(5, Math.min(50, 25 - (params.emergencyReserve - 2) * 5 + Math.random() * 10)),
      serviceTrainsets: Math.max(2, Math.min(4, params.emergencyReserve + 1 + Math.floor(Math.random() * 2))),
      maintenanceTrainsets: params.maintenanceCapacity > 4 ? 3 : 2,
      standbyTrainsets: params.emergencyReserve,
      conflicts: params.brandingPriority ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3) + 1,
    }

    setSimulationResults(newResults)
    setIsRunning(false)
    setHasResults(true)
  }

  const resetParams = () => {
    setParams({
      maintenanceCapacity: 4,
      cleaningSlots: 6,
      emergencyReserve: 2,
      brandingPriority: true,
      weatherConditions: "normal",
      passengerDemand: "normal",
      maintenanceUrgency: 50,
    })
    setHasResults(false)
  }

  const getImpactColor = (value: number, isPositive = true) => {
    if (isPositive) {
      return value > 0 ? "text-green-600" : "text-red-600"
    } else {
      return value < 0 ? "text-green-600" : "text-red-600"
    }
  }

  const getImpactIcon = (value: number, isPositive = true) => {
    const isGood = isPositive ? value > 0 : value < 0
    return isGood ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

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
                  <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    What-If Simulation
                    <InfoTooltip content={getTooltip("whatIfSimulation")} />
                  </h1>
                  <p className="text-muted-foreground">
                    Test different scenarios and parameters to optimize fleet induction decisions
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-blue-600">
                    <Zap className="mr-1 h-3 w-3" />
                    Simulation Mode
                  </Badge>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* Simulation Parameters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Simulation Parameters
                    </CardTitle>
                    <CardDescription>Adjust operational constraints and conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Maintenance Capacity (trainsets/day)
                        <InfoTooltip content="Maximum number of trainsets that can be serviced simultaneously in maintenance facilities. Higher capacity allows more trainsets to be maintained but requires more resources and skilled technicians." />
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[params.maintenanceCapacity]}
                          onValueChange={(value) => setParams({ ...params, maintenanceCapacity: value[0] })}
                          max={8}
                          min={2}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>2</span>
                        <span className="font-medium">{params.maintenanceCapacity}</span>
                        <span>8</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Available Cleaning Slots
                        <InfoTooltip content={getTooltip("cleaningSchedule")} />
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[params.cleaningSlots]}
                          onValueChange={(value) => setParams({ ...params, cleaningSlots: value[0] })}
                          max={12}
                          min={3}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>3</span>
                        <span className="font-medium">{params.cleaningSlots}</span>
                        <span>12</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Emergency Reserve Requirement
                        <InfoTooltip content="Minimum number of trainsets that must be kept on standby for emergency deployment during unexpected disruptions, breakdowns, or peak demand situations." />
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[params.emergencyReserve]}
                          onValueChange={(value) => setParams({ ...params, emergencyReserve: value[0] })}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1</span>
                        <span className="font-medium">{params.emergencyReserve}</span>
                        <span>5</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Maintenance Urgency Threshold (%)</Label>
                      <div className="px-3">
                        <Slider
                          value={[params.maintenanceUrgency]}
                          onValueChange={(value) => setParams({ ...params, maintenanceUrgency: value[0] })}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0%</span>
                        <span className="font-medium">{params.maintenanceUrgency}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="branding-priority" className="flex items-center gap-2">
                          Prioritize Branding Exposure
                          <InfoTooltip content={getTooltip("brandingPriority")} />
                        </Label>
                        <Switch
                          id="branding-priority"
                          checked={params.brandingPriority}
                          onCheckedChange={(checked) => setParams({ ...params, brandingPriority: checked })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Weather Conditions</Label>
                        <Select
                          value={params.weatherConditions}
                          onValueChange={(value) => setParams({ ...params, weatherConditions: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="poor">Poor (Monsoon)</SelectItem>
                            <SelectItem value="severe">Severe Weather</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Expected Passenger Demand</Label>
                        <Select
                          value={params.passengerDemand}
                          onValueChange={(value) => setParams({ ...params, passengerDemand: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="peak">Peak (Festival/Event)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button onClick={runSimulation} disabled={isRunning} className="flex-1">
                        {isRunning ? (
                          <>
                            <Zap className="mr-2 h-4 w-4 animate-pulse" />
                            Running Simulation...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Run Simulation
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetParams}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Simulation Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Simulation Results
                    </CardTitle>
                    <CardDescription>
                      {hasResults ? "Impact analysis of parameter changes" : "Run a simulation to see results"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!hasResults ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Target className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Simulation Results</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Adjust parameters and run a simulation to see the impact on fleet operations
                        </p>
                        <Button onClick={runSimulation} disabled={isRunning}>
                          <Play className="mr-2 h-4 w-4" />
                          Run First Simulation
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                Fleet Availability
                                <InfoTooltip content={getTooltip("fleetAvailability")} />
                              </span>
                              {getImpactIcon(simulationResults.availability - 75.2)}
                            </div>
                            <div className="text-2xl font-bold">{simulationResults.availability.toFixed(1)}%</div>
                            <Progress value={simulationResults.availability} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                Operational Efficiency
                                <InfoTooltip content={getTooltip("maintenanceEfficiency")} />
                              </span>
                              {getImpactIcon(simulationResults.efficiency - 87.3)}
                            </div>
                            <div className="text-2xl font-bold">{simulationResults.efficiency.toFixed(1)}%</div>
                            <Progress value={simulationResults.efficiency} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                Cost Impact
                                <InfoTooltip content={getTooltip("costSavings")} />
                              </span>
                              {getImpactIcon(simulationResults.costImpact, false)}
                            </div>
                            <div
                              className={`text-2xl font-bold ${getImpactColor(simulationResults.costImpact, false)}`}
                            >
                              {simulationResults.costImpact > 0 ? "+" : ""}
                              {simulationResults.costImpact.toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground">vs baseline</div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                Risk Score
                                <InfoTooltip content="Operational risk assessment based on maintenance backlog, weather conditions, emergency reserves, and system reliability factors. Lower scores indicate safer operations." />
                              </span>
                              {getImpactIcon(25 - simulationResults.riskScore)}
                            </div>
                            <div className="text-2xl font-bold">{simulationResults.riskScore}</div>
                            <div className="text-xs text-muted-foreground">Lower is better</div>
                          </div>
                        </div>

                        <Separator />

                        {/* Fleet Allocation */}
                        <div>
                          <h4 className="font-semibold mb-3">Projected Fleet Allocation</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="font-medium">Active Service</span>
                              </div>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {simulationResults.serviceTrainsets} trainsets
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center gap-2">
                                <Wrench className="h-4 w-4 text-yellow-500" />
                                <span className="font-medium">Maintenance</span>
                              </div>
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                {simulationResults.maintenanceTrainsets} trainsets
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">Standby Reserve</span>
                              </div>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {simulationResults.standbyTrainsets} trainsets
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Conflicts and Recommendations */}
                        <div>
                          <h4 className="font-semibold mb-3">Analysis Summary</h4>
                          <div className="space-y-2">
                            {simulationResults.conflicts > 0 ? (
                              <div className="flex items-center gap-2 text-sm text-yellow-600">
                                <AlertTriangle className="h-4 w-4" />
                                <span>{simulationResults.conflicts} potential conflicts detected</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>No conflicts detected</span>
                              </div>
                            )}

                            <div className="text-sm text-muted-foreground">
                              {simulationResults.efficiency > 90
                                ? "Excellent operational efficiency achieved"
                                : simulationResults.efficiency > 80
                                  ? "Good operational efficiency"
                                  : "Consider adjusting parameters for better efficiency"}
                            </div>

                            <div className="text-sm text-muted-foreground">
                              {simulationResults.riskScore < 20
                                ? "Low operational risk"
                                : simulationResults.riskScore < 35
                                  ? "Moderate operational risk"
                                  : "High operational risk - review parameters"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Scenario Comparison */}
              {hasResults && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Scenario Comparison</CardTitle>
                    <CardDescription>Compare current simulation with baseline operational parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">Availability</div>
                        <div className="text-lg font-bold">
                          {simulationResults.availability > 75.2 ? "+" : ""}
                          {(simulationResults.availability - 75.2).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">vs baseline</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">Efficiency</div>
                        <div className="text-lg font-bold">
                          {simulationResults.efficiency > 87.3 ? "+" : ""}
                          {(simulationResults.efficiency - 87.3).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">vs baseline</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">Cost Impact</div>
                        <div className={`text-lg font-bold ${getImpactColor(simulationResults.costImpact, false)}`}>
                          {simulationResults.costImpact > 0 ? "+" : ""}
                          {simulationResults.costImpact.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">operational cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-muted-foreground">Risk Change</div>
                        <div className={`text-lg font-bold ${getImpactColor(25 - simulationResults.riskScore)}`}>
                          {25 - simulationResults.riskScore > 0 ? "-" : "+"}
                          {Math.abs(25 - simulationResults.riskScore).toFixed(0)}
                        </div>
                        <div className="text-xs text-muted-foreground">risk points</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
