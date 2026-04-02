function AuthLayout({ children }) {
  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <p className="section-kicker">Finance Dashboard System</p>
        <h1>Simple authentication flow for the finance workspace.</h1>
        <p>
          This frontend stores the JWT securely in local storage, restores session
          state on refresh, and protects private pages automatically.
        </p>
      </section>
      <section className="auth-panel">{children}</section>
    </main>
  );
}

export default AuthLayout;
