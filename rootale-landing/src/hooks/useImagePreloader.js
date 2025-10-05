import { useState, useEffect } from 'react';

// 실제로 필요한 이미지들만 (동적 import로 처리)
const imageSources = [
  // 실제로 로딩이 필요한 이미지들만 여기에 추가
  // 대부분의 이미지는 컴포넌트에서 필요할 때 로딩됨
];


// 로컬스토리지 키
const CACHE_KEY = 'rootale_images_cached';
const CACHE_VERSION = '1.0.0';

// 이미지가 이미 캐시되어 있는지 확인
const areImagesCached = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return false;
    
    const cacheData = JSON.parse(cached);
    return cacheData.version === CACHE_VERSION && cacheData.timestamp;
  } catch {
    return false;
  }
};

// 이미지 캐시 상태 저장
const markImagesAsCached = () => {
  try {
    const cacheData = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      images: imageSources
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('이미지 캐시 저장 실패:', error);
  }
};

// 이미지 프리로딩 커스텀 훅
export const useImagePreloader = () => {
  // 초기 캐시 상태를 한 번만 확인 (함수 형태로)
  const [imagesLoaded, setImagesLoaded] = useState(() => areImagesCached());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(() => !areImagesCached());
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let startTime = Date.now();
    
    const showSplashScreen = async () => {
      // 초기에 이미 캐시되어 있으면 바로 완료 (로딩 없음)
      const wasCached = areImagesCached();
      
      console.log('=== 스플래시 시작 ===');
      console.log('캐시 상태:', wasCached);
      console.log('시작 시간:', startTime);
      
      if (wasCached) {
        console.log('✅ 이미지가 캐시되어 있음 - 로딩 스킵');
        if (isMounted) {
          setImagesLoaded(true);
        }
        return;
      }

      console.log('🆕 첫 방문 - 최소 로딩 시간 대기');

      // 최소 로딩 시간 (사용자 경험을 위한)
      const MIN_LOADING_TIME = 800; // 0.8초
      
      const loadingPromise = new Promise(resolve => {
        setTimeout(() => {
          console.log('최소 로딩 시간 완료');
          resolve();
        }, MIN_LOADING_TIME);
      });

      await loadingPromise;
      
      const totalElapsed = Date.now() - startTime;
      console.log(`✨ 로딩 완료 (총 경과: ${totalElapsed}ms)`);
      console.log('🎬 페이드 아웃 시작');
      
      if (isMounted) {
        // 페이드 아웃 시작
        setIsFadingOut(true);
        
        // 페이드 아웃 애니메이션이 끝난 후 로딩 완료
        setTimeout(() => {
          if (isMounted) {
            console.log('🚀 로딩 종료 - 메인 화면으로 전환');
            setImagesLoaded(true);
          }
        }, 300); // 페이드 아웃 시간과 동일
      }
    };

    showSplashScreen();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    imagesLoaded,
    loadingProgress: 100, // 항상 100%로 표시
    loadedImages: 0,
    totalImages: 0,
    isFirstVisit,
    isFadingOut
  };
};
