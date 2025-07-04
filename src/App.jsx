import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./AppStyles.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AddCampus from "./components/AddCampus";
import AddStudent from "./components/AddStudent";
import AllCampus from "./components/AllCampus";
import AllStudents from "./components/AllStudents";
import SingleCampus from "./components/SingleCampus";
import SingleStudent from "./components/SingleStudent";
import HomePage from "./components/Homepage";
import axios from "axios";
import EditCampus from "./components/EditCampus";
import EditStudent from "./components/EditStudent";

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
      console.log("Fetched students:", response.data);
      setStudents(response.data);
      console.log("Students state updated:", response.data);
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-campuses" element={<AllCampus campuses={campuses} students = {students} fetchAllCampuses={fetchAllCampuses} />} />
          <Route path="/all-students" element={<AllStudents campuses = {campuses} students = {students} fetchAllCampuses = {fetchAllCampuses} fetchAllStudents={fetchAllStudents} />} />
          <Route path="/add-campus" element={<AddCampus fetchAllCampuses={fetchAllCampuses}/>} />
          <Route path="/add-student" element={<AddStudent campuses = {campuses} fetchAllStudents={fetchAllStudents}/>} />
          <Route path="/campus/:id" element={<SingleCampus campuses = {campuses} students = {students} fetchAllStudents = {fetchAllStudents} fetchAllCampuses={fetchAllCampuses}/>} />
          <Route path="/students/:id" element={<SingleStudent campuses = {campuses} students = {students} fetchAllStudents={fetchAllStudents}/>} />
          <Route path="/edit-students/:id" element={<EditStudent campuses = {campuses} fetchAllStudents = {fetchAllStudents}/>} />
          <Route path="/edit-campuses/:id" element={<EditCampus fetchAllCampuses = {fetchAllCampuses} />} />
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
