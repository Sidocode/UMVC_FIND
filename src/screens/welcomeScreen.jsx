import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";

import { styles } from "../styles/welcomeScreen.styles";
import WelcomeBackground from "../../assets/backgrounds/firstBg.svg";
import TitleDivider from "../../assets/icons/arrow.svg";
import StartArrow from "../../assets/icons/start-arrow.svg";

const assets = {
  logo: require("../../assets/logos/UMVC-Find.png"),
};

// The next screen can supply its navigation action without coupling this layout to a router.
export default function WelcomeScreen({ onGetStarted }) {
  const [fontsLoaded, fontError] = useFonts({
    Angkor: require("../../assets/fonts/Angkor-Regular.ttf"),
    AfacadMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
    AfacadBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });

  const start =
    onGetStarted ??
    (() =>
      Alert.alert(
        "Welcome to UMVC FIND",
        "The next screen is not available yet.",
      ));

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.screen}>
        <StatusBar hidden />

        <ActivityIndicator color="#AF2532" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar hidden />

      {/* Background */}
      <View style={styles.background} pointerEvents="none" accessible={false}>
        <WelcomeBackground
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          accessible={false}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Branding */}
        <Image
          source={assets.logo}
          accessibilityLabel="UM Tagum College map pin logo"
          contentFit="contain"
          style={styles.logo}
        />

        <Text
          accessibilityRole="header"
          accessibilityLabel="UMVC FIND"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.title}
        >
          UMVC
          <Text style={styles.gold}>FIND</Text>
        </Text>

        {/* Tagline */}
        <TitleDivider
          width={styles.divider.width}
          height={styles.divider.height}
          accessible={false}
          style={styles.divider}
        />

        <Text style={styles.tagline}>Find. Navigate. Explore.</Text>

        {/* Get Started Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Get Started"
          onPress={start}
          hitSlop={8}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Get Started</Text>

          <StartArrow
            width={styles.buttonArrow.width}
            height={styles.buttonArrow.height}
            accessible={false}
            style={styles.buttonArrow}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
}
