import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, ResItem } from './type';

/**
 * Predefined default cafe items
 */
const predefinedItems: ResItem[] = [

  {
     Nameitem: 'Buffalo wings',
    description: 'Buffalo wings are spicy fried chicken wings tossed in hot sauce and butter.',
    category: 'Starter',
    Amount: 150,
    intensity: 'Strong',
    image:
      'https://tse4.mm.bing.net/th/id/OIP.hexQPaITteCkSHZKrFZshAHaHa?cb=12&pid=ImgDet&w=164&h=164&c=7&dpr=1,5&o=7&rm=3',
    ingredients: ['Chicken wings, flour, butter, hot sauce, garlic powder, salt, pepper, oil.'],
  },

{
  Nameitem: 'Beef burger and chips',
    description: 'Beef burger with chips is a grilled meat patty in a bun, served with fried potatoes.',
    category: 'Main Course',
    Amount: 114,
    intensity: 'Strong ',
    image:
      'https://img.taste.com.au/M8fxpuu9/taste/2016/11/beef-burgers-with-double-fried-chips-100842-1.jpeg',
    ingredients: ['Beef patty, burger bun, lettuce, tomato, cheese, onion, pickles, sauce, potatoes, oil, salt.'],
},

{
  Nameitem: 'Chocolate cake',
    description: 'Chocolate cake is a sweet, moist cake flavored with rich cocoa.',
    category: 'Dessert',
    Amount: 55,
    intensity: 'Strong',
    image:
      'https://christinebailey.co.uk/wp-content/uploads/2015/01/chocolate-cake-slice-e1448521562644.jpg',
    ingredients: ['Flour, sugar, cocoa powder, eggs, butter, milk, baking powder, vanilla essence, salt.'],
},
];

/**
 * Screen for adding a new menu item
 */
function ManageMenuScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ManageScreen'>
) {
  const [Nameitem, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('Starters');
  const [Amount, setAmount] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = () => {
    if (Nameitem && description && category && Amount) {
      const AmountValue = parseFloat(Amount);

      if (AmountValue > 0) {
        // Calculate intensity based on price
        const intensity =
          AmountValue < 45 ? 'Mild' : AmountValue < 65 ? 'Balanced' : 'Strong';

        // Create a new CafeItem object
        const newItem: ResItem = {
          Nameitem,
          description,
          category,
          Amount: AmountValue,
          intensity,
          image,
          ingredients: ingredients.split(',').map((i) => i.trim()),
        };

        // Update parent screen state using the passed setter function
        props.route.params.setItems([
          ...props.route.params.items,
          newItem,
        ]);

        props.navigation.goBack();
      } else {
        Alert.alert('Invalid Price', 'Price must be greater than 0.');
      }
    } else {
      Alert.alert('Missing Fields', 'Please fill out all fields before saving.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a New Dish.</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={Nameitem}
            onChangeText={setItemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Category Picker */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#4169e1"
                style={styles.pickerStyle}
                itemStyle={{ height: 50 }}
              >
                <Picker.Item
                  label="Select a Category"
                  value=""
                  color="#999"
                />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Mains" value="Main Course" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 50)"
            keyboardType="numeric"
            value={Amount}
            onChangeText={setAmount}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {/* Image preview */}
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/**
 * Home screen that displays the menu list
 */
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
) {
  const [items, setItems] = useState<ResItem[]>(predefinedItems);

  const removeItem = (index: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () =>
          setItems(items.filter((_, i) => i !== index)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Christoffels Cutlery</Text>

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image || '' }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.Nameitem}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category} · R{item.Amount} · {item.intensity}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add New Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          props.navigation.navigate('ManageScreen', {
            items,
            setItems,
          })
        }
      >
        <Text style={styles.addText}>Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/**
 * Simple welcome screen that leads to the home page
 */
function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>) {
  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg',
        }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome to Christoffels Cutlery by Christoffel</Text>
        <Text style={styles.welcomeText}>
          Experience the best Cuisine.
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.startText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Stack navigation setup
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ManageScreen" component={ManageMenuScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

/**
 * Styles for the app
 */
const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: '#000000' },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    color: '#FFD700', // Gold
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    color: '#D4AF37', // Metallic gold
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#FFD700', // Gold
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startText: { color: '#000000', fontWeight: 'bold', fontSize: 18 },

  container: { flex: 1, backgroundColor: '#000000', padding: 15 },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFD700', // Gold
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#1A1A1A', // Dark gray
    borderRadius: 18,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardImage: { width: '100%', height: 220 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#FFD700' }, // Gold text
  cardDesc: { color: '#D4AF37', fontSize: 14, marginVertical: 5 }, // Metallic gold
  cardMeta: { color: '#B8860B', fontSize: 13 }, // Dark golden rod
  removeButton: {
    backgroundColor: '#B8860B', // Dark golden rod
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  removeText: { color: '#000000', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#FFD700', // Gold
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  addText: { color: '#000000', fontSize: 18, fontWeight: 'bold' },

  formContainer: { backgroundColor: '#000000', padding: 20 },
  formHeader: {
    fontSize: 24,
    color: '#FFD700', // Gold
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderColor: '#FFD700',
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
    color: '#FFFFFF', // White text for inputs
  },
  pickerWrapper: { marginVertical: 10 },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFD700', // Gold
    marginBottom: 6,
    marginLeft: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pickerStyle: {
    height: 50,
    width: '100%',
    color: '#FFFFFF', // White text for picker
    fontSize: 15,
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginTop: 15,
    shadowColor: '#FFD700',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#FFD700', // Gold
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  saveButtonText: { color: '#000000', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#D4AF37', fontWeight: 'bold' }, // Metallic gold
});