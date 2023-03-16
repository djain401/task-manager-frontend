import TasksNavBar from "../components/auth/TasksNavBar";

const ErrorPage = () => {
  return (
    <section>
      <TasksNavBar />
      <h2>Error</h2>
      <p className='error-info'>404 Not found, please check spelling.</p>
    </section>
  );
};

export default ErrorPage;