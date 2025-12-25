import { createContext, useEffect, useState } from "react";
import {
  applyOpportunity,
  getAllsavedopportunities,
  saveOpportunity,
  unsaveOpportunity,
} from "../../services/opportunities-services";
import { getMyApplications } from "../../services/applications-services";
import { toast } from "react-toastify";

export const opportunityContext = createContext(null);

export default function OpportunityProvider({ children }) {
  const [savedOpportunities, setSavedOpportunities] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setappliedJobs] = useState({});

  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const response = await getMyApplications();
        // Structure from user screenshot: response.data.data.applications arrays
        // Each item has an 'opportunity' object with an '_id'
        const apps = response.data?.data?.applications || [];
        
        if (apps.length > 0) {
          const appliedMap = apps.reduce((acc, app) => {
             const job = app.opportunity || app.job;
             if (job && job._id) {
               // Store the actual status (e.g., 'pending', 'rejected') or true as fallback
               acc[job._id] = app.status || true;
             }
             return acc;
          }, {});
          setappliedJobs(appliedMap);
        }
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
      }
    }
    fetchAppliedJobs();
  }, []);

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

  async function handleUnSaveopportunity(id) {
    try {
      const response = await unsaveOpportunity(id);
      if (response.success) {
        toast.success(response.data.message);
        setSavedOpportunities((prev) => ({
          ...prev,
          [id]: false,
        }));
        setSavedJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetAllSavedopportunities() {
    try {
      const response = await getAllsavedopportunities();
      console.log(response);
      if (response.success) {
        setSavedJobs(response.data.data.savedOpportunities);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleApplyOpportunity(id) {
    try {
      const response = await applyOpportunity(id);
      if (response.success) {
        toast.success(response.data.message);
        setappliedJobs((prev) => ({
          ...prev,
          [id]: true,
        }));
      }
    } catch (error) {
     toast.error(error.error.response.data.message)
    }
  }

  return (
    <opportunityContext.Provider
      value={{
        handleSaveopportunity,
        handleUnSaveopportunity,
        savedOpportunities,
        handleGetAllSavedopportunities,
        savedJobs,
        handleApplyOpportunity,
        appliedJobs,
      }}
    >
      {children}
    </opportunityContext.Provider>
  );
}
