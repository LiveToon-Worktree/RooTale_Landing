import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import branchSvg from '../assets/branch.svg';
import branchChoiceA from '../assets/branch-choice-a.png';
import branchChoiceB from '../assets/branch-choice-b.png';
import branchLocked from '../assets/branch-locked.png';
import './Branch.css';

const Branch = () => {
  const branchCardsRef = useRef([]);
  const svgRef = useRef(null);
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const positionSvg = () => {
      const cards = branchCardsRef.current;
      const svg = svgRef.current;
      
      if (cards.length >= 3 && svg) {
        // 카드들의 위치 가져오기
        const card1 = cards[0];
        const card3 = cards[2];
        
        if (card1 && card3) {
          const card1Rect = card1.getBoundingClientRect();
          const card3Rect = card3.getBoundingClientRect();
          const containerRect = card1.closest('.branch-cards').getBoundingClientRect();
          
          // 카드들의 중앙 상단 좌표 계산
          const card1CenterX = card1Rect.left + card1Rect.width / 2 - containerRect.left;
          const card3CenterX = card3Rect.left + card3Rect.width / 2 - containerRect.left;
          const cardTopY = card1Rect.top - containerRect.top;
          
          // SVG 위치 조정
          svg.style.position = 'absolute';
          svg.style.left = '0';
          svg.style.top = `${cardTopY - 70}px`; // 더 위로 올림
          svg.style.width = '100%';
          svg.style.height = '70px';
          
          // SVG 원본 크기 (viewBox="0 0 824 70")
          const svgOriginalWidth = 824;
          const svgOriginalHeight = 70;
          
          // 카드 간 실제 거리
          const cardDistance = card3CenterX - card1CenterX;
          
          // SVG 스케일 계산 - 전체 너비 기준
          // 좌측 시작: 0px, 우측 시작: 824px
          const svgTotalWidth = 824; // SVG 전체 너비
          const scaleX = cardDistance / svgTotalWidth;
          
          // SVG 높이도 비례해서 조정
          const scaleY = scaleX;
          
          // SVG 위치 계산 (카드1 중앙이 SVG의 0px 지점에 오도록)
          const translateX = card1CenterX;
          
          svg.style.transform = `translateX(${translateX}px) scale(${scaleX}, ${scaleY})`;
          svg.style.transformOrigin = 'left center';
          
          console.log('SVG positioning:', {
            card1CenterX,
            card3CenterX,
            cardDistance,
            scaleX,
            translateX,
            svgTotalWidth
          });
        }
      }
    };

    // 초기 위치 설정
    const timeoutId = setTimeout(positionSvg, 100);
    
    // 리사이즈 이벤트 리스너
    const handleResize = () => {
      setTimeout(positionSvg, 10);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      id="branch-section" 
      ref={sectionRef}
      className={`branch-section ${sectionVisible ? 'visible' : ''}`}
    >
      <div className="branch-content">
        <h2 className="section-title">
          <span className="highlight">Branching</span>으로 탐색하는<br />무한한 가능성
        </h2>
        <p className="section-description">
          각 선택마다 새로운 Branch가열립니다.<br />당신만의 unique한 스토리 라인을 만들어보세요.
        </p>
        
        <div className="start-button-container">
          <button className="start-button">이야기 시작</button>
        </div>
        
        
        <div className="branch-cards">
          <div className="branch-card" ref={el => branchCardsRef.current[0] = el}>
            <div className="card-image">
              <img src={branchChoiceA} alt="선택 A" className="branch-image" />
            </div>
            <button className="choice-button">선택 A</button>
          </div>
          
          <div className="branch-card" ref={el => branchCardsRef.current[1] = el}>
            <div className="card-image">
              <img src={branchChoiceB} alt="선택 B" className="branch-image" />
            </div>
            <button className="choice-button">선택 B</button>
          </div>
          
          <div className="branch-card locked-card" ref={el => branchCardsRef.current[2] = el}>
            <div className="card-image">
              <img src={branchLocked} alt="숨겨진 Branch" className="branch-image" />
            </div>
            <button className="choice-button locked-button">숨겨진 Branch</button>
          </div>
          
          {/* SVG 연결선 */}
          <div className="branch-lines">
            <img 
              ref={svgRef}
              src={branchSvg} 
              alt="Branch connections" 
              className="branch-svg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branch;
