import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BackgroundCanvas from "../components/BackgroundCanvas";
import VenueVideoModal from "../components/VenueVideoModal";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import styles from "../styles/Home.module.css";

const SOUNDCLOUD_TRACKS = [
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2042054157&color=%23e3316f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2282872940%3Fsecret_token%3Ds-XuM3MSFHQJN&color=%23e3316f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2273167493%3Fsecret_token%3Ds-KVSp1yoOXTC&color=%23e3316f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2279371409%3Fsecret_token%3Ds-TTbaIPlHQzg&color=%23e3316f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2279372129%3Fsecret_token%3Ds-BfVvoWASmCV&color=%23e3316f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2279370314%3Fsecret_token%3Ds-AzsOrP1e3NC&color=%23e3316f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
];

export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useRevealOnScroll();

  useEffect(() => {
    const checkNavScroll = () => {
      setShowNav(window.scrollY > 20);
    };

    const handlePageShow = (event) => {
      if (event.persisted) {
        checkNavScroll();
      }
    };

    window.addEventListener("scroll", checkNavScroll);
    window.addEventListener("pageshow", handlePageShow);
    checkNavScroll();

    return () => {
      window.removeEventListener("scroll", checkNavScroll);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <div className="carmelite-page">
      <Head>
        <title>Carmelite Sessions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://socarmelite.com/" />
        <meta property="og:title" content="CARMELITE. SESSIONS 001" />
        <meta
          property="og:description"
          content="Private Studio Showcase, London. An invitation-only live recording series bridging the gap between the studio and the dancefloor."
        />
        <meta property="og:image" content="https://socarmelite.com/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CARMELITE. SESSIONS 001" />
        <meta name="twitter:description" content="Private Studio Showcase, London. Join the guest list." />
        <meta name="twitter:image" content="https://socarmelite.com/images/logo.png" />
      </Head>

      <BackgroundCanvas />

      <Link
        href="/djtools"
        id="nav-btn"
        className={`${styles.btnTopRight} ${showNav ? styles.showNav : ""}`}
        onClick={(e) => e.currentTarget.blur()}
      >
        DJ Tools
      </Link>

      <VenueVideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

      <div className={`${styles.wrapper} ${styles.hero}`}>
        <div className={`${styles.logoContainer} reveal`}>
          <img src="/images/logo.png" alt="Carmelite Logo" className={styles.mainLogo} id="hero-logo" />
        </div>

        <h1 className={`${styles.heading} reveal`}>
          CARMELITE<span className={styles.accent}>.</span> SESSIONS<span className={styles.accent} />
        </h1>
        <h2 className={`${styles.heading} ${styles.heroSubheading} reveal`}>
          Private Studio Events, LONDON<span className={styles.accent}>.</span>
        </h2>
        <span className={`${styles.subtitle} reveal`}>
          Monthly, Live-recorded Electronic Artist Showcases with a Vetted Crowd
        </span>

        <div className={`${styles.heroButtons} reveal`}>
          <a
            href="https://carmelite.fillout.com/t/5Qp3pWzQdXus"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Request Invitation
          </a>
          <button type="button" className={styles.btnPlay} onClick={() => setIsVideoModalOpen(true)}>
            <span>▶</span> See the Venue
          </button>
        </div>
      </div>

      <div className={styles.wrapper}>
        <p className={`${styles.paragraph} reveal`}>
          Carmelite Sessions is a curated live-recording series designed to bridge the gap between the studio and the
          dancefloor. After 12 months of production and 30+ unreleased tracks, Session 001 moves the project into a live
          environment. We are bringing together a hand-picked group of individuals to capture the energy of these sets
          for our upcoming social media series. This is an invitation to be part of the process.
        </p>

        <h2 className={`${styles.heading} reveal`}>
          The Venue<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          Located in the heart of Camden we have chosen a venue which has everything to create a comfortable, creative
          fun space to dance, connect with everyone at the event and be part of some high quality recorded content which
          you can take with you! There will be a champagne reception and drinks provided when you arrive!
        </p>

        <div className={`${styles.venuePlayWrap} reveal`}>
          <button type="button" className={styles.btnPlay} onClick={() => setIsVideoModalOpen(true)}>
            <span>▶</span> See the Venue
          </button>
        </div>

        <div className={`${styles.flexRow} reveal`}>
          <div className={styles.flexCol}>
            <img src="/images/image12.jpg" className={styles.rowImg} alt="Venue" />
          </div>
          <div className={styles.flexCol}>
            <img src="/images/image11.jpg" className={styles.rowImg} alt="Venue" />
          </div>
          <div className={styles.flexCol}>
            <img src="/images/image13.png" className={styles.rowImg} alt="Venue" />
          </div>
        </div>

        <h2 className={`${styles.heading} reveal`}>
          The Artists<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          We have curated a lineup of premier London talent. Supporting Carmelite (Pete) in the debut event is Enrico
          and Exotico (AJ).
        </p>

        <div className={`${styles.flexRow} ${styles.lineupRow} reveal`}>
          <div className={styles.flexCol}>
            <span className={styles.label}>Enrico Chirchiello</span>
            <img src="/images/image9.png" className={styles.rowImg} alt="Enrico" />
            <p className={styles.desc}>
              A veteran of the underground, Enrico’s career spans residencies at Ministry of Sound and Pacha. Sound
              rooted in old-school house with Latin rhythms.
            </p>
            <a href="https://www.instagram.com/enricochirchiello" target="_blank" rel="noopener noreferrer">
              <img src="/images/image5.png" className={styles.icon} alt="Instagram" />
            </a>
          </div>
          <div className={styles.flexCol}>
            <span className={styles.label}>Carmelite (Pete)</span>
            <img src="/images/image2.png" className={styles.rowImg} alt="Pete" />
            <p className={styles.desc}>
              The creative force behind the sessions, Carmelite is a deep tech house producer. Session 001 serves as the
              live debut for over 30 unreleased tracks.
            </p>
            <a href="https://www.instagram.com/socarmelite" target="_blank" rel="noopener noreferrer">
              <img src="/images/image5.png" className={styles.icon} alt="Instagram" />
            </a>
          </div>
          <div className={styles.flexCol}>
            <span className={styles.label}>Exotico</span>
            <img src="/images/image3.png" className={styles.rowImg} alt="Exotico" />
            <p className={styles.desc}>
              Born and bred in London with deep Colombian roots, Exotico blends his heritage with the grit of the UK
              rave scene. Unique Latin-tech and dark house.
            </p>
            <a href="https://www.instagram.com/exoticodj" target="_blank" rel="noopener noreferrer">
              <img src="/images/image5.png" className={styles.icon} alt="Instagram" />
            </a>
          </div>
        </div>

        <a
          href="https://carmelite.fillout.com/t/5Qp3pWzQdXus"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btnPrimary} reveal`}
        >
          Request Invitation
        </a>

        <h2 className={`${styles.heading} reveal`}>
          The Music<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          Check a selection of the type of music we will play. Please do not share these, they are unreleased!
        </p>

        <div className={`${styles.flexRow} reveal`}>
          {SOUNDCLOUD_TRACKS.slice(0, 3).map((src, index) => (
            <div key={src} className={styles.flexCol}>
              <div className={styles.scContainer}>
                <iframe
                  title={`Unreleased track ${index + 1}`}
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay"
                  src={src}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.flexRow} reveal`}>
          {SOUNDCLOUD_TRACKS.slice(3, 6).map((src, index) => (
            <div key={src} className={styles.flexCol}>
              <div className={styles.scContainer}>
                <iframe
                  title={`Unreleased track ${index + 4}`}
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay"
                  src={src}
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className={`${styles.heading} reveal`}>
          The Hosts<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          Pete welcomes his two friends Charlene and Irma to help out with hosting. They will be inviting you warmly
          into the event and acting as the social glue of the evening to make sure every guest is connected and
          comfortable.
        </p>

        <div className={`${styles.flexRow} ${styles.hostRow} reveal`}>
          <div className={styles.flexCol}>
            <span className={styles.label}>Irma</span>
            <img src="/images/image4.jpg" className={styles.portraitImg} alt="Irma" />
          </div>
          <div className={styles.flexCol}>
            <span className={styles.label}>Charlene</span>
            <img src="/images/image1.png" className={styles.portraitImg} alt="Charlene" />
          </div>
        </div>

        <h2 className={`${styles.heading} reveal`}>
          The Partners<span className={styles.accent}>.</span>
        </h2>
        <div className={`${styles.flexRow} reveal`}>
          <div className={styles.flexCol}>
            <span className={styles.label}>DUJAMAISVU</span>
            <img src="/images/image14.png" className={styles.portraitImg} alt="Partner" />
            <p className={styles.desc}>
              London based designer of urban streetwear who will be showcasing a few designs from his coco selection.
            </p>
          </div>
          <div className={styles.flexCol}>
            <span className={styles.label}>Larry J Videography</span>
            <img src="/images/image8.png" className={styles.portraitImg} alt="Partner" />
            <p className={styles.desc}>
              Larry will be capturing the official high-energy films for the series, ensuring the Carmelite Sessions
              aesthetic.
            </p>
          </div>
        </div>

        <h2 className={`${styles.heading} reveal`}>
          Dress Code &amp; Drinks<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          A selection of drinks, including non-alcoholic options will be provided to complement our &apos;Studio Luxe&apos;
          dress code; please arrive looking sharp enough for the camera but comfy enough to dance in.
        </p>

        <h2 className={`${styles.heading} reveal`}>
          Your Unique Content Opportunity<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          This isn&apos;t just a shoot; it’s a night to connect with a creative community. While our team films the
          official series, the space is fully &quot;content-ready&quot; for your own stories.
        </p>
        <p className={`${styles.paragraph} reveal`}>
          Because we are curating a specific energy for the series, <strong>We have a limited guest list</strong> for
          SESSIONS 001 which you can pre-register for here; if successful you get an incredible backdrop and a premium
          experience; we get your energy on film.
        </p>

        <div className={`${styles.collectiveBox} reveal`}>
          <h2 className={styles.heading}>
            The Collective<span className={styles.accent}>.</span>
          </h2>
          <p className={`${styles.paragraph} ${styles.collectiveQuote}`}>
            &quot;Real connection requires a physical space and a shared frequency.&quot;
          </p>
          <p className={styles.paragraph}>
            Carmelite Sessions was born from a realization: <strong>modern clubbing is broken.</strong> You can go to a
            top-tier venue in London, but it is almost always too noisy and chaotic to actually talk to new people and
            connect with them authentically. So we are building an{" "}
            <strong>
              invite-only collective with actual standards and an approach that fosters easier communication and
              connection during our events.
            </strong>
          </p>
          <p className={styles.paragraph}>
            We are creating a space that naturally fosters fun, effortless conversation. We use premium house music and
            the energy of the dancefloor as the ultimate icebreaker, allowing you to step away from the screens and meet
            genuinely cool, driven people.
          </p>
          <p className={styles.paragraph}>
            Our acid test for every event? It must be completely immersive, engaging, and enjoyable even if you
            don&apos;t drink. This isn&apos;t just a one-off showcase; it is a highly curated environment designed for
            you to find real value and actually look forward to getting out of the house again.
          </p>
        </div>

        <h2 className={`${styles.heading} reveal`}>
          Request an Invitation<span className={styles.accent}>.</span>
        </h2>
        <p className={`${styles.paragraph} reveal`}>
          Due to the intimate nature of the studio, spaces for Session 001 are strictly limited. If you want to bring a
          +1 and think they would be a good fit, send them this page and have them apply.
        </p>

        <a
          href="https://carmelite.fillout.com/t/5Qp3pWzQdXus"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btnPrimary} reveal`}
        >
          Request Invitation
        </a>

        <p className={`${styles.dataDisclaimer} reveal`}>
          *Your Data: Any data shared during registration will not be shared with 3rd parties.
        </p>
      </div>
    </div>
  );
}
