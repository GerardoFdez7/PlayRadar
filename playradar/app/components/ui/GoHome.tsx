import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/Loader"
import React from "react"

export const GoHome = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("", className)}
      onClick={() => {
        setIsLoading(true)
        setTimeout(() => router.push("/"), 0)
      }}
      {...props}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ArrowLeft />
          <span className="sr-only">Back to home</span>
        </>
      )}
    </Button>
  )
})

GoHome.displayName = "GoHome"