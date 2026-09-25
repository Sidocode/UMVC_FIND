import { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Building from "../../assets/backgrounds/building.svg";
import BuildingFloor from "./BuildingFloor";
import RoomDetailsModal from "./RoomDetailsModal";
import { styles } from "../styles/buildingSheet.styles";

export default function BuildingSheet({ building, onClosed }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [closing, setClosing] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  // Back dismisses the topmost layer without unmounting the building.
  const closeTopLayer = () => selectedRoom ? setSelectedRoom(null) : setClosing(true);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const callback = useRef(onClosed);
  callback.current = onClosed;
  const [loaded] = useFonts({
    BuildingMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
  });

  // Retain the panel until its closing animation finishes.
  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: closing ? 0 : 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && closing) callback.current();
    });
    return () => animation.stop();
  }, [closing, progress]);

  return (
    <Modal
      transparent
      visible
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeTopLayer}
    >
      <View style={styles.overlay}>
        {/* Dimmed Map / Outside Tap to Close */}
        <Animated.View style={[styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={styles.outside}
            accessibilityRole="button"
            accessibilityLabel="Close building"
            onPress={closeTopLayer}
          />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          pointerEvents={selectedRoom ? "none" : "auto"}
          accessibilityElementsHidden={Boolean(selectedRoom)}
          importantForAccessibility={selectedRoom ? "no-hide-descendants" : "auto"}
          style={[
            styles.sheet,
            {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Vertical overflow keeps Floor 1 reachable on smaller phones. */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom },
            ]}
            nestedScrollEnabled
          >
            <View style={styles.building}>
              <View style={styles.artwork} pointerEvents="none">
                <Building
                  width="100%"
                  height={721}
                  preserveAspectRatio="none"
                />
              </View>
              <Text style={[styles.buildingName, loaded && styles.font]}>
                {building.name}
              </Text>
              {/* Three floors aligned to the prepared three-storey SVG. */}
              <View style={styles.floors}>
                {building.floors.map((floor) => (
                  <BuildingFloor
                    key={floor.id}
                    floor={floor}
                    fontLoaded={loaded}
                    onRoomSelect={setSelectedRoom}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
        {/* Keep the building mounted so all scroll positions survive dismissal. */}
        {selectedRoom && <RoomDetailsModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      </View>
    </Modal>
  );
}
