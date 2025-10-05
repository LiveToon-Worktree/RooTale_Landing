import { useState, useEffect } from 'react';

// 프로젝트에서 사용되는 모든 이미지 리소스 목록
const imageSources = [
  // Hero 컴포넌트 이미지들
  '/src/assets/Logo.png',
  '/src/assets/play.svg',
  '/src/assets/apple.svg',
  
  // Branch 컴포넌트 이미지들
  '/src/assets/branch.svg',
  '/src/assets/branch-choice-a.png',
  '/src/assets/branch-choice-b.png',
  '/src/assets/branch-locked.png',
  
  // Features 컴포넌트 이미지들
  '/src/assets/feature-branch-bg.png',
  '/src/assets/feature-ai-bg.png',
  '/src/assets/feature-chat-bg.png',
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

      console.log('🆕 첫 방문 - 이미지 로딩 완료까지 스플래시 화면 표시');

      // 백그라운드에서 이미지 프리로딩
      const preloadResources = async () => {
        const totalResources = imageSources.length;
        let loadedCount = 0;

        // 이미지 로딩
        const loadImage = async (src) => {
          return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => {
              if (isMounted) {
                loadedCount++;
                setLoadedImages(loadedCount);
                setLoadingProgress((loadedCount / totalResources) * 100);
              }
              resolve(img);
            };
            
            img.onerror = () => {
              console.warn(`이미지 로드 실패: ${src}`);
              if (isMounted) {
                loadedCount++;
                setLoadedImages(loadedCount);
                setLoadingProgress((loadedCount / totalResources) * 100);
              }
              resolve(null);
            };
            
            img.src = src;
          });
        };


        try {
          // 이미지 병렬로 로딩
          await Promise.all([
            ...imageSources.map(loadImage)
          ]);
          if (isMounted) {
            markImagesAsCached();
          }
        } catch (error) {
          console.error('리소스 프리로딩 중 오류 발생:', error);
        }
      };

      // 이미지 프리로딩 완료까지 대기
      console.log('📦 이미지 프리로딩 시작');
      console.log('이미지 목록:', imageSources);
      await preloadResources();
      
      const totalElapsed = Date.now() - startTime;
      console.log(`✨ 이미지 프리로딩 완료 (총 경과: ${totalElapsed}ms)`);
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
    loadingProgress,
    loadedImages,
    totalImages: imageSources.length,
    isFirstVisit,
    isFadingOut
  };
};
