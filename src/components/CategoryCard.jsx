import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/categoryCard.styles";

export default function CategoryCard({ item, Icon, onPress }) {
  const [loaded] = useFonts({
    CategoryRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    CategoryBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.count} buildings`}
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: item.color },
        pressed && styles.pressed,
      ]}
    >
      {/* Category Details */}
      <View style={styles.details}>
        <Icon width={50} height={50} accessible={false} />
        <Text style={[styles.name, loaded && styles.nameFont]}>
          {item.name}
        </Text>
        <Text style={[styles.count, loaded && styles.countFont]}>
          {item.count} {item.count === 1 ? "building" : "buildings"}
        </Text>
      </View>
      {/* Category Photo */}
      <Image source={item.image} style={styles.photo} contentFit="cover" />
    </Pressable>
  );
}
