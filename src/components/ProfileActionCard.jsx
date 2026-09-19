import { useFonts } from "expo-font";
import { Pressable, Text, View } from "react-native";
import Arrow from "../../assets/icons/proceed-arrow.svg";
import { styles } from "../styles/profileActionCard.styles";

export default function ProfileActionCard({
  title,
  description,
  Icon,
  onPress,
}) {
  const [loaded] = useFonts({
    ProfileActionMedium: require("../../assets/fonts/afacad-flux-latin-500-normal.ttf"),
  });
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={description}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* Action Icon */}
      <Icon width={65} height={64} accessible={false} />
      {/* Action Label and Description */}
      <View style={styles.copy}>
        <Text style={[styles.title, loaded && styles.font]}>{title}</Text>
        <Text style={[styles.description, loaded && styles.font]}>
          {description}
        </Text>
      </View>
      <Arrow width={21} height={25} color="#6C757D" accessible={false} />
    </Pressable>
  );
}
