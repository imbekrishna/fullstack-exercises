const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={isError ? "notification error" : "notification success"}>
      {message}
    </div>
  );
};

export default Notification;
