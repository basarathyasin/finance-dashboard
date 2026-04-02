import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard";
import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register(formData);
      navigate("/", { replace: true });
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
          name: "name",
          label: "Full name",
          type: "text",
          placeholder: "Your name",
          autoComplete: "name",
          required: true,
        },
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
          placeholder: "Create a password",
          autoComplete: "new-password",
          required: true,
        },
      ]}
      footerLinkLabel="Login"
      footerLinkTo="/login"
      footerText="Already have an account?"
      formData={formData}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Create account"
      subtitle="Register and continue straight into the dashboard."
      title="Register"
    />
  );
}

export default RegisterPage;
