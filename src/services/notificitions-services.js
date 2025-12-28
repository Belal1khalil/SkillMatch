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

export async function markNotificationAsRead(notificationId) {
    try {
        const options = {
            method: "POST",
            url: `/notifications/${notificationId}/read`
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function markAllNotificationsAsRead() {
    try {
        const options = {
            method: "POST",
            url: "/notifications/read-all"
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}
