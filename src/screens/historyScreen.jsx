import { openMainScreen } from "../navigation/mainNavigation";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/ninthBg.svg";
import BackArrow from "../../assets/icons/back-arrow.svg";
import BottomNavigation from "../components/BottomNavigation";
import LocationCard from "../components/LocationCard";
import { recentlyViewed } from "../data/recentlyViewed";
import { styles } from "../styles/historyScreen.styles";

export default function HistoryScreen() {
  const router = useRouter();
  const [loaded] = useFonts({
    HistoryBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });
  const close = () =>
    router.canGoBack() ? router.back() : router.replace("/home");
  const navigate = (name) => {
    const routes = {
      Home: "/home",
      Search: "/search",
      Categories: "/categories",
      Profile: "/profile",
    };
    if (routes[name]) openMainScreen(router, routes[name]);
    else Alert.alert(name, "This destination is not connected yet.");
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Fixed Background */}
      <View style={styles.background} pointerEvents="none">
        <Background width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        {/* Header and Fixed Recent Viewed Heading */}
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={close}
            style={styles.backButton}
          >
            <BackArrow width={32} height={32} />
          </Pressable>
          <Text style={styles.title}>History</Text>
        </View>
        <View style={styles.headingContainer}>
          <Text style={[styles.heading, loaded && styles.headingFont]}>
            Recent Viewed
          </Text>
        </View>
        {/* Shared Viewing History Data and Reusable Cards */}
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={recentlyViewed}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LocationCard
              item={item}
              variant="history"
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
            <Text style={styles.empty}>No recently viewed locations yet.</Text>
          }
        />
        {/* Fixed Bottom Navigation */}
        <BottomNavigation onSelect={navigate} />
      </SafeAreaView>
    </View>
  );
}
