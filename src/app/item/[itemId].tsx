import { useLocalSearchParams } from "expo-router";
import { H5, Paragraph, Separator, Stack } from "tamagui";
import { useGetItemQuery } from "../../services/hackerNews";
import { RenderHTMLSource } from "react-native-render-html";
import { FlatList, useWindowDimensions } from "react-native";
import type { ListRenderItemInfo } from "react-native";
import type { Item } from "../../types/item";
import Comment from "../../components/comment";

export default function Item() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isSuccess } = useGetItemQuery(itemId);
  const { width } = useWindowDimensions();

  const header = (
    <>
      <H5>{data?.title}</H5>
      {data?.text && (
        <RenderHTMLSource contentWidth={width} source={{ html: data?.text }} />
      )}
      <Separator borderColor="black" />
    </>
  );

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => {
    return <Comment key={item.id} item={item} type="parent" />;
  };

  return (
    <Stack flex={1}>
      {isSuccess && (
        <FlatList<Item>
          contentContainerStyle={{ rowGap: 10, paddingHorizontal: 8 }}
          ItemSeparatorComponent={() => <Separator borderColor="black" />}
          ListHeaderComponent={header}
          ListEmptyComponent={() => (
            <Stack alignItems="center">
              <Paragraph>- No Comments -</Paragraph>
            </Stack>
          )}
          data={data?.children}
          renderItem={renderItem}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 1,
            minIndexForVisible: 1,
          }}
        />
      )}
    </Stack>
  );
}
