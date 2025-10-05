import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoChevronDown } from 'react-icons/io5';
import './Navigation.css';

const Navigation = ({ scrollToSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 현재 페이지가 홈페이지인지 확인
  const isHomePage = location.pathname === '/';

  // 페이지 이동 후 스크롤 처리
  useEffect(() => {
    console.log('useEffect 실행 - 경로 변경됨:', location.pathname);
    if (location.pathname === '/') {
      console.log('홈페이지 감지 - 스크롤 실행');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log('useEffect에서 스크롤 명령 실행됨');
    }
  }, [location.pathname]);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <button 
            className="nav-logo-btn"
            onClick={() => {
              console.log('로고 클릭됨!');
              console.log('현재 경로:', location.pathname);
              console.log('현재 스크롤 위치:', window.pageYOffset);
              console.log('documentElement scrollTop:', document.documentElement.scrollTop);
              console.log('body scrollTop:', document.body.scrollTop);
              
              if (location.pathname === '/') {
                console.log('홈페이지에서 클릭 - 서비스 소개 방식으로 스크롤');
                // 서비스 소개와 같은 방식으로 스크롤
                const element = document.getElementById('hero-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  console.log('hero-section으로 스크롤 실행됨');
                } else {
                  // hero-section이 없으면 최상단으로
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  console.log('최상단으로 스크롤 실행됨');
                }
              } else {
                console.log('다른 페이지에서 클릭 - 홈페이지로 이동');
                // 다른 페이지에서 클릭 시 이동 후 스크롤
                navigate('/');
                console.log('홈페이지로 이동 명령 실행됨');
              }
            }}
          >
            <img src="/src/assets/Logo.png" alt="RooTale" className="nav-logo-img" />
          </button>
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
