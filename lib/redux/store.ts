import { configureStore } from "@reduxjs/toolkit"
import resumeReducer from "./slices/resumeSlice"
import designReducer from "./slices/designSlice"
import historyReducer from "./slices/historySlice"

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    design: designReducer,
    history: historyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
