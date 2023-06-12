type TProject = {
  id: number
  name: string
  description: string
  repository: string
  starDate: Date
  endDate?: Date
  developerId?: number 
}

type TProjectRequest = Omit<TProject, "id">

type TProjectUpdate = Partial<TProjectRequest>

type TGetProjectById = {
  id: number
  name: string
  description: string
  repository: string
  starDate: Date
  endDate: Date | null
  projectDeveloperName: string
}

type TGetProjectByIdRenamed = {
  projectId: number
  projectName: string
  projectDescription: string
  projectRepository: string
  projectStartDate: Date
  projectEndDate: Date | null
  projectDeveloperName: string
}

export { TProject, TProjectRequest, TGetProjectById, TGetProjectByIdRenamed, TProjectUpdate }