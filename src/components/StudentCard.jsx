import React from "react";
import axios from "axios";
import "./StudentCard.css";
import { Link } from "react-router-dom";

const StudentCard = ({ campuses, students, fetchAllStudents }) => {
  const handleDeleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${students.id}`);
      fetchAllStudents();
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

const selectedStudent = students.find((student) => student.id === id);
const selectedStudentCampus = campuses.find((campus) => campus.id === selectedStudent.CampusID);

  return (
    <div className="student-card">
      <div className="student-card-header">
        <h2>
          <Link to={`/students/${students.id}`}> {students.name}</Link>
        </h2>
        <p></p>
        <div className="student-card-header-button">
          <p onClick={handleDeleteStudent}>🗑️</p>
        </div>
      </div>
      <p>Email: {students.email}</p>
      <p>Campus: {selectedStudentCampus}</p>
    </div>
  );
};

export default StudentCard;
