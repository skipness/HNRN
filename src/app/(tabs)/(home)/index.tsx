import {
  faBook,
  faBriefcase,
  faFire,
  faQuestion,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import type { ListRenderItemInfo } from "react-native";
import { FlatList, InteractionManager } from "react-native";
import { Separator } from "tamagui";
import type { DropdownProps } from "../../../components/dropdown";
import { Dropdown } from "../../../components/dropdown";
import ListItem from "../../../components/listItem";
import { useGetListQuery } from "../../../services/hackerNews";
import type { HitItem, SearchRequest } from "../../../types/search";

type DropdownItem = DropdownProps<SearchRequest["tags"]>["items"];

const items = [
  { title: "Story", value: "story", icon: faBook },
  { title: "Hot", value: "front_page", icon: faFire },
  { title: "Ask", value: "ask_hn", icon: faQuestion },
  { title: "Show", value: "show_hn", icon: faVolumeHigh },
  { title: "Job", value: "job", icon: faBriefcase },
] satisfies DropdownItem;

export default function HackerNews() {
  const [item, setItem] = useState(items.at(0));
  const [page, setPage] = useState(0);
  const listRef = useRef<FlatList<HitItem>>(undefined);
  const { data, isFetching, isLoading, isSuccess } = useGetListQuery({
    tags: item.value,
    type: "search_by_date",
    page,
  });

  const onChangeListType: DropdownProps<DropdownItem>["onValueChange"] = (
    value
  ) => {
    if (value === item.title) return;
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
    InteractionManager.runAfterInteractions(() => {
      const newItemIndex = items.findIndex((item) => item.title === value);
      if (newItemIndex !== -1) {
        setPage(0);
        setItem(items.at(newItemIndex));
      }
    });
  };

  const onEndReached = () => {
    if (isFetching || isLoading) return;
    setPage((page) => (page += 1));
  };

  const renderItem = ({
    item: { created_at, num_comments, objectID, points, title, url },
  }: ListRenderItemInfo<HitItem>) => {
    return (
      <ListItem
        created_at={created_at}
        num_comments={num_comments}
        objectID={objectID}
        points={points}
        title={title}
        url={url}
      />
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Dropdown
              items={items}
              onValueChange={onChangeListType}
              value={item.title}
            />
          ),
        }}
      />
      {isSuccess && (
        <FlatList<HitItem>
          contentInsetAdjustmentBehavior="automatic"
          data={data?.hits}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={renderItem}
          ref={listRef}
          onEndReached={onEndReached}
        />
      )}
    </>
  );
}
