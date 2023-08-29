import type { CustomMixedRenderer } from "react-native-render-html";
import { getNativePropsForTNode } from "react-native-render-html";
import { Paragraph } from "tamagui";

export const PRenderer: CustomMixedRenderer = function PRenderer(props) {
  const nativeProps = getNativePropsForTNode(props);
  return <Paragraph {...nativeProps} />;
};
