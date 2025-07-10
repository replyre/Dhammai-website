"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../Admin.module.css";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 10
  });
  
  // Filters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: 'all',
    organizationType: 'all',
    search: ''
  });

  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    const user = localStorage.getItem('admin-user');
    
    if (!token || !user) {
      router.push('/admin');
      return;
    }
    
    setLoading(false);
  }, [router]);

  // Memoize fetchContacts to prevent infinite loops
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== 'all') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`/api/admin/contacts?${queryParams}`);
      const result = await response.json();

      if (result.success) {
        setContacts(result.data);
        setPagination(result.pagination);
        setStats(result.stats || {});
      } else {
        console.error('Failed to fetch contacts:', result.message);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch contacts when filters change (but only after auth check)
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token && !loading) {
      fetchContacts();
    }
  }, [filters, fetchContacts]);

  // Initial data fetch after authentication
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      fetchContacts();
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-user');
      
      // Call logout API (optional)
      await fetch('/api/admin/auth', { method: 'DELETE' });
      
      // Redirect to login
      router.push('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect even if API call fails
      router.push('/admin');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1 // Reset to page 1 unless changing page
    }));
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setContacts(prev => 
          prev.map(contact => 
            contact._id === contactId 
              ? { ...contact, status: newStatus }
              : contact
          )
        );
        // Refresh to update stats
        fetchContacts();
      } else {
        alert('Failed to update status: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contacts?id=${contactId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setContacts(prev => prev.filter(contact => contact._id !== contactId));
        // Refresh to update stats and pagination
        fetchContacts();
      } else {
        alert('Failed to delete contact: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'new': styles.statusNew,
      'contacted': styles.statusContacted,
      'in-progress': styles.statusInProgress,
      'completed': styles.statusCompleted,
      'closed': styles.statusClosed
    };
    return `${styles.statusBadge} ${statusMap[status] || styles.statusNew}`;
  };

  const totalContacts = Object.values(stats).reduce((sum, count) => sum + (count || 0), 0);

  // Show loading only for initial auth check
  if (loading && !localStorage.getItem('admin-token')) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loadingSpinner}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <div className={styles.headerActions}>
            <button 
              onClick={fetchContacts}
              className={styles.refreshButton}
            >
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{totalContacts}</div>
            <div className={styles.statLabel}>Total Contacts</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.new || 0}</div>
            <div className={styles.statLabel}>New</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.contacted || 0}</div>
            <div className={styles.statLabel}>Contacted</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats['in-progress'] || 0}</div>
            <div className={styles.statLabel}>In Progress</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.completed || 0}</div>
            <div className={styles.statLabel}>Completed</div>
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
                placeholder="Search by name, email, organization..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select
                className={styles.filterSelect}
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Organization Type</label>
              <select
                className={styles.filterSelect}
                value={filters.organizationType}
                onChange={(e) => handleFilterChange('organizationType', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Educational Institution">Educational Institution</option>
                <option value="Corporate">Corporate</option>
                <option value="Government">Government</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Startup">Startup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Per Page</label>
              <select
                className={styles.filterSelect}
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className={styles.contactsContainer}>
          <div className={styles.contactsHeader}>
            Contact Submissions ({pagination.total} total)
          </div>
          
          {loading ? (
            <div className={styles.loadingSpinner}>
              Loading contacts...
            </div>
          ) : contacts.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No contacts found</h3>
              <p>No contacts match your current filters.</p>
            </div>
          ) : (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.contactsTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Organization</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>
                          <strong>{contact.fullName}</strong>
                          {contact.phoneNumber && <div style={{fontSize: '12px', color: '#666'}}>{contact.phoneNumber}</div>}
                        </td>
                        <td>{contact.email}</td>
                        <td>
                          <div>{contact.organizationName}</div>
                          <div style={{fontSize: '12px', color: '#666'}}>{contact.organizationType}</div>
                        </td>
                        <td>
                          <div style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {contact.subject}
                          </div>
                        </td>
                        <td>
                          <select
                            className={getStatusClass(contact.status)}
                            value={contact.status}
                            onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                            style={{border: 'none', background: 'transparent', fontWeight: '600', fontSize: '12px'}}
                          >
                            <option value="new">NEW</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="in-progress">IN PROGRESS</option>
                            <option value="completed">COMPLETED</option>
                            <option value="closed">CLOSED</option>
                          </select>
                        </td>
                        <td>{formatDate(contact.createdAt)}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button
                              className={`${styles.actionButton} ${styles.editButton}`}
                              onClick={() => alert(`Contact Details:\n\nMessage: ${contact.message}\n\nMeeting Date: ${contact.meetingDate || 'Not specified'}\nMeeting Time: ${contact.meetingTime || 'Not specified'}\nStudent Count: ${contact.studentCount || 'Not specified'}`)}
                              title="View Details"
                            >
                              View
                            </button>
                            <button
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              onClick={() => handleDelete(contact._id)}
                              title="Delete Contact"
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
                    onClick={() => handleFilterChange('page', pagination.current - 1)}
                    disabled={pagination.current === 1}
                  >
                    Previous
                  </button>

                  {[...Array(pagination.pages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`${styles.paginationButton} ${pagination.current === index + 1 ? styles.active : ''}`}
                      onClick={() => handleFilterChange('page', index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className={styles.paginationButton}
                    onClick={() => handleFilterChange('page', pagination.current + 1)}
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

export default AdminDashboard;