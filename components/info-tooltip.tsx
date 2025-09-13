"use client"

import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface InfoTooltipProps {
    content: string
    side?: "top" | "right" | "bottom" | "left"
    className?: string
    iconClassName?: string
    maxWidth?: string
}

export function InfoTooltip({
    content,
    side = "top",
    className,
    iconClassName,
    maxWidth = "max-w-xs"
}: InfoTooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn(
                        "inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        className
                    )}
                    type="button"
                    aria-label="More information"
                >
                    <HelpCircle className={cn("h-4 w-4", iconClassName)} />
                </button>
            </TooltipTrigger>
            <TooltipContent
                side={side}
                className={cn(
                    "text-sm leading-relaxed",
                    maxWidth
                )}
                sideOffset={8}
            >
                {content}
            </TooltipContent>
        </Tooltip>
    )
}
