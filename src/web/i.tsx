import type { CustomTextualRenderer } from "react-native-render-html";
import { getNativePropsForTNode } from "react-native-render-html";
import { SizableText } from "tamagui";

export const IRenderer: CustomTextualRenderer = function PRenderer(props) {
  const { children } = getNativePropsForTNode(props);
  return <SizableText fontStyle="italic">{children}</SizableText>;
};
