"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { pushHistory } from "@/lib/redux/slices/historySlice"

export function useHistory() {
  const dispatch = useDispatch()
  const resume = useSelector((state: RootState) => state.resume)

  useEffect(() => {
    dispatch(pushHistory(resume))
  }, [resume, dispatch])
}
