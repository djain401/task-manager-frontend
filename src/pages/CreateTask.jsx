import { useContext, useEffect, useState } from "react";
import TasksNavBar from "../components/auth/TasksNavBar";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import taskValidationSchema from "../components/ValidationSchema/taskValidationSchema";
import { DateTime } from "luxon";

const CreateTask = () => {
  const user = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [userSelect, setUserSelect] = useState([]);

  const onSubmit = async (values, actions) => {
    try {
      await axios.post("http://localhost:3001/task", values);
      actions.setSubmitting(false);
      actions.resetForm();
      setMessage("Task has been successfully added!");
    } catch (error) {
      console.error(error);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      taskName: "",
      dueDate: new Date().toISOString(),
      status: "New",
      priorityLevel: 3,
      assignedUser: user.name,
      description: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit,
  });

  useEffect(() => {
    try {
      const getUsers = async () => {
        const result = await axios.get("http://localhost:3001/users");
        if (result.data.length > 0) {
          console.log(result.data);
          setUserSelect(result.data);
        }
      };
      getUsers();
    } catch (error) {
      console.error(error);
    }
  }, []);

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
                value={values?.taskName}
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
                value={DateTime.fromISO(values.dueDate).toFormat(
                  "yyyy-MM-dd'T'HH:mm"
                )}
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
                value={values.status}
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
                value={values.priorityLevel}
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
              <Form.Select
                name="assignedUser"
                value={values.assignedUser}
                error={errors.assignedUser}
                onChange={handleChange}
              >
                {userSelect.map((user) => {
                  return <option>{user.userName}</option>;
                })}
              </Form.Select>
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
                value={values.description}
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
