import React, { useState } from "react";
import {
  Alert,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/ui/Button";

interface ImagePicker {
  onPickImage: (imageUri: string) => void;
}

const ImagePicker: React.FC<ImagePicker> = ({ onPickImage }) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImageUri, setPickedImageUri] = useState<string | undefined>();

  const verifyPermission = async () => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestPermission();
      return permission.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to give permission to access the camera"
      );
      return false;
    }

    return true;
  };

  // Function to take the image
  const takeImage = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled && image.assets) {
      setPickedImageUri(image.assets[0].uri);
      onPickImage(image.assets[0].uri);
    }
  };

  // Function to remove the image
  const cancelImage = () => {
    setPickedImageUri(undefined);
  };

  let imagePrev = <Text>No Image Taken Yet</Text>;
  if (pickedImageUri) {
    imagePrev = (
      <View style={styles.imagePreviewContainer}>
        <Image style={styles.imagePreview} source={{ uri: pickedImageUri }} />
        <TouchableOpacity style={styles.cancelButton} onPress={cancelImage}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{imagePrev}</View>
      <CustomButton onPress={takeImage}>Take Image</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
    borderColor: Colors.light.tabIconDefault,
    borderWidth: 1,
  },
  imagePreviewContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  cancelButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: Colors.dark.text,
    fontWeight: "bold",
  },
});

export default ImagePicker;
