export type Course = "STARTER" | "MAIN" | "DESSERT";

export type menuItem = {
  id: string;
  itemName: string;
  description: string;
  category: Course;
  price: number;
  intensity: "Mild" | "Balanced" | "Strong" | string;
  image: string;
  ingredients: string[];
};

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};