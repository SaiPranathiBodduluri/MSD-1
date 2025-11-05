// ...existing code...
import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // using same CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ...existing code...
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    try {
      console.log("Signup request payload:", formData);
      const res = await axios.post("https://msd-1-1.onrender.com/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Signup success response:", res);
      setMessage(res.data?.msg || "Signup successful!");
    } catch (err) {
      console.error("Signup error (full):", err);
      console.error("Signup error response data:", err.response?.data);
      console.error("Signup error response status:", err.response?.status);
      const backendMsg = err.response?.data?.msg ?? err.response?.data ?? null;
      const errText = backendMsg || err.message || "Signup failed";
      setMessage(typeof errText === "object" ? JSON.stringify(errText) : errText);
    }
  };
// ...existing code...

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <a href="/">Login</a>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
// ...existing code...
