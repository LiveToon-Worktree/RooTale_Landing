import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsChatFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copyNotification, setCopyNotification] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 구현에서는 여기서 API 호출을 하거나 이메일 서비스를 사용
    console.log('문의 내용:', formData);
    setIsSubmitted(true);
    
    // 3초 후 폼 리셋
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        email: '',
        message: ''
      });
    }, 3000);
  };

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('livetoon.gdg@gmail.com');
      setCopyNotification('이메일이 클립보드에 복사되었습니다!');
      setTimeout(() => {
        setCopyNotification('');
      }, 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      setCopyNotification('복사에 실패했습니다.');
      setTimeout(() => {
        setCopyNotification('');
      }, 2000);
    }
  };

  return (
    <div className="contact">
      {copyNotification && (
        <div className="copy-notification">
          <div className="copy-notification-content">
            <span className="copy-icon">✅</span>
            {copyNotification}
          </div>
        </div>
      )}
      <div className="contact-container">
        <header className="contact-header">
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
          <h1>문의하기</h1>
        </header>
        
        <div className="contact-content">
          <div className="contact-cards">
            <a 
              href="http://pf.kakao.com/_CxbdLn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card contact-card-link"
            >
              <div className="contact-icon">
                <BsChatFill />
              </div>
              <div className="contact-card-content">
                <p>카카오톡 오픈채널</p>
                <p>실시간 문의 및 상담</p>
              </div>
            </a>
            <div 
              className="contact-card contact-card-clickable"
              onClick={handleEmailCopy}
              style={{ cursor: 'pointer' }}
            >
              <div className="contact-icon">
                <MdEmail />
              </div>
              <div className="contact-card-content">
                <p>이메일</p>
                <p>livetoon.gdg@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>문의가 성공적으로 접수되었습니다!</h3>
                <p>빠른 시일 내에 답변드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="email">이메일 *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="이메일을 입력해 주세요"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">내용 *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="문의 내용을 자세히 입력해 주세요"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  문의하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
