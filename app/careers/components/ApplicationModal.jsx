// app/careers/components/ApplicationModal.jsx

"use client";
import React, { useState } from "react";
import styles from "./ApplicationModal.module.css";
import { FaTimes, FaBriefcase } from "react-icons/fa";

const ApplicationModal = ({ job, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    currentLocation: "",
    experience: "",
    currentRole: "",
    currentCompany: "",
    expectedSalary: "",
    noticePeriod: "",
    coverLetter: "",
    resumeUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Process skills array
      const skillsArray = formData.skills
        ? formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill)
        : [];

      const applicationData = {
        jobId: job._id,
        ...formData,
        skills: skillsArray,
      };

      const response = await fetch("/api/jobs/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage(
          "Application submitted successfully! We'll be in touch soon."
        );
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        // Handle validation errors from server
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || "Failed to submit application");
      }
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.jobInfo}>
            <FaBriefcase className={styles.jobIcon} />
            <div>
              <h2>{job.title}</h2>
              <p>
                {job.department} • {job.location} • {job.employmentType}
              </p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.modalBody}>
          <h3>Apply for this position</h3>

          {submitMessage && (
            <div
              className={`${styles.message} ${
                submitMessage.includes("Error") ? styles.error : styles.success
              }`}
            >
              {submitMessage}
            </div>
          )}

          <form className={styles.applicationForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? styles.errorInput : ""}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className={styles.errorText}>{errors.fullName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.errorInput : ""}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Current Location</label>
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? styles.errorInput : ""}
                >
                  <option value="">Select experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-7 years">5-7 years</option>
                  <option value="7-10 years">7-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
                {errors.experience && (
                  <span className={styles.errorText}>{errors.experience}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Expected Salary</label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  placeholder="e.g., $80,000 - $100,000"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Current Role</label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Current Company</label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  placeholder="e.g., Google"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Notice Period</label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                >
                  <option value="">Select notice period</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 days">15 days</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Python (comma separated)"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Cover Letter *</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                className={errors.coverLetter ? styles.errorInput : ""}
                rows="4"
                placeholder="Tell us why you're interested in this role and what makes you a great fit..."
              />
              {errors.coverLetter && (
                <span className={styles.errorText}>{errors.coverLetter}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Resume URL</label>
              <input
                type="url"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Portfolio URL</label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>GitHub Profile</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isSubmitting ? styles.submitting : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
