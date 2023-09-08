import type { CustomTextualRenderer } from "react-native-render-html";
import { getNativePropsForTNode } from "react-native-render-html";
import { Paragraph } from "tamagui";

export const PRenderer: CustomTextualRenderer = function PRenderer(props) {
  const { children } = getNativePropsForTNode(props);
  return <Paragraph userSelect="none">{children}</Paragraph>;
};
