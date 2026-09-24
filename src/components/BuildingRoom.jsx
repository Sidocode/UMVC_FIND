import { Text, View } from "react-native";
import Room from "../../assets/backgrounds/room.svg";
import { styles } from "../styles/buildingSheet.styles";

export default function BuildingRoom({ room, fontLoaded }) {
  return (
    <View
      style={styles.room}
      accessible
      accessibilityLabel={`${room.name}, ${room.type}`}
    >
      <Room />
      {/* Data-driven Room Sign */}
      <View style={styles.roomSign}>
        <Text
          numberOfLines={1}
          style={[styles.roomName, fontLoaded && styles.font]}
        >
          {room.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.roomType, fontLoaded && styles.font]}
        >
          {room.type}
        </Text>
      </View>
    </View>
  );
}
