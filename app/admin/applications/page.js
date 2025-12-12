// app/admin/applications/page.js
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../Admin.module.css";

const JobApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 10,
  });

  // Filters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "all",
    jobId: "all",
    search: "",
  });

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("Admin");

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin-logged-in");
      if (isLoggedIn !== "true") {
        router.push("/admin");
        return;
      }
      setCurrentUser(localStorage.getItem("admin-user") || "Admin");
    }
  }, [router]);

  // Fetch jobs for filter dropdown
  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch("/api/jobs");
      const result = await response.json();
      if (result.success) {
        setJobs(result.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, []);

  // Fetch applications function
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      Object.keys(filters).forEach((key) => {
        if (filters[key] && filters[key] !== "all") {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`/api/jobs/applications?${queryParams}`);
      const result = await response.json();

      if (result.success) {
        setApplications(result.data);
        setPagination(result.pagination);
        setStats(result.stats || {});
      } else {
        console.error("Failed to fetch applications:", result.message);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch data when filters change
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin-logged-in");
    if (isLoggedIn === "true") {
      fetchJobs();
      fetchApplications();
    }
  }, [filters, fetchJobs, fetchApplications]);

  const handleLogout = () => {
    localStorage.removeItem("admin-logged-in");
    localStorage.removeItem("admin-user");
    localStorage.removeItem("admin-login-time");
    router.push("/admin");
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(
        `/api/jobs/applications?id=${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        fetchApplications();
      } else {
        alert("Failed to update status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (applicationId) => {
    if (!confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/jobs/applications?id=${applicationId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        setApplications((prev) =>
          prev.filter((app) => app._id !== applicationId)
        );
        fetchApplications();
      } else {
        alert("Failed to delete application: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    const statusMap = {
      new: styles.statusNew,
      reviewed: styles.statusContacted,
      "interview-scheduled": styles.statusInProgress,
      interviewing: styles.statusInProgress,
      selected: styles.statusCompleted,
      rejected: styles.statusClosed,
      withdrawn: styles.statusClosed,
    };
    return `${styles.statusBadge} ${statusMap[status] || styles.statusNew}`;
  };

  const totalApplications = Object.values(stats).reduce(
    (sum, count) => sum + (count || 0),
    0
  );

  if (loading && !applications.length) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loadingSpinner}>Loading applications...</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={styles.dashboardTitle}>Job Applications</h1>
            <p
              style={{
                color: "#cccccc",
                margin: "5px 0 0 0",
                fontSize: "14px",
              }}
            >
              Manage job applications and candidates
            </p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/admin/dashboard" className={styles.refreshButton}>
              Back to Contacts
            </Link>
            <button
              onClick={fetchApplications}
              className={styles.refreshButton}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{totalApplications}</div>
            <div className={styles.statLabel}>Total Applications</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.new || 0}</div>
            <div className={styles.statLabel}>New</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.reviewed || 0}</div>
            <div className={styles.statLabel}>Reviewed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {stats["interview-scheduled"] || 0}
            </div>
            <div className={styles.statLabel}>Interview Scheduled</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.selected || 0}</div>
            <div className={styles.statLabel}>Selected</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.rejected || 0}</div>
            <div className={styles.statLabel}>Rejected</div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Search</label>
              <input
                type="text"
                className={styles.filterInput}
                placeholder="Search by name, email, skills..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select
                className={styles.filterSelect}
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="interview-scheduled">Interview Scheduled</option>
                <option value="interviewing">Interviewing</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Job Position</label>
              <select
                className={styles.filterSelect}
                value={filters.jobId}
                onChange={(e) => handleFilterChange("jobId", e.target.value)}
              >
                <option value="all">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title} - {job.department}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Per Page</label>
              <select
                className={styles.filterSelect}
                value={filters.limit}
                onChange={(e) =>
                  handleFilterChange("limit", parseInt(e.target.value))
                }
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className={styles.contactsContainer}>
          <div className={styles.contactsHeader}>
            Job Applications ({pagination.total} total)
          </div>

          {loading ? (
            <div className={styles.loadingSpinner}>Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No applications found</h3>
              <p>No applications match your current filters.</p>
            </div>
          ) : (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.contactsTable}>
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Job Position</th>
                      <th>Experience</th>
                      <th>Current Role</th>
                      <th>Skills</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr key={application._id}>
                        <td>
                          <strong>{application.fullName}</strong>
                          <div style={{ fontSize: "12px", color: "#cccccc" }}>
                            {application.email}
                          </div>
                          {application.phoneNumber && (
                            <div style={{ fontSize: "12px", color: "#cccccc" }}>
                              {application.phoneNumber}
                            </div>
                          )}
                        </td>
                        <td>
                          <div>
                            <strong>{application.jobId?.title}</strong>
                          </div>
                          <div style={{ fontSize: "12px", color: "#cccccc" }}>
                            {application.jobId?.department} •{" "}
                            {application.jobId?.location}
                          </div>
                        </td>
                        <td>{application.experience}</td>
                        <td>
                          <div>
                            {application.currentRole || "Not specified"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#cccccc" }}>
                            {application.currentCompany || ""}
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: "150px", fontSize: "12px" }}>
                            {application.skills?.length
                              ? application.skills.join(", ")
                              : "Not specified"}
                          </div>
                        </td>
                        <td>
                          <select
                            className={getStatusClass(application.status)}
                            value={application.status}
                            onChange={(e) =>
                              handleStatusUpdate(
                                application._id,
                                e.target.value
                              )
                            }
                            style={{
                              border: "none",
                              background: "transparent",
                              fontWeight: "600",
                              fontSize: "12px",
                            }}
                          >
                            <option value="new">NEW</option>
                            <option value="reviewed">REVIEWED</option>
                            <option value="interview-scheduled">
                              INTERVIEW SCHEDULED
                            </option>
                            <option value="interviewing">INTERVIEWING</option>
                            <option value="selected">SELECTED</option>
                            <option value="rejected">REJECTED</option>
                            <option value="withdrawn">WITHDRAWN</option>
                          </select>
                        </td>
                        <td>{formatDate(application.createdAt)}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button
                              className={`${styles.actionButton} ${styles.editButton}`}
                              onClick={() => {
                                const details = [
                                  `Cover Letter: ${
                                    application.coverLetter || "Not provided"
                                  }`,
                                  `Current Location: ${
                                    application.currentLocation ||
                                    "Not specified"
                                  }`,
                                  `Notice Period: ${
                                    application.noticePeriod || "Not specified"
                                  }`,
                                  `Resume: ${
                                    application.resumeUrl || "Not provided"
                                  }`,
                                  `Portfolio: ${
                                    application.portfolioUrl || "Not provided"
                                  }`,
                                  `LinkedIn: ${
                                    application.linkedinUrl || "Not provided"
                                  }`,
                                  `GitHub: ${
                                    application.githubUrl || "Not provided"
                                  }`,
                                ].join("\n\n");
                                alert(`Application Details:\n\n${details}`);
                              }}
                              title="View Details"
                            >
                              View
                            </button>
                            <button
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              onClick={() => handleDelete(application._id)}
                              title="Delete Application"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.paginationButton}
                    onClick={() =>
                      handleFilterChange("page", pagination.current - 1)
                    }
                    disabled={pagination.current === 1}
                  >
                    Previous
                  </button>

                  {[...Array(pagination.pages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`${styles.paginationButton} ${
                        pagination.current === index + 1 ? styles.active : ""
                      }`}
                      onClick={() => handleFilterChange("page", index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className={styles.paginationButton}
                    onClick={() =>
                      handleFilterChange("page", pagination.current + 1)
                    }
                    disabled={pagination.current === pagination.pages}
                  >
                    Next
                  </button>

                  <div className={styles.paginationInfo}>
                    Page {pagination.current} of {pagination.pages}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsAdmin;
