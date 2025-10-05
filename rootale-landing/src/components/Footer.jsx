import React from 'react';
import { Link } from 'react-router-dom';
import appleIcon from '../assets/apple.svg';
import playIcon from '../assets/play.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column footer-brand">
          <h3 className="footer-logo">RooTale</h3>
          <p className="footer-description">
            RooTale은 생성형 웹툰과 캐릭터 챗을 결합하여<br />
            기존 웹툰의 한계를 극복하는 인터랙티브 웹툰입니다.
          </p>
        </div>
        
        <div className="footer-column footer-apps">
          <div className="app-buttons">
            <button className="app-store-btn">
              <img src={appleIcon} alt="App Store" className="app-icon" />
            </button>
            <button className="google-play-btn">
              <img src={playIcon} alt="Google Play" className="app-icon" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">개인정보처리방침</Link>
            <Link to="/terms" className="footer-link">이용약관</Link>
            <Link to="/contact" className="footer-link">문의하기</Link>
          </div>
          <p className="copyright">© All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
