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
    price: 120,
    intensity: "Strong",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.hexQPaITteCkSHZKrFZshAHaHa?cb=12&pid=ImgDet&w=164&h=164&c=7&dpr=1,5&o=7&rm=3",
    ingredients:['Chicken wings, flour, butter, hot sauce, garlic powder, salt, pepper, oil.'],
  },
   {
    id: "4",
    itemName: "California Rolls",
    description:
     'The California roll is a popular sushi roll that typically consists of imitation crab (or real crab), avocado, cucumber, and sushi rice..',
    category: "STARTER",
    price: 125,
    intensity: "Strong",
    image:
      "https://lestresorsderable.com/img/cms/Recettes%20l%20Juin/california-roll-260x180.jpg",
    ingredients:['Rice, cucumber, crab meat or imitation crab, avocado, nori.'],
  },
  {
    id: "5",
    itemName: "Mini Pizza Rolls",
    description:
     'Mini pizza rolls are made from shortcrust pastry, filled with pizza toppings',
    category: "STARTER",
    price: 115,
    intensity: "Strong",
    image:
      "https://www.irishtimes.com/resizer/v2/NAARE4FRMBB7DH4UJHFDPJQ6AA.jpg?auth=34ca975eafdc6be8da92f4fe655d551f5438c20917792ff164d64dc213308693&smart=true&width=1024&height=683",
    ingredients:['Pizza dough, pizza sauce, mozzarella cheese, pepperoni, and Italian herbs.'],
  },
  {
    id: "2",
    itemName: "Beef burger and Chips",
    description:
      'Beef burger with chips is a grilled meat patty in a bun, served with fried potatoes.',
    category: "MAIN",
    price: 240,
    intensity: "Strong",
    image:
      "https://img.taste.com.au/M8fxpuu9/taste/2016/11/beef-burgers-with-double-fried-chips-100842-1.jpeg",
    ingredients: ['Beef burger with chips is a grilled meat patty in a bun, served with fried potatoes.'],
  },
  {
    id: "6",
    itemName: "Chicken Pasta",
    description:
      'Chicken pasta is a creamy, flavorful mix of pasta, chicken, and rich sauce.',
    category: "MAIN",
    price: 215,
    intensity: "Strong",
    image:
      "https://thatovenfeelin.com/wp-content/uploads/2023/10/Creamy-Chicken-Pasta-2.png",
    ingredients: ['Pasta, cooked chicken, cream or tomato sauce, garlic, onions, and cheese.'],
  },
  {
    id: "7",
    itemName: "Large Pepperoni Pizza",
    description:
      'A large pepperoni pizza topped with melted cheese and spicy pepperoni for a classic, crowd-pleasing flavor.',
    category: "MAIN",
    price: 200,
    intensity: "Strong",
    image:
      "https://www.howsweeteats.com/wp-content/uploads/2023/01/cast-iron-pepperoni-pizza-11.jpg",
    ingredients: ['Pizza dough, tomato sauce, mozzarella cheese, and pepperoni slices.'],
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
  
  {
    id: "8",
    itemName: "Tiriamisu",
    description:
      'Tiramisu is a classic Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.',
    category: "DESSERT",
    price: 95,
    intensity: "Strong",
    image:
      "https://natashaskitchen.com/wp-content/uploads/2019/11/Tiramisu-Cake-5.jpg",
    ingredients: ['Ladyfingers, espresso, mascarpone cheese, eggs, sugar, cocoa powder,liqueur.'],
  },
   {
    id: "9",
    itemName: "Fried Ice Cream",
    description:
      'Fried ice cream is a dessert that features a scoop of ice cream coated in a crispy, fried shell, often topped with syrup or whipped cream.',
    category: "DESSERT",
    price: 78,
    intensity: "Strong",
    image:
      "https://myincrediblerecipes.com/wp-content/uploads/2021/02/Fried-Ice-Cream-Lisa-Final-6.jpg",
    ingredients: ['Ice cream, cornflakes or cookie crumbs, eggs, sugar, cinnamon,.'],
  },
];



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