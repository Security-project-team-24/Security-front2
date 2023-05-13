import { Address } from "../model/address.model"

export type Register = {
    name: string,
    surname: string,
    email: string,
    role: number,
    address: Address
    phoneNumber: string
    password: string, 
    confirmPassword: string
}