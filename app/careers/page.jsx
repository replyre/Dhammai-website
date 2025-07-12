// app/careers/page.jsx

"use client";
import React, { useState, useEffect } from "react";
import styles from "./CareerSection.module.css";
import {
  FaPlus,
  FaMinus,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";
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
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  const formatSalary = (salary) => {
    if (salary && salary.min && salary.max) {
      return `${
        salary.currency
      } ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
    }
    return "Competitive salary";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
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
              <button
                className={styles.accordionButton}
                onClick={() => toggleAccordion(index)}
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
              </button>

              {activeIndex === index && (
                <div className={styles.accordionContent}>
                  <div className={styles.jobDetails}>
                    <div className={styles.jobSection}>
                      <h4>About the Role</h4>
                      <p>{job.description}</p>
                    </div>

                    {job.responsibilities &&
                      job.responsibilities.length > 0 && (
                        <div className={styles.jobSection}>
                          <h4>What You'll Do</h4>
                          <ul>
                            {job.responsibilities.map((responsibility, i) => (
                              <li key={i}>{responsibility}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {job.requirements && job.requirements.length > 0 && (
                      <div className={styles.jobSection}>
                        <h4>What We're Looking For</h4>
                        <ul>
                          {job.requirements.map((requirement, i) => (
                            <li key={i}>{requirement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.niceToHave && job.niceToHave.length > 0 && (
                      <div className={styles.jobSection}>
                        <h4>Nice to Have</h4>
                        <ul>
                          {job.niceToHave.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={styles.jobFooter}>
                      <div className={styles.jobInfo}>
                        <div className={styles.salary}>
                          <strong>Salary:</strong> {formatSalary(job.salary)}
                        </div>
                        <div className={styles.experience}>
                          <strong>Experience:</strong> {job.experience}
                        </div>
                        {job.applicationDeadline && (
                          <div className={styles.deadline}>
                            <strong>Application Deadline:</strong>{" "}
                            {formatDate(job.applicationDeadline)}
                          </div>
                        )}
                        <div className={styles.posted}>
                          <strong>Posted:</strong> {formatDate(job.createdAt)}
                        </div>
                      </div>

                      <button
                        className={styles.applyButton}
                        onClick={() => handleApplyNow(job)}
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
            // Optionally show success message
          }}
        />
      )}
    </section>
  );
};

export default CareerSection;
