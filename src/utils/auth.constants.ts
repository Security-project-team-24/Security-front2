import * as yup from "yup"

export const LOGIN_VALIDATION_SCHEMA = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
})

export const LOGIN_DEFAULT_VALUES = {
    email: "",
    password: ""
}

export const REGISTER_VALIDATION_SCHEMA = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8),
    name: yup.string().required(),
    surname: yup.string().required(),
    phoneNumber: yup.string().required(),
    address: yup.object().shape({
        street: yup.string().required(),
        streetNumber: yup.string().required(),
        city: yup.string().required(),
        zipCode: yup.string().required(),
        country: yup.string().required()
    })
})

export const REGISTER_DEFAULT_VALUES = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phoneNumber: "",
}
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
}