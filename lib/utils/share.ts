export const generateShareToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const getShareUrl = (token: string): string => {
  return `${window.location.origin}/resume/${token}`
}
