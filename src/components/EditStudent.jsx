import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.API_URL || "http://localhost:8080";

const EditStudent = ({ campuses, fetchAllStudents }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = Number(id);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [campusId, setCampusId] = useState(0);

  useEffect(() => {
    console.log("Fetching student with ID:", studentId);
    axios.get(`${API_URL}/api/students/${studentId}`).then((res) => {
      console.log("Fetched student:", res.data);
      const student = res.data;
      setFirstName(student.firstName || "");
      setLastName(student.lastName || "");
      setEmail(student.email || "");
      setImage(student.image || "");
      setGpa(student.gpa || 0.0);
      setCampusId(student.CampusId || 0);
    });
  }, [studentId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedStudent = {
      firstName,
      lastName,
      email,
      image,
      gpa: Number(gpa),
      CampusId: Number(campusId),
    };
    axios.patch(
      `${API_URL}/api/students/${studentId}`,
      updatedStudent
    );
    fetchAllStudents();
    navigate("/all-students");
  };

  return (
    <div className="edit-student-container">
      <h1>Edit Student</h1>
      <form onSubmit={handleUpdate} className="edit-student-form">
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
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select
          value={campusId}
          onChange={(e) => setCampusId(Number(e.target.value))}
        >
          <option>Select a campus:</option>
          {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
