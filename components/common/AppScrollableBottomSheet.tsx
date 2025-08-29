import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  AppBottomSheet,
  AppBottomSheetRef,
  SheetScroll,
} from "@components/common/AppBottomSheet";
import { Pressable, Text } from "react-native";
import { cn } from "@utils/cn";

export type AppScrollableBottomSheetRef = {
  present: () => void;
  dismiss: () => void;
};

type Props<T> = {
  title?: string;
  snapPoints?: Array<string | number>;
  contentPaddingBottomExtra?: number;
  onDismiss?: () => void;

  /** 목록 데이터 (아무 타입 OK) */
  listData: T[];

  /** 필수: key / label / 선택상태 계산자 */
  getKey: (item: T, index: number) => string;
  getLabel: (item: T, index: number) => string;
  isSelected?: (item: T, index: number) => boolean;

  /** 아이템 선택 콜백 */
  onPickItem?: (item: T, index: number) => void;

  /** 클래스 커스터마이즈 */
  itemClassName?: string;
  itemSelectedClassName?: string;
  labelClassName?: string;
};

function _AppScrollableBottomSheet<T>(
  {
    title = "",
    snapPoints = ["40%"],
    contentPaddingBottomExtra = 20,
    onDismiss,
    listData,
    getKey,
    getLabel,
    isSelected,
    onPickItem,
    itemClassName = "p-3 rounded-xl mb-2",
    itemSelectedClassName = "bg-neutral-100",
    labelClassName = "text-md text-neutral-600",
  }: Props<T>,
  ref: ForwardedRef<AppScrollableBottomSheetRef>
) {
  const sheetRef = useRef<AppBottomSheetRef>(null);

  useImperativeHandle(ref, () => ({
    present: () => sheetRef.current?.present(),
    dismiss: () => sheetRef.current?.dismiss(),
  }));

  return (
    <AppBottomSheet
      ref={sheetRef}
      title={title}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enableOverDrag={false}
      enablePanDownToClose
      onDismiss={onDismiss}
      contentClassName="px-4"
    >
      <SheetScroll contentPaddingBottomExtra={contentPaddingBottomExtra}>
        {listData.map((item, index) => {
          const label = getLabel(item, index);
          const selected = !!isSelected?.(item, index);
          const onPress = () => {
            onPickItem?.(item, index);
            sheetRef.current?.dismiss();
          };

          return (
            <Pressable
              key={getKey(item, index)}
              onPress={onPress}
              className={cn(
                itemClassName,
                selected ? itemSelectedClassName : "bg-transparent"
              )}
            >
              <Text className={labelClassName}>{label}</Text>
            </Pressable>
          );
        })}
      </SheetScroll>
    </AppBottomSheet>
  );
}

const AppScrollableBottomSheet = forwardRef(_AppScrollableBottomSheet) as <T>(
  p: Props<T> & { ref?: React.Ref<AppScrollableBottomSheetRef> }
) => React.ReactElement;

export default AppScrollableBottomSheet;
