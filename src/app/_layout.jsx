import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", contentStyle: { backgroundColor: "white" } }}>
      {/* Main navigation switches directly; detail pages keep a forward/back slide. */}
      <Stack.Screen name="map" options={{ animation: "fade" }} />
      <Stack.Screen name="home" options={{ animation: "fade" }} />
      <Stack.Screen name="search" options={{ animation: "fade" }} />
      <Stack.Screen name="categories" options={{ animation: "fade" }} />
      <Stack.Screen name="profile" options={{ animation: "fade" }} />
    </Stack>
  );
}
