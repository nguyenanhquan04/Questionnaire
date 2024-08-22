import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import './App.scss';

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
      <div className="App">
        <Header token={token} />
        <div className="content">
          <AppRoutes onLogin={handleLogin} />
        </div>
        <Footer />
      </div>
  );
}

export default App;
