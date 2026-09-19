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
import LoginBackground from "../../assets/backgrounds/secondBg.svg";
import GoogleIcon from "../../assets/logos/google.svg";
import GuestIcon from "../../assets/icons/user.svg";
import { styles } from "../styles/loginScreen.styles";

export default function LoginScreen({ onGoogleLogin, onGuestLogin }) {
  const [fontsLoaded, fontError] = useFonts({
    Angkor: require("../../assets/fonts/Angkor-Regular.ttf"),
    AfacadFluxRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    AfacadFluxSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
    AfacadRegular: require("../../assets/fonts/Afacad-Regular.ttf"),
    AfacadTextMedium: require("../../assets/fonts/Afacad-Medium.ttf"),
  });

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      {!fontsLoaded && !fontError ? (
        <ActivityIndicator color="#AF2532" />
      ) : (
        <>
          {/* Background */}
          <View
            style={styles.background}
            pointerEvents="none"
            accessible={false}
          >
            <LoginBackground
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
              source={require("../../assets/logos/UMVC-Find.png")}
              contentFit="contain"
              accessibilityLabel="UM Tagum College map pin logo"
              style={styles.logo}
            />

            <Text
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit
              accessibilityRole="header"
            >
              UMVC
              <Text style={styles.gold}>FIND</Text>
            </Text>

            <Text style={styles.subtitle}>
              Campus Navigator and Room Locator
            </Text>

            {/* Welcome Message */}
            <Text style={styles.welcome} numberOfLines={1} adjustsFontSizeToFit>
              Welcome to UM Visayan Campus!
            </Text>

            <Text style={styles.instructions}>
              Use your University of Mindanao google{"\n"}account to login.
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={
                onGoogleLogin ??
                (() =>
                  Alert.alert(
                    "Google sign-in",
                    "Google sign-in is not connected yet.",
                  ))
              }
              style={({ pressed }) => [
                styles.button,
                styles.googleButton,
                pressed && styles.pressed,
              ]}
            >
              <GoogleIcon
                width={styles.googleIcon.width}
                height={styles.googleIcon.height}
                style={styles.googleIcon}
                accessible={false}
              />

              <Text style={[styles.buttonText, styles.googleText]}>
                Continue with Google
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue as Guest"
              onPress={
                onGuestLogin ??
                (() =>
                  Alert.alert(
                    "Guest access",
                    "The guest destination screen is not available yet.",
                  ))
              }
              style={({ pressed }) => [
                styles.button,
                styles.guestButton,
                pressed && styles.pressed,
              ]}
            >
              <GuestIcon
                width={styles.guestIcon.width}
                height={styles.guestIcon.height}
                style={styles.guestIcon}
                accessible={false}
              />

              <Text style={[styles.buttonText, styles.guestText]}>
                Continue as Guest
              </Text>
            </Pressable>
          </ScrollView>
        </>
      )}
    </View>
  );
}
