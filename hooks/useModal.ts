import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

export type ModalControllerType = {
  isOpen: boolean;
  mounted: boolean;
  open: () => void; // 모달 열기 함수
  close: () => void;
  toggle: () => void;
  opacity: Animated.Value; // 배경 및 컨테이너에 적용할 불투명도 값
  scale: Animated.Value; // 모달 컨테이너 스케일 값 (팝인/팝아웃 애니메이션)
};

type UseModalOptionsType = {
  initialOpen?: boolean;
  enterDuration?: number;
  exitDuration?: number;
  bounciness?: number;
};

/**
 * 모달 상태와 애니메이션 제어를 캡슐화한 커스텀 훅
 */
export default function useModal({
  initialOpen = false,
  enterDuration = 160, // 열림 애니메이션 지속 시간
  exitDuration = 140, // 닫힘 애니메이션 지속 시간
  bounciness = 6,
}: UseModalOptionsType = {}): ModalControllerType {
  const [isOpen, setIsOpen] = useState(initialOpen);
  // 닫힐 때 애니메이션이 끝난 후에 unmount 되도록 제어하기 위해 따로 둠
  const [mounted, setMounted] = useState(initialOpen);

  const opacity = useRef(new Animated.Value(0)).current; // 초기값: 투명
  const scale = useRef(new Animated.Value(0.95)).current; // 초기값: 살짝 축소된 상태

  useEffect(() => {
    let cancelled = false; // cleanup 중간에 setState 방지 플래그

    if (isOpen) {
      setMounted(true);
      Animated.parallel([
        // 배경 + 모달 투명도 → 1
        Animated.timing(opacity, {
          toValue: 1,
          duration: enterDuration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        // 스케일 → 1.0 (팝인 효과, 약간의 탄성)
        Animated.spring(scale, {
          toValue: 1,
          bounciness,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (mounted) {
      // 닫힐 때: 모달은 그대로 마운트 유지한 채 애니메이션 실행
      Animated.parallel([
        // 투명도 → 0
        Animated.timing(opacity, {
          toValue: 0,
          duration: exitDuration,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        // 스케일 → 0.95 (살짝 축소되며 사라짐)
        Animated.timing(scale, {
          toValue: 0.95,
          duration: exitDuration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 애니메이션이 끝난 뒤 실제로 unmount
        if (!cancelled) setMounted(false);
      });
    }

    return () => {
      // cleanup 시 애니메이션 콜백 방지
      cancelled = true;
    };
  }, [
    isOpen,
    mounted,
    opacity,
    scale,
    enterDuration,
    exitDuration,
    bounciness,
  ]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return { isOpen, mounted, open, close, toggle, opacity, scale };
}
