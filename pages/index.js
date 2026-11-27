import Head from "next/head";
import Link from "next/link";
import BackgroundCanvas from "../components/BackgroundCanvas";
import KitEmailForm from "../components/KitEmailForm";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import styles from "../styles/Home.module.css";

export default function Home() {
  useRevealOnScroll();

  return (
    <div className="carmelite-page">
      <Head>
        <title>Carmelite | Re-engineering House Classics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Carmelite — re-engineering house classics. Get free 80s and 90s house remixes every month plus the 2025 back catalogue."
        />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
      </Head>

      <BackgroundCanvas />

      <main className={styles.wrapper}>
        <header className={styles.brandHeader}>
          <Link href="/" className={styles.logoLink}>
            <img
              src="/images/logo.png"
              alt="Carmelite Logo"
              className={styles.mainLogo}
              id="hero-logo"
            />
          </Link>
          <div className={styles.brandText}>
            <h1 className={styles.brandTitle}>
              Carmelite<span className={styles.accent}>.</span>
            </h1>
            <p className={styles.tagline}>
              <span>re-engineering house classics</span>
              <svg
                className={styles.taglineIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="8" cy="12" r="2" />
                <circle cx="16" cy="12" r="2" />
                <line x1="10" y1="12" x2="14" y2="12" />
              </svg>
            </p>
          </div>
        </header>

        {/* Section 1: Monthly Remixes + Back Catalogue Signup */}
        <section className={`${styles.sectionCard} reveal`} aria-labelledby="vip-vault-heading">
          <div className={styles.vaultGrid}>
            <div className={styles.vaultCopy}>
              <h2 id="vip-vault-heading" className={styles.sectionHeading}>
                FREE 80S/90S REMIXES<span className={styles.accent}>.</span>
              </h2>
              <p className={styles.vaultText}>
                get my 2025 back catalogue instantly, plus new edits monthly.
              </p>
            </div>

            <KitEmailForm />
          </div>
        </section>

        {/* Section 2: Featured Release */}
        <section className={`${styles.sectionCard} reveal`} aria-labelledby="featured-release-heading">
          <h2 id="featured-release-heading" className={styles.sectionHeading}>
            Featured Release<span className={styles.accent}>.</span>
          </h2>

          <div className={styles.featuredGrid}>
            <div className={styles.wireframeSlot}>
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay; encrypted-media"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2430635670&color=%23c8285f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
                title="Marshall Jefferson - Move Your Body (Carmelite Edit)"
              />
            </div>

            <div className={styles.wireframeSlot}>
              <div className={styles.slotText}>
                <span className={styles.slotTitle}>Promo Video</span>
                <span className={styles.slotMeta}>Video embed / modal slot</span>
              </div>
            </div>

            <div className={styles.wireframeSlot}>
              <div className={styles.slotText}>
                <span className={styles.slotTitle}>DL or Purchase Link</span>
                <span className={styles.slotMeta}>Download / store CTA slot</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}