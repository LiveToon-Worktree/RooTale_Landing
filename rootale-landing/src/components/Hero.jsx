import React, { useEffect, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import logoImg from '../assets/Logo.png';
import playIcon from '../assets/play.svg';
import appleIcon from '../assets/apple.svg';
import './Hero.css';

const Hero = ({ scrollToSection }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero-section" className="hero-section">
      <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="brand-logo animate-item" style={{ animationDelay: '0.2s' }}>
          <img src={logoImg} alt="RooTale" className="hero-logo-img" />
        </div>
        
        <div className="hero-text animate-item" style={{ animationDelay: '0.4s' }}>
          <h2 className="hero-title">
            읽는 웹툰을 넘어<br />
            <span className="highlight">이야기를 체험해라</span>
          </h2>
          <p className="hero-subtitle">
            읽는 웹툰에 질렸다면? Rootale해!
          </p>
        </div>

        <div className="app-store-buttons animate-item" style={{ animationDelay: '0.6s' }}>
          <button className="app-store-btn google-play">
            <img src={playIcon} alt="Google Play" className="store-icon-img" />
          </button>
          <button className="app-store-btn app-store">
            <img src={appleIcon} alt="App Store" className="store-icon-img" />
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
