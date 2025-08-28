import { Slider } from "@/components/ui/slider"

export function AudiobookProgress() {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Current Time */}
      <span className="text-xs text-highlight-light">0:01</span>

      {/* Progress Bar */}
      <Slider
        defaultValue={[25]}
        max={214} // total duration in seconds
        step={1}
        className="
          w-full
          [&_[role=slider]]:h-3 
          [&_[role=slider]]:w-3 
          [&_[role=slider]]:rounded-full 
          [&_[role=slider]]:bg-highlight-light 
          [&_[role=slider]]:border-0 
          [&_[role=slider]]:shadow-none 
          [&_[role=slider]]:translate-y-[-1px]

          [&_[role=track]]:bg-[#2a2a2a] 
          [&_[role=track]]:h-1 
          [&_[role=track]]:rounded-full

          [&_[role=range]]:bg-highlight-light 
          [&_[role=range]]:rounded-full
        "
      />

      {/* Total Time */}
      <span className="text-xs text-highlight-light">3:34</span>
    </div>
  )
}
