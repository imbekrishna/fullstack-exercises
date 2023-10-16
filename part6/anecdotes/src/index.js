import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import anecdoteReducer from './reducers/anecdoteReducer';
import searchReducer from './reducers/searchReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  search: searchReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
