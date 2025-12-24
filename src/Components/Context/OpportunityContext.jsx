import { createContext, useState } from "react";
import { apiClient } from "../../services/api-client";
import { saveOpportunity } from "../../services/opportunities-services";
import { toast } from "react-toastify";

  export const opportunityContext =  createContext(null)

 export default function OpportunityProvider({children}) {
    const [savedOpportunities, setSavedOpportunities] = useState({});

    async function handleSaveopportunity(id) {
        try {
            const response = await saveOpportunity(id);
            if (response.success) {
                toast.success(response.data.message);
                setSavedOpportunities((prev) => ({
                    ...prev,
                    [id]: true,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <opportunityContext.Provider value={{ handleSaveopportunity, savedOpportunities }}>
            {children}
        </opportunityContext.Provider>
    );
     
  }