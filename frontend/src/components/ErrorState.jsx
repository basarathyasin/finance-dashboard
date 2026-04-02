function ErrorState({ title = "Something went wrong", message }) {
  return (
    <div className="empty-state-card">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;
