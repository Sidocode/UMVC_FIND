import { openMainScreen } from "../navigation/mainNavigation";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/fifthBg.svg";
import BackArrow from "../../assets/icons/back-arrow.svg";
import Academic from "../../assets/icons/academic.svg";
import Admin from "../../assets/icons/admin-office.svg";
import Facilities from "../../assets/icons/facilities-cog.svg";
import OtherBuildings from "../../assets/icons/other-building.svg";
import BottomNavigation from "../components/BottomNavigation";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/categories";
import { styles } from "../styles/categoriesScreen.styles";

const icons = {
  academic: Academic,
  admin: Admin,
  facilities: Facilities,
  other: OtherBuildings,
};

export default function CategoriesScreen() {
  const router = useRouter();
  const listRef = useRef(null);

  // Navigation
  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/home");
  const navigate = (name) => {
    if (name === "Map") return openMainScreen(router, "/map");
    if (name === "Home") openMainScreen(router, "/home");
    else if (name === "Search") openMainScreen(router, "/search");
    else if (name === "Categories")
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    else if (name === "Profile") openMainScreen(router, "/profile");
    else Alert.alert(name, "This destination is not connected yet.");
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Background includes the divider, paper plane, and bottom waves. */}
      <View style={styles.background} pointerEvents="none">
        <Background width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        {/* Fixed Header */}
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            style={styles.backButton}
          >
            <BackArrow width={32} height={32} />
          </Pressable>
          <Text style={styles.title}>Categories</Text>
        </View>
        {/* Scrollable Category Grid */}
        <FlatList
          ref={listRef}
          style={styles.list}
          contentContainerStyle={styles.content}
          columnWrapperStyle={styles.row}
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              Icon={icons[item.id]}
              onPress={(category) =>
                Alert.alert(
                  category.name,
                  "Category locations are not connected yet.",
                )
              }
            />
          )}
        />
        {/* Bottom Navigation */}
        <BottomNavigation activeItem="Categories" onSelect={navigate} />
      </SafeAreaView>
    </View>
  );
}
