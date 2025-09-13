export interface TrainsetStatus {
  id: string
  number: string
  name: string
  status: "active" | "maintenance" | "standby" | "out-of-service"
  location: string
  lastMaintenance: string
  nextMaintenance: string
  mileage: number
  fitnessExpiry: string
  jobCards: {
    open: number
    closed: number
    pending: number
  }
  branding: {
    type: string
    priority: "high" | "medium" | "low"
    expiryDate: string
  }
  cleaningStatus: {
    lastCleaned: string
    nextScheduled: string
    detailLevel: "basic" | "deep" | "premium"
  }
  stablingPosition: string
  availability: number
  issues: string[]
}

export interface InductionDecision {
  trainsetId: string
  recommendation: "service" | "standby" | "maintenance"
  priority: number
  reasoning: string[]
  conflicts: string[]
  confidence: number
}

export interface KPIData {
  availability: number
  punctuality: number
  costSavings: number
  maintenanceEfficiency: number
  passengerSatisfaction: number
}

export interface HistoryEntry {
  id: string
  date: string
  trainsetId: string
  decision: "service" | "standby" | "maintenance"
  outcome: "successful" | "partial" | "failed"
  notes: string
  supervisor: string
}

// Mock trainset data
export const mockTrainsets: TrainsetStatus[] = [
  {
    id: "ts-001",
    number: "KM-001",
    name: "Aluva Express",
    status: "active",
    location: "Aluva Depot",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-02-15",
    mileage: 45230,
    fitnessExpiry: "2024-06-30",
    jobCards: { open: 0, closed: 12, pending: 1 },
    branding: {
      type: "Kerala Tourism",
      priority: "high",
      expiryDate: "2024-08-15",
    },
    cleaningStatus: {
      lastCleaned: "2024-01-20",
      nextScheduled: "2024-01-22",
      detailLevel: "basic",
    },
    stablingPosition: "Track-A1",
    availability: 98,
    issues: [],
  },
  {
    id: "ts-002",
    number: "KM-002",
    name: "Ernakulam Central",
    status: "maintenance",
    location: "Maintenance Shed B",
    lastMaintenance: "2024-01-18",
    nextMaintenance: "2024-02-18",
    mileage: 52100,
    fitnessExpiry: "2024-05-15",
    jobCards: { open: 3, closed: 8, pending: 2 },
    branding: {
      type: "Kochi Metro Branding",
      priority: "medium",
      expiryDate: "2024-12-31",
    },
    cleaningStatus: {
      lastCleaned: "2024-01-19",
      nextScheduled: "2024-01-25",
      detailLevel: "deep",
    },
    stablingPosition: "Maintenance-B2",
    availability: 0,
    issues: ["Brake system check", "AC unit replacement", "Door mechanism repair"],
  },
  {
    id: "ts-003",
    number: "KM-003",
    name: "Kakkanad Link",
    status: "active",
    location: "Kakkanad Station",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
    mileage: 38750,
    fitnessExpiry: "2024-07-20",
    jobCards: { open: 1, closed: 15, pending: 0 },
    branding: {
      type: "Digital Kerala",
      priority: "high",
      expiryDate: "2024-09-30",
    },
    cleaningStatus: {
      lastCleaned: "2024-01-21",
      nextScheduled: "2024-01-23",
      detailLevel: "premium",
    },
    stablingPosition: "Track-C3",
    availability: 95,
    issues: ["Minor interior wear"],
  },
  {
    id: "ts-004",
    number: "KM-004",
    name: "Palarivattom Hub",
    status: "standby",
    location: "Palarivattom Depot",
    lastMaintenance: "2024-01-12",
    nextMaintenance: "2024-02-12",
    mileage: 41200,
    fitnessExpiry: "2024-08-10",
    jobCards: { open: 0, closed: 10, pending: 0 },
    branding: {
      type: "Spices Board",
      priority: "medium",
      expiryDate: "2024-11-15",
    },
    cleaningStatus: {
      lastCleaned: "2024-01-20",
      nextScheduled: "2024-01-24",
      detailLevel: "basic",
    },
    stablingPosition: "Track-D1",
    availability: 100,
    issues: [],
  },
  {
    id: "ts-005",
    number: "KM-005",
    name: "Edapally Junction",
    status: "active",
    location: "Edapally Station",
    lastMaintenance: "2024-01-08",
    nextMaintenance: "2024-02-08",
    mileage: 47890,
    fitnessExpiry: "2024-04-25",
    jobCards: { open: 2, closed: 9, pending: 1 },
    branding: {
      type: "Cochin Port Trust",
      priority: "low",
      expiryDate: "2024-10-20",
    },
    cleaningStatus: {
      lastCleaned: "2024-01-19",
      nextScheduled: "2024-01-22",
      detailLevel: "basic",
    },
    stablingPosition: "Track-E2",
    availability: 92,
    issues: ["Fitness certificate renewal due", "Scheduled brake inspection"],
  },
  {
    id: "ts-006",
    number: "KM-006",
    name: "MG Road Express",
    status: "out-of-service",
    location: "Workshop",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-02-05",
    mileage: 55600,
    fitnessExpiry: "2024-03-15",
    jobCards: { open: 5, closed: 6, pending: 3 },
    branding: {
      type: "Standard Metro",
      priority: "low",
      expiryDate: "2024-12-31",
    },
    cleaningStatus: {
      lastCleaned: "2024-01-16",
      nextScheduled: "2024-01-28",
      detailLevel: "deep",
    },
    stablingPosition: "Workshop-1",
    availability: 0,
    issues: ["Major overhaul in progress", "Fitness certificate expired", "Multiple system upgrades"],
  },
]

