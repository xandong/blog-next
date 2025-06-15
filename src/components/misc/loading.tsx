import { Loader2 } from "lucide-react"

export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    </div>
  )
}
