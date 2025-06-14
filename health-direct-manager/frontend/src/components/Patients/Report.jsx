import { Monitor } from "lucide-react";
import { RiMicroscopeFill } from "react-icons/ri";
import { LuDna, LuUsers } from "react-icons/lu";
import { FaPeopleGroup, FaXRay } from "react-icons/fa6";
import { useState } from "react";
import "./Report.css";

export const serviceIconMap = {
  "Individual early diagnosis of the disease": Monitor,
  "Pahologica service": RiMicroscopeFill,
  "Molecular Council": LuDna,
  "Face-to-face and remote consultations": LuUsers,
  "International Tumor Board": FaPeopleGroup,
  "Expert Review of CT, MRI PET-CT": FaXRay,
};

const Report = ({ patient, onBack }) => {
  const Icon = serviceIconMap[patient.service];
  return (
    <div className="report-container">
      <div className="page-title">
        Patients › View Report{" "}
        <span className="highlight">› {patient.name}</span>
      </div>
      <div className="page-subtitle">View the Patient Report here</div>

      <div className="report-div">
        <div className={`report-item `}>
          <div className="left-section">
            <div className="service-icon">{Icon && <Icon size={32} />}</div>
            <div className="service-title">{patient.service}</div>
          </div>
          <div className="appointment-date">
            Appointment on {patient.date} | {patient.time}
          </div>
        </div>
      </div>

      <div className="btn-container">
        <button className="go-back-btn" onClick={onBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Report;
