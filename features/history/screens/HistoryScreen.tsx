import AppScrollableBottomSheet from "@components/common/AppScrollableBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  YearMonthType,
  getMonthsOfYear,
  getThisYearMonth,
  ymLabel,
} from "@utils/date";
import { useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HistoryScreen() {
  // 기본값: 오늘
  const thisYearMonth = getThisYearMonth();
  const [ym, setYm] = useState<YearMonthType>(thisYearMonth);

  // 바텀시트 ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  //bottom sheet에 필요한 상태
  const months = useMemo(
    () => getMonthsOfYear(ym.year, true).reverse(),
    [ym.year]
  ); // 12~1 순

  // 시트 오픈
  const openMonth = () => {
    // console.log("Month bottom sheet open!", monthRef.current);
    // console.log("Month bottom sheet open!");
    bottomSheetRef.current?.present();
  };

  // 월 선택 → 일자 1로 리셋
  const onPickMonth = (next: YearMonthType) => {
    setYm(next);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <View className="flex-1">
      <Pressable onPress={openMonth} className="self-start">
        <Text className="text-2xl font-extrabold">{ymLabel(ym)} ▾</Text>
      </Pressable>
      {/* ▽ MONTH SHEET */}
      <AppScrollableBottomSheet
        ref={bottomSheetRef}
        title="월 선택"
        listData={months}
        getKey={(m) => `${m.year}-${m.month}`}
        getLabel={(m) => ymLabel(m)}
        isSelected={(m) => m.year === ym.year && m.month === ym.month}
        onPickItem={(m) => setYm((prev) => ({ year: m.year, month: m.month }))}
      />

      {/* ▽ YEAR SHEET */}
      {/* <AppScrollableBottomSheet
        ref={yearSheetRef}
        title="연도 선택"
        snapPoints={["40%", "70%"]}
        listData={years}
        getKey={(y) => `${y}`}
        getLabel={(y) => `${y}년`}
        isSelected={(y) => y === ym.year}
        onPickItem={(y) => setYm((prev) => ({ ...prev, year: y }))}
      /> */}
    </View>
  );
}
