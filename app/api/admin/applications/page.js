// app/admin/applications/page.jsx

"use client";
import React, { useState, useEffect } from "react";
import styles from "./ApplicationsDashboard.module.css";

const ApplicationsDashboard = () => {
  const [applications, setApplications] = useState([]);
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
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Fetch applications
  const fetchApplications = async () => {
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
  };

  useEffect(() => {
    fetchApplications();
  }, [filters]);

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
          prev.map((application) =>
            application.id === applicationId
              ? { ...application, status: newStatus }
              : application
          )
        );
        fetchApplications(); // Refresh to update stats
      } else {
        alert("Failed to update status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
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
      reviewed: styles.statusReviewed,
      "interview-scheduled": styles.statusInterview,
      interviewing: styles.statusInterview,
      selected: styles.statusSelected,
      rejected: styles.statusRejected,
      withdrawn: styles.statusWithdrawn,
    };
    return `${styles.statusBadge} ${statusMap[status] || styles.statusNew}`;
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Job Title",
      "Department",
      "Experience",
      "Current Role",
      "Current Company",
      "Status",
      "Applied Date",
    ];

    const csvContent = [
      headers.join(","),
      ...applications.map((app) =>
        [
          app.fullName,
          app.email,
          app.phoneNumber || "",
          app.job?.title || "",
          app.job?.department || "",
          app.experience,
          app.currentRole || "",
          app.currentCompany || "",
          app.status,
          formatDate(app.appliedAt),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `job_applications_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading && !applications.length) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}>Loading applications...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Job Applications Dashboard</h1>
        <div className={styles.actions}>
          <button onClick={exportToCSV} className={styles.exportButton}>
            Export CSV
          </button>
          <button onClick={fetchApplications} className={styles.refreshButton}>
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total || 0}</div>
          <div className={styles.statLabel}>Total Applications</div>
        </div>
        {stats.byStatus &&
          Object.entries(stats.byStatus).map(([status, count]) => (
            <div key={status} className={styles.statCard}>
              <div className={styles.statNumber}>{count}</div>
              <div className={styles.statLabel}>{status.replace("-", " ")}</div>
            </div>
          ))}
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Status</label>
            <select
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
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="createdAt">Application Date</option>
              <option value="fullName">Name</option>
              <option value="experience">Experience</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Per Page</label>
            <select
              value={filters.limit}
              onChange={(e) =>
                handleFilterChange("limit", parseInt(e.target.value))
              }
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className={styles.tableContainer}>
        {applications.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No applications found</h3>
            <p>No applications match your current filters.</p>
          </div>
        ) : (
          <>
            <table className={styles.applicationsTable}>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Job Details</th>
                  <th>Experience</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className={styles.candidateInfo}>
                        <strong>{application.fullName}</strong>
                        <div className={styles.candidateDetails}>
                          {application.currentRole && (
                            <span>{application.currentRole}</span>
                          )}
                          {application.currentCompany && (
                            <span>@ {application.currentCompany}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      {application.job && (
                        <div className={styles.jobInfo}>
                          <div>{application.job.title}</div>
                          <div className={styles.jobDetails}>
                            {application.job.department} •{" "}
                            {application.job.location}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>{application.experience}</td>
                    <td>
                      <div className={styles.contactInfo}>
                        <div>{application.email}</div>
                        {application.phoneNumber && (
                          <div>{application.phoneNumber}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <select
                        className={getStatusClass(application.status)}
                        value={application.status}
                        onChange={(e) =>
                          handleStatusUpdate(application.id, e.target.value)
                        }
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interview-scheduled">
                          Interview Scheduled
                        </option>
                        <option value="interviewing">Interviewing</option>
                        <option value="selected">Selected</option>
                        <option value="rejected">Rejected</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </td>
                    <td>{formatDate(application.appliedAt)}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.viewButton}
                          onClick={() => {
                            // Show application details modal
                            alert(
                              `Application Details:\n\nCover Letter: ${
                                application.coverLetter
                              }\n\nSkills: ${
                                application.skills?.join(", ") ||
                                "Not specified"
                              }\n\nResume: ${
                                application.resumeUrl || "Not provided"
                              }`
                            );
                          }}
                        >
                          View
                        </button>
                        {application.resumeUrl && (
                          <a
                            href={application.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resumeButton}
                          >
                            Resume
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() =>
                    handleFilterChange("page", pagination.current - 1)
                  }
                  disabled={!pagination.hasPrev}
                >
                  Previous
                </button>

                {[...Array(pagination.pages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={
                      pagination.current === index + 1 ? styles.active : ""
                    }
                    onClick={() => handleFilterChange("page", index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    handleFilterChange("page", pagination.current + 1)
                  }
                  disabled={!pagination.hasNext}
                >
                  Next
                </button>

                <div className={styles.paginationInfo}>
                  Page {pagination.current} of {pagination.pages}(
                  {pagination.total} total applications)
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsDashboard;
