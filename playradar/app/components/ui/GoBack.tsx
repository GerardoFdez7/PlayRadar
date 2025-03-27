"use client";

import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils";
import LoaderSmall from "@/components/ui/LoaderSmall"
import React from "react"

export const GoBack = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  
  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn("", className)}
      onClick={() => {
        setIsLoading(true)
        setTimeout(() => router.back(), 0)
      }}
      {...props}
    >
      {isLoading ? (
        <LoaderSmall />
      ) : (
        <>
          <ArrowLeft className="h-5 w-5"/>
          <span className="sr-only">Back to home</span>
        </>
      )}
    </Button>
  )
})

GoBack.displayName = "GoBack"