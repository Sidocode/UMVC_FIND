import { StyleSheet } from "react-native";

// Used by MapScreen and its reusable MapLegend.
export const styles = StyleSheet.create({
  // Screen and Header
  screen: { flex: 1, backgroundColor: "white" },
  headerSafe: { backgroundColor: "#9E212D" },
  header: { height: 65, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, color: "white" },
  filterButton: {
    position: "absolute",
    right: 16,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1 },
  // Category Legend
  legend: {
    marginHorizontal: 13,
    marginTop: 14,
    minHeight: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  legendItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 3 },
  legendText: { flexShrink: 1, fontSize: 10, color: "#3C4147" },
  font: { fontFamily: "MapMedium" },
  // Map Canvas and Temporary Building Button
  canvas: { flex: 1, minHeight: 160 },
  buildingButton: {
    position: "absolute",
    bottom: 84,
    left: "47%",
    width: 125,
    height: 38,
    backgroundColor: "#3E53B5",
    alignItems: "center",
    justifyContent: "center",
  },
  buildingText: { fontSize: 25, color: "white" },
  locationButton: {
    position: "absolute",
    bottom: 15,
    right: 22,
    width: 52,
    height: 49,
  },
  // Category Filter Overlay
  modal: { flex: 1, justifyContent: "center", padding: 24 },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.35)" },
  filterPanel: { borderRadius: 20, backgroundColor: "white", padding: 20 },
  filterTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#9E212D",
  },
  option: { padding: 14, borderRadius: 10 },
  selectedOption: { backgroundColor: "#F4E9EB" },
  optionText: { fontSize: 16, color: "#3C4147" },
});
