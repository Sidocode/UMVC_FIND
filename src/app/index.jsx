import { useRouter } from "expo-router";
import WelcomeScreen from "../screens/welcomeScreen";

export default function WelcomeRoute() {
  const router = useRouter();
  return <WelcomeScreen onGetStarted={() => router.replace("/login")} />;
}
