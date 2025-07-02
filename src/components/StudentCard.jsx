import React from "react";
import axios from "axios";
import "./StudentCard.css";
import { Link } from "react-router-dom";
import {useParams} from "react-router";

const StudentCard = ({ campuses, student, fetchAllStudents }) => {
  const params = useParams();
  const id = Number(params.id);

  const handleDeleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${student.id}`);
      fetchAllStudents();
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

//const selectedStudent = students.find((student) => student.id === id);
// const selectedStudentCampus = campuses.find((campus) => campus.id === selectedStudent.CampusID);

  return (
    <div className="student-card">
      <div className="student-card-header">
        <h2>
          <Link to={`/students/${student.id}`}> {student.name}</Link>
        </h2>
        <p></p>
        <div className="student-card-header-button">
          <p onClick={handleDeleteStudent}>🗑️</p>
        </div>
      </div>
      <p>Email: {student.email}</p>
      <p>Campus: </p>
    </div>
  );
};

export default StudentCard;
