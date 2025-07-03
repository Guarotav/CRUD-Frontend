import React, {useEffect} from "react";
import axios from "axios";
import AddStudent from "./AddStudent";
import {useNavigate, useParams} from "react-router-dom";

const EditStudent = ({ campuses, fetchAllStudents }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = Number(id);

useEffect(() => {
    axios.get(`http://localhost:8080/api/students/${studentId}`).then((res) => {
      setInitialValues(res.data);
    });
  }, []);

  const handleUpdate = (updatedData) => {
    axios.patch(`http://localhost:8080/api/students/${studentId}`, updatedData);
    fetchAllStudents();
    navigate("/all-students");
  };

  return (
    initialValues.id && (
      <AddStudent
        campuses={campuses}
        fetchAllStudents={fetchAllStudents}
        initialValues={initialValues}
        onSubmit={handleUpdate}
      />
    )
  );
};

export default EditStudent;