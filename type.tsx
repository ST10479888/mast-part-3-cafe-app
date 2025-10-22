// Define a single menu item in the cafe
export type ResItem = {
  Nameitem: string;
  description: string;
  category: string | null;
  Amount: number;
  intensity: string;
  image: string | null;
  ingredients: string[];
};
 /**
 * Title: Mast POE
Author: w3schools
Date: 21 October 2025
Available: https://www.w3schools.com/html/default.asp
 */

// Define navigation routes and parameters
export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ManageScreen: {
    items: ResItem[];
    setItems: React.Dispatch<React.SetStateAction<ResItem[]>>;
  };
};