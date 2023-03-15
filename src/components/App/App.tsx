import { useEffect } from 'react';
import AuthService from '../../services/AuthService';
import appStyles from './App.module.css';

function App() {

  useEffect(() => {
    async function initialAuthentication() {
      await AuthService.checkAuth();
    }

    initialAuthentication();
  }, []);

  return (
    <div className={appStyles.container}>
      <h1>Create react App (host: {process.env.REACT_APP_HOST})</h1>
    </div>
  );
}

export default App;
