import { Keyboard } from "react-native";

// Keep Home as the base screen; switching bottom items replaces the current page.
export function openMainScreen(router, destination, fromHome = false) {
  Keyboard.dismiss();
  if (destination === "/home") router.dismissTo("/home");
  else if (fromHome) router.navigate(destination);
  else router.replace(destination);
}
