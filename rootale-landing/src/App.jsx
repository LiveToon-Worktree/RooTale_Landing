import React from 'react';
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
