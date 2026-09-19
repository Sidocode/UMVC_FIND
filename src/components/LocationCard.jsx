import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import Arrow from "../../assets/icons/proceed-arrow.svg";
import { styles } from "../styles/locationCard.styles";

const categoryColors = {
  Academic: "#AF2532",
  Facilities: "#1EAB58",
  "Other Buildings": "#FA5D0E",
};

export default function LocationCard({ item, onPress, variant = "search" }) {
  const [loaded] = useFonts({
    LocationRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    LocationSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
  });
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.category}`}
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* Location Photo */}
      <Image source={item.image} style={styles.photo} contentFit="cover" />
      <View style={styles.copy}>
        <Text style={[styles.name, loaded && styles.nameFont]}>
          {item.name}
        </Text>
        {/* Category and Floors */}
        <View style={styles.details}>
          <Text
            style={[
              styles.detail,
              loaded && styles.detailFont,
              { color: categoryColors[item.category] || "#6C757D" },
              variant === "history" && styles.badge,
              variant === "history" && { backgroundColor: categoryColors[item.category] || "#6C757D" },
            ]}
          >
            {item.category}
          </Text>
          {variant !== "history" && item.floors && (
            <Text style={[styles.detail, loaded && styles.detailFont]}>
              • Floors: {item.floors}
            </Text>
          )}
        </View>
        {variant === "history" && (
          <Text style={[styles.time, loaded && styles.detailFont]}>{item.time}</Text>
        )}
      </View>
      <Arrow width={21} height={25} color="#6C757D" accessible={false} />
    </Pressable>
  );
}
