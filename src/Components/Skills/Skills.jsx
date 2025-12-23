import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Skills({ skill, index, onRemove }) {
  function handleRemove(e) {
    e.stopPropagation();
    if (onRemove) {
      onRemove(skill);
    }
  }
  return (
    <div>
      <div
        key={index}
        className="px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl text-sm font-bold 
                   border border-gray-100 hover:border-primary-300 hover:bg-white 
                   hover:text-primary-600 hover:shadow-xl transition-all relative cursor-pointer"
      >
        <FontAwesomeIcon
          onClick={handleRemove}
          icon={faXmark}
          className="absolute top-2 right-0  text-gray-400 hover:text-red-500 text-xs mx-2 font-semibold "
        />
        {skill}
      </div>
    </div>
  );
}
