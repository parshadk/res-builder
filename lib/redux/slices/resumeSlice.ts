import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  isCurrently: boolean
  description: string
  order: number
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
  order: number
}

export interface Skill {
  id: string
  name: string
  level: string
  order: number
}

export interface Project {
  id: string
  title: string
  description: string
  link: string
  order: number
}

export interface ResumeState {
  id: string
  title: string
  template: string
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
  projects: Project[]
  isPublic: boolean
  shareToken: string | null
}

const initialState: ResumeState = {
  id: "resume-1",
  title: "My Resume",
  template: "modern",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary: "Experienced professional with a passion for creating impactful solutions.",
  experiences: [
    {
      id: "1",
      jobTitle: "Senior Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      isCurrently: true,
      description: "Led development of core platform features and mentored junior developers.",
      order: 0,
    },
  ],
  educations: [
    {
      id: "1",
      school: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2018-09",
      endDate: "2022-05",
      description: "GPA: 3.8/4.0",
      order: 0,
    },
  ],
  skills: [
    { id: "1", name: "React", level: "Expert", order: 0 },
    { id: "2", name: "TypeScript", level: "Expert", order: 1 },
    { id: "3", name: "Node.js", level: "Advanced", order: 2 },
  ],
  projects: [
    {
      id: "1",
      title: "Resume Builder",
      description: "A modern resume builder with real-time editing and PDF export.",
      link: "https://github.com/example/resume-builder",
      order: 0,
    },
  ],
  isPublic: false,
  shareToken: null,
}

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<Partial<ResumeState>>) => {
      Object.assign(state, action.payload)
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experiences.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) {
        state.experiences[index] = action.payload
      }
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.push(action.payload)
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter((e) => e.id !== action.payload)
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.educations.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) {
        state.educations[index] = action.payload
      }
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educations.push(action.payload)
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.educations = state.educations.filter((e) => e.id !== action.payload)
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.skills[index] = action.payload
      }
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload)
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((s) => s.id !== action.payload)
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = action.payload
      }
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload)
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
    },
    reorderExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.experiences = action.payload
    },
    reorderEducations: (state, action: PayloadAction<Education[]>) => {
      state.educations = action.payload
    },
    reorderSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload
    },
    reorderProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload
    },
    setTemplate: (state, action: PayloadAction<string>) => {
      state.template = action.payload
    },
    setPublic: (state, action: PayloadAction<{ isPublic: boolean; shareToken: string | null }>) => {
      state.isPublic = action.payload.isPublic
      state.shareToken = action.payload.shareToken
    },
    loadResume: (state, action: PayloadAction<ResumeState>) => {
      return action.payload
    },
  },
})

export const {
  updatePersonalInfo,
  updateExperience,
  addExperience,
  deleteExperience,
  updateEducation,
  addEducation,
  deleteEducation,
  updateSkill,
  addSkill,
  deleteSkill,
  updateProject,
  addProject,
  deleteProject,
  reorderExperiences,
  reorderEducations,
  reorderSkills,
  reorderProjects,
  setTemplate,
  setPublic,
  loadResume,
} = resumeSlice.actions

export default resumeSlice.reducer
