import { useRouter } from "expo-router";
import LoginScreen from "../screens/loginScreen";

export default function LoginRoute() {
  const router = useRouter();
  // UI preview navigation only; Google OAuth is not connected.
  return <LoginScreen onGoogleLogin={() => router.replace("/home")} />;
}
