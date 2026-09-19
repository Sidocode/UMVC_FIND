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
import Background from "../../assets/backgrounds/tenBg.svg";
import Close from "../../assets/icons/close.svg";
import Announcement from "../../assets/icons/notification-detail-announcement.svg";
import Building from "../../assets/icons/notification-detail-building.svg";
import Calendar from "../../assets/icons/notification-detail-calendar.svg";
import { styles } from "../styles/notificationDetailSheet.styles";

export default function NotificationDetailSheet({ item, onClosed }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [closing, setClosing] = useState(false);
  const { height } = useWindowDimensions();
  const [loaded] = useFonts({
    DetailRegular: require("../../assets/fonts/afacad-flux-latin-400-normal.ttf"),
    DetailSemiBold: require("../../assets/fonts/afacad-flux-latin-600-normal.ttf"),
    DetailBold: require("../../assets/fonts/afacad-flux-latin-700-normal.ttf"),
  });
  const closedCallback = useRef(onClosed);
  closedCallback.current = onClosed;
  // Mount once per selection; retain the content throughout the closing animation.
  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: closing ? 0 : 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished && closing) closedCallback.current();
    });
    return () => animation.stop();
  }, [closing, progress]);
  const close = () => setClosing(true);
  return (
    <Modal
      transparent
      visible
      animationType="none"
      statusBarTranslucent
      onRequestClose={close}
    >
      <View style={styles.overlay}>
        {/* Outside Tap Area */}
        <Animated.View style={[styles.backdrop, { opacity: progress }]}>
          <Pressable
            style={styles.outside}
            accessibilityRole="button"
            accessibilityLabel="Close notification details"
            onPress={close}
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
          <View style={styles.background} pointerEvents="none">
            <Background width="100%" height="100%" preserveAspectRatio="none" />
          </View>
          {/* Close Button */}
          <View style={styles.closeRow}>
            <Pressable
              style={styles.closeButton}
              onPress={close}
              accessibilityRole="button"
              accessibilityLabel="Close notification details"
            >
              <Close width={28} height={28} />
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Announcement and Message */}
            <View style={styles.announcement}>
              <Announcement
                width={52}
                height={44}
                style={styles.announcementIcon}
              />
            </View>
            <Text style={[styles.title, loaded && styles.titleFont]}>
              {item.title}
            </Text>
            <Text style={[styles.message, loaded && styles.regularFont]}>
              {item.message}
            </Text>
            {/* Building and Update Time */}
            <View style={styles.details}>
              <View style={styles.row}>
                <Building width={43} height={40} />
                <View style={styles.copy}>
                  <Text style={[styles.building, loaded && styles.regularFont]}>
                    {item.buildingName}
                  </Text>
                  <Text style={[styles.location, loaded && styles.regularFont]}>
                    {item.locationName}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <Calendar width={43} height={40} />
                <Text style={[styles.time, loaded && styles.regularFont]}>
                  {item.time}
                </Text>
              </View>
            </View>
            {/* Dismiss Action */}
            <Pressable
              accessibilityRole="button"
              onPress={close}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.buttonText, loaded && styles.buttonFont]}>
                Got it
              </Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
