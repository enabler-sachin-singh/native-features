import { StyleSheet, View, Alert, Text, ActivityIndicator } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  LocationObjectCoords,
} from "expo-location";
import { useEffect, useState } from "react";
import CustomButton from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

interface PickedLocation {
  lat: number;
  long: number;
}

interface PlaceProps {
  onPickLocation: (location: PickedLocation) => void;
  pickedLocation?: PickedLocation;
}

const PlacePicker: React.FC<PlaceProps> = ({
  onPickLocation,
  pickedLocation,
}) => {
  const [location, setLocation] = useState<PickedLocation | undefined>(
    pickedLocation
  );
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const [loading, setLoading] = useState(false);

  const verifyPermission = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permission = await requestPermission();
      return permission.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to give permission to access the location"
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    setLoading(true);
    try {
      const location = await getCurrentPositionAsync();
      const coords: LocationObjectCoords = location.coords;
      setLocation({ lat: coords.latitude, long: coords.longitude });
    } catch (error) {
      Alert.alert("Could not fetch location", "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeLocationHandler = () => {
    setLocation(undefined);
    onPickLocation({ lat: 0, long: 0 });
  };

  useEffect(() => {
    if (location && location.lat !== 0 && location.long !== 0) {
      onPickLocation(location);
    }
  }, [location]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {location ? (
          <Text>{`Location: ${location.lat}, ${location.long}`}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color={Colors.light.tabIconDefault} />
        ) : (
          <Text>No location picked yet</Text>
        )}
      </View>
      <View style={styles.actions}>
        <CustomButton onPress={getLocationHandler} disabled={loading}>
          {loading ? "Locating..." : "Locate User"}
        </CustomButton>
        {location && (
          <CustomButton onPress={removeLocationHandler} disabled={loading}>
            Remove Location
          </CustomButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 100,
    borderColor: Colors.light.tabIconDefault,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default PlacePicker;
