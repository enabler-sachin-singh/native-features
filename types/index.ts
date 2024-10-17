// Type for google Auth information
export type UserProfileType = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};

// ENUM for routes
export enum Routes {
  LOGIN = "/googleLogin",
  ADD_USERS = "/addUser",
  ALL_USERS = "/allUsers",
}
