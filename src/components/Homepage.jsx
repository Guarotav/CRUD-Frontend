import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>🏫 Welcome to College Portal</h1>
      <p className="subtitle">Manage your campuses and students with ease.</p>
      <div className="home-buttons">
        <Link to="/all-campuses" className="home-btn">View All Campuses</Link>
        <Link to="/all-students" className="home-btn">View All Students</Link>
      </div>
    </div>
  );
};

export default HomePage;
