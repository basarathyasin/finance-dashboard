import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthFormCard
      error={error}
      fields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
          autoComplete: "email",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          autoComplete: "current-password",
          required: true,
        },
      ]}
      footerLinkLabel="Register"
      footerLinkTo="/register"
      footerText="Need an account?"
      formData={formData}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Login"
      subtitle="Use your registered email and password to continue."
      title="Login"
    />
  );
}

export default LoginPage;
