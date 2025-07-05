import React, { useState } from "react";
import axios from "axios";
import "./AddCampus.css";
import { useNavigate } from "react-router";

/* This component renders a form that the user can fill out to add a campus to the database.
The user must provide the name and address of the campus.

Parameters:
 - fetchAllCampuses: A function that fetches the campus data and saves it in state.
 This function is defined in /src/App.jsx

 Returns:
 JSX form that allows user to provide a name and address, which are saved to the database.
*/

const AddCampus = ({ fetchAllCampuses }) => {
  // Initialize state to hold user input
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  // Enable navigation using React-Router
  let navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent page refresh upon submission
    // Attempt to post a new campus to the database
    try {
      await axios.post("http://localhost:8080/api/campuses", {
        name,
        image,
        address,
        description,
      });
      fetchAllCampuses();
      navigate("/"); // navigate to homepage after submission
    } catch (error) {
      console.error("Error adding campus:", error);
    }
  };

  return (
    <div className = "wholePage">
    <div className="add-task-container">
      <h1 id = "title">Add a campus</h1>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    </div>
  );
};

export default AddCampus;
