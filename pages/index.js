import Head from "next/head";
import Link from "next/link";
import BackgroundCanvas from "../components/BackgroundCanvas";
import KitEmailForm from "../components/KitEmailForm";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import styles from "../styles/Home.module.css";

const PREVIOUS_RELEASES = [
  { id: "track-1", label: "Track", note: "Release embed / link slot" },
  { id: "track-2", label: "Track", note: "Release embed / link slot" },
  { id: "track-3", label: "Track", note: "Release embed / link slot" },
];

export default function Home() {
  useRevealOnScroll();

  return (
    <div className="carmelite-page">
      <Head>
        <title>Carmelite | Re-engineering House Classics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Carmelite — re-engineering house classics. Join the VIP Vault for new tracks, releases, and upcoming events."
        />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
      </Head>

      <BackgroundCanvas />

      <Link
        href="/djtools"
        id="nav-btn"
        className={styles.btnTopRight}
        onClick={(e) => e.currentTarget.blur()}
      >
        DJ Tools
      </Link>

      <main className={styles.wrapper}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.logoLink}>
            <img src="/images/logo.png" alt="Carmelite Logo" className={styles.mainLogo} id="hero-logo" />
          </Link>
        </header>

        <section className={`${styles.heroHeader} reveal`}>
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
        </section>

        {/* Section 1: VIP Vault (Kit.com email collection) */}
        <section className={`${styles.sectionCard} reveal`} aria-labelledby="vip-vault-heading">
          <div className={styles.vaultGrid}>
            <div className={styles.vaultCopy}>
              <h2 id="vip-vault-heading" className={styles.sectionHeading}>
                VIP Vault<span className={styles.accent}>.</span>
              </h2>
              <p className={styles.vaultText}>get new tracks, releases and upcoming events</p>
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
              <div className={styles.playCircle} aria-hidden="true">
                ▶
              </div>
              <span className={styles.slotTitle}>Play Track</span>
              <span className={styles.slotMeta}>Audio / SoundCloud embed slot</span>
            </div>

            <div className={styles.wireframeSlot}>
              <span className={styles.slotTitle}>Promo Video</span>
              <span className={styles.slotMeta}>Video embed / modal slot</span>
            </div>

            <div className={styles.wireframeSlot}>
              <span className={styles.slotTitle}>DL or Purchase Link</span>
              <span className={styles.slotMeta}>Download / store CTA slot</span>
            </div>
          </div>
        </section>

        {/* Section 3: Previous Releases */}
        <section className={`${styles.sectionCard} reveal`} aria-labelledby="previous-releases-heading">
          <h2 id="previous-releases-heading" className={styles.sectionHeading}>
            Previous Releases<span className={styles.accent}>.</span>
          </h2>

          <div className={styles.trackList}>
            {PREVIOUS_RELEASES.map((item) => (
              <div key={item.id} className={styles.trackRow}>
                <div className={styles.trackRowLeft}>
                  <span className={styles.trackBadge} aria-hidden="true">
                    ▶
                  </span>
                  <span className={styles.trackTitle}>{item.label}</span>
                </div>
                <span className={styles.trackPlaceholderNote}>{item.note}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
