import { MessagesSquare, ThumbsUp } from "@tamagui/lucide-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "expo-router";
import { Card, H5, Label, SizableText, XGroup } from "tamagui";
import type { HitItem } from "../types/search";

interface ListingItemProps
  extends Pick<
    HitItem,
    "created_at" | "num_comments" | "objectID" | "points" | "title" | "url"
  > {}

export default function ListItem({
  created_at,
  num_comments,
  objectID,
  points,
  title,
  url,
}: ListingItemProps) {
  return (
    <Link
      href={{
        pathname: "/item/[itemId]",
        params: { itemId: objectID },
      }}
      asChild
    >
      <Card
        size="$3"
        padded
        pressStyle={{ backgroundColor: "$backgroundPress" }}
        rowGap="$2"
      >
        <Card.Header padding="$0">
          {url && <Label theme="alt2">{new URL(url).hostname}</Label>}
          <H5 fontWeight="bold" selectable={false}>
            {title}
          </H5>
        </Card.Header>
        <Card.Footer theme="alt2">
          <XGroup
            space="$1.5"
            ai="center"
            flex={1}
            separator={<SizableText>{"\u00b7"}</SizableText>}
          >
            <XGroup.Item>
              <ThumbsUp size="$icon.sm" />
              <Label ml="$1">{points}</Label>
            </XGroup.Item>
            <XGroup.Item>
              <MessagesSquare size="$icon.sm" />
              <Label ml="$1">{num_comments}</Label>
            </XGroup.Item>
            <Label>
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </Label>
          </XGroup>
        </Card.Footer>
      </Card>
    </Link>
  );
}
