import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* pages to import */
import LandingPage from "../pages/Landing";
import MainTaskList from "../pages/MainTaskList";
import CreateTask from "../pages/CreateTask";
import ErrorPage from "../pages/ErrorPage";
// auth0
import { useAuth0 } from "@auth0/auth0-react";
// use context
import { TasksChangeContext } from "../contexts/TasksChangeContext";

const TasksRouter = () => {
  const { isAuthenticated } = useAuth0();
  const [tasksChange, setTasksChange] = useState(false);

  return (
    <TasksChangeContext.Provider value={[tasksChange, setTasksChange]}>
      <Router>
        <Routes>
          {/* This page is always active */}
          <Route path="/" element={<LandingPage />} />

          {isAuthenticated && (
            <Route path="/alltasks" element={<MainTaskList />} />
          )}
          {isAuthenticated && (
            <Route path="/createTask" element={<CreateTask />} />
          )}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </TasksChangeContext.Provider>
  );
};

export default TasksRouter;
