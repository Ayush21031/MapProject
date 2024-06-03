import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    console.log("Form data:", formData);

    try {
      const response = await fetch("http://localhost:3000/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);
      if (result.message === "Sign up Successfully") {
        // Store the username and navigate to the user page
        //const token = result.token;
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", formData.email);
        navigate("/user", { state: { username: formData.firstname } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // console.log('Form submitted');
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="FirstName"
              name = "firstname"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="LastName"
              name = "lastname"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="E-mail"
              name = "email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name = "password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="checkbox" required /> I agree to the{" "}
            <a href="#terms">Terms</a>
          </div>
          <button type="submit">Create Account</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
