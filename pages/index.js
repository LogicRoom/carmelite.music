import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundCanvas from "../components/BackgroundCanvas";
import KitEmailForm from "../components/KitEmailForm";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import styles from "../styles/Home.module.css";

const PROMO_VIDEO_URL = "https://www.youtube.com/shorts/O3Gzd7VbUik";
const PROMO_VIDEO_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/O3Gzd7VbUik?autoplay=1&rel=0&modestbranding=1";

const PREVIOUS_RELEASES = [
  { id: "track-1", label: "Track", note: "Release embed / link slot" },
  { id: "track-2", label: "Track", note: "Release embed / link slot" },
  { id: "track-3", label: "Track", note: "Release embed / link slot" },
];

export default function Home() {
  useRevealOnScroll();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [promoModalOpen, setPromoModalOpen] = useState(false);

  useEffect(() => {
    if (!downloadModalOpen && !promoModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDownloadModalOpen(false);
        setPromoModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [downloadModalOpen, promoModalOpen]);

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
                SUBSCRIBE TO MONTLY CARMELITE REMIXES<span className={styles.accent}>.</span>
              </h2>
              <p className={styles.vaultText}>
                get a free 80s/90s remix every month and the entire unreleased back catalouge <span className={styles.accent}>➡</span>
              </p>
            </div>

            <KitEmailForm />
          </div>
        </section>

        {/* Section 2: Featured Release */}
        <section
          className={`${styles.sectionCard} reveal`}
          aria-labelledby="featured-release-heading"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            <h2
              id="featured-release-heading"
              className={styles.sectionHeading}
              style={{ margin: 0, fontSize: 18 }}
            >
              DEC 2027<span className={styles.accent}>.</span>
            </h2>
            <span
              className={styles.vaultText}
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              MARSHALL JEFFERSON - MOVE YOUR BODY (CARMELITE EDIT)
            </span>
          </div>

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

            <button
              type="button"
              onClick={() => setPromoModalOpen(true)}
              aria-label="Play Promo Video"
              className={styles.wireframeSlot}
              style={{
                width: "100%",
                height: 210,
                margin: "0 auto",
                padding: "22px 18px",
                background:
                  "linear-gradient(180deg, rgba(200, 40, 95, 0.14) 0%, rgba(18, 9, 14, 0.94) 100%)",
                border: "1px solid rgba(200, 40, 95, 0.45)",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "999px",
                  background: "rgba(200, 40, 95, 0.18)",
                  border: "1px solid rgba(200, 40, 95, 0.55)",
                  display: "grid",
                  placeItems: "center",
                  color: "#f4729d",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </span>

              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                }}
              >
                PROMO VIDEO
              </span>

              <span className={styles.slotMeta}>Watch breakdown</span>
            </button>

            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              aria-label="Download Now"
              className={styles.wireframeSlot}
              style={{
                width: "100%",
                height: 210,
                margin: "0 auto",
                padding: "22px 18px",
                background:
                  "linear-gradient(180deg, rgba(200, 40, 95, 0.14) 0%, rgba(18, 9, 14, 0.94) 100%)",
                border: "1px solid rgba(200, 40, 95, 0.45)",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                  background: "rgba(200, 40, 95, 0.18)",
                  border: "1px solid rgba(200, 40, 95, 0.55)",
                  display: "grid",
                  placeItems: "center",
                  color: "#f4729d",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 20h14" />
                </svg>
              </span>

              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  background: "#c8285f",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                DOWNLOAD NOW
              </span>

              <span className={styles.slotMeta}>Free edit via email</span>
            </button>
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

      {promoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-modal-title"
          onClick={() => setPromoModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.85)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 360,
              background: "#12090e",
              border: "1px solid rgba(200, 40, 95, 0.55)",
              borderRadius: 14,
              padding: 18,
              position: "relative",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.75)",
            }}
          >
            <button
              type="button"
              onClick={() => setPromoModalOpen(false)}
              aria-label="Close promo video modal"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "transparent",
                border: "none",
                color: "#d4b8c2",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h3
              id="promo-modal-title"
              style={{
                margin: "0 0 12px",
                color: "#ffffff",
                fontSize: 18,
                textTransform: "uppercase",
              }}
            >
              Promo Video<span style={{ color: "#c8285f" }}>.</span>
            </h3>

            <div
              style={{
                width: "100%",
                aspectRatio: "9 / 16",
                maxHeight: "72vh",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(200, 40, 95, 0.3)",
                background: "#000000",
              }}
            >
              <iframe
                src={PROMO_VIDEO_EMBED_URL}
                title="Carmelite Promo Video"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            </div>

            <div style={{ marginTop: 12, textAlign: "right" }}>
              <a
                href={PROMO_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#f4729d",
                  fontSize: 12,
                  textDecoration: "none",
                }}
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {downloadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
          onClick={() => setDownloadModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.78)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 460,
              background: "#12090e",
              border: "1px solid rgba(200, 40, 95, 0.55)",
              borderRadius: 14,
              padding: 24,
              position: "relative",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.65)",
            }}
          >
            <button
              type="button"
              onClick={() => setDownloadModalOpen(false)}
              aria-label="Close download modal"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "transparent",
                border: "none",
                color: "#d4b8c2",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h3
              id="download-modal-title"
              style={{
                margin: "0 0 8px",
                color: "#ffffff",
                fontSize: 20,
                textTransform: "uppercase",
              }}
            >
              Download Now<span style={{ color: "#c8285f" }}>.</span>
            </h3>
            <p style={{ margin: "0 0 18px", color: "#d4b8c2", fontSize: 14 }}>
              Enter your email to get the featured release plus the full back catalogue and monthly edits.
            </p>

            <KitEmailForm />
          </div>
        </div>
      )}
    </div>
  );
}