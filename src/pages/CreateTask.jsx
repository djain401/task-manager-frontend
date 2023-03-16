import { useContext, useState } from "react";
import TasksNavBar from "../components/auth/TasksNavBar";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import taskValidationSchema from "../components/ValidationSchema/taskValidationSchema";

const CreateTask = () => {
  const user = useContext(UserContext);
  const [message, setMessage] = useState("");

  const onSubmit = async (values, actions) => {
    try {
      await axios.post("http://localhost:3001/task", values);
      setMessage("Task has been successfully added!");
    } catch (error) {
      console.error(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      taskName: "",
      dueDate: new Date().toISOString().slice(0, 20),
      status: "New",
      priorityLevel: 3,
      assignedUser: user.name,
      description: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit,
  });

  return (
    <div>
      <TasksNavBar />
      <br />
      <Container>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Task Name
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Short Description"
                name="taskName"
                error={errors?.taskName}
                onChange={handleChange}
                defaultValue={values?.taskName}
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
                error={errors.dueDate}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Status
            </Form.Label>
            <Col sm={3}>
              <Form.Select
                name="status"
                error={errors.status}
                onChange={handleChange}
                defaultValue={values.status}
              >
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
              <Form.Select
                name="priorityLevel"
                error={errors.priorityLevel}
                onChange={handleChange}
                defaultValue={values.priorityLevel}
              >
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
                defaultValue={values.assignedUser}
                error={errors.assignedUser}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={values.description}
                error={errors.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Button variant="info" type="submit">
            Add
          </Button>
        </Form>
        <div>
          <br />
          {message && (
            <Alert
              key="success"
              variant="success"
              dismissible
              onClose={() => setMessage("")}
            >
              {message}
            </Alert>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CreateTask;
