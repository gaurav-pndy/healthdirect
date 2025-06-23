import React, { useEffect, useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./CalendarHeader.css";

const CalendarHeader = ({ calendarRef }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const updateDate = () => {
    const api = calendarRef.current?.getApi();
    if (api) setCurrentDate(api.getDate());
  };

  useEffect(() => {
    updateDate();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentYear = new Date().getFullYear();
  const initialRange = 50;
  const [yearsRange, setYearsRange] = useState(() =>
    Array.from({ length: initialRange }, (_, i) => currentYear - 25 + i)
  );
  const hasScrolledToCurrentYear = useRef(false);

  const handleSelectDate = (month, year) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    newDate.setFullYear(year);
    calendarRef.current?.getApi().gotoDate(newDate);
    setCurrentDate(newDate);
    setShowDropdown(false);
  };

  const monthYearText = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const activeView = calendarRef.current?.getApi().view?.type;

  useEffect(() => {
    if (!showDropdown) {
      hasScrolledToCurrentYear.current = false; // reset when dropdown closes
      return;
    }

    const dropdown = dropdownRef.current?.querySelector(".month-year-dropdown");
    if (!dropdown) return;

    // Scroll to current year ONLY once
    if (!hasScrolledToCurrentYear.current) {
      const yearIndex = yearsRange.indexOf(currentYear);
      if (yearIndex !== -1) {
        dropdown.scrollTo({ top: yearIndex * 130, behavior: "instant" });
        hasScrolledToCurrentYear.current = true;
      }
    }

    const handleScroll = () => {
      const scrollTop = dropdown.scrollTop;
      const scrollHeight = dropdown.scrollHeight;
      const clientHeight = dropdown.clientHeight;

      const currentMin = yearsRange[0];
      const currentMax = yearsRange[yearsRange.length - 1];

      // Scroll near top — prepend
      if (scrollTop < 100) {
        const newYears = Array.from(
          { length: 20 },
          (_, i) => currentMin - 20 + i
        );
        setYearsRange((prev) => [
          ...newYears.filter((y) => !prev.includes(y)),
          ...prev,
        ]);
        dropdown.scrollTop = scrollTop + 130 * 20; // preserve scroll
      }

      // Scroll near bottom — append
      if (scrollTop + clientHeight > scrollHeight - 100) {
        const newYears = Array.from(
          { length: 20 },
          (_, i) => currentMax + 1 + i
        );
        setYearsRange((prev) => [
          ...prev,
          ...newYears.filter((y) => !prev.includes(y)),
        ]);
      }
    };

    dropdown.addEventListener("scroll", handleScroll);
    return () => dropdown.removeEventListener("scroll", handleScroll);
  }, [showDropdown, yearsRange]);

  return (
    <div className="calendar-toolbar">
      {/* Left: Unified Month-Year Dropdown */}
      <div className="month-selector-wrapper" ref={dropdownRef}>
        <button
          className="month-selector"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {monthYearText} <FiChevronDown className="dropdown-icon" />
        </button>

        {showDropdown && (
          <div className="month-year-dropdown">
            {yearsRange.map((year) => (
              <div key={year} className="dropdown-year-group">
                <div className="dropdown-year-label">{year}</div>
                <div className="dropdown-months">
                  {Array.from({ length: 12 }, (_, m) => (
                    <div
                      key={m}
                      className="dropdown-month"
                      onClick={() => handleSelectDate(m, year)}
                    >
                      {new Date(0, m).toLocaleString("default", {
                        month: "short",
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="calendar-header-right">
        <div className="view-toggle">
          {[
            { label: "Month", view: "dayGridMonth" },
            { label: "Week", view: "timeGridWeek" },
            { label: "Day", view: "timeGridDay" },
          ].map(({ label, view }) => (
            <button
              key={view}
              className={`view-btn ${
                activeView === view ? "view-btn-active" : ""
              } ${label === "Month" && " view-btn-month"} ${
                label === "Day" && " view-btn-day"
              } `}
              onClick={() => {
                calendarRef.current?.getApi().changeView(view);
                updateDate();
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="today-btn"
          onClick={() => {
            calendarRef.current?.getApi().today();
            updateDate();
          }}
        >
          This month
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
