import { FlatList, Text, View } from "react-native";
import BuildingRoom from "./BuildingRoom";
import { styles } from "../styles/buildingSheet.styles";

export default function BuildingFloor({ floor, fontLoaded }) {
  return (
    <View style={styles.floor}>
      {/* Fixed Floor Label — only the room row scrolls sideways */}
      <View style={styles.floorSign}>
        <Text style={[styles.floorText, fontLoaded && styles.font]}>
          FLOOR {floor.number}
        </Text>
      </View>
      <FlatList
        horizontal
        nestedScrollEnabled
        directionalLockEnabled
        data={floor.rooms}
        keyExtractor={(room) => room.id}
        renderItem={({ item }) => (
          <BuildingRoom room={item} fontLoaded={fontLoaded} />
        )}
        style={styles.rooms}
        showsHorizontalScrollIndicator={false}
        accessibilityLabel={`Rooms on floor ${floor.number}`}
      />
    </View>
  );
}
