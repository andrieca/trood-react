import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {app} from './firebase';
import { getAuth } from 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { applyMiddleware, legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './components/stor/redusers/rootReduser';
import { thunk } from 'redux-thunk';


export const Context = createContext(null);
const auth = getAuth(app);
// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth
  }}>
    <Provider store={store}>
      <App />
    </Provider>
    
  </Context.Provider>
);


