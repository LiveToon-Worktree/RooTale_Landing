import { useState, useEffect } from 'react';


// 실제로 필요한 이미지들만 (동적 import로 처리)
const imageSources = [
  // 실제로 로딩이 필요한 이미지들만 여기에 추가
  // 대부분의 이미지는 컴포넌트에서 필요할 때 로딩됨
];


// window.onload 방식에서는 캐시 로직이 불필요

// window.onload 기반 이미지 프리로딩 커스텀 훅
export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let startTime = Date.now();
    
    console.log('=== 스플래시 시작 ===');
    console.log('시작 시간:', startTime);
    
    const handleWindowLoad = () => {
      if (!isMounted) return;
      
      const totalElapsed = Date.now() - startTime;
      console.log(`✨ 모든 리소스 로드 완료 (총 경과: ${totalElapsed}ms)`);
      console.log('🎬 페이드 아웃 시작');
      
      // 페이드 아웃 시작
      setIsFadingOut(true);
      
      // 페이드 아웃 애니메이션이 끝난 후 로딩 완료
      setTimeout(() => {
        if (isMounted) {
          console.log('🚀 로딩 종료 - 메인 화면으로 전환');
          setImagesLoaded(true);
        }
      }, 300); // 페이드 아웃 시간과 동일
    };

    // window.onload 이벤트 리스너 등록
    if (document.readyState === 'complete') {
      // 이미 로드가 완료된 경우 즉시 실행
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // 로딩 진행률 시뮬레이션 (사용자 경험을 위해)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (isMounted) {
        setLoadingProgress(Math.min(progress, 95)); // 95%까지만 (window.onload에서 100%로)
      }
      
      if (progress >= 95) {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      isMounted = false;
      window.removeEventListener('load', handleWindowLoad);
      clearInterval(interval);
    };
  }, []);

  return {
    imagesLoaded,
    loadingProgress,
    loadedImages: 0,
    totalImages: 0,
    isFirstVisit: true, // window.onload 방식에서는 항상 첫 방문으로 간주
    isFadingOut
  };
};
