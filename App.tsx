import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { menuItem, Course, RootStackParamList } from "./type";
import WelcomeScreen from "./screens/WelcomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import FilterScreen from "./screens/FilterScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();


const predefined: menuItem[] = [
  {
    id: "1",
    itemName: "Buffalo Wings",
    description:
     'Buffalo wings are spicy fried chicken wings tossed in hot sauce and butter.',
    category: "STARTER",
    price: 150,
    intensity: "Strong",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.hexQPaITteCkSHZKrFZshAHaHa?cb=12&pid=ImgDet&w=164&h=164&c=7&dpr=1,5&o=7&rm=3",
    ingredients:['Chicken wings, flour, butter, hot sauce, garlic powder, salt, pepper, oil.'],
  },
  {
    id: "2",
    itemName: "Beef burger and Chips",
    description:
      'Beef burger with chips is a grilled meat patty in a bun, served with fried potatoes.',
    category: "MAIN",
    price: 114,
    intensity: "Strong",
    image:
      "https://img.taste.com.au/M8fxpuu9/taste/2016/11/beef-burgers-with-double-fried-chips-100842-1.jpeg",
    ingredients: ['Beef burger with chips is a grilled meat patty in a bun, served with fried potatoes.'],
  },
  {
    id: "3",
    itemName: "Chocolate Cake",
    description:
      'Chocolate cake is a sweet, moist cake flavored with rich cocoa.',
    category: "DESSERT",
    price: 55,
    intensity: "Strong",
    image:
      "https://christinebailey.co.uk/wp-content/uploads/2015/01/chocolate-cake-slice-e1448521562644.jpg",
    ingredients: ['Flour, sugar, cocoa powder, eggs, butter, milk, baking powder, vanilla essence, salt.'],
  },
];

// We'll render screens via render callbacks so they receive latest props from App.

export default function App() {
  const [items, setItems] = useState<menuItem[]>(predefined);

  const addItem = (item: menuItem) => setItems((prev) => [...prev, item]);
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const avg = (course: Course) => {
    const list = items.filter((i) => i.category === course);
    if (!list.length) return "0.00";
    const total = list.reduce((sum, i) => sum + i.price, 0);
    return (total / list.length).toFixed(2);
  };

  // Pass current state/handlers directly to screens via render callbacks below

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#e5ff7dd7",
          headerTitleStyle: { fontWeight: "800" },
        }}
      >
        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
          {(props) => <WelcomeScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Home" options={{ title: "Christoffels Cutlery" }}>
          {(props) => (
            <HomeScreen
              {...props}
              items={items}
              removeItem={removeItem}
              averages={{
                STARTER: avg("STARTER"),
                MAIN: avg("MAIN"),
                DESSERT: avg("DESSERT"),
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddItem" options={{ title: "Add New Item", headerBackTitle: "Cancel" }}>
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>

        <Stack.Screen name="Filter" options={{ title: "Filter Menu", headerBackTitle: "Back" }}>
          {(props) => <FilterScreen {...props} items={items} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//CODE ATTRIBUTIONS//

// Title: cafe app (MAST POE 2025)
// Author: Asheel Singh
// Date: 12/11/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)

//Title: cafe app (MAST POE 2025)
//Author: w3schools
//Date: 12/11/2025
//Available: https://www.w3schools.com/html/default.asp

//Title: cafe app (MAST POE 2025)
//Author: Visual Studio Code (Chatbot)
//Date: 12/11/2025
//Available: https://code.visualstudio.com/