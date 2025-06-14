import React, { useState } from "react";
import {
  FaMars,
  FaVenus,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaPaperPlane,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
import "./Patients.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { PiTelegramLogo } from "react-icons/pi";

import { IoMail } from "react-icons/io5";

const patientsData = [
  {
    id: 1,
    name: "Amanda Chavez Chavez",
    gender: "male",
    service: "Physiotherapy",
    age: 36,
    date: "23 May 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "New",
  },
  {
    id: 2,

    name: "Amanda Chavez Chavez",
    gender: "male",
    service: "Physiotherapy",
    age: 36,
    date: "10 June 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "Progress",
  },
  {
    id: 3,

    name: "Amanda Chavez Chavez",
    gender: "male",
    service: "Physiotherapy",
    age: 36,
    date: "20 May 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "Finished",
  },
  {
    id: 4,

    name: "Amanda Chavez Chavez",
    gender: "female",
    service: "Physiotherapy",
    age: 36,
    date: "13 June 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "New",
  },
  {
    id: 5,

    name: "Amanda Chavez Chavez",
    gender: "female",
    service: "Physiotherapy",
    age: 36,
    date: "13 June 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "New",
  },
  {
    id: 6,

    name: "Amanda Chavez Chavez",
    gender: "female",
    service: "Physiotherapy",
    age: 36,
    date: "13 June 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "New",
  },
  {
    id: 7,

    name: "Amanda Chavez Chavez",
    gender: "female",
    service: "Physiotherapy",
    age: 36,
    date: "13 June 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "New",
  },
  {
    id: 8,

    name: "Amanda Chavez Chavez",
    gender: "female",
    service: "Physiotherapy",
    age: 36,
    date: "13 June 2025",
    time: "10:00 - 10:30",
    number: "1234 6546 897",
    status: "New",
  },
];

const Tabs = ["Today", "Last Week", "Last Month"];
const StatusTabs = ["New", "Progress", "Finished"];

const Patients = () => {
  const [selectedTab, setSelectedTab] = useState("Today");
  const [selectedStatusTab, setSelectedStatusTab] = useState("New");
  const [layout, setLayout] = useState("Expanded");
  const [activePatient, setActivePatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filterData = () => {
    let filtered = patientsData;

    const today = new Date();

    if (layout === "Compact") {
      filtered = filtered.filter((p) => {
        const date = new Date(p.date);
        const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

        if (selectedTab === "Today") return diffInDays === 0;
        if (selectedTab === "Last Week") return diffInDays <= 7;
        if (selectedTab === "Last Month") return diffInDays <= 30;

        return true;
      });
    } else {
      filtered = filtered.filter((p) => p.status === selectedStatusTab);
    }

    // Sort by date descending (latest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  };

  const itemsPerPage = layout === "Compact" ? 5 : 8;

  const paginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filterData().slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(filterData().length / itemsPerPage);

  const renderIcons = () => (
    <div className="icon-buttons">
      <button className="icon phone">
        <FaPhoneAlt />
      </button>
      <button className="icon email">
        <IoMail />
      </button>
      <button className="icon whatsapp">
        <FaWhatsapp />
      </button>
      <button className="icon telegram">
        <PiTelegramLogo />
      </button>
    </div>
  );

  const renderPatientCard = (patient, index) => {
    const isActive = patient.id === activePatient;
    const genderIcon =
      patient.gender === "male" ? (
        <FaMars className="gender-icon male" />
      ) : (
        <FaVenus className="gender-icon female" />
      );

    const content =
      layout === "Compact" ? (
        <div
          key={index}
          className={clsx("patient-card", isActive ? "active" : "")}
          onClick={() => setActivePatient(patient.id)}
        >
          <div className="card-top">
            <div className="left-section">
              <h2 className="patient-name">{patient.name}</h2>
            </div>
            <div className="right-section">
              <button className="btn report">View Report</button>
              <div className="gender-appt-div">
                <div className="gender-icon-wrapper">{genderIcon}</div>
                <div className="appointment-number">
                  Appointment No. <span>{patient.number}</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="card-bottom">
            <div className="info-left">
              <div className="info-row">
                <div>
                  <small>Requested Service</small>
                  <strong>{patient.service}</strong>
                </div>
                <div className="info-row-2">
                  <div>
                    <small>Age</small>
                    <div>{patient.age}</div>
                  </div>
                  <div>
                    <small>Appointment Date</small>
                    <div>{patient.date}</div>
                  </div>
                  <div>
                    <small>Time of Request</small>
                    <div>{patient.time}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-right">
              <button className="btn history">Patient’s History</button>
              {renderIcons()}
            </div>
          </div>
        </div>
      ) : (
        <div
          key={index}
          className={clsx("patient-card-2", isActive ? "active" : "")}
          onClick={() => setActivePatient(patient.id)}
        >
          <div className="header-row-2">
            <div>
              <h2 className="patient-name-2">{patient.name}</h2>
            </div>
            <div className="gender-icon-wrapper-2">{genderIcon}</div>
          </div>

          <div className="info-group-2">
            <div>
              <small>Requested Service</small>
              <strong>{patient.service}</strong>
            </div>
            <div>
              <small>Age</small>
              <div>{patient.age}</div>
            </div>
            <div className="appt-time-div">
              <div>
                <small>Appointment Date</small>
                <div>{patient.date}</div>
              </div>
              <div>
                <small>Time of Request</small>
                <div>{patient.time}</div>
              </div>
            </div>
          </div>

          <hr className="divider" />
          <div className="appt-number-2">
            Appl. No: <span>{patient.number}</span>
          </div>

          <button className="btn-2 view-report-2">View Report</button>
          <button className="btn-2 history-2">Patient’s History</button>

          <div className="icon-buttons-2">
            <button className="icon-2 phone-2">
              <FaPhoneAlt />
            </button>
            <button className="icon-2 email-2">
              <IoMail />
            </button>
            <button className="icon-2 whatsapp-2">
              <FaWhatsapp />
            </button>
            <button className="icon-2 telegram-2">
              <PiTelegramLogo />
            </button>
          </div>
        </div>
      );

    return layout === "Compact" ? (
      <div className="compact-wrapper">{content}</div>
    ) : (
      <div className="expanded-wrapper">{content}</div>
    );
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="patients-container">
            <h1 className="page-title">Patients</h1>
            <p className="page-subtitle">See all the patients here</p>

            <div className="toolbar">
              <div className="tab-row">
                {layout === "Compact"
                  ? Tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setSelectedTab(tab);
                          setCurrentPage(1);
                        }}
                        className={clsx(
                          "tab-button",
                          selectedTab === tab ? "active-tab" : ""
                        )}
                      >
                        {tab}
                      </button>
                    ))
                  : StatusTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setSelectedStatusTab(tab);
                          setCurrentPage(1);
                        }}
                        className={clsx(
                          "tab-button",
                          selectedStatusTab === tab ? "active-tab" : ""
                        )}
                      >
                        {tab}
                      </button>
                    ))}
              </div>
              <div className="layout-pagination-div">
                <div className="layout-switch">
                  <button
                    onClick={() => setLayout("Compact")}
                    className={clsx(
                      "layout-button-1",
                      layout === "Compact" ? "active-layout" : ""
                    )}
                  >
                    Compact
                  </button>
                  <button
                    onClick={() => setLayout("Expanded")}
                    className={clsx(
                      "layout-button-2",
                      layout === "Expanded" ? "active-layout" : ""
                    )}
                  >
                    Expanded
                  </button>
                </div>
                <div className="pagination">
                  <FaCaretLeft
                    className="arrow"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  />
                  <span className="page-input">
                    Page{" "}
                    <input
                      type="number"
                      className="page-number"
                      value={currentPage}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= totalPages) {
                          setCurrentPage(val);
                        }
                      }}
                    />{" "}
                    Of {totalPages}
                  </span>
                  <FaCaretRight
                    className="arrow"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  />
                </div>
              </div>
            </div>

            <div
              className={clsx(
                layout === "Compact" ? "compact-list" : "expanded-grid"
              )}
            >
              {paginatedData().map((patient, i) =>
                renderPatientCard(patient, i)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
