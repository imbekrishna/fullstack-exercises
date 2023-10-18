import { createContext, useContext, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'UNSET':
      return null;
    default:
      return state;
  }
};

const initialState = null;

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context[0];
};

export const useUserDispatch = () => {
  const context = useContext(UserContext);
  return context[1];
};

export default UserContext;
