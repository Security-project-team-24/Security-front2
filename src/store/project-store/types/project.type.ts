import { ProjectEmployee } from "./projectEmployee.type"

export type Project = {
    id: number
    name: string
    duration: number
    projectEmployees: ProjectEmployee[]
}