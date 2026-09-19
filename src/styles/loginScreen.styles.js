// Used by src/screens/loginScreen.jsx
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Screen Background and Content Placement
  screen: { flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center" },
  background: StyleSheet.absoluteFill,
  scroll: { flex: 1 },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 280,
  },
  // Logo, App Name, and Tagline
  logo: { width: 169, height: 174 },
  title: {
    marginTop: 6,
    width: "100%",
    maxWidth: 360,
    textAlign: "center",
    fontFamily: "Angkor",
    fontSize: 38,
    lineHeight: 57,
    color: "#AF2532",
    includeFontPadding: false,
  },
  gold: { color: "#FEBF1F" },
  subtitle: {
    textAlign: "center",
    fontFamily: "AfacadFluxRegular",
    fontSize: 15,
    lineHeight: 22,
    color: "#000000",
    includeFontPadding: false,
  },
  // Welcome Message and Instructions
  welcome: {
    marginTop: 26,
    width: "100%",
    maxWidth: 352,
    textAlign: "center",
    fontFamily: "AfacadFluxSemiBold",
    fontSize: 24,
    lineHeight: 36,
    color: "#AF2532",
    includeFontPadding: false,
  },
  instructions: {
    marginTop: 8,
    maxWidth: 288,
    textAlign: "center",
    fontFamily: "AfacadRegular",
    fontSize: 16,
    lineHeight: 20,
    color: "rgba(0,0,0,0.53)",
    includeFontPadding: false,
  },
  // Shared Login Button Layout
  button: {
    width: "100%",
    maxWidth: 328,
    minHeight: 56,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  // Google and Guest Button Colors
  googleButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#6C757D",
    backgroundColor: "#FFFFFF",
  },
  guestButton: { marginTop: 16, backgroundColor: "#AF2532" },
  // Login Button Labels
  buttonText: {
    fontFamily: "AfacadTextMedium",
    fontSize: 20,
    lineHeight: 30,
    includeFontPadding: false,
    flexShrink: 1,
  },
  googleText: { color: "#6C757D" },
  guestText: { color: "#FFFFFF" },
  // Login Button Icon Sizes
  googleIcon: { width: 35, height: 35 },
  guestIcon: { width: 21, height: 23 },
  // Button Press Feedback
  pressed: { opacity: 0.8 },
});
