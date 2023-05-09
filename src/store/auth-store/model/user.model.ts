import { Address } from "./address.model"

export type User = {
    id: string,
    name: string,
    surname: string,
    email: string,
    role: number,
    status: number,
    address: Address
}