import {
  faBook,
  faBriefcase,
  faFire,
  faLink,
  faQuestion,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link, Stack } from "expo-router";
import { useRef, useState } from "react";
import type { ListRenderItemInfo } from "react-native";
import { FlatList, InteractionManager } from "react-native";
import { ListItem, Separator } from "tamagui";
import { Dropdown } from "../../../components/dropdown";
import type { DropdownProps } from "../../../components/dropdown";
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
    item: { author, objectID, title, url },
  }: ListRenderItemInfo<HitItem>) => {
    return (
      <Link
        href={{
          pathname: "/item/[itemId]",
          params: { itemId: objectID },
        }}
        asChild
      >
        <ListItem
          pressStyle={{ backgroundColor: "$backgroundPress" }}
          subTitle={author}
          title={title}
          iconAfter={url && <FontAwesomeIcon icon={faLink} />}
        />
      </Link>
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
