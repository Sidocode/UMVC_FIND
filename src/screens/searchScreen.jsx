import { openMainScreen } from "../navigation/mainNavigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/fourthBg.svg";
import BackArrow from "../../assets/icons/back-arrow.svg";
import BottomNavigation from "../components/BottomNavigation";
import LocationCard from "../components/LocationCard";
import { searchLocations } from "../data/searchLocations";
import { styles } from "../styles/searchScreen.styles";

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchOpening, setSearchOpening] = useState(false);
  const [loaded] = useFonts({
    SearchRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    SearchBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });
  // Hide navigation before keyboard resize, then restore it after dismissal.
  useEffect(() => {
    const subscription = Keyboard.addListener("keyboardDidHide", () =>
      setSearchOpening(false),
    );
    return () => subscription.remove();
  }, []);
  const searchTerm = query.trim().toLowerCase();
  const results = searchLocations.filter((item) =>
    `${item.name} ${item.category}`.toLowerCase().includes(searchTerm),
  );
  const goBack = () => {
    Keyboard.dismiss();
    router.canGoBack() ? router.back() : router.replace("/home");
  };
  const navigate = (name) => {
    if (name === "Home") {
      Keyboard.dismiss();
      openMainScreen(router, "/home");
    } else if (name === "Search") {
      setSearchOpening(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (name === "Categories") {
      Keyboard.dismiss();
      openMainScreen(router, "/categories");
    } else if (name === "Profile") {
      Keyboard.dismiss();
      openMainScreen(router, "/profile");
    } else Alert.alert(name, "This destination is not connected yet.");
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Background */}
      <View style={styles.background} pointerEvents="none">
        <Background
          width="100%"
          height={Dimensions.get("screen").height}
          preserveAspectRatio="none"
        />
      </View>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        {/* Header and Search */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={goBack}
              style={styles.backButton}
            >
              <BackArrow width={32} height={32} />
            </Pressable>
            <Text style={styles.title}>Search</Text>
          </View>
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            style={[styles.input, loaded && styles.inputFont]}
            placeholder="Search building, room, or facility..."
            placeholderTextColor="#6C757D"
            accessibilityLabel="Search building, room, or facility"
            returnKeyType="search"
            autoCorrect={false}
            onPressIn={() => setSearchOpening(true)}
            onFocus={() => setSearchOpening(true)}
            onBlur={() => {
              if (!Keyboard.isVisible()) setSearchOpening(false);
            }}
          />
        </View>
        {/* Fixed Results Heading */}
        <View style={styles.headingContainer}>
          <Text style={[styles.heading, loaded && styles.headingFont]}>
            {searchTerm ? "Search Results" : "Recent Searches"}
          </Text>
        </View>
        {/* Scrollable Location Cards */}
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={results}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LocationCard
              item={item}
              onPress={(location) =>
                Alert.alert(
                  location.name,
                  "Location details are not connected yet.",
                )
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No locations found. Try another search.
            </Text>
          }
        />
        {/* Bottom Navigation */}
        <BottomNavigation
          activeItem="Search"
          onSelect={navigate}
          hidden={searchOpening}
        />
      </SafeAreaView>
    </View>
  );
}
