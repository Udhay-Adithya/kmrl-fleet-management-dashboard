// Comprehensive tooltips for Kochi Metro Fleet Management System
// These explanations help users understand technical terms and concepts

export const tooltips = {
    // Fleet Management Terms
    trainset: "A four-car electric multiple unit (EMU) that operates as a single unit on the Kochi Metro network. Each trainset can carry approximately 975 passengers.",

    induction: "The daily process of deciding which trainsets will enter revenue service, remain on standby, or be held back for maintenance. This critical decision is made every evening between 21:00-23:00 IST.",

    fleetAvailability: "The percentage of trainsets available for passenger service at any given time. This includes both active and standby trainsets but excludes those under maintenance or out of service.",

    onTimePerformance: "The percentage of metro services that arrive and depart within the scheduled time window. KMRL maintains a target of 95% punctuality to ensure reliable passenger service.",

    // Technical Status Terms
    activeService: "Trainsets currently operating on the metro line, carrying passengers between stations. These units are generating revenue and following scheduled timetables.",

    standbyMode: "Trainsets that are fully operational and ready for immediate deployment if needed. They serve as backup units during peak hours or emergency situations.",

    maintenanceMode: "Trainsets temporarily removed from service for scheduled or corrective maintenance work. They are located in maintenance facilities or workshops.",

    outOfService: "Trainsets that cannot operate due to major technical issues, expired fitness certificates, or extensive maintenance requirements. These require significant work before returning to service.",

    // Fitness & Compliance
    fitnessCertificate: "Official safety clearance issued by Rolling-Stock, Signalling, and Telecom departments. Required for all trainsets to operate in passenger service. Must be renewed periodically.",

    jobCards: "Work orders exported from IBM Maximo system that track maintenance tasks. Open cards indicate pending work, closed cards show completed tasks, and pending cards await approval or parts.",

    // Operational Factors
    brandingPriority: "Contractual commitments for exterior advertising wraps that dictate minimum exposure hours. High priority branding generates more revenue and must be given preference in service allocation.",

    mileageBalancing: "Strategic distribution of operating kilometers across the fleet to ensure even wear of components like bogies, brake pads, and HVAC systems. This prevents premature component failure.",

    cleaningSchedule: "Planned interior and exterior cleaning operations. Basic cleaning involves routine sanitization, deep cleaning includes detailed interior work, and premium cleaning covers comprehensive detailing.",

    stablingPosition: "Physical parking bay locations in depots that minimize nighttime train movements (shunting) and optimize morning deployment efficiency. Proper positioning reduces energy consumption and safety risks.",

    // Maintenance Terms
    preventiveMaintenance: "Scheduled maintenance performed at regular intervals to prevent failures and ensure safe operation. Based on time intervals, mileage, or operating hours.",

    correctiveMaintenance: "Unscheduled maintenance to fix specific issues or failures. These repairs are performed when problems are detected during operation or routine inspections.",

    ibl: "Inspection Bay Line - dedicated maintenance facility where trainsets undergo detailed inspections, repairs, and component replacements away from the main operational tracks.",

    // Performance Metrics
    maintenanceEfficiency: "Measure of how quickly and effectively maintenance tasks are completed. Higher efficiency means faster turnaround times and better fleet availability.",

    costSavings: "Financial benefits achieved through optimized planning compared to manual decision-making. Includes reduced energy costs, better resource utilization, and minimized operational disruptions.",

    passengerSatisfaction: "Rating based on passenger feedback regarding service quality, punctuality, cleanliness, and overall travel experience. Measured through surveys and feedback systems.",

    // AI & Technology Terms
    aiOptimization: "Machine learning algorithms that analyze multiple variables (fitness, maintenance, branding, mileage, cleaning, stabling) to generate optimal induction decisions with explainable reasoning.",

    confidenceScore: "AI-generated percentage indicating how certain the system is about a particular recommendation. Higher scores indicate stronger supporting evidence and fewer conflicting factors.",

    conflictDetection: "Automated identification of situations where multiple factors contradict each other, such as high-priority branding on a trainset requiring urgent maintenance.",

    whatIfSimulation: "Scenario analysis feature that allows operators to test different allocation strategies and see predicted outcomes before implementing actual changes.",

    // Planning Terms
    planningHorizon: "The time period for which induction decisions are made, typically 24 hours ahead. This allows for proper resource allocation and scheduling coordination.",

    optimizationScore: "Overall efficiency rating of the generated plan, considering fleet availability, cost effectiveness, maintenance requirements, and operational constraints.",

    multiObjectiveOptimization: "Advanced planning approach that simultaneously optimizes multiple goals like service readiness, reliability, cost minimization, and branding exposure requirements.",

    // System Integration
    maximo: "IBM Maximo Asset Management system used by KMRL for tracking maintenance work orders, spare parts inventory, and equipment lifecycle management.",

    iotSensors: "Internet of Things devices installed on trainsets that monitor real-time equipment health, performance metrics, and operational parameters for predictive maintenance.",

    unsStreams: "Unified Network System data feeds that provide real-time operational information about train movements, schedules, and system status across the metro network.",

    // Operational Excellence
    kpi: "Key Performance Indicators - critical metrics used to measure operational success including availability, punctuality, cost efficiency, and passenger satisfaction.",

    sla: "Service Level Agreement - contractual commitments for branding exposure, maintenance turnaround times, and service quality standards that must be met to avoid penalties.",

    // Future Planning
    scalability: "System's ability to handle increased fleet size (planned growth to 40 trainsets) and additional depot locations without proportional increases in manual effort or complexity.",

    algorithmicDecisionSupport: "Computer-based system that provides data-driven recommendations while allowing human operators to make final decisions and handle exceptional circumstances."
} as const

// Helper function to get tooltip content
export function getTooltip(key: keyof typeof tooltips): string {
    return tooltips[key] || "No information available for this term."
}

// Categories for organizing tooltips
export const tooltipCategories = {
    fleet: ["trainset", "induction", "fleetAvailability", "onTimePerformance"],
    status: ["activeService", "standbyMode", "maintenanceMode", "outOfService"],
    compliance: ["fitnessCertificate", "jobCards", "sla"],
    operations: ["brandingPriority", "mileageBalancing", "cleaningSchedule", "stablingPosition"],
    maintenance: ["preventiveMaintenance", "correctiveMaintenance", "ibl", "maintenanceEfficiency"],
    performance: ["costSavings", "passengerSatisfaction", "kpi", "optimizationScore"],
    technology: ["aiOptimization", "confidenceScore", "conflictDetection", "whatIfSimulation"],
    planning: ["planningHorizon", "multiObjectiveOptimization", "algorithmicDecisionSupport"],
    systems: ["maximo", "iotSensors", "unsStreams", "scalability"]
}
