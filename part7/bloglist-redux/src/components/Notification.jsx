import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, isError } = useSelector((state) => {
    return state.notification;
  });

  if (!message) {
    return;
  }

  return (
    <Alert variant={isError ? 'danger' : 'success'} className="notification">
      {message}
    </Alert>
  );
};

export default Notification;
