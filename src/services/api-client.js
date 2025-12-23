import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://skillmatch.elmihy.me/api",
});

apiClient.interceptors.request.use((config) => {
   
  const token =
    localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

  if (token) {
    config.headers.token = token;
   
    config.headers.Authorization = `Bearer ${token}`;

  }
  // console.log(config.headers.Authorization)
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve({
      success: true,
      data: response.data,
    });
  },
  (error) => {
    return Promise.reject({
      success: false,
      error: error,
    });
  }
);
export async function getProfileData() {
  try {
    const options = {
      method: "GET",
      url: `/auth/me`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };
    const response = await apiClient.request(options);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
