import { AppModal, AppModalPropsType } from "@components/common/AppModal";
import { ModalControllerType } from "@hooks/useModal";
import { MoodIdType } from "../types/mood.type";
import { View, Image, Text } from "react-native";
import MoodImage from "./MoodImage";

type MoodActionCompleteModalPropsType = {
  controller: ModalControllerType;
  moodId: MoodIdType;
  desc: string;
  handleConfirmPress: () => void;
} & AppModalPropsType;

export default function MoodActionCompleteModal({
  controller,
  moodId,
  desc,
  handleConfirmPress,
  ...rest
}: MoodActionCompleteModalPropsType) {
  return (
    <AppModal
      controller={controller}
      onClose={handleConfirmPress}
      mainButton={{
        label: "확인",
        onPress: handleConfirmPress,
      }}
      {...rest}
    >
      <View className="justify-center items-center gap-6 h-[200px] pb-[10%]">
        <Image
          source={require("@assets/images/sparkles.png")}
          style={[
            {
              width: "100%",
              height: "80%",
              position: "absolute",
              top: 0,
              bottom: "10%",
              left: 0,
              right: 0,
            },
          ]}
          resizeMode="contain"
        />
        <MoodImage name={moodId} width={110} height={110} />
        <Text className="text-md text-neutral-600 ">{desc}</Text>
      </View>
    </AppModal>
  );
}
