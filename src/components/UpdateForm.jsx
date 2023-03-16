import { Form, Row, Col, Button } from "react-bootstrap";
import { DateTime } from "luxon";

const UpdateForm = ({ chosenTask, index, updateTask }) => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const taskData = {
      taskName: e.target.taskName.value.replace(
        /^./,
        e.target.taskName.value[0].toUpperCase()
      ),
      dueDate: e.target.dueDate.value,
      status: e.target.status.value,
      priorityLevel: e.target.priorityLevel.value,
      assignedUser: e.target.assignedUser.value,
      description: e.target.description.value.replace(
        /^./,
        e.target.description.value[0].toUpperCase()
      ),
    };
    updateTask(taskData, index);
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Task Name
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="taskName"
              defaultValue={chosenTask.taskName}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Due Date
          </Form.Label>
          <Col>
            <Form.Control
              type="datetime-local"
              placeholder="Due date"
              name="dueDate"
              defaultValue={DateTime.fromISO(chosenTask.dueDate).toFormat(
                "yyyy-MM-dd'T'HH:mm:ss.SSS"
              )}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Status
          </Form.Label>
          <Col>
            <Form.Select name="status">
              <option>{chosenTask.status}</option>
              <option>New</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Priority
          </Form.Label>
          <Col>
            <Form.Select name="priorityLevel">
              <option>{chosenTask.priorityLevel}</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </Form.Select>
            <Form.Text muted>3 is lowest and 1 is highest</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Assigned to
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="assignedUser"
              defaultValue={chosenTask.assignedUser}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Description
          </Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={chosenTask.description}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default UpdateForm;
