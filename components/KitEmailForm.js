import { useState } from "react";
import styles from "./KitEmailForm.module.css";

/**
 * Wireframe container for the Kit.com (ConvertKit) email signup form.
 * Replace the placeholder <form> below with your Kit.com embed snippet or
 * point `action` to your Kit.com form endpoint (`https://app.kit.com/forms/<FORM_ID>/subscriptions`).
 */
export default function KitEmailForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.wrapper} data-kit-embed-slot="vip-vault">
      {/* Paste your Kit.com <script async data-uid="..." src="https://...kit.com/.../index.js"></script> here */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label className={styles.srOnly} htmlFor="vip-name">
            Name
          </label>
          <input
            id="vip-name"
            type="text"
            name="first_name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />

          <label className={styles.srOnly} htmlFor="vip-email">
            Email
          </label>
          <input
            id="vip-email"
            type="email"
            name="email_address"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Join Vault
        </button>
      </form>

      {submitted ? (
        <p className={styles.notice}>
          Wireframe preview submitted — connect your Kit.com form embed to capture signups.
        </p>
      ) : (
        <p className={styles.hint}>Kit.com embed ready</p>
      )}
    </div>
  );
}
