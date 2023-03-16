import Logout from "./Logout";
import Profile from "./Profile";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const TasksNavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/alltasks">
            <Nav.Link>View Tasks</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/createTask">
            <Nav.Link>Create Task</Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar.Text>
          <Profile />
        </Navbar.Text>
        <Nav.Link>{<Logout />}</Nav.Link>
      </Container>
    </Navbar>
  );
};

export default TasksNavBar;
