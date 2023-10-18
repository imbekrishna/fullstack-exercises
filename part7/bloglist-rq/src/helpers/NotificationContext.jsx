import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'UNSET':
      return action.payload;
    default:
      return state;
  }
};

const initialState = {
  message: null,
  isError: false,
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationVal = () => {
  const context = useContext(NotificationContext);
  return context[0];
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  return function (message) {
    context[1]({ type: 'SET', payload: { ...message } });
    setTimeout(() => {
      context[1]({ type: 'UNSET', payload: { ...initialState } });
    }, 5000);
  };
};

export default NotificationContext;
