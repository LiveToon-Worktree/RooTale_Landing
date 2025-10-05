import { useState, useEffect } from 'react';

// 이미지들을 import로 가져와서 해시된 파일명 사용
import Logo from '../assets/Logo.png';
import PlayIcon from '../assets/play.svg';
import AppleIcon from '../assets/apple.svg';
import BranchIcon from '../assets/branch.svg';
import BranchChoiceA from '../assets/branch-choice-a.png';
import BranchChoiceB from '../assets/branch-choice-b.png';
import BranchLocked from '../assets/branch-locked.png';
import FeatureBranchBg from '../assets/feature-branch-bg.png';
import FeatureAiBg from '../assets/feature-ai-bg.png';
import FeatureChatBg from '../assets/feature-chat-bg.png';

// 실제로 필요한 이미지들 (해시된 파일명)
const imageSources = [
  Logo,
  PlayIcon,
  AppleIcon,
  BranchIcon,
  BranchChoiceA,
  BranchChoiceB,
  BranchLocked,
  FeatureBranchBg,
  FeatureAiBg,
  FeatureChatBg,
];

// 이미지 프리로딩 함수
const preloadImages = (srcs) =>
  Promise.all(
    srcs.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // 실패해도 통과
          img.src = src;
        })
    )
  );

// window.onload 기반 이미지 프리로딩 커스텀 훅
export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    
    console.log('=== 스플래시 시작 ===');
    console.log('시작 시간:', startTime);
    
    const completeLoading = () => {
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

    // window.onload와 이미지 프리로딩을 병렬로 실행
    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        // 이미 로드가 완료된 경우 즉시 실행
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });

    const imagePreloadPromise = preloadImages(imageSources).then(() => {
      console.log('이미지 프리로딩 완료');
    });

    // 둘 다 완료될 때까지 대기
    Promise.all([windowLoadPromise, imagePreloadPromise]).then(() => {
      completeLoading();
    });

    // 로딩 진행률 시뮬레이션 (사용자 경험을 위해)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 3;
      if (isMounted) {
        setLoadingProgress(Math.min(progress, 90)); // 90%까지만 (실제 로딩에서 100%로)
      }
      
      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 60);

    return () => {
      isMounted = false;
      window.removeEventListener('load', () => {});
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
