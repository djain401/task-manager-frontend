import { useContext } from "react";
import TasksNavBar from "../components/auth/TasksNavBar";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const CreateTask = () => {
  const user = useContext(UserContext);
  const addTask = async (e) => {
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

    try {
      const results = await axios.post("http://localhost:3001/task", taskData);
      console.log(results.data);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <TasksNavBar />
      <Container>
        <Form onSubmit={addTask}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Task Name
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Short Description"
                name="taskName"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Due Date
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="datetime-local"
                placeholder="Due date"
                name="dueDate"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Status
            </Form.Label>
            <Col sm={3}>
              <Form.Select name="status">
                <option>New</option>
                <option>In-Progress</option>
                <option>Completed</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Priority
            </Form.Label>
            <Col sm={3}>
              <Form.Select name="priorityLevel">
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Form.Select>
              <Form.Text muted>3 is lowest and 1 is highest</Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Assigned to
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                name="assignedUser"
                defaultValue={user.name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={3}>
              <Form.Control as="textarea" name="description" />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateTask;
