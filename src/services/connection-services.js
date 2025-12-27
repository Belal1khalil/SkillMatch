import { apiClient } from "./api-client";

export async function getPendingConnections() {
  try {
    const options = {
      method: "GET",
      url: `/connections/pending`,
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllConnections() {
  try {
    const options = {
      url: `/connections/`,
      method: "GET",
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendConnectionRequest(id) {
  try {
    const options = {
      method: "POST",
      url: `/connections/send`,
      data: {
        receiverId: id,
      },
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getConnectionStatus(id) {
  try {
    const options = {
      method: "GET",
      url: `/connections/status/${id}`,
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
