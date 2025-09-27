import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="glass-container hero-content">
          <div className="brand-logo">
            <h1 className="brand-title">
              <span className="brand-root">Roo</span>
              <span className="brand-tale">Tale</span>
            </h1>
            <p className="brand-subtitle">Root + Tale</p>
          </div>
          
          <div className="hero-text">
            <h2 className="hero-title">
              읽는 것을 넘어,<br />
              <span className="highlight">이야기를 경험해라</span>
            </h2>
            <p className="hero-subtitle">
              읽는 웹툰에 질렸다면? <strong>Rootale해!</strong>
            </p>
            <p className="hero-description">
              분기형 인터랙티브 웹툰으로 당신만의 스토리를 만들어보세요
            </p>
          </div>

          <div className="cta-buttons">
            <button className="btn-primary glass-btn">
              <span className="btn-text">지금 시작하기</span>
              <div className="btn-glow"></div>
            </button>
            <button className="btn-secondary glass-btn">
              <span className="btn-text">더 알아보기</span>
            </button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="hero-bg">
          <div className="branch-lines"></div>
          <div className="floating-elements">
            <div className="float-element float-1"></div>
            <div className="float-element float-2"></div>
            <div className="float-element float-3"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">
            차세대 스토리텔링을 <span className="highlight">경험하세요</span>
          </h2>
          
          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <div className="icon-branching"></div>
              </div>
              <h3 className="feature-title">분기형 인터랙티브 웹툰</h3>
              <p className="feature-description">
                당신의 선택이 스토리를 바꿉니다. 숨겨진 Branch를 해금하고 
                다양한 결말을 경험해보세요.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <div className="icon-ai"></div>
              </div>
              <h3 className="feature-title">실시간 이미지 생성</h3>
              <p className="feature-description">
                AI가 실시간으로 생성하는 웹툰 이미지로 
                더욱 생생한 스토리 경험을 제공합니다.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon">
                <div className="icon-chat"></div>
              </div>
              <h3 className="feature-title">스토리 기반 캐릭터 챗</h3>
              <p className="feature-description">
                스토리 속 캐릭터와 직접 대화하며 
                몰입감 있는 인터랙션을 즐기세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Experience Section */}
      <section className="branch-section">
        <div className="glass-container branch-content">
          <h2 className="section-title">
            <span className="highlight">Branching</span>으로 탐색하는<br />
            무한한 가능성
          </h2>
          <p className="section-description">
            각 선택마다 새로운 Branch가 열립니다. 
            당신만의 unique한 스토리 라인을 만들어보세요.
          </p>
          
          <div className="branch-demo">
            <div className="branch-node main-node">
              <span>시작</span>
            </div>
            <div className="branch-connections">
              <div className="branch-line line-1"></div>
              <div className="branch-line line-2"></div>
              <div className="branch-line line-3"></div>
            </div>
            <div className="branch-nodes">
              <div className="branch-node">선택 A</div>
              <div className="branch-node">선택 B</div>
              <div className="branch-node locked-node">숨겨진 Branch</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="glass-container cta-content">
          <h2 className="cta-title">
            준비되셨나요?<br />
            <span className="highlight">다음 세대 스토리텔링</span>을 시작하세요
          </h2>
          <p className="cta-description">
            OOO 캐릭터와 대화하고, 운명을 바꿔보세요
          </p>
          
          <div className="cta-buttons">
            <button className="btn-primary glass-btn large-btn">
              <span className="btn-text">RooTale 시작하기</span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="brand-root">Roo</span>
              <span className="brand-tale">Tale</span>
            </h3>
            <p className="footer-tagline">분기형 인터랙티브 스토리텔링</p>
          </div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">서비스 소개</a>
            <a href="#" className="footer-link">개인정보처리방침</a>
            <a href="#" className="footer-link">이용약관</a>
            <a href="#" className="footer-link">문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
