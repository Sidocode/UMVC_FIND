import { useFonts } from "expo-font";
import { Pressable, ScrollView, Text, View } from "react-native";
import Background from "../../assets/backgrounds/elevenBg.svg";
import CloseIcon from "../../assets/icons/close.svg";
import { styles } from "../styles/roomDetailsModal.styles";

// Visual modal inside BuildingSheet's native Modal; never closes the building.
export default function RoomDetailsModal({ room, onClose }) {
  const [loaded] = useFonts({
    RoomDetailMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
    RoomDetailLight: require("../../assets/fonts/afacad-flux-latin-300-normal.ttf"),
  });
  return (
    <View style={styles.overlay} accessibilityViewIsModal>
      <Pressable style={styles.backdrop} accessibilityRole="button" accessibilityLabel="Close room details" onPress={onClose} />
      <ScrollView style={styles.viewport} contentContainerStyle={styles.viewportContent} pointerEvents="box-none" showsVerticalScrollIndicator={false}>
        <View style={styles.panel}>
          {/* Prepared Background: Pin, Outline, Card and Waves */}
          <View style={styles.background} pointerEvents="none">
            <Background width="100%" height={386} preserveAspectRatio="none" />
          </View>
          <Pressable style={styles.close} accessibilityRole="button" accessibilityLabel="Close room details" onPress={onClose}>
            <CloseIcon />
          </Pressable>
          {/* Scroll long room descriptions inside the white area. */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false} nestedScrollEnabled>
            <Text style={[styles.name, loaded && styles.medium]}>{room.name}</Text>
            <View style={styles.badge}><Text style={[styles.type, loaded && styles.medium]}>{room.type}</Text></View>
            <Text style={[styles.floor, loaded && styles.medium]}>Floor: {room.floorNumber}</Text>
            <Text style={[styles.description, loaded && styles.light]}>{room.description || "No description available yet."}</Text>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
