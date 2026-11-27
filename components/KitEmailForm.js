import Script from "next/script";
import styles from "./KitEmailForm.module.css";

const KIT_FORM_OPTIONS = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message: "Success! Now check your email to confirm your subscription.",
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
  return (
    <div className={styles.wrapper} data-kit-embed-slot="vip-vault">
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      <form
        action="https://app.kit.com/forms/10246468/subscriptions"
        className={`seva-form formkit-form ${styles.formRoot}`}
        method="post"
        data-sv-form="10246468"
        data-uid="9790ad63e5"
        data-format="inline"
        data-version="5"
        data-options={KIT_FORM_OPTIONS}
      >
        <div data-style="clean" className={styles.cleanWrap}>
          <ul
            className={`formkit-alert formkit-alert-error ${styles.alert}`}
            data-element="errors"
            data-group="alert"
          />

          <div
            data-element="fields"
            data-stacked="false"
            className={`seva-fields formkit-fields ${styles.form}`}
          >
            <div className={styles.fields}>
              <div className={`formkit-field ${styles.field}`}>
                <label className={styles.srOnly} htmlFor="vip-name">
                  Name
                </label>
                <input
                  id="vip-name"
                  className={`formkit-input ${styles.input}`}
                  name="fields[first_name]"
                  type="text"
                  placeholder="Name"
                  aria-label="First Name"
                />
              </div>

              <div className={`formkit-field ${styles.field}`}>
                <label className={styles.srOnly} htmlFor="vip-email">
                  Email
                </label>
                <input
                  id="vip-email"
                  className={`formkit-input ${styles.input}`}
                  name="email_address"
                  type="email"
                  placeholder="Email"
                  aria-label="Email Address"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              data-element="submit"
              className={`formkit-submit ${styles.submitBtn}`}
            >
              <div className={`formkit-spinner ${styles.spinner}`} aria-hidden="true">
                <div />
                <div />
                <div />
              </div>
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
