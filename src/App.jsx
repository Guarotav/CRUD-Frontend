import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AddCampus from "./components/AddCampus";
import AddStudent from "./components/AddStudent";

const App = () => {
  // Initialize state
  const [campuses, setCampuses] = useState([]);
  const [students, setStudents] = useState([]);

  // Request campus data
  async function fetchAllCampuses() {
    try {
      const response = await axios.get("http://localhost:8080/api/campuses");
      setCampuses(response.data);
    } catch (error) {
      console.error("Error fetching campuses:", error);
    }
  }

  // Request student data
  async function fetchAllStudents() {
    try {
      const response = await axios.get("http://localhost:8080/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  useEffect(() => {
      fetchAllCampuses();
      fetchAllStudents();
    }, []);

  return (
    <div>
      <NavBar />
      <div className="app">
        <h1>Hello React!</h1>
        <img className="react-logo" src="/react-logo.svg" alt="React Logo" />

        <Routes>
          <Route path="/add-campus" element={<AddCampus fetchAllCampuses={fetchAllCampuses}/>} />
          <Route path="/add-student" element={<AddStudent fetchAllStudents={fetchAllStudents}/>} />
        </Routes>
      </div>
    </div>
  );
};

// We're using React Router to handle the navigation between pages.
// It's important that the Router is at the top level of our app,
// and that we wrap our entire app in it. With this in place, we can
// declare Routes, Links, and use useful hooks like useNavigate.
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
