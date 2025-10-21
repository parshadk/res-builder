import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface DesignState {
  primaryColor: string
  accentColor: string
  fontFamily: string
  fontSize: {
    heading: number
    body: number
  }
}

const initialState: DesignState = {
  primaryColor: "#1e40af",
  accentColor: "#0f172a",
  fontFamily: "inter",
  fontSize: {
    heading: 24,
    body: 14,
  },
}

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    updatePrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload
    },
    updateAccentColor: (state, action: PayloadAction<string>) => {
      state.accentColor = action.payload
    },
    updateFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload
    },
    updateFontSize: (state, action: PayloadAction<{ heading: number; body: number }>) => {
      state.fontSize = action.payload
    },
    resetDesign: () => initialState,
  },
})

export const { updatePrimaryColor, updateAccentColor, updateFontFamily, updateFontSize, resetDesign } =
  designSlice.actions

export default designSlice.reducer
