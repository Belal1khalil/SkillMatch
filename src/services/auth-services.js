import { apiClient } from "./api-client";

export async function sendDataToSignup(values) {
  try {
    const options = {
      url: `/auth/signup`,
      method: "POST",
      data: values,
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function verifyCode(values) {
  try {
    const options = {
      url: `/auth/verify`,
      method: "POST",
      data: values,
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function ResendCode(values) {
  try {
    const options = {
      url: `/auth/resendCode`,
      method: "POST",
      data: values,
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}




export async function sendDataToLogin(values) {
  try {
    const options = {
      url: `/auth/login`,
      method: "POST",
      data: values,
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}



export async function forgetPassword(values) {
 try {
    const options= {
    url:`/auth/forgotPassword`,
    method:"POST",
    data:values
  }
  const response = await apiClient.request(options)
  console.log(response);
  return response
 } catch (error) {
    throw(error)
 } 
}




export async function verifyResetCode(values) {
 try {
    const options= {
    url:`/auth/verifyResetCode`,
    method:"POST",
    data:values
  }
  const response = await apiClient.request(options)
  console.log(response);
  return response
 } catch (error) {
    throw(error)
 } 
}


export async function resetPassword(values) {
 try {
   const options= {
    url:`/auth/resetPassword`,
    method:"PATCH",
    data:values
  }
  const response= await apiClient.request(options);
  console.log(response)
  return response;
 } catch (error) {
    console.log(error)
 } 
}