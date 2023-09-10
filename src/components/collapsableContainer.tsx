import { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Stack } from "tamagui";

export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = ({
    nativeEvent: {
      layout: { height: layoutHeight },
    },
  }: LayoutChangeEvent) => {
    if (layoutHeight > 0 && height !== layoutHeight) {
      setHeight(layoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded
      ? withTiming(height, { duration: 200, easing: Easing.ease })
      : withTiming(0, { duration: 200, easing: Easing.ease });
    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

  return (
    <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
      <Stack position="absolute" w="100%" onLayout={onLayout}>
        {children}
      </Stack>
    </Animated.View>
  );
};
