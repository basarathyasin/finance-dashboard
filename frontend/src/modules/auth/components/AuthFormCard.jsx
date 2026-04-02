import { Link } from "react-router-dom";

function AuthFormCard({
  title,
  subtitle,
  fields,
  formData,
  onChange,
  onSubmit,
  error,
  isSubmitting,
  submitLabel,
  footerText,
  footerLinkLabel,
  footerLinkTo,
}) {
  return (
    <div className="auth-card">
      <div className="auth-card-head">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label className="form-field" key={field.name}>
            <span>{field.label}</span>
            <input
              autoComplete={field.autoComplete}
              name={field.name}
              onChange={onChange}
              placeholder={field.placeholder}
              required={field.required}
              type={field.type}
              value={formData[field.name]}
            />
          </label>
        ))}

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Please wait..." : submitLabel}
        </button>
      </form>

      <p className="auth-footer">
        {footerText} <Link to={footerLinkTo}>{footerLinkLabel}</Link>
      </p>
    </div>
  );
}

export default AuthFormCard;
