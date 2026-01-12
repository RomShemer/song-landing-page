import { useState } from 'react';
import artistData from './artistData';

import {
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaSpotify,
  FaApple,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaVideo,
  FaFileAlt,
  FaMusic,
  FaAward,
  FaDownload
} from 'react-icons/fa';

import {
  trackSongDownload,
  trackMediaDownload,
  trackAudioPlay,
  trackSocialClick,
  trackAccordionOpen,
  trackContactClick
} from './utils/analytics';


import './App.css';

export default function App() {
  const [open, setOpen] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const { media, links, content, contact } = artistData;

  const toggle = (id) => {
    if (open !== id) {
      trackAccordionOpen(id);
    }
    setOpen(open === id ? null : id);
  };


  return (
    <div
      className="page"
      dir="rtl"
      style={{ backgroundImage: `url(${media.backgroundImage})` }}
    >
      <div className="content">

        <h1 className="title">רוצי</h1>
        <div className="subtitle">דור שמר</div>

        <div className="socials">
          {links.instagram && <a href={links.instagram} target="_blank" rel="noreferrer"  onClick={() => trackSocialClick('instagram')}><FaInstagram /></a>}
          {links.tiktok && <a href={links.tiktok} target="_blank" rel="noreferrer" onClick={() => trackSocialClick('tiktok')}><FaTiktok /></a>}
          {links.youtube && <a href={links.youtube} target="_blank" rel="noreferrer" onClick={() => trackSocialClick('youtube')}><FaYoutube /></a>}
          {links.appleMusic && <a href={links.appleMusic} target="_blank" rel="noreferrer" onClick={() => trackSocialClick('appleMusic')}><FaApple /></a>}
          {links.spotify && <a href={links.spotify} target="_blank" rel="noreferrer" onClick={() => trackSocialClick('spotify')}><FaSpotify /></a>}
        </div>

        {media.audio_file && (
          <div className="audio-wrapper">
            <div className="audio">
              <audio
                controls
                src={media.audio_file}
                onPlay={() => trackAudioPlay('rutzi')}
              />
            </div>
          </div>
        )}

        <div className="accordion">

          <AccordionItem
            title="קליפ רשמי"
            icon={FaVideo}
            isOpen={open === 'clip'}
            onClick={() => toggle('clip')}
          >
            {media.video_url ? (
              <div className="video-wrapper">
                <iframe
                  src={media.video_url}
                  title="קליפ רשמי"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="coming-soon">הקליפ יעלה בקרוב 🎬</div>
            )}
          </AccordionItem>

          <AccordionItem
            title="קומוניקט"
            icon={FaFileAlt}
            isOpen={open === 'pr'}
            onClick={() => toggle('pr')}
          >
            <div
              className="pr-box"
              dangerouslySetInnerHTML={{ __html: content.prText }}
            />
          </AccordionItem>

          <AccordionItem
            title="מילים"
            icon={FaMusic}
            isOpen={open === 'lyrics'}
            onClick={() => toggle('lyrics')}
          >
            <div className="lyrics-box">{content.lyrics}</div>
          </AccordionItem>

          <AccordionItem
            title="קרדיטים"
            icon={FaAward}
            isOpen={open === 'credits'}
            onClick={() => toggle('credits')}
          >
            <div className="credits-grid">
              <Credit role="מילים" name="דור שמר, גילי אסרף" />
              <Credit role="לחן" name="דור שמר, גילי אסרף" />
              <Credit role="הפקה" name="גילי אסרף" />
              <Credit role="מיקס" name="גילי אסרף" />
              <Credit role="מאסטרינג" name="אוהד ניסים" />
              <Credit role="וידאו" name="גל צורף" />
            </div>
          </AccordionItem>

          <AccordionItem
            title="תיקיית הורדות"
            icon={FaDownload}
            isOpen={open === 'downloads'}
            onClick={() => toggle('downloads')}
          >
            <div className="downloads-grid">

              <DownloadCard
                icon={FaMusic}
                title="הורדת MP3"
                subtitle="לשמיעה והפצה"
                href={artistData.downloads.mp3}
                onClick={() => trackSongDownload('mp3')}
                restricted 
              />

              <DownloadCard
                icon={FaMusic}
                title="הורדת WAV לשידור"
                subtitle="איכות מלאה"
                href={artistData.downloads.wav}
                onClick={() => trackSongDownload('wav')}
                restricted 
              />

              <DownloadCard
                icon={FaFileAlt}
                title="קומוניקט"
                subtitle="לחץ להורדה"
                href={artistData.downloads.press_pdf}
                onClick={() => trackMediaDownload('pressPDF')}
              />

              <DownloadCard
                icon={FaDownload}
                title="גלריית תמונות יח״צ"
                subtitle="סט תמונות"
                onClick={(e) => {
                  e.preventDefault();
                  trackMediaDownload('gallery_open');
                  setShowGallery(true);
                }}
              />

              <DownloadCard
                icon={FaDownload}
                title="תמונות יח״צ"
                subtitle="ZIP"
                href={artistData.downloads.images_gallery}
                onClick={() => trackMediaDownload('images')}
              />

            </div>
          </AccordionItem>

          <AccordionItem
            title="יצירת קשר"
            icon={FaPhone}
            isOpen={open === 'contact'}
            onClick={() => toggle('contact')}
          >
            <div className="contact-box">
              <div className="contact-row">

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="contact-item"
                    onClick={() => trackContactClick('phone')}
                  >
                    <FaPhone size={18} />
                    {contact.phone}
                  </a>
                )}

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="contact-item"
                    onClick={() => trackContactClick('email')}
                  >
                    <FaEnvelope size={18} />
                    {contact.email}
                  </a>
                )}

              </div>
            </div>
          </AccordionItem>


          <footer className="footer">© 2026 דור שמר</footer>
        </div>
      </div>

      {/* ===== Gallery Modal – שכבה נפרדת מעל הכול ===== */}
      {showGallery && (
        <div className="gallery-modal" onClick={() => setShowGallery(false)}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-close"
              onClick={() => setShowGallery(false)}
            >
              ✕
            </button>

            <div className="gallery-grid">
              {artistData.downloads.pressImages.map((img, i) => (
                <a
                  key={i}
                  href={img.src}
                  download={img.name}
                >
                  <img src={img.src} alt={img.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Components ===== */

function AccordionItem({ title, icon: Icon, isOpen, onClick, children }) {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onClick}>
        <div className="accordion-icon"><Icon /></div>

        <div className="accordion-title">
          <span>{title}</span>
        </div>

        <div className="accordion-actions">
          <FaChevronDown
            className={`chevron ${isOpen ? 'open' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="accordion-content">
          <div className="accordion-content-inner">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}


function DownloadCard({ title, subtitle, icon: Icon, href, onClick, restricted }) {
  const isDemo = true;

  const handleClick = (e) => {

    if (!href) {
      e.preventDefault();
    }
    
    if (isDemo && restricted) {
      e.preventDefault();
      alert(
        "This demo version does not allow file downloads.\nFor rights protection."
      );
      return;
    }

    onClick?.(e);
  };

  return (
    <a
      href={href || '#'}
      onClick={handleClick}
      download={!isDemo && !!href}
      className="download-card"
    >
      <div className="download-icon"><Icon /></div>
      <div className="download-text">
        <div className="download-title">{title}</div>
        <div className="download-subtitle">{subtitle}</div>
      </div>
    </a>
  );
}


function Credit({ role, name }) {
  return (
    <div className="credit-card">
      <div className="credit-role">{role}</div>
      <div className="credit-name">{name}</div>
    </div>
  );
}
