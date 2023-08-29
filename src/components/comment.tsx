import { RenderHTMLSource } from "react-native-render-html";
import { Accordion, YStack, Label, Stack, XStack } from "tamagui";
import type { Item } from "../types/item";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface CommentProps {
  item: Item;
  type: "parent" | "child";
}

export default function Comment({
  item: { author, children, created_at_i, id, text },
  type,
}: CommentProps) {
  return (
    <Accordion type="multiple" collapsable defaultValue={[id.toString()]}>
      <Accordion.Item
        borderLeftColor={type === "child" && "$orange10Dark"}
        borderLeftWidth={type === "child" && "$1.5"}
        paddingLeft={type === "child" && "$2"}
        value={id.toString()}
      >
        <Accordion.Trigger
          padding="$0"
          flexDirection="row"
          justifyContent="space-between"
          unstyled
        >
          {({ open }) => (
            <>
              <XStack columnGap="$1.5">
                <Label>{author}</Label>
                <Label>{"\u00b7"}</Label>
                <Label>{formatDistanceToNow(created_at_i * 1e3)}</Label>
              </XStack>
              <Label>{open ? "[-]" : "[+]"}</Label>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content unstyled padding="$0">
          <RenderHTMLSource contentWidth={320} source={{ html: text }} />
          {children.length > 0 &&
            children.map((item) => (
              <Comment key={item.id} item={item} type="child" />
            ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
