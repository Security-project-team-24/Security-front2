import { User } from "../../auth-store/model/user.model"

export type ProjectEmployee = {
    id: number
    employee: User
    jobDescription: string
    startDate: Date
    endDate:Date
}