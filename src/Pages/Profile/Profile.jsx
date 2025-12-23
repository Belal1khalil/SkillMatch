import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faBriefcase,
  faMapMarkerAlt,
  faEdit,
  faCamera,
  faCheckCircle,
  faClock,
  faLock,
  faShieldAlt,
  faArrowRight,
  faTimes,
  faGraduationCap,
  faHeart,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/imgs/logo.png";
import { useEffect, useRef, useState } from "react";
import {
  getProfileData,
  updateMyPassword,
  updateMyPhoto,
  updateProfileData,
  UpdateSkillProfile,
  DeleteProfile,
} from "../../services/profile-services";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import userImg from "../../assets/imgs/user.png";
import Skills from "../../Components/Skills/Skills";
import Aboutme from "../../Components/Aboutme/Aboutme";
import DeleteAccount from "../../Components/DeleteAccount/DeleteAccount";
import ProfileChangePassword from "../../Components/ProfileChangePassword/ProfileChangePassword";
import HeaderProfile from "./../../Components/HeaderProfile/HeaderProfile";

export default function Profile() {
  const [useprofileData, setUseprofileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addedSkills, setAddedSkills] = useState(false);

  const fileInputRef = useRef(null);

  function toggleEditMode() {
    setEditMode(!editMode);
  }
  function EditUpadateSkills() {
    setAddedSkills(!addedSkills);
  }

  useEffect(() => {
    setLoading(true);
    getProfileData()
      .then((res) => {
        setUseprofileData(res.data?.data?.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        setLoading(false);
      });
  }, []);

  const userData = {
    username: useprofileData?.username || "User Name",
    email: useprofileData?.email || "email@example.com",
    role: useprofileData?.role || "Professional",
    phone: useprofileData?.phone || "Not provided",
    location: useprofileData?.location || "Remote",
    bio:
      useprofileData?.bio ||
      "Passionate professional focused on building high-quality, scalable solutions.",
    skills: useprofileData?.skills || [],
    interests: useprofileData?.interests || [],
    profilePic: useprofileData?.photo || userImg,
  };

  /// handle UpdateProfile
  async function handleUpdateprofile(values) {
    try {
      const payload = {
        ...values,
        skills:
          typeof values.skills === "string"
            ? values.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : values.skills,
        interests:
          typeof values.interests === "string"
            ? values.interests
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean)
            : values.interests,
      };

      const response = await updateProfileData(payload);
      console.log("Update response:", response);
      if (response.success) {
        toast.success("Profile updated successfully!");
        setUseprofileData(response.data?.data?.user);
        setEditMode(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    }
  }

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    bio: yup
      .string()
      .required("bio is required")
      .max(200, "Bio must be less than 200 characters"),
    location: yup.string().required("Location is required"),
    skills: yup.string().required("Skills are required"),
  });
  const formik = useFormik({
    initialValues: {
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
      location: userData.location,
      skills: Array.isArray(userData.skills)
        ? userData.skills.join(", ")
        : userData.skills,
      interests: Array.isArray(userData.interests)
        ? userData.interests.join(", ")
        : userData.interests,
    },
    validationSchema,
    enableReinitialize: true,

    onSubmit: handleUpdateprofile,
  });

  /// handle changePhoto
  async function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const response = await updateMyPhoto(formData);
      if (response.success) {
        toast.success(response.data.message);
        console.log(response.data.data.user.photo);
        setUseprofileData(response.data.data.user);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update photo");
    }
  }

  // triggerfunction

  function triggerUploadPhoto() {
    fileInputRef.current?.click();
  }
  /// Skills Formik
  const SkillsFormik = useFormik({
    initialValues: {
      skills: "",
      interests: "",
      bio: userData.bio,
    },
    onSubmit: async (values) => {
      try {
        // Handle skills: merge new with existing
        const existingSkills = Array.isArray(userData.skills)
          ? userData.skills
          : [];
        const newSkills =
          typeof values.skills === "string"
            ? values.skills
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s !== "")
            : Array.isArray(values.skills)
            ? values.skills
            : [];

        const updatedSkills = [...new Set([...existingSkills, ...newSkills])];

        // Handle interests: merge new with existing
        const existingInterests = Array.isArray(userData.interests)
          ? userData.interests
          : [];
        const newInterests =
          typeof values.interests === "string"
            ? values.interests
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i !== "")
            : Array.isArray(values.interests)
            ? values.interests
            : [];

        const updatedInterests = [
          ...new Set([...existingInterests, ...newInterests]),
        ];

        const response = await UpdateSkillProfile({
          ...values,
          skills: updatedSkills,
          interests: updatedInterests,
        });

        if (response.success) {
          console.log("Update response:", response);
          toast.success("Skills and interests updated successfully!");
          setUseprofileData(response.data.data.user);
          setAddedSkills(false);
          SkillsFormik.resetForm();
        }
      } catch (error) {
        toast.error("Failed to update skills and interests.");
      }
    },
  });

  /// Delete Skills
  async function handleRemoveSkill(skillToRemove) {
    try {
      const updatedSkills = userData.skills.filter(
        (skill) => skill !== skillToRemove
      );
      const response = await UpdateSkillProfile({
        skills: updatedSkills,
        interests: userData.interests,
        bio: userData.bio,
      });
      if (response.success) {
        toast.success("Skill removed successfully!");
        setUseprofileData(response.data.data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove skill. Please try again.");
    }
  }

  /// function return loading

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12 font-sans overflow-x-hidden">
      {/* Edit Profile Modal - Enhanced Design */}
      {editMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div
            onClick={toggleEditMode}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity duration-300"
          ></div>

          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl shadow-gray-900/10 border border-gray-100 z-10 overflow-hidden relative animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-8 pb-6 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                  <FontAwesomeIcon icon={faEdit} className="text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Edit Profile
                  </h3>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Customize your public presence
                  </p>
                </div>
              </div>
              <button
                onClick={toggleEditMode}
                className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 group"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-lg group-hover:rotate-90 transition-transform"
                />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <form
              className="p-8 overflow-y-auto custom-scrollbar flex-1"
              onSubmit={formik.handleSubmit}
            >
              <div className="space-y-8">
                {/* Section: Basic Information */}
                <div>
                  <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-6">
                    Personal Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">
                        Username
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                          <FontAwesomeIcon icon={faUser} className="text-sm" />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary-500 transition-all font-medium text-gray-700"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">
                        Email Identifier
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-sm"
                          />
                        </div>
                        <input
                          type="email"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary-500 transition-all font-medium text-gray-700"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Professional Info */}
                <div>
                  <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-6">
                    Professional Info
                  </h4>
                  <div className=" ">
                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-bold text-gray-700 ml-1">
                        Location
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary-500 transition-all font-medium text-gray-700"
                          value={formik.values.location}
                          name="location"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">
                        Professional Bio
                      </label>
                      <textarea
                        rows="3"
                        className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary-500 transition-all font-medium text-gray-700 resize-none"
                        value={formik.values.bio}
                        name="bio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Section: Expertise & Tags */}
                <div>
                  <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-6">
                    Expertise & Tags
                  </h4>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">
                        Skills (comma separated)
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                          <FontAwesomeIcon
                            icon={faGraduationCap}
                            className="text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Add Your Skills"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary-500 transition-all font-medium text-gray-700"
                          value={formik.values.skills}
                          name="skills"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-12 flex items-center justify-end gap-4 pb-2">
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="px-8 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-700 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center gap-3"
                >
                  Save Changes
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Header / Cover Section */}

      <HeaderProfile />
      <div className="container -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-8 text-center border-b border-gray-50">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    {useprofileData?.photo ? (
                      <img
                        src={`https://skillmatch.elmihy.me/api/img/users/${useprofileData.photo}`}
                        alt="Profile"
                      />
                    ) : (
                      <img src={userImg} alt=" userProfile" />
                    )}
                  </div>
                  <button
                    onClick={triggerUploadPhoto}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-xl border-4 border-white shadow-md hover:bg-primary-700 transition-colors flex items-center justify-center scale-90"
                  >
                    <FontAwesomeIcon icon={faCamera} className="text-sm" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  {userData.username}
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-primary-500 text-lg"
                  />
                </h2>

                <div className="flex justify-center gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-gray-100">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-primary-400"
                    />
                    {userData.location}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={toggleEditMode}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary-500/25 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-xs opacity-70"
                    />
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-6 ml-1">
                    Direct Contact
                  </h4>
                  <ul className="space-y-5">
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          Email
                        </p>
                        <p className="text-sm text-gray-700 font-bold truncate">
                          {userData.email}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                        <FontAwesomeIcon icon={faPhone} className="text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          Phone
                        </p>
                        <p className="text-sm text-gray-700 font-bold truncate">
                          {userData.phone}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <Aboutme userData={userData} />

            {/* Skills Section */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-sm"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Expertise & Skills
                  </h3>
                </div>
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-primary-100 text-2xl"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {userData.skills.length > 0 ? (
                  userData.skills?.map((skill, index) => (
                    <Skills
                      key={index}
                      skill={skill}
                      index={index}
                      onRemove={handleRemoveSkill}
                    />
                  ))
                ) : (
                  <p className="text-gray-400 italic flex justify-center items-center ">
                    No skills added yet.
                  </p>
                )}
                <button
                  onClick={EditUpadateSkills}
                  className="px-6 py-3.5 border-2 border-dashed border-gray-100 text-gray-300 rounded-2xl text-sm font-bold hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50/30 transition-all flex items-center gap-2"
                >
                  <span>+</span> Add Skill
                </button>
                {addedSkills && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div
                      onClick={EditUpadateSkills}
                      className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity duration-300"
                    ></div>

                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl shadow-gray-900/10 border border-gray-100 z-10 overflow-hidden relative animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                      {/* Modal Header */}
                      <div className="p-8 pb-6 flex items-center justify-between border-b border-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-xl"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              Edit Your Skills
                            </h3>
                            <p className="text-gray-400 text-sm mt-0.5">
                              Customize your Skills
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={EditUpadateSkills}
                          className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 group"
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-lg group-hover:rotate-90 transition-transform"
                          />
                        </button>
                      </div>

                      {/* Modal Body - Scrollable */}
                      <form
                        className="p-8 overflow-y-auto custom-scrollbar flex-1"
                        onSubmit={SkillsFormik.handleSubmit}
                      >
                        <div className="space-y-8">
                          {/* Section: Expertise & Tags */}
                          <div>
                            <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-6">
                              Expertise & Tags
                            </h4>
                            <div className="grid md:grid-cols-1 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">
                                  Skills
                                </label>
                                <div className="relative group">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                    <FontAwesomeIcon
                                      icon={faGraduationCap}
                                      className="text-sm"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-primary-500 transition-all font-medium text-gray-700"
                                    placeholder="Add Your Skill"
                                    value={SkillsFormik.values.skills}
                                    name="skills"
                                    onChange={SkillsFormik.handleChange}
                                    onBlur={SkillsFormik.handleBlur}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-12 flex items-center justify-end gap-4 pb-2">
                          <button
                            type="button"
                            onClick={EditUpadateSkills}
                            className="px-8 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-700 transition-all active:scale-95"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-10 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center gap-3"
                            //   onClick={toggleEditMode}
                          >
                            Save Changes
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="text-sm"
                            />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ProfileChangePassword />
            <DeleteAccount />
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handlePhotoChange}
      />
    </div>
  );
}
