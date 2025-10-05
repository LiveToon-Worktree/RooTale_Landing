import React from 'react';
import './Features.css';
import featureBranchBg from '../assets/feature-branch-bg.png';
import featureAiBg from '../assets/feature-ai-bg.png';
import featureChatBg from '../assets/feature-chat-bg.png';

const Features = () => {
  return (
    <section className="features-section">
      <div className="section-container">
        <h2 className="section-title">
          새로운 스토리텔링을 <span className="highlight">경험하세요</span>
        </h2>
        
        <div className="features-grid">
          <div className="feature-card glass-card feature-branch">
            <img src={featureBranchBg} alt="Branch Feature" className="feature-bg-image" />
            <div className="feature-content">
              <h3 className="feature-title">분기형 인터랙티브 웹툰</h3>
              <p className="feature-description">
                당신의 선택이 스토리를 바꿉니다. 숨겨진 Branch<br />
               를 해금하고 다양한 결말을 경험해보세요.
              </p>
            </div>
          </div>

          <div className="feature-card glass-card feature-ai">
            <img src={featureAiBg} alt="AI Feature" className="feature-bg-image" />
            <div className="feature-content">
              <h3 className="feature-title">실시간 이미지 생성</h3>
              <p className="feature-description">
                실시간으로 생성되는 웹툰 이미지로<br />
                더욱 생생한 스토리 경험을 제공합니다.
              </p>
            </div>
          </div>

          <div className="feature-card glass-card feature-chat">
            <img src={featureChatBg} alt="Chat Feature" className="feature-bg-image" />
            <div className="feature-content">
              <h3 className="feature-title">스토리 기반 캐릭터 챗</h3>
              <p className="feature-description">
                스토리 속 캐릭터와 직접 대화하며 몰입감 있는<br />
                인터랙션을 즐기세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
