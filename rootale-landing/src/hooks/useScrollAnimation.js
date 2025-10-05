import { useEffect, useRef, useState } from 'react';

/**
 * 스크롤 애니메이션 훅
 * Intersection Observer를 사용하여 요소가 뷰포트에 들어올 때 애니메이션 트리거
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const defaultOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px',
    ...options,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (defaultOptions.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!defaultOptions.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [defaultOptions.threshold, defaultOptions.triggerOnce, defaultOptions.rootMargin]);

  return [elementRef, isVisible];
};

/**
 * 여러 요소에 대한 스크롤 애니메이션 훅
 * 각 요소가 순차적으로 나타나는 효과
 */
export const useStaggeredAnimation = (count, options = {}) => {
  const [refs, setRefs] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    setRefs(refs => 
      Array(count).fill().map((_, i) => refs[i] || { current: null })
    );
  }, [count]);

  useEffect(() => {
    const observers = refs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, (options.delay || 100) * index);
            
            if (options.triggerOnce !== false) {
              observer.unobserve(entry.target);
            }
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px',
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (refs[index]?.current) {
          observer.unobserve(refs[index].current);
        }
      });
    };
  }, [refs, options.delay, options.threshold, options.rootMargin, options.triggerOnce]);

  return [refs, visibleItems];
};

