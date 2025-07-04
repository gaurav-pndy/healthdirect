import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

import { X, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateAppointment from "@/components/Calendar/CreateAppointment";
import ShowAppointment from "@/components/Calendar/ShowAppointment";
import CalendarHeader from "@/components/Calendar/CalendarHeader";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Amanda Chavez",
      start: "2025-05-23T10:00:00",
      end: "2025-05-23T10:30:00",
      extendedProps: {
        age: 36,
        gender: "female",
        serviceNo: "1234 6546 897",
        service: "Physiotherapy",
      },
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "12:30",
    endTime: "",
    patientName: "",
    age: "",
    gender: "",
    service: "",
    serviceNo: "",
  });
  const [doctorSearch, setDoctorSearch] = useState("");
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Helper function to calculate smart positioning
  const calculatePopoverPosition = (clickedRect) => {
    const popoverWidth = 300; // Approximate popover width
    const popoverHeight = 400; // Approximate popover height
    const margin = 20;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = clickedRect.left + clickedRect.width / 2;
    let y = clickedRect.top + margin;
    let transformX = "-50%"; // Default: center horizontally

    // Check if popover would go off the right edge
    if (x + popoverWidth / 2 > viewportWidth - margin) {
      x = clickedRect.right - margin;
      transformX = "-100%"; // Align to right edge of clicked element
    }

    // Check if popover would go off the left edge
    if (x - (popoverWidth + 200) < margin) {
      x = clickedRect.left + margin;
      transformX = "0%"; // Align to left edge of clicked element
    }

    // Check if popover would go off the bottom edge
    if (y + popoverHeight > viewportHeight - margin) {
      y = clickedRect.bottom - margin - popoverHeight;
      y = Math.max(y, margin); // Ensure it doesn't go above viewport
    }

    return { x, y, transformX };
  };

  const doctors = [
    "Dr. Place Holder",
    "Dr. Place Holder 01",
    "Dr. Place Holder 02",
    "Dr. Place Holder 03",
    "Dr. Place Holder 04",
    "Dr. Place Holder 05",
  ];

  const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    const rect = arg.dayEl.getBoundingClientRect();
    const position = calculatePopoverPosition(rect);
    setPopoverPosition(position);

    const clickedDate = arg.date;

    const formattedDate =
      clickedDate.getFullYear() +
      "-" +
      String(clickedDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(clickedDate.getDate()).padStart(2, "0");

    const hours = clickedDate.getHours();
    const minutes = clickedDate.getMinutes();
    const hasTime = hours !== 0 || minutes !== 0;

    const formattedTime = hasTime
      ? clickedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "12:30";

    setSelectedDate(formattedDate);
    setShowAddModal(true);
    setFormData({
      doctor: "",
      date: formattedDate,
      time: formattedTime,
      endTime: "",
      patientName: "",
      age: "",
      gender: "",
      service: "",
      serviceNo: "",
    });

    setDoctorSearch("");
    setShowDoctorSuggestions(false);
  };

  const handleAddPatient = () => {
    const { patientName, doctor, date, time, endTime } = formData;

    if (patientName && doctor && date && time) {
      const startTime = `${date}T${time}:00`;
      const computedEndTime = endTime ? `${date}T${endTime}:00` : null;

      // Create Date object from startTime
      const startDateTime = new Date(startTime);

      // Add 30 minutes
      const endDateTime = new Date(startDateTime.getTime() + 10 * 60 * 1000);

      // Format back to string: yyyy-mm-ddTHH:mm:ss
      const endTime2 = endDateTime.toISOString().slice(0, 19);
      const newEvent = {
        id: String(events.length + 1),
        title: patientName,
        start: startTime,
        end: endTime2,
        extendedProps: {
          age: parseInt(formData.age) || 30,
          serviceNo: formData.serviceNo || `TEMP${Date.now()}`,
          service: formData.service || "General Consultation",
          doctor: formData.doctor,
          endTime: computedEndTime,
        },
      };

      setEvents([...events, newEvent]);
      closeModal();
    } else {
      alert(
        "Please fill in all required fields: Patient Name, Doctor, Date, and Time"
      );
    }
  };

  const handleEventClick = (info) => {
    const rect = info.el.getBoundingClientRect();

    // Calculate smart position
    const position = calculatePopoverPosition(rect);
    setShowDetailsModal(true);

    setPopoverPosition(position);

    // Set the selected event
    setSelectedEvent(info.event);

    setSelectedEvent(info.event);
    setPopupPosition({
      x: rect.left + window.scrollX + 20,
      y: rect.top + window.scrollY + 30,
    });
  };

  // const closePopup = () => {
  //   setSelectedEvent(null);
  // };

  const closeModal = () => {
    setShowAddModal(false);
    setFormData({
      doctor: "",
      date: "",
      time: "12:30",
      patientName: "",
      age: "",
      service: "",
      serviceNo: "",
    });
    setDoctorSearch("");
    setShowDoctorSuggestions(false);
  };

  const handleDoctorSearch = (value) => {
    setDoctorSearch(value);
    setShowDoctorSuggestions(value.length > 0);
  };

  const selectDoctor = (doctor) => {
    setFormData((prev) => ({ ...prev, doctor }));
    setDoctorSearch(doctor);
    setShowDoctorSuggestions(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#calendar-popup")) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDotColor = (event) => {
    switch (event.extendedProps.type) {
      case "type1":
        return "bg-orange-500";
      case "type2":
        return "bg-teal-400";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="relative calendar-area">
            <div className="calendar-header">
              <h2 className="page-title">Schedule Appointments</h2>
              <p className="page-subtitle">See all your appointments</p>
            </div>
            <CalendarHeader calendarRef={calendarRef} />

            <FullCalendar
              ref={calendarRef}
              viewDidMount={(arg) => {
                document.body.classList.toggle(
                  "fc-month-view",
                  arg.view.type === "dayGridMonth"
                );

                const calendarApi = calendarRef.current?.getApi();
                if (!calendarApi) return;

                if (arg.view.type === "dayGridMonth") {
                  calendarApi.setOption("dayHeaderFormat", { weekday: "long" });
                } else {
                  calendarApi.setOption("dayHeaderFormat", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  }); // Reset or use short/empty
                }
              }}
              viewWillUnmount={() => {
                document.body.classList.remove("fc-month-view");
              }}
              datesSet={() => {
                const todayISO = new Date().toISOString().split("T")[0];
                const headerCells = document.querySelectorAll(
                  ".fc-col-header-cell"
                );

                let highlighted = false;

                headerCells.forEach((cell) => {
                  const date = cell.getAttribute("data-date");
                  if (date === todayISO) {
                    cell.classList.add("fc-header-today");
                    highlighted = true;
                  } else {
                    cell.classList.remove("fc-header-today");
                  }
                });

                if (!highlighted) {
                  const dayCell = document.querySelector(
                    `.fc-day[data-date="${todayISO}"]`
                  );
                  if (dayCell) {
                    const columnIndex = Array.from(
                      dayCell.parentElement?.children || []
                    ).indexOf(dayCell);

                    headerCells.forEach((cell, idx) => {
                      if (idx === columnIndex) {
                        cell.classList.add("fc-header-today");
                      } else {
                        cell.classList.remove("fc-header-today");
                      }
                    });
                  }
                }
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={false}
              initialView="dayGridMonth"
              dayHeaderFormat={{ weekday: "long" }}
              events={events}
              dayMaxEventRows={false}
              eventContent={(arg) => {
                const colorDot = (
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${getDotColor(
                      arg.event
                    )}`}
                  />
                );

                // Month view: only the dot
                if (arg.view.type === "dayGridMonth") {
                  return colorDot;
                }

                // Week or Day view: dot + title
                return (
                  <div className="event-name-container">
                    <span>{arg.event.title}</span>
                  </div>
                );
              }}
              dayCellContent={(arg) => {
                if (arg.view.type !== "dayGridMonth") return;

                const date = arg.date;
                const day = date.getDate();
                const month = date.toLocaleString("default", {
                  month: "short",
                });

                // Show "1 May" if it's the first of the month
                const content = day === 1 ? `${day} ${month}` : `${day}`;

                return {
                  html: `<span class="fc-day-number-custom">${content}</span>`,
                };
              }}
              dayCellClassNames="custom-day-cell"
              height="auto"
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />

            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
              <DialogContent className="!max-w-[25rem]">
                <ShowAppointment
                  selectedEvent={selectedEvent}
                  popoverPosition={popoverPosition}
                />
              </DialogContent>
            </Dialog>

            {/* {showAddModal && ( */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogContent>
                <CreateAppointment
                  popoverPosition={popoverPosition}
                  closeModal={closeModal}
                  doctorSearch={doctorSearch}
                  handleDoctorSearch={handleDoctorSearch}
                  showDoctorSuggestions={showDoctorSuggestions}
                  filteredDoctors={filteredDoctors}
                  selectDoctor={selectDoctor}
                  handleInputChange={handleInputChange}
                  formData={formData}
                  handleAddPatient={handleAddPatient}
                />
              </DialogContent>
            </Dialog>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
