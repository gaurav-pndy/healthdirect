import React, { useState } from "react";
import { Camera, ChevronDown } from "lucide-react";
import "./Profile.css";
import { FaCamera } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    dateOfBirth: "",
    age: "",
    residence: "",
    placeofWork: "",
    specialty: "",
    regalia: "",
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
                <h2 className="form-title">Manager Profile</h2>

                <div className="form-grid">
                  {/* Row 1 */}
                  <div className="form-group">
                    <label className="form-label">
                      Name (Patronymic)
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Surname"
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
                      Date of birth of the service recipient{" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      placeholder="Your Date of Birth"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Your Age"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group ">
                    <label className="form-label">Place of Residence</label>
                    <input
                      type="text"
                      name="residence"
                      value={formData.residence}
                      onChange={handleInputChange}
                      placeholder="Your Address"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Main place of work</label>
                    <input
                      type="text"
                      name="placeOfWork"
                      value={formData.placeOfWork}
                      onChange={handleInputChange}
                      placeholder="Your Place of Work"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group ">
                    <label className="form-label">Specialty</label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      placeholder="Your Specialty"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group ">
                    <label className="form-label">Regalia</label>
                    <input
                      type="text"
                      name="regalia"
                      value={formData.regalia}
                      onChange={handleInputChange}
                      placeholder="Your Regalia"
                      className="form-input"
                    />
                  </div>
                </div>

                <button onClick={handleSave} className="save-button">
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

export default Profile;
