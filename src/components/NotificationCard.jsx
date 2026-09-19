import { Text, View, Pressable } from "react-native";
import Arrow from "../../assets/icons/proceed-arrow.svg";
import { styles } from "../styles/notificationCard.styles";

export default function NotificationCard({ item, onPress, fontsLoaded }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${item.message}. ${item.time}`}
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* Notification Text and Timestamp */}
      <View style={styles.copy}>
        <Text style={[styles.title, fontsLoaded && styles.titleFont]}>
          {item.title}
        </Text>
        <Text style={[styles.message, fontsLoaded && styles.regularFont]}>
          {item.message}
        </Text>
        <Text style={[styles.time, fontsLoaded && styles.regularFont]}>
          {item.time}
        </Text>
      </View>
      <Arrow width={21} height={25} color="#B6B8BA" accessible={false} />
    </Pressable>
  );
}
