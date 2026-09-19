import { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../../assets/backgrounds/sevenBg.svg";
import CloseIcon from "../../assets/icons/close.svg";
import NotificationCard from "./NotificationCard";
import { styles } from "../styles/notificationSheet.styles";

export default function NotificationSheet({
  visible,
  onClose,
  items,
  onSelect,
  onViewAll,
  onClosed,
}) {
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    NotificationRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    NotificationSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
    NotificationBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });

  // Keep the modal mounted until its closing animation has finished.
  useEffect(() => {
    if (visible) setMounted(true);
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && !visible) {
        setMounted(false);
        onClosed?.();
      }
    });
    return () => animation.stop();
  }, [visible, progress, onClosed]);

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Outside Tap Area: separate from the sheet so inside taps never dismiss it. */}
        <Animated.View style={[styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={styles.outside}
            accessibilityRole="button"
            accessibilityLabel="Close notifications"
            onPress={onClose}
          />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
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
          {/* Background includes the red header and footer waves. */}
          <View pointerEvents="none" style={styles.background}>
            <Background width="100%" height="100%" preserveAspectRatio="none" />
          </View>
          {/* Fixed Heading and Close Button */}
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.heading}>
              Notifications
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close notifications"
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            >
              <CloseIcon width={28} height={28} accessible={false} />
            </Pressable>
          </View>
          {/* Scrollable Notification Cards */}
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={items}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <NotificationCard
                item={item}
                onPress={onSelect}
                fontsLoaded={fontsLoaded}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.empty}>No notifications yet.</Text>
            }
          />
          {/* Fixed View All Button and Space for Waves */}
          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 12) },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              onPress={onViewAll}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[styles.buttonText, fontsLoaded && styles.buttonFont]}
              >
                View all Notifications
              </Text>
            </Pressable>
            <View style={styles.waveSpace} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
