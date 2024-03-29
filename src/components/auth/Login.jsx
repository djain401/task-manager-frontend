import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  // not authenticated - show login btn
  return (
      <button
        onClick={() =>
          loginWithRedirect()
        }>
        Log In
      </button>
  );
};

export default Login;
