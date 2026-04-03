function LoadingState({ message = "Loading..." }) {
  return (
    <div className="state-card state-card-loading">
      <div className="state-spinner" />
      <div>
        <h3>Loading</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default LoadingState;
