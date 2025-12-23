import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/imgs/logo.png";

export default function Aboutme({userData}) {
  return (
    <>
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
              <FontAwesomeIcon icon={faUser} className="text-sm" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">About Me</h3>
          </div>
          <img src={logo} alt="SkillMatch" className="w-8 h-8 opacity-20" />
        </div>
        <p className="text-gray-500 leading-relaxed text-lg font-medium italic relative z-10">
          "{userData.bio}"
        </p>
      </div>
    </>
  );
}
