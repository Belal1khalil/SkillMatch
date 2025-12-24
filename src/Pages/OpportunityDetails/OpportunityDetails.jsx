import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSpecificopportunity } from "../../services/opportunities-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMoneyBillWave,
  faBriefcase,
  faClock,
  faArrowLeft,
  faBuilding,
  faEnvelope,
  faGlobe,
  faCheckCircle,
  faBolt,
  faShareAlt,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import OpportunityDetail from '../../Components/OpportunityDetail/OpportunityDetail';

export default function OpportunityDetails() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
   
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getSpecificopportunity(id);
        console.log("Opportunity Details Response:", response);
        if (response.success) {
           // Handle common response structures
           const data = response.data?.data?.opportunity || response.data?.opportunity || response.data?.data || response.data;
           setOpportunity(data);
        } else {
          toast.error("Failed to load opportunity details");
        }
      } catch (error) {
        console.error("Fetch details error:", error);
        toast.error("An error occurred while fetching details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold animate-pulse text-sm uppercase tracking-widest">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-lg border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
            <FontAwesomeIcon icon={faBriefcase} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Opportunity Not Found</h2>
          <p className="text-gray-500 mb-8 font-medium">The opportunity you're looking for might have been closed or removed.</p>
          <Link to="/Jobs" className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-colors">
            Back to All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
   <>
   <OpportunityDetail opportunity={opportunity}/>
   </>
  );
}
