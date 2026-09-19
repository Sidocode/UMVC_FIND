import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/ninthBg.svg";
import { helpIntroduction, helpSections } from "../data/helpContent";
import { styles } from "../styles/helpScreen.styles";

export default function HelpScreen() {
  const router = useRouter();
  const [loaded] = useFonts({
    HelpRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    HelpBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Fixed Back to Profile Header */}
      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/profile")
          }
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.backText, loaded && styles.boldFont]}>
            Back to Profile
          </Text>
        </Pressable>
      </SafeAreaView>
      <View style={styles.goldDivider} />
      <View style={styles.body}>
        {/* Reuse only the map-pattern region of the existing background. */}
        <View style={styles.background} pointerEvents="none">
          <Background
            width="100%"
            height="100%"
            viewBox="0 180 412 550"
            preserveAspectRatio="xMidYMid slice"
          />
        </View>
        <SafeAreaView edges={["left", "right", "bottom"]} style={styles.body}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Introduction */}
            <Text
              accessibilityRole="header"
              style={[styles.heading, loaded && styles.boldFont]}
            >
              Help & About
            </Text>
            <Text style={[styles.introduction, loaded && styles.regularFont]}>
              {helpIntroduction}
            </Text>
            {/* Data-driven Help Sections */}
            {helpSections.map((section) => (
              <View key={section.id} style={styles.section}>
                <View
                  style={[
                    styles.sectionHeading,
                    section.id === "dashboard" && styles.alignRight,
                  ]}
                >
                  <Text
                    accessibilityRole="header"
                    style={[styles.heading, loaded && styles.boldFont]}
                  >
                    {section.title}
                  </Text>
                  {section.id === "purpose" && (
                    <Image
                      source={require("../../assets/logos/UMVC-Find.png")}
                      contentFit="contain"
                      style={styles.logo}
                      accessibilityLabel="UMVC Find logo"
                    />
                  )}
                </View>
                <View style={styles.card}>
                  <Text style={[styles.copy, loaded && styles.regularFont]}>
                    {section.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}
