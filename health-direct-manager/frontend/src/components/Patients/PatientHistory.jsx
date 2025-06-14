import { Monitor } from "lucide-react";
import { RiMicroscopeFill } from "react-icons/ri";
import { LuDna, LuUsers } from "react-icons/lu";
import { FaPeopleGroup, FaXRay } from "react-icons/fa6";
import "./PatientsHistory.css";
import { useState } from "react";

export const serviceIconMap = {
  "Individual early diagnosis of the disease": Monitor,
  "Pahologica service": RiMicroscopeFill,
  "Molecular Council": LuDna,
  "Face-to-face and remote consultations": LuUsers,
  "International Tumor Board": FaPeopleGroup,
  "Expert Review of CT, MRI PET-CT": FaXRay,
};

const PatientHistory = ({ patient, onBack }) => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <div className="history-container">
      <div className="page-title">
        Patient’s History <span className="highlight">› {patient.name}</span>
      </div>
      <div className="page-subtitle">See all the patient’s history here</div>

      <div className="history-list">
        {patient.history.map((item, idx) => {
          const Icon = serviceIconMap[item.title];
          return (
            <div
              onClick={() => setActiveItem(item)}
              key={idx}
              className={`history-item ${item === activeItem ? "active" : ""}`}
            >
              <div className="left-section">
                <div className="service-icon">{Icon && <Icon size={32} />}</div>
                <div className="service-title">{item.title}</div>
              </div>
              <div className="appointment-date">Appointment on {item.date}</div>
            </div>
          );
        })}
      </div>

      <div className="btn-container">
        <button className="go-back-btn" onClick={onBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PatientHistory;
