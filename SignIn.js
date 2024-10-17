import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

// Function to check if the error has a code property
const isErrorWithCode = (error) => {
  return error && typeof error.code === "string";
};

// Updated signIn function
const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      console.log(response.data.user);
      return response.data.user; // Return user info directly
    } else {
      console.log("Sign-in was cancelled by user.");
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Sign-in is in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Play services not available");
          break;
        default:
          console.error("An unexpected error occurred:", error);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
  return null; // Return null if sign-in fails
};

export default signIn;
