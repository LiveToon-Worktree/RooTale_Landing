import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './PrivacyPolicy.css';

// Vite에서 ?raw 쿼리를 사용하여 마크다운 파일을 텍스트로 import
import privacyPolicyText from '../docs/privacy-policy.md?raw';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-policy">
      <div className="privacy-container">
        <header className="privacy-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="back-text">뒤로가기</span>
          </button>
          <h1>개인정보처리방침</h1>
        </header>
        
        <div className="privacy-content">
          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // 테이블 스타일링
                table: ({children}) => (
                  <div className="table-wrapper">
                    <table className="markdown-table">{children}</table>
                  </div>
                ),
                // 링크 스타일링
                a: ({href, children}) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="markdown-link">
                    {children}
                  </a>
                ),
                // 코드 블록 스타일링
                code: ({children, className}) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="inline-code">{children}</code>
                  ) : (
                    <code className="code-block">{children}</code>
                  );
                }
              }}
            >
              {privacyPolicyText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
