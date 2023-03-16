import './App.css';
import Landing from './pages/Landing';
import TasksRouter from './router/TasksRouter';
// auth0
import { useAuth0 } from '@auth0/auth0-react';
// use context
import { UserContext } from './contexts/UserContext';

function App() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <UserContext.Provider value={user}>
      <main>
        {isAuthenticated && <TasksRouter />}
        {!isAuthenticated && <Landing />}
      </main>
    </UserContext.Provider>
  );
}

export default App;
