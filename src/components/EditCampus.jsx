import React, {useEffect} from "react";
import axios from "axios";
import AddCampus from "./AddCampus";
import {useNavigate, useParams} from "react-router-dom";

const EditCampus = ({ campuses, fetchAllCampuses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campusId = Number(id);

useEffect(() => {
    axios.get(`http://localhost:8080/api/campuses/${campusId}`).then((res) => {
      setInitialValues(res.data);
    });
  }, []);

  const handleUpdate = (updatedData) => {
    axios.patch(`http://localhost:8080/api/campuses/${campusId}`, updatedData);
    fetchAllCampuses();
    navigate("/all-campuses");
  };

  return (
    initialValues.id && (
      <AddCampus
        campuses={campuses}
        fetchAllCampuses={fetchAllCampuses}
        initialValues={initialValues}
        onSubmit={handleUpdate}
      />
    )
  );
};

export default EditCampus;