// Mock induction decisions
export const mockInductionDecisions: InductionDecision[] = [
  {
    trainsetId: "ts-001",
    recommendation: "service",
    priority: 1,
    reasoning: [
      "High availability (98%)",
      "No open job cards",
      "Premium branding with high priority",
      "Recent cleaning completed",
    ],
    conflicts: [],
    confidence: 95,
  },
  {
    trainsetId: "ts-003",
    recommendation: "service",
    priority: 2,
    reasoning: [
      "Good availability (95%)",
      "Digital Kerala branding priority",
      "Premium cleaning status",
      "Only minor issues",
    ],
    conflicts: ["Fitness certificate renewal approaching"],
    confidence: 88,
  },
  {
    trainsetId: "ts-004",
    recommendation: "standby",
    priority: 3,
    reasoning: [
      "Perfect availability (100%)",
      "No issues reported",
      "Ready for immediate deployment",
      "Medium branding priority",
    ],
    conflicts: [],
    confidence: 92,
  },
  {
    trainsetId: "ts-005",
    recommendation: "maintenance",
    priority: 4,
    reasoning: ["Fitness certificate renewal due", "Scheduled brake inspection required", "2 open job cards pending"],
    conflicts: ["High passenger demand period"],
    confidence: 85,
  },
  {
    trainsetId: "ts-002",
    recommendation: "maintenance",
    priority: 5,
    reasoning: ["Currently in maintenance", "Multiple open job cards", "Critical systems under repair"],
    conflicts: [],
    confidence: 100,
  },
  {
    trainsetId: "ts-006",
    recommendation: "maintenance",
    priority: 6,
    reasoning: ["Major overhaul in progress", "Fitness certificate expired", "Multiple system upgrades required"],
    conflicts: [],
    confidence: 100,
  },
]

// Mock KPI data
export const mockKPIData: KPIData = {
  availability: 75.2,
  punctuality: 94.8,
  costSavings: 12.5,
  maintenanceEfficiency: 87.3,
  passengerSatisfaction: 4.2,
}

// Mock history data
export const mockHistory: HistoryEntry[] = [
  {
    id: "hist-001",
    date: "2024-01-20",
    trainsetId: "ts-001",
    decision: "service",
    outcome: "successful",
    notes: "Operated full schedule without issues",
    supervisor: "Rajesh Kumar",
  },
  {
    id: "hist-002",
    date: "2024-01-20",
    trainsetId: "ts-003",
    decision: "service",
    outcome: "successful",
    notes: "High passenger satisfaction scores",
    supervisor: "Priya Nair",
  },
  {
    id: "hist-003",
    date: "2024-01-19",
    trainsetId: "ts-002",
    decision: "maintenance",
    outcome: "partial",
    notes: "Brake system repair completed, AC unit pending",
    supervisor: "Suresh Menon",
  },
  {
    id: "hist-004",
    date: "2024-01-19",
    trainsetId: "ts-004",
    decision: "standby",
    outcome: "successful",
    notes: "Deployed during peak hours, performed well",
    supervisor: "Anjali Thomas",
  },
  {
    id: "hist-005",
    date: "2024-01-18",
    trainsetId: "ts-005",
    decision: "service",
    outcome: "partial",
    notes: "Minor delay due to door mechanism issue",
    supervisor: "Rajesh Kumar",
  },
]

// Utility functions for data manipulation
export const getTrainsetById = (id: string): TrainsetStatus | undefined => {
  return mockTrainsets.find((trainset) => trainset.id === id)
}

export const getTrainsetsByStatus = (status: TrainsetStatus["status"]): TrainsetStatus[] => {
  return mockTrainsets.filter((trainset) => trainset.status === status)
}

export const getInductionDecisionByTrainsetId = (trainsetId: string): InductionDecision | undefined => {
  return mockInductionDecisions.find((decision) => decision.trainsetId === trainsetId)
}

export const getHistoryByTrainsetId = (trainsetId: string): HistoryEntry[] => {
  return mockHistory.filter((entry) => entry.trainsetId === trainsetId)
}

// Status badge configurations
export const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  standby: {
    label: "Standby",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  "out-of-service": {
    label: "Out of Service",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
}

// Priority configurations
export const priorityConfig = {
  high: {
    label: "High",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  medium: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  low: {
    label: "Low",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
}
