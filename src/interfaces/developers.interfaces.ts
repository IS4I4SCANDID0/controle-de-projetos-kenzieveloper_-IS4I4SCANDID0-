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

export { TDeveloper, TDeveloperRequest, TDeveloperInfos, TDeveloperInfosRequest }