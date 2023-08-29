import { useMemo } from "react";
import { Select, Adapt, Sheet } from "tamagui";
import type { SelectProps } from "tamagui";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface DropdownProps<T> extends SelectProps {
  items: {
    value: T;
    title: string;
    icon: IconDefinition;
  }[];
}

export function Dropdown<T>({ items, ...props }: DropdownProps<T>) {
  return (
    <Select {...props}>
      <Select.Trigger
        size="$2.5"
        width={90}
        icon={<FontAwesomeIcon icon={faChevronDown} />}
      >
        <Select.Value />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
            overshootClamping: true,
          }}
          snapPoints={[35]}
        >
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            {useMemo(
              () =>
                items.map(({ icon, title }, index) => {
                  return (
                    <Select.Item
                      icon={<FontAwesomeIcon icon={icon} />}
                      index={index}
                      key={index}
                      value={title}
                    >
                      <Select.ItemText marginRight="auto">
                        {title}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <FontAwesomeIcon icon={faCheck} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
