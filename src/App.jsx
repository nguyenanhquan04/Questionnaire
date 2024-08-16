import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import store from './store';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
