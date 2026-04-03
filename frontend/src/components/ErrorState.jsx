function ErrorState({ title = "Something went wrong", message }) {
  return (
    <div className="state-card state-card-error">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;
