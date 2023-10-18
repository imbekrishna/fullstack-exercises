import { useNotificationVal } from '../helpers/NotificationContext';

const Notification = () => {
  const notification = useNotificationVal();

  const alertStyle = {
    color: notification.isError ? 'red' : 'green',
    fontSize: 24,
    backgroundColor: 'silver',
    padding: '5px 10px',
    border: `3px solid ${notification.isError ? 'red' : 'green'}`,
    borderRadius: 5,
    margin: 5,
  };

  if (!notification.message) {
    return;
  }

  return (
    <div className="notification" style={alertStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
