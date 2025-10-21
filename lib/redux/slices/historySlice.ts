import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ResumeState } from "./resumeSlice"

export interface HistoryState {
  past: ResumeState[]
  present: ResumeState | null
  future: ResumeState[]
}

const initialState: HistoryState = {
  past: [],
  present: null,
  future: [],
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    pushHistory: (state, action: PayloadAction<ResumeState>) => {
      if (state.present) {
        state.past.push(state.present)
      }
      state.present = action.payload
      state.future = []
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop()
        if (state.present) {
          state.future.unshift(state.present)
        }
        state.present = previous || null
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.shift()
        if (state.present) {
          state.past.push(state.present)
        }
        state.present = next || null
      }
    },
    clearHistory: () => initialState,
  },
})

export const { pushHistory, undo, redo, clearHistory } = historySlice.actions

export default historySlice.reducer
