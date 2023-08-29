import { Tabs } from "expo-router/tabs";
import { faHackerNewsSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesomeIcon
              color={color}
              icon={faHackerNewsSquare}
              size={size}
            />
          ),
          tabBarLabel: "Hacker News",
        }}
      />
    </Tabs>
  );
}
