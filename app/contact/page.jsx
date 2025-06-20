"use client";
import React from "react";
import styles from "./ContactForm.module.css";
import { FaArrowLeft } from "react-icons/fa";

const ContactForm = () => {
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

      <form className={styles.form}>
        <label className={styles.formLabel}>
          Full Name *
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter your name"
          />
        </label>

        <label className={styles.formLabel}>
          Email ID *
          <input
            type="email"
            className={styles.formInput}
            placeholder="Enter your Email Id"
          />
        </label>

        <label className={styles.formLabel}>
          Phone Number
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter your Phone Number"
          />
        </label>

        <label className={styles.formLabel}>
          Organisation Type *
          <select className={styles.formSelect}>
            <option>Select your Organisation Type</option>
          </select>
        </label>

        <label className={styles.formLabel}>
          Organization Name *
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter your Organisation Name"
          />
        </label>

        <label className={styles.formLabel}>
          Approx. Student Count
          <select className={styles.formSelect}>
            <option>Select Approx Student Count</option>
          </select>
        </label>

        <label className={styles.formLabel}>
          Subject / Title *
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter your Project Subject/Title"
          />
        </label>

        <label className={styles.formLabel}>
          Message / Details *
          <textarea
            className={styles.formTextarea}
            placeholder="Enter your project details"
            rows="4"
          />
        </label>

        <label className={styles.formLabel}>
          Preferred Meeting Date
          <input
            type="date"
            className={`${styles.formInput} ${styles.dateInput}`}
          />
        </label>

        <label className={styles.formLabel}>
          Preferred Meeting Time
          <input
            type="time"
            className={`${styles.formInput} ${styles.timeInput}`}
          />
        </label>

        <div className={styles.checkboxWrapper}>
          <input type="checkbox" />
          <span>Agree to send info to Dhanm.AI</span>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Now →
        </button>
        <img src="/contactpic.png" alt="" />
      </form>
    </section>
  );
};

export default ContactForm;
