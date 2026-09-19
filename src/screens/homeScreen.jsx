import { openMainScreen } from "../navigation/mainNavigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/thirdBg.svg";
import Bell from "../../assets/icons/notification.svg";
import Search from "../../assets/icons/seacrch.svg";
import BottomNavigation from "../components/BottomNavigation";
import RecentLocations from "../components/RecentLocations";
import NotificationSheet from "../components/NotificationSheet";
import NotificationDetailSheet from "../components/NotificationDetailSheet";
import { notifications } from "../data/notifications";
import { recentlyViewed } from "../data/recentlyViewed";
import Arrow from "../../assets/icons/proceed-arrow.svg";
import Academic from "../../assets/icons/academic.svg";
import Offices from "../../assets/icons/offices.svg";
import Facilities from "../../assets/icons/facilities.svg";
import Food from "../../assets/icons/food.svg";
import Services from "../../assets/icons/services.svg";
import More from "../../assets/icons/more.svg";
import CampusMap from "../../assets/icons/campusMap.svg";
import { styles } from "../styles/homeScreen.styles";

// Campus Categories
const categories = [
  { name: "Academic", Icon: Academic, style: "academic", light: true },
  { name: "Offices", Icon: Offices, style: "offices" },
  { name: "Facilities", Icon: Facilities, style: "pink" },
  { name: "Food", Icon: Food, style: "cream" },
  { name: "Services", Icon: Services, style: "pink" },
  { name: "More", Icon: More, style: "cream" },
];
const unavailable = (name) =>
  Alert.alert(name, "This destination is not connected yet.");

export default function HomeScreen() {
  const router = useRouter();
  // Physical screen height stays fixed when the keyboard resizes the window.
  const backgroundHeight = Dimensions.get("screen").height;
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const openAllAfterClose = useRef(false);
  const pendingNotification = useRef(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  // Navigate after the sheet finishes sliding down.
  const handleNotificationsClosed = useCallback(() => {
    if (pendingNotification.current) {
      setSelectedNotification(pendingNotification.current);
      pendingNotification.current = null;
      return;
    }
    if (openAllAfterClose.current) {
      openAllAfterClose.current = false;
      router.push("/notifications");
    }
  }, [router]);
  // Hide navigation before Android begins resizing for the keyboard.
  const [searchOpening, setSearchOpening] = useState(false);
  useEffect(() => {
    const subscription = Keyboard.addListener("keyboardDidHide", () =>
      setSearchOpening(false),
    );
    return () => subscription.remove();
  }, []);
  const searchRef = useRef(null);
  const scrollRef = useRef(null);
  const [loaded, error] = useFonts({
    Angkor: require("../../assets/fonts/Angkor-Regular.ttf"),
    HomeRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    HomeMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
    HomeSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
    HomeBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });
  const navigate = (name) => {
    if (name === "Home") scrollRef.current?.scrollTo({ y: 0, animated: true });
    else if (name === "Search") {
      Keyboard.dismiss();
      openMainScreen(router, "/search", true);
    } else if (name === "Categories") {
      Keyboard.dismiss();
      openMainScreen(router, "/categories", true);
    }
    else if (name === "Profile") {
      Keyboard.dismiss();
      openMainScreen(router, "/profile", true);
    } else unavailable(name);
  };
  if (!loaded && !error)
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#AF2532" />
      </View>
    );

  return (
    <View style={styles.screen}>
      <StatusBar hidden={false} style="light" />

      {/* Background */}
      <View style={styles.background} pointerEvents="none">
        <Background width="100%" height={backgroundHeight} preserveAspectRatio="none" />
      </View>

      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/logos/UM.png")}
            style={styles.seal}
            contentFit="contain"
            accessibilityLabel="University of Mindanao seal"
          />

          <View style={styles.brand}>
            <Text
              style={styles.brandTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              UMVC
              <Text style={styles.gold}>FIND</Text>
            </Text>

            <Text style={styles.brandSubtitle}>Explore the campus now!</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.iconButton}
            onPress={() => {
              Keyboard.dismiss();
              setNotificationsOpen(true);
            }}
          >
            <Bell width={28} height={28} />
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcome} numberOfLines={1} adjustsFontSizeToFit>
            Welcome Back, User!
          </Text>

          <Text style={styles.prompt}>Where do you want to go?</Text>

          {/* Search */}
          <View style={styles.searchBox}>
            <Search width={26} height={26} />

            <TextInput
              ref={searchRef}
              onPressIn={() => setSearchOpening(true)}
              onFocus={() => setSearchOpening(true)}
              onBlur={() => {
                if (!Keyboard.isVisible()) setSearchOpening(false);
              }}
              value={query}
              onChangeText={setQuery}
              style={styles.input}
              placeholder="Search a building or location..."
              placeholderTextColor="#6C757D"
              accessibilityLabel="Search locations"
              returnKeyType="search"
            />
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              {query ? "Search Results" : "Recently Viewed"}
            </Text>
            {recentlyViewed.length > 0 && (
              <Pressable
                accessibilityRole="button"
                style={styles.seeAll}
                onPress={() => {
                  Keyboard.dismiss();
                  router.push("/history");
                }}
              >
                <Text style={styles.link}>See all</Text>

                <Arrow width={14} height={16} color="#AF2532" />
              </Pressable>
            )}
          </View>

          {/* Recently Viewed */}
          <RecentLocations
            items={recentlyViewed}
            query={query}
            onSelect={(item) => unavailable(item.name)}
          />

          <View>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Explore Campus</Text>

              <Text style={styles.browse}>Browse by category</Text>
            </View>

            {/* Category Buttons */}
            <View style={styles.grid}>
              {categories.map(({ name, Icon, style, light }) => (
                <Pressable
                  key={name}
                  accessibilityRole="button"
                  accessibilityLabel={name}
                  onPress={() => name === "More" ? navigate("Categories") : unavailable(name)}
                  style={({ pressed }) => [
                    styles.tile,
                    styles[style],
                    pressed && styles.pressed,
                  ]}
                >
                  <Icon width={30} height={30} />

                  <Text
                    style={[styles.tileText, light && styles.white]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Explore Campus Map"
            onPress={() => unavailable("Campus Map")}
            style={({ pressed }) => [
              styles.mapButton,
              pressed && styles.pressed,
            ]}
          >
            <CampusMap width={43} height={43} />

            <View style={styles.mapCopy}>
              <Text style={styles.mapTitle}>Explore Campus Map</Text>

              <Text style={styles.mapSubtitle}>
                View the interactive map and start exploring!
              </Text>
            </View>

            <Arrow width={21} height={25} color="white" />
          </Pressable>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation activeItem="Home" onSelect={navigate} hidden={searchOpening} />
      </SafeAreaView>
      {/* Notification Overlay */}
      <NotificationSheet visible={notificationsOpen} onClose={() => setNotificationsOpen(false)}
        items={notifications.slice(0, 4)} onSelect={(item) => {
          pendingNotification.current = item;
          setNotificationsOpen(false);
        }}
        onClosed={handleNotificationsClosed}
        onViewAll={() => {
          openAllAfterClose.current = true;
          setNotificationsOpen(false);
        }} />
      {selectedNotification && <NotificationDetailSheet item={selectedNotification} onClosed={() => {
        setSelectedNotification(null);
        setNotificationsOpen(true);
      }} />}
    </View>
  );
}
