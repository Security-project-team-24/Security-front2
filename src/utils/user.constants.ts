import * as yup from "yup"

export const CHANGE_PASSWORD_VALIDATION_SCHEMA = yup.object({
    oldPassword: yup.string().required().min(8),
    newPassword: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8),
})

export const CHANGE_PASSWORD_DEFAULT_VALUES = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
}


export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
}