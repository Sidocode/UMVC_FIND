import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Keyboard, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeIcon from "../../assets/icons/nav-home.svg";
import MapIcon from "../../assets/icons/nav-map.svg";
import SearchIcon from "../../assets/icons/nav-search.svg";
import CategoriesIcon from "../../assets/icons/nav-categories.svg";
import ProfileIcon from "../../assets/icons/nav-profile.svg";
import { styles } from "../styles/bottomNavigation.styles";

// Navigation Items
const items = [
  { name: "Home", Icon: HomeIcon },
  { name: "Map", Icon: MapIcon },
  { name: "Search", Icon: SearchIcon },
  { name: "Categories", Icon: CategoriesIcon },
  { name: "Profile", Icon: ProfileIcon },
];

// The parent chooses the active item and handles navigation or screen actions.
export default function BottomNavigation({ activeItem, onSelect, hidden = false }) {
  // Keyboard Visibility
  // Hide the bar while typing instead of lifting it above Android's resized window.
  const [keyboardVisible, setKeyboardVisible] = useState(() => Keyboard.isVisible());
  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const show = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    setKeyboardVisible(Keyboard.isVisible());
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const [fontLoaded] = useFonts({
    NavigationMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
  });

  if (hidden || keyboardVisible) return null;

  return (
    <View style={styles.edge}>
      
      <SafeAreaView edges={["bottom"]} style={styles.bar}>
        
        {/* Navigation Buttons */}
        <View style={styles.row}>
          {items.map(({ name, Icon }) => {
            const selected = activeItem === name;
            return (
              <Pressable
                key={name}
                accessibilityRole="button"
                accessibilityLabel={name}
                accessibilityState={{ selected }}
                onPress={() => onSelect?.(name)}
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.pressed,
                ]}
              >
                
                <Icon
                  width={45}
                  height={40}
                  color={selected ? "#A42330" : "#6C757D"}
                  accessible={false}
                />
                
                <Text
                  style={[
                    styles.label,
                    fontLoaded && styles.font,
                    selected && styles.active,
                  ]}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
