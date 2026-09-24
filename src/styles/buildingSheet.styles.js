import { StyleSheet } from "react-native";

// Placement styles for BuildingSheet, BuildingFloor and BuildingRoom.
export const styles = StyleSheet.create({
  // Modal and Slide-up Panel
  overlay: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.5)" },
  outside: { flex: 1 },
  sheet: {
    maxHeight: "79%",
    width: "100%",
    maxWidth: 426,
    alignSelf: "center",
  },
  scrollContent: { paddingHorizontal: 7 },
  // Building Artwork and Roof Title
  building: { height: 721 },
  artwork: { ...StyleSheet.absoluteFill },
  buildingName: {
    position: "absolute",
    top: 22,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },
  font: { fontFamily: "BuildingMedium" },
  // Floor Placement: fixed 206px intervals match building.svg balconies
  floors: { position: "absolute", top: 112, left: 37, right: 34 },
  floor: { height: 206, alignItems: "center" },
  floorSign: {
    height: 32,
    minWidth: 73,
    paddingHorizontal: 7,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#6C757D",
    alignItems: "center",
    justifyContent: "center",
  },
  floorText: { fontSize: 15, color: "black" },
  // Independent Horizontal Room Rows
  rooms: { marginTop: 5, height: 160, flexGrow: 0, width: "100%" },
  room: { width: 82, height: 160 },
  roomSign: {
    position: "absolute",
    top: 22,
    left: 13,
    width: 55,
    height: 22,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A9A199",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  roomName: { fontSize: 10, color: "black" },
  roomType: { fontSize: 7, color: "#6C757D" },
});
