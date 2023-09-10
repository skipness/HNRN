import {
  ChevronLeft,
  MessageSquareDashed,
  MessagesSquare,
  ThumbsUp,
} from "@tamagui/lucide-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { ListRenderItemInfo } from "react-native";
import { FlatList, useWindowDimensions } from "react-native";
import { RenderHTMLSource } from "react-native-render-html";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Button,
  H3,
  H5,
  Label,
  Paragraph,
  Separator,
  SizableText,
  Stack,
  XGroup,
  XStack,
  YStack,
  getTokenValue,
  useTheme,
} from "tamagui";
import Comment from "../../components/comment";
import type { Comment as Reply } from "../../types/item";
import LinkPreview from "../../components/linkPreview";
import { useGetItemQuery } from "../../services/hackerNews";

export default function Item() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { width } = useWindowDimensions();
  const { data, isSuccess } = useGetItemQuery(itemId);
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const header = (
    <YStack rowGap="$2">
      <H5 fontWeight="bold">{data?.title}</H5>
      <XGroup
        ai="center"
        f={1}
        separator={<SizableText>{"\u00b7"}</SizableText>}
        space="$1.5"
        theme="alt2"
      >
        <Label>{data?.author}</Label>
        <XGroup.Item>
          <ThumbsUp size="$icon.sm" />
          <Label ml="$1">{data?.points}</Label>
        </XGroup.Item>
        <XGroup.Item>
          <MessagesSquare size="$icon.sm" />
          <Label ml="$1">{data?.children.length}</Label>
        </XGroup.Item>
        {data?.created_at_i && (
          <Label>
            {formatDistanceToNow(data.created_at_i * 1e3, {
              addSuffix: true,
            })}
          </Label>
        )}
      </XGroup>
      {data?.text && (
        <RenderHTMLSource contentWidth={width} source={{ html: data?.text }} />
      )}
      {data?.url && <LinkPreview url={data?.url} />}
      {data?.children && data?.children.length > 0 && (
        <Separator theme="alt2" />
      )}
    </YStack>
  );

  const listEmpty = (
    <Stack alignItems="center" h="100%" jc="center" theme="alt2">
      <MessageSquareDashed size="$4" />
      <Paragraph>No Comments</Paragraph>
    </Stack>
  );

  const renderItem = ({ item }: ListRenderItemInfo<Reply>) => (
    <Comment key={item.id} item={item} />
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.background.val, flex: 1 }}>
      {isSuccess && (
        <FlatList<Reply>
          contentContainerStyle={{
            paddingBottom: getTokenValue("$4", "size"),
            paddingHorizontal: getTokenValue("$2.5", "space"),
          }}
          data={data?.children}
          initialNumToRender={3}
          ItemSeparatorComponent={() => <Separator theme="alt2" />}
          ListEmptyComponent={listEmpty}
          ListHeaderComponent={header}
          scrollIndicatorInsets={{
            bottom: getTokenValue("$4", "size"),
          }}
          renderItem={renderItem}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 0,
            minIndexForVisible: 1,
          }}
        />
      )}
      <XStack
        ai="center"
        b={bottom}
        bc="$background"
        borderColor="$gray6"
        btw="$0.5"
        h="$4"
        pos="absolute"
        w="100%"
      >
        <Button
          icon={<ChevronLeft size="$icon.lg" />}
          onPress={() => router.back()}
          unstyled
        />
      </XStack>
    </SafeAreaView>
  );
}
