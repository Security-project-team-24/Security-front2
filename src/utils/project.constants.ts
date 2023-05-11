import * as yup from "yup"

export const CREATE_PROJECT_VALIDATION_SCHEMA = yup.object({
    name: yup.string().required(),
    duration: yup.number().required().moreThan(0)
})

export const CREATE_PROJECT_DEFAULT_VALUES = {
    name: "",
    duration: 0
}

export const ADD_EMPLOYEE_VALIDATION_SCHEMA = yup.object({
    employeeId: yup.number().required(),
    jobDescription: yup.string().required(),
    projectId: yup.number().required()
})

export const ADD_EMPLOYEE_DEFAULT_VALUES = {
    employeeId: undefined,
    jobDescription: "",
    projectId: undefined
}

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
}