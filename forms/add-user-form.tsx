import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
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
  const route = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    location: { lat: 0, long: 0 },
  });

  const handleChange = (
    name: keyof typeof formData,
    value: string | PickedLocation
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newId = `${
      parseInt(new Date().toLocaleTimeString()) * Math.random()
    }`;
    const newUser = {
      id: newId,
      ...formData,
    };

    USER?.push(newUser);
    route.navigate("/");
  };

  const handleOnLocationTaken = (location: PickedLocation) => {
    handleChange("location", location);
  };

  const handleOnImageTaken = (imageUri: string) => {
    handleChange("image", imageUri);
  };

  const isFormValid =
    formData.title &&
    formData.image &&
    formData.location.lat &&
    formData.location.long;

  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={formData.title}
            onChangeText={(value) => handleChange("title", value)}
          />
        </View>
        <ImagePicker onPickImage={handleOnImageTaken} />
        <PlacePicker onPickLocation={handleOnLocationTaken} />
        <View style={{ marginTop: 40 }}>
          <CustomButton onPress={handleSubmit} disabled={!isFormValid}>
            Add User
          </CustomButton>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
    justifyContent: "flex-start",
  },
  titleInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default AddUserForm;
