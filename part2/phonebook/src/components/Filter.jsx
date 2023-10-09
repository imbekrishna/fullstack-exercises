const Filter = ({ searchVal, fieldChange }) => {
  return (
    <div>
      filter shown with: <input value={searchVal} onChange={fieldChange} />
    </div>
  );
};

export default Filter;