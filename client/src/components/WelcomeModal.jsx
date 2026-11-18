import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Heart, Sparkles, X } from 'lucide-react';
import Logo from './Logo';
import { developers } from '../data/developers';

const STORAGE_KEY = 'guraneza_welcome_seen';

const hasSeenWelcome = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Browsers with storage disabled still get a working close button.
    }
  }, []);

  useEffect(() => {
    if (!hasSeenWelcome()) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop welcome-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-description">
        <button ref={closeButtonRef} className="welcome-modal__close" onClick={close} aria-label="Close welcome message">
          <X size={20} />
        </button>

        <div className="welcome-modal__hero">
          <span className="welcome-modal__eyebrow"><Sparkles size={14} /> Welcome to GuraNeza</span>
          <Logo to={null} wide className="welcome-modal__logo" />
          <h2 id="welcome-title">Good things, closer to you.</h2>
          <p id="welcome-description">
            Your trusted neighbourhood shop in Kigali, Rwanda. Explore quality electronics,
            fashion, home goods and everyday essentials — with fast local delivery and easy
            payment on checkout.
          </p>
        </div>

        <div className="welcome-modal__devs">
          <span className="welcome-modal__devs-title"><Heart size={14} /> Built with care by</span>
          <div className="welcome-modal__dev-grid">
            {developers.map((developer) => (
              <a key={developer.name} className="welcome-modal__dev" href={developer.github} target="_blank" rel="noreferrer">
                <span className="welcome-modal__dev-avatar">{developer.name.charAt(0)}</span>
                <span className="welcome-modal__dev-info">
                  <strong>{developer.name}</strong>
                  <small>{developer.role}</small>
                </span>
                <Github size={18} aria-label="GitHub" />
              </a>
            ))}
          </div>
        </div>

        <div className="welcome-modal__footer">
          <span>Proudly made in Kigali, Rwanda 🇷🇼</span>
          <button type="button" className="btn btn--primary" onClick={close}>
            Start shopping <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
