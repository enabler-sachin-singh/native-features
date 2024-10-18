import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

export default function Layout() {
  const router = useRouter();

  const authCTX = useContext(AuthContext);

  const handleLogout = () => {
    authCTX?.logout();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {/* Home Screen with logout icon in the header */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Overview",
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={{ paddingRight: 16 }}
              >
                <Ionicons name="log-out-outline" size={24} />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Add User Screen */}
        <Drawer.Screen
          name="addUser"
          options={{
            drawerLabel: "Add User",
            title: "Add New User",
          }}
        />

        {/* All Users Screen with + icon in the header */}
        <Drawer.Screen
          name="allUsers"
          options={{
            drawerLabel: "All Users",
            title: "All Users",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/addUser")}
                style={{ paddingRight: 16 }}
              >
                <Ionicons name="add" size={24} color="#00aaff" />
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
