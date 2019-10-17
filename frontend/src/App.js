import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import GlobalStyle from '~/styles/global';
import { store, persistor } from '~/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <GlobalStyle />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
