function AuthLayout({ children }) {
  return (
    <main className="auth-shell">
      <section className="auth-intro">
        <p className="section-kicker">Finance workspace</p>
        <h1>Simple finance dashboard.</h1>
        <p>Sign in to manage records, users, and dashboard analytics.</p>
      </section>
      <section className="auth-panel">{children}</section>
    </main>
  );
}

export default AuthLayout;
