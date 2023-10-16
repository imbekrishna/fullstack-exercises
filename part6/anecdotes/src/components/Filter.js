import { useDispatch } from 'react-redux';
import { searchChange } from '../reducers/searchReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(searchChange(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
