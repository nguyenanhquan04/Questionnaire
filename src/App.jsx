import { useState } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import store from './store';
import './App.scss';

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Header token={token} />
        <AppRoutes onLogin={handleLogin} />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
