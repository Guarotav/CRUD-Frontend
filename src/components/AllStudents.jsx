//Include a delete button
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StudentCard from "./StudentCard";

const AllStudents = ({ campuses, students, fetchAllCampuses, fetchAllStudents }) => {
  console.log("AllStudents rendering, students:", students.map(s => s.id));
  return (
    <div>
      <h2> Students </h2>
      {students.length > 0 ? (
        students.map((student) => (
          <StudentCard
            key={student.id}
            campuses = {campuses}
            student = {student}
            fetchAllStudents={fetchAllStudents}
          />
        ))
      ) : (
        <p>No Students found</p>
      )}
      <Link to="/add-student" className="add-btn">
        {" "}
        Add Student{" "}
      </Link>
    </div>
  );
};

export default AllStudents;
