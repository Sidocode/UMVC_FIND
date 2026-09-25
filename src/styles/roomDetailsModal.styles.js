import { StyleSheet } from "react-native";

// RoomDetailsModal: artwork from elevenBg.svg, data layered in the white area.
export const styles = StyleSheet.create({
  // Overlay and Centered Panel
  overlay: { ...StyleSheet.absoluteFill, justifyContent: "center" },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.45)" },
  viewport: { flexGrow: 0, maxHeight: "90%" },
  viewportContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  panel: { width: "100%", maxWidth: 349, height: 386 },
  background: { ...StyleSheet.absoluteFill },
  // Shared Close Icon — no circle
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  // Room Details stay above the background's footer waves
  content: { position: "absolute", top: 123, bottom: 92, left: 32, right: 24 },
  name: { fontSize: 24, color: "black", marginBottom: 4 },
  medium: { fontFamily: "RoomDetailMedium" },
  light: { fontFamily: "RoomDetailLight" },
  badge: {
    alignSelf: "flex-start",
    minWidth: 117,
    minHeight: 24,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: "#FA5D0E",
    alignItems: "center",
    justifyContent: "center",
  },
  type: { color: "white", fontSize: 15, textTransform: "capitalize" },
  floor: { fontSize: 15, color: "black", marginVertical: 16 },
  description: {
    fontSize: 20,
    lineHeight: 24,
    color: "#3C4147",
    paddingBottom: 8,
  },
});
