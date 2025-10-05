import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './TermsOfService.css';

const TermsOfService = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    // 마크다운 파일을 가져오기
    fetch('/docs/terms-of-service.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => {
        console.error('이용약관 파일을 불러오는 중 오류가 발생했습니다:', error);
        // 오류 발생 시 기본 내용 표시
        setMarkdownContent('# 이용약관\n\n파일을 불러오는 중 오류가 발생했습니다.');
      });
  }, []);

  return (
    <div className="terms-of-service">
      <div className="terms-container">
        <header className="terms-header">
          <h1>이용약관</h1>
        </header>
        
        <div className="terms-content">
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
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
