import { useEffect, useRef, useState } from "react";
import styles from "./VenueVideoModal.module.css";

export default function VenueVideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setRendered(true);
      timer = setTimeout(() => {
        setVisible(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 10);
    } else if (rendered) {
      setVisible(false);
      timer = setTimeout(() => {
        setRendered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [isOpen, rendered]);

  if (!rendered) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${visible ? styles.active : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.closeModal}
          aria-label="Close video"
          onClick={onClose}
        >
          &times;
        </button>
        <video ref={videoRef} controls playsInline>
          <source src="/images/4_venue_video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
