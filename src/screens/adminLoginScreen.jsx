import { useRouter } from "expo-router";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Waves from "../../assets/admin/waves.svg";
import EmailIcon from "../../assets/admin/email.svg";
import LockIcon from "../../assets/admin/lock.svg";
import EyeIcon from "../../assets/admin/eye.svg";
import { styles } from "../styles/adminLoginScreen.styles";

export default function AdminLoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const compact = width < 800;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loaded] = useFonts({
    AdminRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    AdminMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
    AdminBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
    AdminBrand: require("../../assets/fonts/Angkor-Regular.ttf"),
  });
  const submit = () => {
    Keyboard.dismiss();
    if (!username.trim() || !password.trim()) {
      setMessage("Enter your email or admin username and password.");
      return;
    }
    setPassword("");
    router.replace("/admin-dashboard");
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <StatusBar style={compact ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.page, compact && styles.pageCompact]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Left Branding Panel */}
          <View style={[styles.brandPanel, compact && styles.brandCompact]}>
            <Image
              source={require("../../assets/admin/campus.png")}
              contentFit="cover"
              style={styles.campus}
            />
            <Image
              source={require("../../assets/admin/watermark.png")}
              contentFit="cover"
              style={styles.watermark}
            />
            <View style={styles.topDivider}>
              <View style={styles.dot} />
              <View style={styles.line} />
              <Image
                source={require("../../assets/admin/plane.png")}
                style={styles.plane}
              />
              <View style={styles.line} />
              <View style={styles.dot} />
            </View>
            <View style={styles.brandContent}>
              <View style={styles.brandRow}>
                <Image
                  source={require("../../assets/admin/logo.png")}
                  contentFit="contain"
                  style={[styles.logo, compact && styles.logoCompact]}
                />
                <View style={styles.brandWords}>
                  <Text
                    style={[
                      styles.brandText,
                      loaded && styles.brandFont,
                      compact && styles.brandTextCompact,
                    ]}
                  >
                    UMVC
                  </Text>
                  <Text
                    style={[
                      styles.brandText,
                      styles.gold,
                      loaded && styles.brandFont,
                      compact && styles.brandTextCompact,
                    ]}
                  >
                    FIND
                  </Text>
                </View>
              </View>
              <View style={styles.taglineDivider} />
              <View style={styles.taglineRow}>
                {["Manage", "Locate", "Explore"].map((word, index) => (
                  <View key={word} style={styles.taglineItem}>
                    {index > 0 && <View style={styles.dot} />}
                    <Text style={[styles.tagline, loaded && styles.medium]}>
                      {word}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.waves} pointerEvents="none">
              <Waves width="100%" height="100%" preserveAspectRatio="none" />
            </View>
          </View>
          {/* Right Login Panel */}
          <View style={[styles.formPanel, compact && styles.formCompact]}>
            <Image
              source={require("../../assets/admin/form-background.png")}
              contentFit="cover"
              style={styles.formBackground}
            />
            <View style={styles.form}>
              <Image
                source={require("../../assets/admin/admin-avatar.png")}
                contentFit="contain"
                style={styles.avatar}
              />
              <Text
                accessibilityRole="header"
                style={[styles.heading, loaded && styles.medium]}
              >
                Admin Login
              </Text>
              <Text style={[styles.subtitle, loaded && styles.regular]}>
                Access the administration panel · Prototype preview
              </Text>
              {/* Email / Username Field */}
              <Text style={[styles.label, loaded && styles.regular]}>
                Email / Admin Username
              </Text>
              <View style={styles.inputRow}>
                <EmailIcon />
                <TextInput
                  accessibilityLabel="Email or admin username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  value={username}
                  onChangeText={(value) => {
                    setUsername(value);
                    setMessage("");
                  }}
                  placeholder="Email / Admin Username"
                  placeholderTextColor="#B5B7B9"
                  style={[styles.input, loaded && styles.regular]}
                />
              </View>
              {/* Password and Visibility Toggle */}
              <Text style={[styles.label, loaded && styles.regular]}>
                Password
              </Text>
              <View style={styles.inputRow}>
                <LockIcon />
                <TextInput
                  accessibilityLabel="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setMessage("");
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#B5B7B9"
                  style={[styles.input, loaded && styles.regular]}
                  onSubmitEditing={submit}
                  returnKeyType="go"
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                  accessibilityState={{ selected: showPassword }}
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <EyeIcon />
                </Pressable>
              </View>
              {/* Login and Inline Feedback */}
              <Pressable
                accessibilityRole="button"
                onPress={submit}
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.loginText, loaded && styles.bold]}>
                  Login
                </Text>
              </Pressable>
              {!!message && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={[styles.message, loaded && styles.regular]}
                >
                  {message}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
