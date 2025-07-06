import React, { useState } from "react";
import axios from "axios";
// import "./AddTaskStyles.css";
import { useNavigate } from "react-router";

/* This component renders a form that the user can fill out to add a student to the database.
The user must provide the first name, last name, and email address of the student.

Parameters:
 - fetchAllStudents: A function that fetches the student data and saves it in state.
 This function is defined in /src/App.jsx

 Returns:
 JSX form that allows user to provide a first name, last name and email address, 
 which are saved to the database.
*/

const API_URL = process.env.API_URL || "http://localhost:8080";

const AddStudent = ({ campuses, fetchAllStudents }) => {
  // Initialize state to hold user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [campusId, setCampusId] = useState(0);

  // Enable navigation using React-Router
  let navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent page refresh upon submission
    // Attempt to post a new student to the database
    try {
      await axios.post(`${API_URL}/api/students`, {
        firstName,
        lastName,
        email,
        image,
        gpa: (gpa),
        CampusId: parseFloat(campusId),
      });
      fetchAllStudents();
      navigate("/"); // navigate to homepage after submission
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="add-student-container">
      <h1>Add a student</h1>
      <form onSubmit={handleSubmit} className="add-student-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="4"
          placeholder="GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select value={campusId} onChange={(e) => setCampusId(e.target.value)}>
          <option>Select a campus:</option>
          {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStudent;
