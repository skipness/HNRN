import type { CustomBlockRenderer } from "react-native-render-html";
import { getNativePropsForTNode } from "react-native-render-html";
import { SizableText } from "tamagui";

export const PRenderer: CustomBlockRenderer = function PRenderer(props) {
  const { children } = getNativePropsForTNode(props);
  return <SizableText>{children}</SizableText>;
};
