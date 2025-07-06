import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL || "http://localhost:8080";

const EditCampus = ({ fetchAllCampuses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campusId = Number(id);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCampus = async () => {
      const res = await axios.get(
        `${API_URL}/api/campuses/${campusId}`
      );
      const campus = res.data;
      setName(campus.name || "");
      setAddress(campus.address || "");
      setImageUrl(campus.url || "");
      setDescription(campus.description || "");
    };

    fetchCampus();
  }, [campusId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCampus = {
      name,
      address,
      imageUrl,
      description,
    };
    await axios.patch(
      `${API_URL}/api/campuses/${campusId}`,
      updatedCampus
    );
    navigate("/all-campuses");
  };

  return (
    <div className="edit-campus-container">
      <h1>Edit Campus</h1>
      <form onSubmit={handleSubmit} className="edit-campus-form">
        <input
          type="text"
          placeholder="Campus Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update Campus</button>
      </form>
    </div>
  );
};

export default EditCampus;
