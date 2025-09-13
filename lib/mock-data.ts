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
    lastMaintenance: "2025-08-15",
    nextMaintenance: "2025-10-15",
    mileage: 78450,
    fitnessExpiry: "2026-03-30",
    jobCards: { open: 0, closed: 28, pending: 1 },
    branding: {
      type: "Kerala Tourism",
      priority: "high",
      expiryDate: "2026-02-15",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-12",
      nextScheduled: "2025-09-14",
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
    lastMaintenance: "2025-09-10",
    nextMaintenance: "2025-11-10",
    mileage: 85320,
    fitnessExpiry: "2026-01-15",
    jobCards: { open: 3, closed: 24, pending: 2 },
    branding: {
      type: "Kochi Metro Branding",
      priority: "medium",
      expiryDate: "2025-12-31",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-11",
      nextScheduled: "2025-09-17",
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
    lastMaintenance: "2025-08-20",
    nextMaintenance: "2025-10-20",
    mileage: 71980,
    fitnessExpiry: "2026-04-20",
    jobCards: { open: 1, closed: 31, pending: 0 },
    branding: {
      type: "Digital Kerala",
      priority: "high",
      expiryDate: "2026-01-30",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-13",
      nextScheduled: "2025-09-15",
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
    lastMaintenance: "2025-08-25",
    nextMaintenance: "2025-10-25",
    mileage: 67850,
    fitnessExpiry: "2026-05-10",
    jobCards: { open: 0, closed: 26, pending: 0 },
    branding: {
      type: "Spices Board",
      priority: "medium",
      expiryDate: "2025-11-15",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-12",
      nextScheduled: "2025-09-16",
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
    lastMaintenance: "2025-07-30",
    nextMaintenance: "2025-09-30",
    mileage: 81120,
    fitnessExpiry: "2025-12-25",
    jobCards: { open: 2, closed: 25, pending: 1 },
    branding: {
      type: "Cochin Port Trust",
      priority: "low",
      expiryDate: "2026-03-20",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-11",
      nextScheduled: "2025-09-14",
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
    lastMaintenance: "2025-08-05",
    nextMaintenance: "2025-10-05",
    mileage: 89800,
    fitnessExpiry: "2025-11-15",
    jobCards: { open: 5, closed: 22, pending: 3 },
    branding: {
      type: "Standard Metro",
      priority: "low",
      expiryDate: "2025-12-31",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-08",
      nextScheduled: "2025-09-20",
      detailLevel: "deep",
    },
    stablingPosition: "Workshop-1",
    availability: 0,
    issues: ["Major overhaul in progress", "Fitness certificate expired", "Multiple system upgrades"],
  },
  {
    id: "ts-007",
    number: "KM-007",
    name: "Kochi Airport Link",
    status: "active",
    location: "Airport Station",
    lastMaintenance: "2025-09-01",
    nextMaintenance: "2025-11-01",
    mileage: 63240,
    fitnessExpiry: "2026-06-15",
    jobCards: { open: 0, closed: 18, pending: 0 },
    branding: {
      type: "CIAL Branding",
      priority: "high",
      expiryDate: "2025-12-20",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-13",
      nextScheduled: "2025-09-15",
      detailLevel: "premium",
    },
    stablingPosition: "Track-F1",
    availability: 97,
    issues: [],
  },
  {
    id: "ts-008",
    number: "KM-008",
    name: "Vytilla Mobility Hub",
    status: "standby",
    location: "Vytilla Depot",
    lastMaintenance: "2025-08-28",
    nextMaintenance: "2025-10-28",
    mileage: 59780,
    fitnessExpiry: "2026-07-10",
    jobCards: { open: 1, closed: 20, pending: 0 },
    branding: {
      type: "Smart City Mission",
      priority: "medium",
      expiryDate: "2026-01-10",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-12",
      nextScheduled: "2025-09-16",
      detailLevel: "basic",
    },
    stablingPosition: "Track-G2",
    availability: 98,
    issues: ["Minor cosmetic maintenance scheduled"],
  },
  {
    id: "ts-009",
    number: "KM-009",
    name: "Kadavanthra Express",
    status: "active",
    location: "Kadavanthra Station",
    lastMaintenance: "2025-09-05",
    nextMaintenance: "2025-11-05",
    mileage: 56320,
    fitnessExpiry: "2026-08-30",
    jobCards: { open: 0, closed: 16, pending: 1 },
    branding: {
      type: "Kerala State IT Mission",
      priority: "high",
      expiryDate: "2025-11-30",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-13",
      nextScheduled: "2025-09-15",
      detailLevel: "premium",
    },
    stablingPosition: "Track-H1",
    availability: 96,
    issues: [],
  },
  {
    id: "ts-010",
    number: "KM-010",
    name: "Thrippunithura Heritage",
    status: "maintenance",
    location: "Maintenance Shed A",
    lastMaintenance: "2025-09-08",
    nextMaintenance: "2025-11-08",
    mileage: 73450,
    fitnessExpiry: "2026-02-28",
    jobCards: { open: 4, closed: 23, pending: 2 },
    branding: {
      type: "Heritage Tourism",
      priority: "medium",
      expiryDate: "2025-10-31",
    },
    cleaningStatus: {
      lastCleaned: "2025-09-09",
      nextScheduled: "2025-09-18",
      detailLevel: "deep",
    },
    stablingPosition: "Maintenance-A3",
    availability: 0,
    issues: ["HVAC system upgrade", "Interior refurbishment", "Passenger information system update"],
  },
]

// Mock induction decisions
export const mockInductionDecisions: InductionDecision[] = [
  {
    trainsetId: "ts-007",
    recommendation: "service",
    priority: 1,
    reasoning: [
      "Excellent availability (97%)",
      "No open job cards",
      "CIAL branding with high priority",
      "Premium cleaning status",
      "Strategic airport route",
    ],
    conflicts: [],
    confidence: 96,
  },
  {
    trainsetId: "ts-001",
    recommendation: "service",
    priority: 2,
    reasoning: [
      "High availability (98%)",
      "No open job cards",
      "Kerala Tourism branding with high priority",
      "Recent maintenance completed",
    ],
    conflicts: [],
    confidence: 95,
  },
  {
    trainsetId: "ts-009",
    recommendation: "service",
    priority: 3,
    reasoning: [
      "Good availability (96%)",
      "Kerala State IT Mission branding priority",
      "Premium cleaning status",
      "No current issues",
    ],
    conflicts: ["Branding expiry approaching"],
    confidence: 90,
  },
  {
    trainsetId: "ts-003",
    recommendation: "service",
    priority: 4,
    reasoning: [
      "Good availability (95%)",
      "Digital Kerala branding priority",
      "Premium cleaning status",
      "Only minor issues",
    ],
    conflicts: [],
    confidence: 88,
  },
  {
    trainsetId: "ts-008",
    recommendation: "standby",
    priority: 5,
    reasoning: [
      "High availability (98%)",
      "Only minor cosmetic maintenance",
      "Ready for immediate deployment",
      "Smart City Mission branding",
    ],
    conflicts: [],
    confidence: 93,
  },
  {
    trainsetId: "ts-004",
    recommendation: "standby",
    priority: 6,
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
    priority: 7,
    reasoning: ["Fitness certificate renewal due", "Scheduled brake inspection required", "2 open job cards pending"],
    conflicts: ["High passenger demand period"],
    confidence: 85,
  },
  {
    trainsetId: "ts-002",
    recommendation: "maintenance",
    priority: 8,
    reasoning: ["Currently in maintenance", "Multiple open job cards", "Critical systems under repair"],
    conflicts: [],
    confidence: 100,
  },
  {
    trainsetId: "ts-010",
    recommendation: "maintenance",
    priority: 9,
    reasoning: ["HVAC system upgrade in progress", "Interior refurbishment ongoing", "Multiple system updates required"],
    conflicts: [],
    confidence: 98,
  },
  {
    trainsetId: "ts-006",
    recommendation: "maintenance",
    priority: 10,
    reasoning: ["Major overhaul in progress", "Fitness certificate expired", "Multiple system upgrades required"],
    conflicts: [],
    confidence: 100,
  },
]

// Mock KPI data
export const mockKPIData: KPIData = {
  availability: 82.4,
  punctuality: 96.2,
  costSavings: 18.7,
  maintenanceEfficiency: 91.5,
  passengerSatisfaction: 4.4,
}

// Mock history data
export const mockHistory: HistoryEntry[] = [
  {
    id: "hist-001",
    date: "2025-09-13",
    trainsetId: "ts-007",
    decision: "service",
    outcome: "successful",
    notes: "Excellent performance on airport route, high passenger satisfaction",
    supervisor: "Rajesh Kumar",
  },
  {
    id: "hist-002",
    date: "2025-09-13",
    trainsetId: "ts-001",
    decision: "service",
    outcome: "successful",
    notes: "Operated full schedule without issues, tourism branding effective",
    supervisor: "Priya Nair",
  },
  {
    id: "hist-003",
    date: "2025-09-12",
    trainsetId: "ts-009",
    decision: "service",
    outcome: "successful",
    notes: "IT Mission branding well-received, smooth operation",
    supervisor: "Suresh Menon",
  },
  {
    id: "hist-004",
    date: "2025-09-12",
    trainsetId: "ts-003",
    decision: "service",
    outcome: "successful",
    notes: "Digital Kerala route performing excellently",
    supervisor: "Anjali Thomas",
  },
  {
    id: "hist-005",
    date: "2025-09-11",
    trainsetId: "ts-008",
    decision: "standby",
    outcome: "successful",
    notes: "Successfully deployed during peak hours at Vytilla",
    supervisor: "Deepak Nair",
  },
  {
    id: "hist-006",
    date: "2025-09-11",
    trainsetId: "ts-004",
    decision: "standby",
    outcome: "successful",
    notes: "Ready deployment, performed well during rush hour",
    supervisor: "Rajesh Kumar",
  },
  {
    id: "hist-007",
    date: "2025-09-10",
    trainsetId: "ts-002",
    decision: "maintenance",
    outcome: "partial",
    notes: "Brake system completed, AC unit work in progress",
    supervisor: "Suresh Menon",
  },
  {
    id: "hist-008",
    date: "2025-09-10",
    trainsetId: "ts-005",
    decision: "service",
    outcome: "partial",
    notes: "Minor delay due to fitness certificate processing",
    supervisor: "Priya Nair",
  },
  {
    id: "hist-009",
    date: "2025-09-09",
    trainsetId: "ts-010",
    decision: "maintenance",
    outcome: "successful",
    notes: "HVAC upgrade completed successfully, interior work ongoing",
    supervisor: "Anjali Thomas",
  },
  {
    id: "hist-010",
    date: "2025-09-08",
    trainsetId: "ts-006",
    decision: "maintenance",
    outcome: "partial",
    notes: "Major overhaul 60% complete, system upgrades in progress",
    supervisor: "Deepak Nair",
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
