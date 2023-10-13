const Notification = ({ message, isError }) => {
  const alertStyle = {
    color: isError ? "red" : "green",
    fontSize: 24,
    backgroundColor: "silver",
    padding: "5px 10px",
    border: `3px solid ${isError ? "red" : "green"}`,
    borderRadius: 5,
    margin: 5,
  };
  return <div style={alertStyle}>{message}</div>;
};

export default Notification;
