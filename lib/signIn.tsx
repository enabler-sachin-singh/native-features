import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

interface GoogleSignInError {
  code: string;
  [key: string]: any;
}

const isErrorWithCode = (error: any): error is GoogleSignInError => {
  return error && typeof error.code === "string";
};

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      console.log(response.data.user);
      return response.data.user;
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
  return null;
};
