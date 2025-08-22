import React, { useEffect, useRef } from "react";
import { Modal, Text, View, Pressable, Animated, Easing } from "react-native";
import { AppButton } from "./AppButton";
import { cn } from "@utils/cn";
import { ModalControllerType } from "@hooks/useModal";

export type AppModalPropsType = {
  controller: ModalControllerType;
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  isDismissOnBackdrop?: boolean;
  mainButton?: {
    label: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
  };
  subButton?: {
    label: string;
    isDisabled?: boolean;
    onPress: () => void;
  };
};

export function AppModal({
  controller,
  title,
  onClose,
  children,
  isDismissOnBackdrop = false,
  mainButton,
  subButton,
}: AppModalPropsType) {
  const { mounted, opacity, scale, close } = controller;

  const handleBackdrop = isDismissOnBackdrop ? (onClose ?? close) : undefined;
  const handleRequestClose = onClose ?? close;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={handleRequestClose}
    >
      <Animated.View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", opacity }}
      >
        <Pressable className="absolute inset-0" onPress={handleBackdrop} />
        <Animated.View
          className="w-[86%] min-h-[154px] rounded-2xl bg-background p-6 gap-4"
          style={{ transform: [{ scale }] }}
        >
          {/* HEADER */}
          {title && (
            <Text className="text-md text-center color-neutral-600">
              {title}
            </Text>
          )}

          {/* CONTENT */}
          {/* {children && <View className="flex-1">{children}</View>} */}
          {children}

          {/* FOOTER */}
          {(!!subButton || !!mainButton) && (
            <View
              className={cn(
                "flex-1 items-end flex-row gap-3 w-full"
                // "absolute bottom-6 left-6 right-6"
              )}
            >
              {subButton && (
                <AppButton
                  size="sm"
                  variant="outline"
                  title={subButton.label}
                  onPress={subButton.onPress}
                  disabled={subButton.isDisabled}
                />
              )}
              {mainButton && (
                <AppButton
                  size="sm"
                  variant="primary"
                  title={mainButton.label}
                  onPress={mainButton.onPress}
                  disabled={mainButton.isDisabled}
                  isLoading={mainButton.isLoading}
                />
              )}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
