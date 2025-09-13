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
import { PriorityBadge } from "@/components/priority-badge"
import { mockTrainsets, type TrainsetStatus } from "@/lib/mock-data"
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
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Eye, MapPin, Calendar, Gauge, AlertTriangle, CheckCircle, Clock, Wrench } from "lucide-react"

export default function TrainsetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("number")

  // Filter and sort trainsets
  const filteredTrainsets = mockTrainsets
    .filter((trainset) => {
      const matchesSearch =
        trainset.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainset.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || trainset.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "number":
          return a.number.localeCompare(b.number)
        case "availability":
          return b.availability - a.availability
        case "mileage":
          return b.mileage - a.mileage
        case "nextMaintenance":
          return new Date(a.nextMaintenance).getTime() - new Date(b.nextMaintenance).getTime()
        default:
          return 0
      }
    })

  const getStatusIcon = (status: TrainsetStatus["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <Wrench className="h-4 w-4 text-yellow-500" />
      case "standby":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "out-of-service":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getDaysUntil = (dateString: string) => {
    const targetDate = new Date(dateString)
    const today = new Date()
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
                  <h1 className="text-3xl font-bold tracking-tight">Trainset Fleet</h1>
                  <p className="text-muted-foreground">
                    Comprehensive view of all trainsets with status, maintenance, and operational details
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {filteredTrainsets.length} of {mockTrainsets.length} trainsets
                </Badge>
              </div>

              {/* Filters and Search */}
              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search trainsets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="standby">Standby</SelectItem>
                      <SelectItem value="out-of-service">Out of Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">Trainset Number</SelectItem>
                      <SelectItem value="availability">Availability</SelectItem>
                      <SelectItem value="mileage">Mileage</SelectItem>
                      <SelectItem value="nextMaintenance">Next Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Trainsets Table */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Fleet Overview</CardTitle>
                  <CardDescription>Detailed information for each trainset in the fleet</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Trainset</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Mileage</TableHead>
                        <TableHead>Next Maintenance</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrainsets.map((trainset) => {
                        const maintenanceDays = getDaysUntil(trainset.nextMaintenance)
                        const fitnessExpiry = getDaysUntil(trainset.fitnessExpiry)

                        return (
                          <TableRow key={trainset.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {getStatusIcon(trainset.status)}
                                <div>
                                  <div className="font-medium">{trainset.number}</div>
                                  <div className="text-sm text-muted-foreground">{trainset.name}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={trainset.status} />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{trainset.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={trainset.availability} className="w-16" />
                                <span className="text-sm font-medium">{trainset.availability}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Gauge className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{trainset.mileage.toLocaleString()} km</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{formatDate(trainset.nextMaintenance)}</span>
                                {maintenanceDays <= 7 && (
                                  <Badge variant="destructive" className="ml-1 text-xs">
                                    {maintenanceDays}d
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {trainset.issues.length > 0 ? (
                                <Badge variant="destructive" className="text-xs">
                                  {trainset.issues.length} issues
                                </Badge>
                              ) : fitnessExpiry <= 30 ? (
                                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                  Fitness due
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  No issues
                                </Badge>
                              )}
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
                                    <DialogTitle>
                                      {trainset.number} - {trainset.name}
                                    </DialogTitle>
                                    <DialogDescription>Detailed trainset information and status</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Basic Information</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Status:</span>
                                            <StatusBadge status={trainset.status} />
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span>{trainset.location}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Stabling Position:</span>
                                            <span>{trainset.stablingPosition}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Availability:</span>
                                            <span>{trainset.availability}%</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Maintenance</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Last Service:</span>
                                            <span>{formatDate(trainset.lastMaintenance)}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Next Service:</span>
                                            <span>{formatDate(trainset.nextMaintenance)}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Fitness Expiry:</span>
                                            <span>{formatDate(trainset.fitnessExpiry)}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Mileage:</span>
                                            <span>{trainset.mileage.toLocaleString()} km</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Job Cards</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Open:</span>
                                            <Badge variant={trainset.jobCards.open > 0 ? "destructive" : "secondary"}>
                                              {trainset.jobCards.open}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Pending:</span>
                                            <Badge variant={trainset.jobCards.pending > 0 ? "secondary" : "outline"}>
                                              {trainset.jobCards.pending}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Closed:</span>
                                            <Badge variant="outline">{trainset.jobCards.closed}</Badge>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Branding</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Type:</span>
                                            <span>{trainset.branding.type}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Priority:</span>
                                            <PriorityBadge priority={trainset.branding.priority} />
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Expires:</span>
                                            <span>{formatDate(trainset.branding.expiryDate)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-2">Cleaning Status</h4>
                                      <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div className="flex justify-between">
                                          <span>Last Cleaned:</span>
                                          <span>{formatDate(trainset.cleaningStatus.lastCleaned)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Next Scheduled:</span>
                                          <span>{formatDate(trainset.cleaningStatus.nextScheduled)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Detail Level:</span>
                                          <Badge variant="outline">{trainset.cleaningStatus.detailLevel}</Badge>
                                        </div>
                                      </div>
                                    </div>

                                    {trainset.issues.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold mb-2 text-red-600">Current Issues</h4>
                                        <div className="space-y-1">
                                          {trainset.issues.map((issue, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                              <AlertTriangle className="h-3 w-3 text-red-500" />
                                              <span>{issue}</span>
                                            </div>
                                          ))}
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
