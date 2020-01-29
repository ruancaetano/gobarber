import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <Router history={history}>
          <Routes />
        </Router>
      </PersistGate>
      <GlobalStyles />
    </Provider>
  );
}

export default App;
