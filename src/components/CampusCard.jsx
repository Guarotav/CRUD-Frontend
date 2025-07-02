import React from "react";
import axios from "axios";
import "./CampusCardStyles.css";
import {Link} from "react-router";

const CampusCard =({campuses, students, fetchAllCampuses}) =>{

const handleDeleteCampus = async () => {
    try {

        await axios.delete (`"http://localhost:8080/api/campuses/${campuses.id}"`)
        fetchAllCampuses();
    }   catch(err){
        console.error("Error completing task:", err);
    }

};


  const studentsInCampus = students.filter((student) => student.campusId === campuses.id);





return (

    <div className= "campus-card" >
        <div className="campus-card-header">
            <h2>
            <Link to = {`/campus/${campus.id}`}> {campus.name}</Link>
            </h2>
            <p>{studentsInCampus.length} student(s)</p>
            <div className = "campus-card-header-button">
                <p onClick = {handleDeleteCampus}>🗑️</p>
            </div>
        </div>
    </div>

)

};

export default CampusCard;