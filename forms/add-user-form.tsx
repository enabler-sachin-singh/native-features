import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ImagePicker from "./image-form";
import PlacePicker from "./location-form";
import CustomButton from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { USER } from "@/lib";

interface PickedLocation {
  lat: number;
  long: number;
}

const AddUserForm = () => {
  const router = useRouter();

  const initialFormData = {
    title: "",
    image: "",
    location: { lat: 0, long: 0 },
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, image, location } = formData;

  const handleFormChange = (
    field: keyof typeof formData,
    value: string | PickedLocation
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleOnLocationTaken = (location: PickedLocation) => {
    handleFormChange("location", location);
  };

  const handleOnImageTaken = (imageUri: string | undefined) => {
    handleFormChange("image", imageUri || ""); // Handle the image removal
  };

  const validateForm = () => {
    return title.trim() && image && location.lat !== 0 && location.long !== 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newId = `${
      parseInt(new Date().toLocaleTimeString()) * Math.random()
    }`;
    const newUser = {
      id: newId,
      ...formData,
    };

    USER?.push(newUser);

    // Reset form after submission
    setFormData(initialFormData);

    router.push("/allUsers");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={(value) => handleFormChange("title", value)}
          />
        </View>

        <ImagePicker onPickImage={handleOnImageTaken} pickedImageUri={image} />
        <PlacePicker
          onPickLocation={handleOnLocationTaken}
          pickedLocation={location}
        />
      </ScrollView>

      {/* Button at the bottom */}
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleSubmit} disabled={!validateForm()}>
          Add User
        </CustomButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});

export default AddUserForm;
