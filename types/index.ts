// Type for google Auth information
export type UserProfileType = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};

// Type for user
export interface User {
  title: string;
  image: string;
  location: {
    lat: number;
    long: number;
  };
  id: string;
}
