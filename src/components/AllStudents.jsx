//Include a delete button
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllStudents = ({ students, fetchAllStudents }) => {
  return (
    <div>
      <h2> Students </h2>
      {students.length > 0 ? (
        students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            fetchAllStudents={fetchAllStudents}
          />
        ))
      ) : (
        <p>No Students found</p>
      )}
      <Link to="/add-students" className="add-btn">
        {" "}
        Add Student{" "}
      </Link>
    </div>
  );
};

export default AllStudents;
