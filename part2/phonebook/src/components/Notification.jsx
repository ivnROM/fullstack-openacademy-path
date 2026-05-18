const Notification = ({ message, isSuccessful }) => {
  if (message === null) {
    return null;
  }
  if (isSuccessful) {
    return <div className="successfulNotif">{message}</div>;
  } else {
    return <div className="failureNotif">{message}</div>;
  }
};

export default Notification;
