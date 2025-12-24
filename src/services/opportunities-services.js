import { apiClient } from "./api-client"

export async function GetRecommendedJobs() {
    try {
        const options= {
            method: 'GET',
            url:`/opportunities/recommended`
        }
        const response = await apiClient.request(options)
      
        return response
    } catch (error) {
        
    }
}

export async function getAllopportunities() {
    try {
        const options= {
            url:`/opportunities/`,
            method:"GET"
        }
        const response = await apiClient.request(options);
     
        return response;
    } catch (error) {
        throw(error)
    }
}


export async function getSpecificopportunity(id) {
    try {
        const options= {
            url:`/opportunities/${id}`,
            method:"GET",
        }
        const response = await apiClient.request(options)
        console.log(response)
        return(response)
    } catch (error) {
         throw(error)
    }
}




export async function saveOpportunity(id) {
    try {
        const options= {
            method:"POST",
            url: `/opportunities/save/${id}`
        }
        const response = await  apiClient.request(options)
        console.log(response)
        return response;
    } catch (error) {
        throw(error)
    }  
}