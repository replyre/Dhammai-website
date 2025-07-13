// Fixed version - Working accordion functionality
"use client";
import React, { useState, useEffect } from "react";
import styles from "./CareerSection.module.css";
import { FaMapMarkerAlt, FaClock, FaBriefcase } from "react-icons/fa";
import ApplicationModal from "./components/ApplicationModal";

const CareerSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/jobs");
      const result = await response.json();

      if (result.success) {
        setJobs(result.data);
        console.log("Jobs loaded:", result.data);
      } else {
        console.error("Failed to fetch jobs:", result.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (index) => {
    console.log("🔥 Toggle called - Current:", activeIndex, "Clicked:", index);
    setActiveIndex((currentIndex) => {
      const newIndex = currentIndex === index ? null : index;
      console.log("🔄 State changing to:", newIndex);
      return newIndex;
    });
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>Loading opportunities...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.leftTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
      <div className={styles.rightTopShade}>
        <img src="careerbg1.png" alt="" height={"100%"} width={"100%"} />
      </div>
      <div className={styles.rightmiddleShade}>
        <img src="careerbg2.png" alt="" height={"100%"} width={"100%"} />
      </div>
      <div className={styles.leftendShade}>
        <img src="careerbg2.png" alt="" height={"100%"} width={"100%"} />
      </div>

      <button className={styles.exploreButton}>
        <img src="star.svg" height={"20px"} alt="" /> Explore Career
        Opportunities
      </button>

      <div className={styles.textArea}>
        <h1>
          <span>Transforming</span> Ideas Into <br />
          <span>Intelligent</span> Solutions
        </h1>
        <p>
          Empowering businesses with tailored AI solutions, innovative
          strategies, and cutting-edge technology to drive success and
          efficiency.
        </p>
      </div>

      <div className={styles.imagePlaceholder}>
        <img src="./careers.jpg" alt="" height={"100%"} width={"100%"} />
      </div>

      <div className={styles.accordion}>
        {jobs.length === 0 ? (
          <div className={styles.noJobs}>
            <p>
              No open positions available at the moment. Please check back
              later!
            </p>
          </div>
        ) : (
          jobs.map((job, index) => (
            <div key={job._id} className={styles.accordionItem}>
              {/* Debug for each job */}
              <div
                style={{ color: "cyan", fontSize: "12px", marginBottom: "5px" }}
              >
                Job {index}: {job.title} - Is Open:{" "}
                {activeIndex === index ? "YES" : "NO"}
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("🎯 Clicked job:", job.title, "index:", index);
                  toggleAccordion(index);
                }}
                className={styles.accordionButton}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "2rem",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {activeIndex === index ? (
                  <img
                    src="star.svg"
                    height={"30px"}
                    alt=""
                    style={{ transform: "rotate(45deg)" }}
                  />
                ) : (
                  <img src="star.svg" height={"30px"} alt="" />
                )}
                <div className={styles.jobHeader}>
                  <div className={styles.jobTitle}>{job.title}</div>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobDepartment}>
                      <FaBriefcase /> {job.department}
                    </span>
                    <span className={styles.jobLocation}>
                      <FaMapMarkerAlt /> {job.location}
                    </span>
                    <span className={styles.jobType}>
                      <FaClock /> {job.employmentType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Accordion content - Force visibility */}
              {activeIndex === index && (
                <div
                  style={{
                    display: "block !important",
                    visibility: "visible !important",
                    opacity: "1 !important",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "20px",
                    marginTop: "10px",
                    border: "1px solid #444",
                    marginLeft: "50px",
                    color: "#ccc",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  <div style={{ color: "lime", marginBottom: "10px" }}>
                    ✅ Content is showing! Active index: {activeIndex}, Current
                    index: {index}
                  </div>

                  <div>
                    <div style={{ marginBottom: "2rem" }}>
                      <h4
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          marginBottom: "1rem",
                          color: "#fff",
                        }}
                      >
                        About the Role
                      </h4>
                      <p style={{ lineHeight: "1.6", color: "#ccc" }}>
                        {job.description || "No description available"}
                      </p>
                    </div>

                    {job.responsibilities &&
                      job.responsibilities.length > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                          <h4
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              marginBottom: "1rem",
                              color: "#fff",
                            }}
                          >
                            Responsibilities
                          </h4>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {job.responsibilities.map((responsibility, i) => (
                              <li
                                key={i}
                                style={{
                                  marginBottom: "0.8rem",
                                  color: "#ccc",
                                  position: "relative",
                                  paddingLeft: "1.5rem",
                                }}
                              >
                                <span
                                  style={{
                                    content: "•",
                                    color: "#4ade80",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    left: "0",
                                  }}
                                >
                                  •
                                </span>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {job.requirements && job.requirements.length > 0 && (
                      <div style={{ marginBottom: "2rem" }}>
                        <h4
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            marginBottom: "1rem",
                            color: "#fff",
                          }}
                        >
                          Requirements
                        </h4>
                        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                          {job.requirements.map((requirement, i) => (
                            <li
                              key={i}
                              style={{
                                marginBottom: "0.8rem",
                                color: "#ccc",
                                position: "relative",
                                paddingLeft: "1.5rem",
                              }}
                            >
                              <span
                                style={{
                                  content: "•",
                                  color: "#4ade80",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  left: "0",
                                }}
                              >
                                •
                              </span>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginTop: "2rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid #333",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          fontSize: "0.9rem",
                          color: "#aaa",
                        }}
                      >
                        <div>Experience: {job.experience}</div>
                        <div>Department: {job.department}</div>
                        <div>Location: {job.location}</div>
                      </div>

                      <button
                        onClick={() => handleApplyNow(job)}
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          color: "#fff",
                          padding: "0.6rem 1.2rem",
                          fontSize: "0.95rem",
                          fontWeight: "bold",
                          border: "2px solid white",
                          borderRadius: "30px",
                          cursor: "pointer",
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 4px 15px rgba(255, 255, 255, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={closeApplicationModal}
          onSuccess={() => {
            closeApplicationModal();
            fetchJobs();
          }}
        />
      )}
    </section>
  );
};

export default CareerSection;
