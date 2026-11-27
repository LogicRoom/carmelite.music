import { useId, useState } from "react";
import Script from "next/script";
import styles from "./KitEmailForm.module.css";

const KIT_ACTION_URL = "https://app.kit.com/forms/10246468/subscriptions";
const SUCCESS_MESSAGE = "Success! Now check your email to confirm your subscription.";

const KIT_FORM_OPTIONS = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message: SUCCESS_MESSAGE,
      redirect_url: "",
    },
    analytics: {
      google: null,
      fathom: null,
      facebook: null,
      segment: null,
      pinterest: null,
      sparkloop: null,
      googletagmanager: null,
    },
    modal: {
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
    powered_by: {
      show: true,
      url: "https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic",
    },
    recaptcha: { enabled: false },
    return_visitor: { action: "show", custom_content: "" },
    slide_in: {
      display_in: "bottom_right",
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
    sticky_bar: {
      display_in: "top",
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
  },
  version: "5",
});

export default function KitEmailForm() {
  const uid = useId();
  const nameId = `vip-name-${uid}`;
  const emailId = `vip-email-${uid}`;

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailAddress.trim() || submitting) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new URLSearchParams();
      formData.append("fields[first_name]", firstName.trim());
      formData.append("email_address", emailAddress.trim());

      await fetch(KIT_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formData.toString(),
      });

      setSubmitted(true);
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.wrapper} data-kit-embed-slot="vip-vault">
        <p className={styles.successMessage || styles.vaultText} role="status" style={{ margin: 0 }}>
          {SUCCESS_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} data-kit-embed-slot="vip-vault">
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      <form
        action={KIT_ACTION_URL}
        onSubmit={handleSubmit}
        className={`seva-form formkit-form ${styles.formRoot}`}
        method="post"
        data-sv-form="10246468"
        data-uid="9790ad63e5"
        data-format="inline"
        data-version="5"
        data-options={KIT_FORM_OPTIONS}
      >
        <div data-style="clean" className={styles.cleanWrap}>
          {errorMessage ? (
            <ul
              className={`formkit-alert formkit-alert-error ${styles.alert}`}
              data-element="errors"
              data-group="alert"
            >
              <li>{errorMessage}</li>
            </ul>
          ) : (
            <ul
              className={`formkit-alert formkit-alert-error ${styles.alert}`}
              data-element="errors"
              data-group="alert"
            />
          )}

          <div
            data-element="fields"
            data-stacked="false"
            className={`seva-fields formkit-fields ${styles.form}`}
          >
            <div className={styles.fields}>
              <div className={`formkit-field ${styles.field}`}>
                <label className={styles.srOnly} htmlFor={nameId}>
                  Name
                </label>
                <input
                  id={nameId}
                  className={`formkit-input ${styles.input}`}
                  name="fields[first_name]"
                  type="text"
                  placeholder="Name"
                  aria-label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className={`formkit-field ${styles.field}`}>
                <label className={styles.srOnly} htmlFor={emailId}>
                  Email
                </label>
                <input
                  id={emailId}
                  className={`formkit-input ${styles.input}`}
                  name="email_address"
                  type="email"
                  placeholder="Email"
                  aria-label="Email Address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              data-element="submit"
              disabled={submitting}
              className={`formkit-submit ${styles.submitBtn}`}
            >
              <div className={`formkit-spinner ${styles.spinner}`} aria-hidden="true">
                <div />
                <div />
                <div />
              </div>
              <span>{submitting ? "Subscribing..." : "Subscribe"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}