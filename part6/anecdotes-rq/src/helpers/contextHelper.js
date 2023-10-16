import { useContext } from 'react';
import NotificationContext from './notificationContext';

export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return function (message) {
    messageAndDispatch[1]({ type: 'SET', payload: message });
    setTimeout(() => {
      messageAndDispatch[1]({ type: 'UNSET' });
    }, 5000);
  };
};
