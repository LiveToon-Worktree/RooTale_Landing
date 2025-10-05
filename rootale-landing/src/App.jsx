import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Branch from './components/Branch';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import Loading from './components/Loading';
import { useImagePreloader } from './hooks/useImagePreloader';

// 스크롤 함수
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// 홈페이지 컴포넌트
const HomePage = () => (
  <>
    <Navigation scrollToSection={scrollToSection} />
    <Hero scrollToSection={scrollToSection} />
    <Branch />
    <Features />
    <CTA />
    <Footer />
  </>
);

function App() {
  const { imagesLoaded, loadingProgress, loadedImages, totalImages, isFirstVisit, isFadingOut } = useImagePreloader();

  // 모바일 터치 이벤트 개선
  useEffect(() => {
    // 터치 이벤트 개선
    const handleTouchStart = (e) => {
      // 기본 터치 동작 허용
      e.stopPropagation();
    };

    const handleTouchMove = (e) => {
      // 스크롤 허용
      e.stopPropagation();
    };

    const handleTouchEnd = (e) => {
      // 터치 종료 시 기본 동작 허용
      e.stopPropagation();
    };

    // 이벤트 리스너 추가
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 클릭 지연 제거
    document.addEventListener('touchstart', () => {}, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // 이미지가 로딩되지 않았으면 로딩 화면 표시
  if (!imagesLoaded) {
    return <Loading fadeOut={isFadingOut} />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
