"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Admin.module.css";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    const user = localStorage.getItem('admin-user');
    
    if (token && user) {
      // Already logged in, redirect to dashboard
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
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

    setIsLogging(true);
    setLoginMessage("");

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store token and user info in localStorage
        localStorage.setItem('admin-token', result.token);
        localStorage.setItem('admin-user', JSON.stringify(result.user));
        
        setLoginMessage("Login successful! Redirecting...");
        
        // Redirect to admin dashboard
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setLoginMessage(result.message || "Login failed");
        setErrors({ general: result.message || "Invalid credentials" });
      }
    } catch (error) {
      setLoginMessage("Login failed. Please try again.");
      console.error('Login error:', error);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <section className={styles.container}>
      {/* <button className={styles.backButton} onClick={() => router.push('/')}>
        ← Back to Home
      </button> */}

      <div className={styles.loginCard}>
        <h1 className={styles.heading}>
          Admin Login
        </h1>
        {/* <p className={styles.subtext}>
          Access the admin dashboard to manage contact form submissions
        </p> */}

        {loginMessage && (
          <div className={`${styles.message} ${loginMessage.includes('successful') ? styles.success : styles.error}`}>
            {loginMessage}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formLabel}>
            Username *
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.username ? styles.errorInput : ''}`}
              placeholder="Enter admin username"
              autoComplete="username"
            />
            {errors.username && <span className={styles.errorText}>{errors.username}</span>}
          </label>

          <label className={styles.formLabel}>
            Password *
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.password ? styles.errorInput : ''}`}
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </label>

          {errors.general && (
            <div className={styles.generalError}>
              {errors.general}
            </div>
          )}

          <button 
            type="submit" 
            className={`${styles.submitButton} ${isLogging ? styles.submitting : ''}`}
            disabled={isLogging}
          >
            {isLogging ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        {/* <div className={styles.loginInfo}>
          <h3>Demo Credentials:</h3>
          <p><strong>Username:</strong> DhammAdmin</p>
          <p><strong>Password:</strong> Admin@123</p>
        </div> */}
      </div>
    </section>
  );
};

export default AdminLogin;