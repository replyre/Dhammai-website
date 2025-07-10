"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Admin.module.css";

// Simple hardcoded credentials
const ADMIN_CREDENTIALS = {
  username: 'DhammAdmin',
  password: 'Admin@123'
};



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
    const isLoggedIn = localStorage.getItem('admin-logged-in');
    if (isLoggedIn === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

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

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (loginData.username === ADMIN_CREDENTIALS.username && 
          loginData.password === ADMIN_CREDENTIALS.password) {
        
        // Store login state
        localStorage.setItem('admin-logged-in', 'true');
        localStorage.setItem('admin-user', loginData.username);
        localStorage.setItem('admin-login-time', Date.now().toString());
        
        setLoginMessage("Login successful! Redirecting...");
        
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setLoginMessage("Invalid credentials. Please try again.");
        setErrors({ general: "Invalid username or password" });
      }
      
      setIsLogging(false);
    }, 800);
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