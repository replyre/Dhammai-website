"use client";
import React, { useState } from "react";
import styles from "./ContactForm.module.css";

 const metadata = {
  title: "Contact DHAMM.AI | Request Demo & EdTech Support",
  description: "Get in touch with DHAMM.AI for product demos, partnership opportunities, technical support, or AI education consultations.",
  openGraph: {
    title: "Contact DHAMM.AI | Request Demo & Support",
    description: "Get in touch for demos and partnerships",
    url: "https://dhamm.ai/contact"
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    organizationType: "",
    organizationName: "",
    studentCount: "",
    subject: "",
    message: "",
    meetingDate: "",
    meetingTime: "",
    agreedToSendInfo: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Dropdown options
  const organizationTypes = [
    "Select your Organisation Type",
    "Educational Institution",
    "Corporate",
    "Government",
    "Non-Profit",
    "Startup",
    "Other"
  ];

  const studentCountOptions = [
    "Select Approx Student Count",
    "1-50",
    "51-100",
    "101-500",
    "501-1000",
    "1001-5000",
    "5000+"
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form
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

    if (!formData.organizationType || formData.organizationType === "Select your Organisation Type") {
      newErrors.organizationType = "Organization Type is required";
    }

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization Name is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject/Title is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message/Details is required";
    }

    if (!formData.agreedToSendInfo) {
      newErrors.agreedToSendInfo = "You must agree to send info to Dhamm.AI";
    }

    return newErrors;
  };

  // Handle form submission
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage(result.message);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          organizationType: "",
          organizationName: "",
          studentCount: "",
          subject: "",
          message: "",
          meetingDate: "",
          meetingTime: "",
          agreedToSendInfo: false,
        });
        setErrors({});
      } else {
        // Handle validation errors from server
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.leftTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>

      <div className={styles.rightTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>

      <button className={styles.backButton}>
        <img src="star.svg" height={"30px"} />
        Contact Us
      </button>

      <h1 className={styles.heading}>
        Fill out the form
      </h1>
      <p className={styles.subtext}>
        Read about our latest product and <br /> research announcements
      </p>

      {submitMessage && (
        <div className={`${styles.message} ${submitMessage.includes('Error') ? styles.error : styles.success}`}>
          {submitMessage}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Full Name *
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.fullName ? styles.errorInput : ''}`}
            placeholder="Enter your name"
          />
          {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
        </label>

        <label className={styles.formLabel}>
          Email ID *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.email ? styles.errorInput : ''}`}
            placeholder="Enter your Email Id"
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </label>

        <label className={styles.formLabel}>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Enter your Phone Number"
          />
        </label>

        <label className={styles.formLabel}>
          Organisation Type *
          <select 
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            className={`${styles.formSelect} ${errors.organizationType ? styles.errorInput : ''}`}
          >
            {organizationTypes.map((type, index) => (
              <option key={index} value={type} disabled={index === 0}>
                {type}
              </option>
            ))}
          </select>
          {errors.organizationType && <span className={styles.errorText}>{errors.organizationType}</span>}
        </label>

        <label className={styles.formLabel}>
          Organization Name *
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.organizationName ? styles.errorInput : ''}`}
            placeholder="Enter your Organisation Name"
          />
          {errors.organizationName && <span className={styles.errorText}>{errors.organizationName}</span>}
        </label>

        <label className={styles.formLabel}>
          Approx. Student Count
          <select
            name="studentCount"
            value={formData.studentCount}
            onChange={handleChange}
            className={styles.formSelect}
          >
            {studentCountOptions.map((count, index) => (
              <option key={index} value={count} disabled={index === 0}>
                {count}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.formLabel}>
          Subject / Title *
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`${styles.formInput} ${errors.subject ? styles.errorInput : ''}`}
            placeholder="Enter your Project Subject/Title"
          />
          {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
        </label>

        <label className={styles.formLabel}>
          Message / Details *
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${styles.formTextarea} ${errors.message ? styles.errorInput : ''}`}
            placeholder="Enter your project details"
            rows="4"
            style={{resize:"none"}}
          />
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </label>

        <label className={styles.formLabel}>
          Preferred Meeting Date
          <input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleChange}
            className={`${styles.formInput} ${styles.dateInput}`}
          />
        </label>

        <label className={styles.formLabel}>
          Preferred Meeting Time
          <input
            type="time"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleChange}
            className={`${styles.formInput} ${styles.timeInput}`}
          />
        </label>

        <div className={styles.checkboxWrapper}>
          <input 
            type="checkbox" 
            name="agreedToSendInfo"
            checked={formData.agreedToSendInfo}
            onChange={handleChange}
          />
          <span>Agree to send info to Dhamm.AI</span>
          {errors.agreedToSendInfo && <span className={styles.errorText}>{errors.agreedToSendInfo}</span>}
        </div>

        <button 
          type="submit" 
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Now →'}
        </button>
        
        <img src="/contactpic.png" alt="" />
      </form>
    </section>
  );
};

export default ContactForm;