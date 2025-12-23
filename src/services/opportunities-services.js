import { apiClient } from "./api-client"

export async function GetRecommendedJobs() {
    try {
        const options= {
            method: 'GET',
            url:`/opportunities/recommended`
        }
        const response = await apiClient.request(options)
        console.log(response)
        return response
    } catch (error) {
        
    }
}