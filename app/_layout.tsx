import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const router = useRouter();

  const handleAddPress = () => {
    router.navigate("/AddUser");
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "All Users",
          headerRight: () => (
            <TouchableOpacity onPress={handleAddPress}>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* GoogleAuth */}
      <Stack.Screen
        name="GoogleAuthPage"
        options={{
          title: "Google Login",
        }}
      />
    </Stack>
  );
}
