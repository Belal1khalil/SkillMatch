
import { data } from "react-router-dom";
import { apiClient } from "./api-client";


export async function getProfileData() {
  try {
    const options = {
      method: "GET",
      url: `/auth/me`,
    };
    const response = await apiClient.request(options);
   
    return response;
  } catch (error) {
    throw error;
  }
}


export async function updateProfileData(values) {
   try {
     const options= {
        url:`/auth/updateMe`,
        method: "PATCH",
        data: values,
    }
    const response = await apiClient.request(options);
    console.log(response);
    return response;
   } catch (error) {
     throw error;
   }
}



export async function updateMyPassword(values) {
    try {
        const options= {
            method: "PATCH",
            url: `/auth/updateMyPassword`,
            data: values,
        }
        const response = await apiClient.request(options);
        
        return response;
    } catch (error) {
        throw error;
    }
}


export async function discoverPersons() {
    try {
        const options= {
            method: "GET",
            url: `/auth/discover`,
        }
        const response = await apiClient.request(options);
 
        return response;
    } catch (error) {
        throw error;
    }
}



export async function updateMyPhoto(formData) {
   try {
     const options= {
        url:`/auth/updateMyPhoto`,
        method: "PATCH",
        data:formData,
        headers:{
          "content-type":"multipart/form-data"
        }
     }
     const response = await apiClient.request(options);
     console.log(response);
     return response;
   } catch (error) {
    throw error;
   }
}



export async function UpdateSkillProfile(values) {
  try {
    const options= {
      url:`/auth/updateSkillsAndInterests`,
      method: "PATCH",
      data: values,
    }
    const response = await apiClient.request(options);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}


export async  function DeleteProfile() {
  try {
     const options = {
       url:`/auth/deleteMe`,
       method: "DELETE",
     }
     const response = await apiClient.request(options);
     console.log(response);
     return response;
  } catch (error) {
    throw error;
  }
}


export async function getSpecificUser(id) {
  try {
    const options= {
     url:`/auth/${id}`,
     method:"GET",
    };
    const response = await apiClient.request(options);
    console.log(response);
    return response;
  } catch (error) {
    throw(error)
  }
  
}