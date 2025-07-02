import React from "react";
import CampusCard from "./CampusCard";

const SingleCampus = ({ campuses, students, fetchAllCampuses }) => {
  const params = useParams();
  const id = Number(params.id);
  // useEffect(() => {
  //   // Fetch the ducks here
  // }, []);
  const selectedCampus = tasks.find((task) => task.id === id);
  //   const selectedStudents = users.find((user) => user.id ===  selectedCampus.userId);
  //   const selectedTaskUserName = selectedStudents.name;

  const handleDeleteSelectedTask = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/tasks/${selectedCampus.id}`
      );
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const studentsInCampus = students.filter(
    (student) => student.CampusID === selectedCampus.Id
  );
  return (
    <div className={`campusDetails`}>
      <div className="single-campus-header">
        <h2>{selectedCampus.name}</h2>
        <div className="task-card-header-buttons">
          <p onClick={handleDeleteSelectedTask}>🗑️</p>
        </div>
      </div>
      <p>{selectedCampus.description}</p>
      <div className="display-all-students">
        {" "}
        {studentsInCampus.length > 0 ? (
          studentsInCampus.map((student) => (
            <StudentCard
              key={student.id}
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
