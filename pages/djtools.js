import Head from "next/head";
import Link from "next/link";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import styles from "../styles/DjTools.module.css";

export default function DjTools() {
  useRevealOnScroll();

  return (
    <div className={`carmelite-page ${styles.page}`}>
      <Head>
        <title>About Pete | Carmelite Sessions 001</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
      </Head>

      <Link href="/" className={styles.btnTopLeft}>
        Back to Event
      </Link>

      <div className={`${styles.wrapper} ${styles.hero}`}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/images/logo.png" alt="Carmelite Logo" className={styles.mainLogo} id="hero-logo" />
          </Link>
        </div>

        <h1 className={styles.heading}>
          About Carmelite (Pete)<span className={styles.accent}>.</span>
        </h1>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.cardBox}>
          <h3 className={`${styles.sectionHeading} ${styles.sectionHeadingFirst}`}>
            The Digital Burnout<span className={styles.accent}>.</span>
          </h3>
          <p className={styles.paragraph}>
            For two decades, my entire world existed behind a screen. I built an industry leading methodology for
            software engineers, scaled an online coaching business to £40k a month, led multi-million dollar sales &amp;
            marketing campaigns in wealth management, and even built a global portfolio of early stage mining companies
            in places most people have never heard of. I hit what most consider &quot;success.&quot; The reality? It was
            an endless cycle of remote work, burnout, and absolute digital isolation.
          </p>

          <h3 className={styles.sectionHeading}>
            Becoming Carmelite<span className={styles.accent}>.</span>
          </h3>
          <p className={styles.paragraph}>
            In 2023, I walked away. Having operated in the music scene under the alias &apos;Deepscale&apos; for years;
            I had done well; racking up millions of plays on Youtube, but I realized how disconnected I had actually
            become whilst on an endless cycle of producing music completely alone in my house. I rebranded to{" "}
            <strong>Carmelite</strong> a slightly dark inside joke referencing an order of cloistered monks in Northern
            England known for their complete isolation.
          </p>

          <h3 className={styles.sectionHeading}>
            The Antidote<span className={styles.accent}>.</span>
          </h3>
          <p className={styles.paragraph}>
            It was time to break the cloister. I forced myself into the London house music scene completely solo. What
            started as an escape turned into a massive shift: my unreleased tracks started getting support from DJ&apos;s
            in London, suddently I went from never doing anything with my music to having a life goal achieved and
            getting it played in clubs like Ministry of Sound and XOYO, and more importantly, I found a genuine, physical
            community.
          </p>

          <h3 className={styles.sectionHeading}>
            The Studio &amp; The Synergy<span className={styles.accent}>.</span>
          </h3>
          <p className={styles.paragraph}>
            Today, I&apos;ve traded tech and finance for working on music projects from my studio in Reading. I
            collaborate with rising talent like Exotico; merging his raw dancefloor intuition with my 20 years of
            production experience. The only real hazard to our workflow is my cat, Minky, who insists on dribbling over
            the audio cables.
          </p>

          <p className={`${styles.paragraph} ${styles.closingQuote}`}>
            <strong>
              Carmelite Sessions isn&apos;t just a showcase; it’s an invitation to get off the screen, get into a great
              venue, and connect with people on the exact same frequency.
            </strong>
          </p>
        </div>

        <div className={`${styles.imageGalleryRow} reveal`}>
          <div className={styles.galleryItem}>
            <img src="/images/1_pete_in_studio.jpg" alt="Pete Solo in Studio" className={styles.galleryImg} />
            <span className={styles.galleryCaption}>The Creator</span>
          </div>

          <div className={styles.galleryItem}>
            <img src="/images/2_pete_aj.jpg" alt="Pete and Exotico in the Studio" className={styles.galleryImg} />
            <span className={styles.galleryCaption}>The Collaboration</span>
          </div>

          <div className={styles.galleryItem}>
            <img src="/images/3_minky.jpg" alt="Minky, the dribbling supervisor" className={styles.galleryImg} />
            <span className={styles.galleryCaption}>The Supervisor</span>
          </div>
        </div>

        <div className={`${styles.reputationCard} reveal`}>
          <div className={styles.flexRow}>
            <div className={styles.flexCol}>
              <p className={styles.reputationLabel}>
                REPUTATION<span className={styles.accent}>.</span>
              </p>
              <p className={styles.reputationBio}>
                Successful Founder. Tech innovator. Investor.
                <br /> Fledgling Community and Events Builder.
                <br /> Reach out to me pete@logicroom.co
              </p>

              <div className={styles.socialButtonGroup}>
                <a
                  href="https://www.linkedin.com/in/pete-heard-lr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnSocial} ${styles.btnLinkedin}`}
                >
                  LinkedIn
                </a>
                <a
                  href="https://soundcloud.com/socarmelite/tracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnSocial} ${styles.btnSoundcloud}`}
                >
                  SoundCloud
                </a>
                <a
                  href="https://www.instagram.com/socarmelite/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnSocial} ${styles.btnInstagram}`}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.ctaWrap} reveal`}>
          <a
            href="https://carmelite.fillout.com/t/5Qp3pWzQdXus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Apply for Sessions 001
          </a>
        </div>
      </div>
    </div>
  );
}
