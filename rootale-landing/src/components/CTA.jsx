import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-overlay">
        <p className="cta-subtitle">당신의 선택이 스토리를 바꿉니다.</p>
        <h2 className="cta-title">
          다음 세대 스토리텔링을<br />
          시작할 준비가 되셨나요?
        </h2>
        
        <div className="cta-buttons">
          <button className="cta-button">
            <span>RooTale 바로 시작하기</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
