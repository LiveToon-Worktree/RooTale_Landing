import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <header className="contact-header">
          <h1>문의하기</h1>
          <p>궁금한 점이 있으시면 언제든지 문의해 주세요. 빠른 시일 내에 답변드리겠습니다.</p>
        </header>
        
        <div className="contact-content">
          <div className="contact-info-section">
            <h2>연락처 정보</h2>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>이메일</h3>
                <p>support@rootale.com</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">⏰</div>
                <h3>운영시간</h3>
                <p>평일 09:00 - 18:00<br/>(주말 및 공휴일 휴무)</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📱</div>
                <h3>응답시간</h3>
                <p>문의 접수 후<br/>24시간 이내</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>문의하기</h2>
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>문의가 성공적으로 접수되었습니다!</h3>
                <p>빠른 시일 내에 답변드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">이름 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="이름을 입력해 주세요"
                    />
                  </div>
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
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">문의 유형</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="general">일반 문의</option>
                    <option value="technical">기술 지원</option>
                    <option value="business">비즈니스 문의</option>
                    <option value="bug">버그 신고</option>
                    <option value="feature">기능 제안</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">제목 *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="문의 제목을 입력해 주세요"
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
                    rows="6"
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
