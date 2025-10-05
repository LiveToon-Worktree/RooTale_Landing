import React from 'react';
import { IoChevronDown } from 'react-icons/io5';
import './Hero.css';

const Hero = ({ scrollToSection }) => {
  return (
    <section id="hero-section" className="hero-section">
      <div className="hero-content">
        <div className="brand-logo">
          <img src="/src/assets/Logo.png" alt="RooTale" className="hero-logo-img" />
        </div>
        
        <div className="hero-text">
          <h2 className="hero-title">
            읽는 웹툰을 넘어<br />
            <span className="highlight">이야기를 체험해라</span>
          </h2>
          <p className="hero-subtitle">
            읽는 웹툰에 질렸다면? Rootale해!
          </p>
        </div>

        <div className="app-store-buttons">
          <button className="app-store-btn google-play">
            <img src="/src/assets/play.svg" alt="Google Play" className="store-icon-img" />
          </button>
          <button className="app-store-btn app-store">
            <img src="/src/assets/apple.svg" alt="App Store" className="store-icon-img" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={() => scrollToSection('branch-section')}>
        <IoChevronDown className="scroll-arrow" />
      </div>
    </section>
  );
};

export default Hero;
