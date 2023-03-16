import { useEffect, useState } from "react";
import TasksNavBar from "../components/auth/TasksNavBar";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import UpdateTaskFormModal from "../components/UpdateTaskFormModal";

const MainTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showUpdateModalStatus, setShowUpdateModalStatus] = useState(false);
  const [chosenTask, setChosenTask] = useState({});
  const [index, setIndex] = useState(0);

  const deleteTask = async (index) => {
    let results = await axios.delete(`http://localhost:3001/task/${index}`);

    if (results.data.taskArray.length > 0) {
      setTasks(results.data.taskArray);
      setShowItems(true);
      setShowEmpty(false);
    } else {
      setShowItems(false);
      setShowEmpty(true);
    }
  };

  const showUpdateModal = async (idx) => {
    const chosenTask = tasks.find((val) => {
      return val._id === idx;
    });

    setChosenTask(chosenTask);
    setShowUpdateModalStatus(true);
    setIndex(idx);
  };

  const updateTask = async (task, index) => {
    const result = await axios.put(`http://localhost:3001/task/${index}`, task);
    handleCloseUpdate();

    setTasks(result.data.taskArray);
    console.log(tasks);
  };

  const handleCloseUpdate = () => {
    setShowUpdateModalStatus(false);
    console.log(`${showUpdateModalStatus}`);
  };

  useEffect(() => {
    try {
      const getTasks = async () => {
        const result = await axios.get("http://localhost:3001/task");
        if (result.data.length > 0) {
          console.log(result.data);
          setTasks(result.data);
          setShowItems(true);
          setShowEmpty(false);
        } else {
          setShowItems(false);
          setShowEmpty(true);
        }
      };
      getTasks();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <TasksNavBar />

      <MDBContainer>
        <MDBTable align="middle">
          <MDBTableHead className="table-info">
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Due By</th>
              <th scope="col">Owner</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {showEmpty && <p>Your List is Empty ¯\_(ツ)_/¯</p>}
            {showItems &&
              tasks.map((task, index) => (
                <TaskCard
                  index={index}
                  task={task}
                  deleteTask={deleteTask}
                  showUpdateModal={showUpdateModal}
                />
              ))}
          </MDBTableBody>
        </MDBTable>

        <UpdateTaskFormModal
          showUpdateModalStatus={showUpdateModalStatus}
          handleCloseUpdate={handleCloseUpdate}
          index={index}
          chosenTask={chosenTask}
          updateTask={updateTask}
        />
      </MDBContainer>
    </>
  );
};

export default MainTaskList;
