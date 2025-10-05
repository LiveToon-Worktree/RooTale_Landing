import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoChevronDown } from 'react-icons/io5';
import './Navigation.css';

const Navigation = ({ scrollToSection }) => {
  const location = useLocation();
  
  // 현재 페이지가 홈페이지인지 확인
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img src="/src/assets/Logo.png" alt="RooTale" className="nav-logo-img" />
          </Link>
        </div>
        <div className="nav-menu">
          {isHomePage && (
            <a href="#" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('branch-section');
            }}>
              서비스 소개
              <IoChevronDown className="nav-chevron" />
            </a>
          )}
          <Link to="/privacy" className="nav-link">
            개인정보처리방침
            <IoChevronDown className="nav-chevron" />
          </Link>
          <Link to="/terms" className="nav-link">
            이용약관
            <IoChevronDown className="nav-chevron" />
          </Link>
          <Link to="/contact" className="nav-inquiry-btn">문의하기</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
