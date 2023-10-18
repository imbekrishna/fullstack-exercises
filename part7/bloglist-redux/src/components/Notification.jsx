import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, isError } = useSelector((state) => {
    return state.notification;
  });
  const alertStyle = {
    color: isError ? 'red' : 'green',
    fontSize: 24,
    backgroundColor: 'silver',
    padding: '5px 10px',
    border: `3px solid ${isError ? 'red' : 'green'}`,
    borderRadius: 5,
    margin: 5,
  };

  if (!message) {
    return;
  }

  return (
    <Alert className="notification" style={alertStyle}>
      {message}
    </Alert>
  );
};

export default Notification;
