import React from 'react';
import './Branch.css';

const Branch = () => {
  return (
    <section id="branch-section" className="branch-section">
      <div className="branch-content">
        <h2 className="section-title">
          <span className="highlight">Branching</span>으로 탐색하는<br />
          무한한 가능성
        </h2>
        <p className="section-description">
          각 선택마다 새로운 Branch가 열립니다.<br />
          당신만의 unique한 스토리 라인을 만들어보세요.
        </p>
        
        <div className="branch-demo">
          <div className="branch-node main-node">
            시작
          </div>
          <div className="branch-connections">
            <div className="branch-line line-1"></div>
            <div className="branch-line line-2"></div>
            <div className="branch-line line-3"></div>
          </div>
          <div className="branch-nodes">
            <div className="branch-node">선택 A</div>
            <div className="branch-node">선택 B</div>
            <div className="branch-node locked-node">
              숨겨진 Branch
              <span className="lock-icon">🔒</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branch;
