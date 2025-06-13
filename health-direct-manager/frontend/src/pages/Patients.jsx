import React, { useState } from "react";
import { Camera, ChevronDown } from "lucide-react";
import "./Profile.css";
import { FaCamera } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const Patients = () => {
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    phone2: "",
    email: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Form data:", formData);
    console.log("Profile image:", profileImage);
    // Handle save logic here
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="profile-wrapper">
            <div className="profile-container">
              {/* Profile Photo Section */}
              <div className="photo-section">
                <div className="photo-circle">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-image-select"
                    />
                  ) : (
                    <div className="photo-placeholder">
                      <IoCamera size={36} className="camera-icon" />
                      <span className="photo-text">Click to change photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="photo-input"
                  />
                </div>
              </div>

              {/* Form Section */}
              <div className="form-section">
                <h2 className="form-title">Patient Details</h2>

                <div className="form-grid">
                  {/* Row 1 */}
                  <div className="form-group">
                    <label className="form-label">
                      Surname of the service recipient{" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      placeholder="Service recipient surname"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Name of the service recipient{" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.surname}
                      onChange={handleInputChange}
                      placeholder="Service recipient name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Date of birth of the service recipient{" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      placeholder="Your Date of Birth"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <div className="select-wrapper">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown size={20} className="select-icon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone number of the service recipient
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+123 456 789"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group ">
                    <label className="form-label">Phone (Optional)</label>
                    <input
                      type="number"
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleInputChange}
                      placeholder="+123 456 789"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group ">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="xxxx xxxx xxxx"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="forgot-password-container">
                  <span className="forgot-password-text">Forgot Password</span>
                </div>

                <button onClick={handleSave} className="patients-save-button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
