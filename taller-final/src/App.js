import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import Login from './components/login';
import Register from './components/Register';
import UserCrud from './components/userCrud';

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      {user ? (
        <>
          <h1>Bienvenido, {user.email}</h1>
          <UserCrud />
        </>
      ) : (
        <div>
          {showRegister ? (
            <>
              <Register />
              <p>
                ¿Ya tienes una cuenta?{' '}
                <button onClick={() => setShowRegister(false)}>Iniciar sesión</button>
              </p>
            </>
          ) : (
            <>
              <Login />
              <p>
                ¿No tienes una cuenta?{' '}
                <button onClick={() => setShowRegister(true)}>Registrarse</button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
