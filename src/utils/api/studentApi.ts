import { apiClient } from "../apiClient"

export const getStudents = () => {
    const data = apiClient.get('/users?populate[0]=role')
    return data
}