type TDeveloper = {
  id: number
  name: string
  email: string
}

type TDeveloperRequest = Omit<TDeveloper, "id">

type TDeveloperInfos = {
  id: number
  developerSince: Date 
  preferredOS: "Windows" | "Linux" | "MacOS"
  developId: number
}

type TDeveloperInfosRequest = Omit<TDeveloperInfos, "id" | "developerId">

type TGetDeveloperById = {
  id: number
  name: string
  email: string
  developerSince: Date | null
  preferredOS: string | null
}

type TGetDeveloperByIdRenamed = {
  developerId: number
  developerName: string
  developerEmail: string
  developerInfoDeveloperSince: Date | null
  developerInfoPreferredOS: string | null
}

export { TDeveloper, TDeveloperRequest, TDeveloperInfos, TDeveloperInfosRequest, TGetDeveloperByIdRenamed, TGetDeveloperById }