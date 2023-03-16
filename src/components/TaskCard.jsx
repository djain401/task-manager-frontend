import React, { useContext } from "react";
import {
  MDBBadge,
  MDBAccordion,
  MDBAccordionItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import { DateTime } from "luxon";
import { UserContext } from "../contexts/UserContext";

const TaskCard = ({ task, index, deleteTask, showUpdateModal }) => {
  const user = useContext(UserContext);
  const dt = DateTime.fromISO(task.dueDate).toLocaleString(
    DateTime.DATETIME_MED
  );

  return (
    <>
      <tr
        className={
          task.status === "Completed"
            ? ""
            : task.dueDate < DateTime.now().toISO()
            ? "table-danger"
            : ""
        }
        key={task._id}
      >
        <td>
          <MDBAccordion flush>
            <MDBAccordionItem
              collapseId={1}
              headerTitle={<p className="fw-bold mb-1">{task.taskName}</p>}
            >
              <p className="text-muted mb-0">{task.description}</p>
            </MDBAccordionItem>
          </MDBAccordion>
        </td>
        <td>
          <p className="fw-normal mb-1">{dt}</p>
        </td>
        <td>
          <p className="fw-normal mb-1">{task.assignedUser}</p>
        </td>
        <td>
          <MDBBadge
            color={
              task.status === "New"
                ? "info"
                : task.status === "In-Progress"
                ? "warning"
                : "success"
            }
            pill
          >
            {task.status}
          </MDBBadge>
        </td>
        <td>
          <MDBBadge
            color={
              task.priorityLevel === 1
                ? "danger"
                : task.priorityLevel === 2
                ? "warning"
                : "success"
            }
            size="sm"
          >
            {task.priorityLevel}
          </MDBBadge>
        </td>
        <td>
          <MDBBtn
            onClick={() => deleteTask(task._id)}
            style={{ cursor: "pointer" }}
            color="danger"
            size="sm"
            className="ms-1"
            rounded
            disabled={task.assignedUser === user.name ? false : true}
          >
            Delete
          </MDBBtn>

          <MDBBtn
            color="link"
            rounded
            size="sm"
            onClick={() => showUpdateModal(task._id)}
            className="ms-1"
            disabled={task.assignedUser === user.name ? false : true}
          >
            Edit
          </MDBBtn>
        </td>
      </tr>
    </>
  );
};

export default TaskCard;
