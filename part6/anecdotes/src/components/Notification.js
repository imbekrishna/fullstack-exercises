import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap/Alert';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  return (
    notification && (
      <Alert key="success" variant="success">
        {notification}
      </Alert>
    )
  );
};

export default Notification;
