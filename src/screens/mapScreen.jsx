import { useState } from "react";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterIcon from "../../assets/icons/map-filter.svg";
import LocationIcon from "../../assets/icons/map-current-location.svg";
import BottomNavigation from "../components/BottomNavigation";
import MapLegend from "../components/MapLegend";
import BuildingSheet from "../components/BuildingSheet";
import { buildings } from "../data/buildings";
import { mapCategories } from "../data/mapCategories";
import { openMainScreen } from "../navigation/mainNavigation";
import { styles } from "../styles/mapScreen.styles";

export default function MapScreen() {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [loaded] = useFonts({
    MapMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
  });
  const navigate = (name) => {
    const routes = {
      Home: "/home",
      Search: "/search",
      Categories: "/categories",
      Profile: "/profile",
    };
    if (routes[name]) openMainScreen(router, routes[name]);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Campus Map Header */}
      <SafeAreaView edges={["top"]} style={styles.headerSafe}>
        <View style={styles.header}>
          <Text style={styles.title}>Campus Map</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filter map categories"
            onPress={() => setFilterOpen(true)}
            style={styles.filterButton}
          >
            <FilterIcon />
          </Pressable>
        </View>
      </SafeAreaView>
      {/* Legend and Map Canvas — empty until campus map data is supplied */}
      <SafeAreaView edges={["left", "right"]} style={styles.body}>
        <MapLegend fontLoaded={loaded} />
        <View style={styles.canvas}>
          {(!category || category === "academic") && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setBuildingOpen(true)}
              style={styles.buildingButton}
            >
              <Text style={[styles.buildingText, loaded && styles.font]}>
                building
              </Text>
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Current location"
            onPress={() =>
              Alert.alert(
                "Current location",
                "Live location is not connected yet.",
              )
            }
            style={styles.locationButton}
          >
            <LocationIcon />
          </Pressable>
        </View>
        {/* Fixed Shared Bottom Navigation */}
        <BottomNavigation activeItem="Map" onSelect={navigate} />
      </SafeAreaView>
      {/* Building Details Overlay */}
      {buildingOpen && (
        <BuildingSheet
          building={buildings[0]}
          onClosed={() => setBuildingOpen(false)}
        />
      )}
      {/* Category Filter Choices */}
      <Modal
        transparent
        visible={filterOpen}
        animationType="fade"
        onRequestClose={() => setFilterOpen(false)}
      >
        <View style={styles.modal}>
          <Pressable
            style={styles.backdrop}
            accessibilityLabel="Close filters"
            onPress={() => setFilterOpen(false)}
          />
          <View style={styles.filterPanel}>
            <Text style={styles.filterTitle}>Map categories</Text>
            {[{ id: null, label: "All categories" }, ...mapCategories].map(
              (item) => (
                <Pressable
                  key={item.id ?? "all"}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: category === item.id }}
                  onPress={() => {
                    setCategory(item.id);
                    setFilterOpen(false);
                  }}
                  style={[
                    styles.option,
                    category === item.id && styles.selectedOption,
                  ]}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              ),
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
