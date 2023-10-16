const searchReducer = (state = '', action) => {
  if (action.type === 'SEARCH') {
    return action.payload;
  }

  return state;
};

export const searchChange = (search) => {
  return {
    type: 'SEARCH',
    payload: search,
  };
};

export default searchReducer;
