import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PriorityBadgeProps {
  priority: "high" | "medium" | "low"
  className?: string
}

const priorityConfig = {
  high: {
    label: "High Priority",
    className: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
  },
  low: {
    label: "Low Priority",
    className: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  },
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority]

  return (
    <Badge variant="secondary" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
