import { apiClient } from "./api-client"

export async function getMyApplications () {
    try {
        const options= {
            method:"GET",
            url:`/applications/my-applications`
        }
        const response = await apiClient.request(options);
        console.log(response);
        return response;
    } catch (error) {
        throw(error)
    }
}