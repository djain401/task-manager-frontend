import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBAccordion,
  MDBAccordionItem,
  MDBIcon,
} from "mdb-react-ui-kit";
import { DateTime } from "luxon";

const TaskCard = ({ task, index, deleteTask, showUpdateModal }) => {
  const dt = DateTime.fromISO(task.dueDate).toLocaleString(
    DateTime.DATETIME_MED
  );

  return (
    <>
      <tr
        className={task.dueDate < DateTime.now().toISO() ? "table-danger" : ""}
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
          <MDBIcon
            icon="circle"
            color={
              task.priorityLevel === 1
                ? "danger"
                : task.priorityLevel === 2
                ? "warning"
                : "success"
            }
            size="sm"
          ></MDBIcon>
        </td>
        <td>
          <MDBBtn
            color="danger"
            rounded
            size="sm"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </MDBBtn>

          <MDBBtn
            color="link"
            rounded
            size="sm"
            onClick={() => showUpdateModal(task._id)}
          >
            Edit
          </MDBBtn>
        </td>
      </tr>
    </>
  );
};

export default TaskCard;
