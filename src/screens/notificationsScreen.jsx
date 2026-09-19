import { useRouter } from "expo-router";
import { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, Text, View } from "react-native";
import NotificationDetailSheet from "../components/NotificationDetailSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/eightBg.svg";
import CloseIcon from "../../assets/icons/close.svg";
import NotificationCard from "../components/NotificationCard";
import { notifications } from "../data/notifications";
import { styles } from "../styles/notificationsScreen.styles";

export default function NotificationsScreen() {
  const router = useRouter();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [fontsLoaded] = useFonts({
    NotificationRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    NotificationSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
  });
  const close = () =>
    router.canGoBack() ? router.back() : router.replace("/home");

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* Fixed Background and Footer Waves */}
      <View style={styles.background} pointerEvents="none">
        <Background width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      {/* Fixed Header */}
      <SafeAreaView edges={["top", "left", "right"]} style={styles.headerSafe}>
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>
            All Notifications
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close all notifications"
            onPress={close}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
          >
            <CloseIcon width={30} height={30} accessible={false} />
          </Pressable>
        </View>
      </SafeAreaView>
      {/* Scrollable Notifications */}
      <SafeAreaView edges={["left", "right", "bottom"]} style={styles.body}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NotificationCard
              item={item}
              fontsLoaded={fontsLoaded}
              onPress={setSelectedNotification}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.empty}>No notifications yet.</Text>
          }
        />
      </SafeAreaView>
      {selectedNotification && <NotificationDetailSheet item={selectedNotification} onClosed={() => setSelectedNotification(null)} />}
    </View>
  );
}
