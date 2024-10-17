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
}

const PlacePicker: React.FC<PlaceProps> = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState<
    PickedLocation | undefined
  >(undefined);
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
      setPickedLocation({ lat: coords.latitude, long: coords.longitude });
    } catch (error) {
      Alert.alert("Could not fetch location", "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeLocationHandler = () => {
    setPickedLocation(undefined);
  };

  useEffect(() => {
    if (pickedLocation) {
      onPickLocation(pickedLocation);
    }
  }, [pickedLocation]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Text>{`Location: ${pickedLocation.lat}, ${pickedLocation.long}`}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Text>No location picked yet</Text>
        )}
      </View>
      <View style={styles.actions}>
        <CustomButton onPress={getLocationHandler} disabled={loading}>
          {loading ? "Locating..." : "Locate User"}{" "}
        </CustomButton>
        {pickedLocation && (
          <CustomButton onPress={removeLocationHandler} disabled={loading}>
            Remove Location
          </CustomButton>
        )}
      </View>
    </View>
  );
};

export default PlacePicker;

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
