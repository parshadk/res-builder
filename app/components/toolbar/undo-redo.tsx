"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { undo, redo } from "@/lib/redux/slices/historySlice"
import { Button } from "@/components/ui/button"
import { RotateCcw, RotateCw } from "lucide-react"

export function UndoRedo() {
  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => state.history)

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => dispatch(undo())}
        disabled={history.past.length === 0}
        variant="outline"
        size="sm"
        title="Undo (Ctrl+Z)"
      >
        <RotateCcw size={16} />
      </Button>
      <Button
        onClick={() => dispatch(redo())}
        disabled={history.future.length === 0}
        variant="outline"
        size="sm"
        title="Redo (Ctrl+Y)"
      >
        <RotateCw size={16} />
      </Button>
    </div>
  )
}
