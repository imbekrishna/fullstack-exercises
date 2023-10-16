import { useNotificationMessage } from "../helpers/contextHelper";


const Notification = () => {
  const message = useNotificationMessage();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!message) {
    return <></>;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
