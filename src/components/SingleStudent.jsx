import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SingleStudent = ({ campuses, students, fetchAllStudents }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = Number(id);

  const selectedStudent = students.find((student) => student.id === studentId);
  const selectedCampus = campuses.find(
    (campus) => campus.id === selectedStudent?.CampusId
  );

  

  const handleDeleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${selectedStudent.id}`);
      await fetchAllStudents();
      navigate("/all-students");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (!selectedStudent) {
    return <p>Loading student...</p>;
  }

 return (
  <div className="single-student-container">
    {/* Student Info Section */}
    <section className="student-info">
      <img src={selectedStudent.image} />
      <h2>{selectedStudent.firstName} {selectedStudent.lastName}</h2>
      <p><strong>Email:</strong> {selectedStudent.email}</p>
      <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
      <button onClick={handleDeleteStudent}>🗑️ Delete Student</button>
    </section>

    {/*Campus Info Section*/}
    <section className="campus-info">
      <h3>Campus</h3>
      {selectedCampus ? (
        <>
          <img src={selectedCampus.url} alt={selectedCampus.name} />
          <h4><Link to = {`/campus/${selectedCampus.id}`}>{selectedCampus.name} </Link></h4>
          <p><strong>Address:</strong> {selectedCampus.address}</p>
          <p>{selectedCampus.description}</p>
        </>
      ) : (
        <p>This student is not assigned to a campus.</p>
      )}
    </section>
  </div>
);
}
export default SingleStudent;
