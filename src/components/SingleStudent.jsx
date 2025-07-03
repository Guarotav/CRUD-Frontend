import React from "react";
import CampusCard from "./CampusCard";

const SingleStudent = ({ campuses, students, fetchAllCampuses }) => {
  const params = useParams();
  const id = Number(params.id);
  // useEffect(() => {
  //   // Fetch the ducks here
  // }, []);
  const selectedStudent = students.find((student) => student.id === id);
  const selectedCampus = campuses.find((campus) => campus.id ===  selectedStudent.CampusID);
  const selectedTaskUserName = selectedStudents.name;
  
  const handleDeleteSelectedTask = async () => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${selectedCampus.id}`);
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div className={`studentDetails`}>
      <div className="single-student-header">
        <h2>{selectedCampus.name}</h2>
        <div className="task-card-header-buttons">
          <p onClick={handleDeleteSelectedTask}>🗑️</p>
        </div>
      </div>
      <p>{selectedCampus.description}</p>
    </div>
  );
};


export default SingleStudent;


