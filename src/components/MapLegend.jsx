import { Text, View } from "react-native";
import Pin from "../../assets/icons/map-pin.svg";
import { mapCategories } from "../data/mapCategories";
import { styles } from "../styles/mapScreen.styles";

export default function MapLegend({ fontLoaded }) {
  return (
    <View style={styles.legend}>
      {mapCategories.map((item) => (
        <View key={item.id} style={styles.legendItem}>
          <Pin color={item.color} />
          <Text style={[styles.legendText, fontLoaded && styles.font]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
