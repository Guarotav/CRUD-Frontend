import React from "react";
import CampusCard from "./CampusCard";
import StudentCard from "./StudentCard";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const SingleCampus = ({ campuses, students, fetchAllCampuses, fetchAllStudents }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campusId = Number(id);

  if (!campuses || campuses.length === 0) {
    return <p>Loading campus...</p>;
  }

  const selectedCampus = campuses.find((campus) => campus.id === campusId);
  if (!selectedCampus) return <p>Campus not found.</p>;

  const studentsInCampus =
    students?.filter((student) => student.CampusId === selectedCampus.id) || [];

  const handleDeleteSelectedCampus = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/campuses/${selectedCampus.id}`
      );
      fetchAllCampuses();
      navigate("/all-campuses")
    } catch (error) {
      console.error("Error deleting campus:", error);
    }
  };

return (
    <div className="single-campus-page">
      {/*Campus Info Card*/}
      <div className="campus-info-card">
        <img
          src={selectedCampus.url}
          alt={selectedCampus.name}
          style={{ width: "100%", maxWidth: "600px", borderRadius: "12px", objectFit: "cover" }}
        />
        <h2>{selectedCampus.name}</h2>
        <p><strong>Address:</strong> {selectedCampus.address}</p>
        <p>{selectedCampus.description}</p>
        <button onClick={handleDeleteSelectedCampus}>🗑️ Delete Campus</button>
      </div>

      {/* Student Card */}
      <h3>Students in this Campus</h3>
      <div className="students-container" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {studentsInCampus.length > 0 ? (
          studentsInCampus.map((student) => (
            <StudentCard
              key={student.id}
              campuses={campuses}
              student={student}
              fetchAllStudents={fetchAllStudents}
            />
          ))
        ) : (
          <p>No Students Found</p>
        )}
      </div>
    </div>
  );
};


export default SingleCampus;
