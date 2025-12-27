import { apiClient } from "./api-client"

export async function getAllnotifications(){
    try {
        const options= {
            method:"GET",
            url:"/notifications/"
        }
        const response = await apiClient.request(options);
        console.log(response);
        return response;
    } catch (error) {
        throw(error)
    }
}