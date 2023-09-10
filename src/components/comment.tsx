import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import { RenderHTMLSource } from "react-native-render-html";
import { Button, Label, XGroup, XStack, YStack } from "tamagui";
import type { Comment as Reply } from "../types/item";
import { CollapsableContainer } from "./collapsableContainer";
import { ChevronLast } from "@tamagui/lucide-icons";
import { useWindowDimensions } from "react-native";

interface CommentProps {
  item: Reply;
}

export default function Comment({
  item: { author, children, created_at_i, parent_id, story_id, text },
}: CommentProps) {
  const isChild = parent_id !== story_id;
  const [expanded, setExpanded] = useState(true);
  const { width } = useWindowDimensions();

  return (
    author &&
    text && (
      <YStack
        blc="lightgrey"
        blw={isChild && "$0.75"}
        paddingVertical={!isChild && "$3"}
        pl={isChild && "$2.5"}
        mt={isChild && "$2"}
        rowGap="$2.5"
      >
        <XStack
          ai="center"
          columnGap="$1.5"
          theme="alt2"
          onPress={() => setExpanded((expanded) => !expanded)}
        >
          <Label lh={0}>{author}</Label>
          <Label lh={0}>{"\u00b7"}</Label>
          <Label lh={0}>{formatDistanceToNow(created_at_i * 1e3)}</Label>
        </XStack>
        <CollapsableContainer expanded={expanded}>
          <RenderHTMLSource contentWidth={width} source={{ html: text }} />
          {children.map((child) => (
            <Comment item={child} key={child.id} />
          ))}
        </CollapsableContainer>
      </YStack>
    )
  );
}
