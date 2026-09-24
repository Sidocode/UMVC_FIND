import { openMainScreen } from "../navigation/mainNavigation";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/sixBg.svg";
import Avatar from "../../assets/icons/profile-avatar.svg";
import HelpIcon from "../../assets/icons/profile.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import Google from "../../assets/logos/google.svg";
import BottomNavigation from "../components/BottomNavigation";
import ProfileActionCard from "../components/ProfileActionCard";
import { profile } from "../data/profile";
import { styles } from "../styles/profileScreen.styles";

export default function ProfileScreen() {
  const router = useRouter();
  const [loaded] = useFonts({
    Angkor: require("../../assets/fonts/Angkor-Regular.ttf"),
    ProfileMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
    ProfileSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
  });
  // Navigation and UI-only Sign Out
  const navigate = (name) => {
    if (name === "Map") return openMainScreen(router, "/map");
    if (name === "Home") openMainScreen(router, "/home");
    else if (name === "Search") openMainScreen(router, "/search");
    else if (name === "Categories") openMainScreen(router, "/categories");
    else if (name !== "Profile")
      Alert.alert(name, "This destination is not connected yet.");
  };
  const logout = () => {
    // Clear the prototype navigation stack; no authenticated session exists yet.
    router.dismissAll();
    router.replace("/login");
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Fixed Background */}
      <View style={styles.background} pointerEvents="none">
        <Background width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* University Branding */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/logos/UM.png")}
              style={styles.seal}
              contentFit="contain"
              accessibilityLabel="University of Mindanao seal"
            />
            <Text
              style={[styles.brand, loaded && styles.brandFont]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              UMVC <Text style={styles.gold}>FIND</Text>
            </Text>
          </View>
          {/* Sample Profile and Google Badge */}
          <View style={styles.identity}>
            <Avatar
              width={121}
              height={120}
              accessibilityLabel="Default profile avatar"
            />
            <Text style={[styles.name, loaded && styles.nameFont]}>
              {profile.name}
            </Text>
            <Text style={[styles.email, loaded && styles.mediumFont]}>
              {profile.email}
            </Text>
            <View style={styles.badge}>
              <Google width={17} height={17} accessible={false} />
              <Text style={[styles.badgeText, loaded && styles.mediumFont]}>
                {profile.signInLabel}
              </Text>
            </View>
          </View>
          {/* Profile Actions */}
          <View style={styles.actions}>
            <ProfileActionCard
              title="Help & About"
              description="FAQs, contact us, and app information"
              Icon={HelpIcon}
              onPress={() => router.push("/help")}
            />
            <ProfileActionCard
              title="Log Out"
              description="Sign out of your account"
              Icon={LogoutIcon}
              onPress={logout}
            />
          </View>
        </ScrollView>
        {/* Bottom Navigation */}
        <BottomNavigation activeItem="Profile" onSelect={navigate} />
      </SafeAreaView>
    </View>
  );
}
