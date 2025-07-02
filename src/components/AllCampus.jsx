import React from "react";
import CampusCard from "./CampusCard"
import {Link} from "react-router-dom";



const AllCampus = ({campuses, students, fetchAllCampuses}) =>{


return (
<div>
    <h2> Campuses </h2>
{campuses.length > 0 ? (
        campuses.map((campus) => (
          <CampusCard key={campus.id} campus ={campus} students = {students} fetchAllCampuses={fetchAllCampuses} />
        ))
      ) : (
        <p>No Campus found</p>
      )}
      <Link to="/add-campus" className="add-btn"> Add Campus </Link>
</div>


);

};

export default AllCampus;
