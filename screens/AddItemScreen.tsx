import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { menuItem, Course, RootStackParamList } from "../type";

type Props = NativeStackScreenProps<RootStackParamList, "AddItem"> & {
  addItem: (item: menuItem) => void;
};

const c = {
  bg: "#000000",
  card: "#1a1a1a",
  text: "#ffffff",
  secondary: "#a0aec0",
  accent: "#e53e3e",    
  input: "#2d3748",
  border: "#4a5568",
  dropdownBg: "#2d3748",
};

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function AddItemScreen({ navigation, addItem }: Props) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Course>("STARTER");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Button press states
  const [isSavePressed, setIsSavePressed] = useState(false);
  const [isCancelPressed, setIsCancelPressed] = useState(false);
  const [isDropdownPressed, setIsDropdownPressed] = useState(false);

  const categories: { label: string; value: Course }[] = [
    { label: "STARTER", value: "STARTER" },
    { label: "MAIN", value: "MAIN" },
    { label: "DESSERT", value: "DESSERT" },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectCategory = (value: Course) => {
    setCategory(value);
    setShowDropdown(false);
  };

  const onSave = () => {
    if (!itemName || !description || !price || !image) {
      Alert.alert("Missing fields", "Please fill in all required fields.");
      return;
    }

    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) {
      Alert.alert("Invalid price", "Enter a valid number.");
      return;
    }

    const intensity: menuItem["intensity"] =
      p < 45 ? "Mild" : p < 60 ? "Balanced" : "Strong";

    const payload: menuItem = {
      id: uid(),
      itemName,
      description,
      category,
      price: p,
      intensity,
      image,
      ingredients: ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    addItem(payload);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: c.bg }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.header}>Add New Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Item name"
            placeholderTextColor={c.secondary}
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor={c.secondary}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Category</Text>
          
          {/* CUSTOM DROPDOWN */}
          <TouchableOpacity 
            style={[
              styles.pickerBox,
              isDropdownPressed && styles.pickerBoxPressed
            ]} 
            onPress={toggleDropdown}
            onPressIn={() => setIsDropdownPressed(true)}
            onPressOut={() => setIsDropdownPressed(false)}
            activeOpacity={1}
          >
            <Text style={styles.pickerText}>{category}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>

          {/* DROPDOWN MODAL */}
          <Modal
            visible={showDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDropdown(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowDropdown(false)}
            >
              <View style={styles.dropdownMenu}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.dropdownItem,
                      category === cat.value && styles.dropdownItemSelected
                    ]}
                    onPress={() => selectCategory(cat.value)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      category === cat.value && styles.dropdownItemTextSelected
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor={c.secondary}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            placeholderTextColor={c.secondary}
            value={ingredients}
            onChangeText={setIngredients}
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            placeholderTextColor={c.secondary}
            value={image}
            onChangeText={setImage}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : null}

          <TouchableOpacity 
            style={[
              styles.save,
              isSavePressed && styles.savePressed
            ]}
            onPress={onSave}
            onPressIn={() => setIsSavePressed(true)}
            onPressOut={() => setIsSavePressed(false)}
            activeOpacity={1}
          >
            <Text style={styles.saveText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cancel,
              isCancelPressed && styles.cancelPressed
            ]}
            onPress={() => navigation.goBack()}
            onPressIn={() => setIsCancelPressed(true)}
            onPressOut={() => setIsCancelPressed(false)}
            activeOpacity={1}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: c.bg,
    padding: 20,
    flexGrow: 1,
  },
  header: {
    color: c.text,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  input: {
    backgroundColor: c.input,
    color: c.text,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: c.border,
    height: 56,
    paddingHorizontal: 18,
    marginVertical: 6,
    fontSize: 16,
    fontWeight: "500",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  label: {
    color: c.text,
    marginLeft: 4,
    marginBottom: 8,
    marginTop: 12,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  pickerBox: {
    backgroundColor: c.input,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: c.border,
    height: 56,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  pickerBoxPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#374151',
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  pickerText: {
    color: c.text,
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownArrow: {
    color: c.accent,
    fontSize: 12,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  dropdownMenu: {
    backgroundColor: c.dropdownBg,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: c.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  dropdownItemSelected: {
    backgroundColor: c.accent,
    elevation: 4,
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItemText: {
    color: c.text,
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownItemTextSelected: {
    color: "#ffffff",
    fontWeight: "700",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: c.border,
    backgroundColor: "#1a1a1a",
  },
  save: {
    backgroundColor: c.accent,
    padding: 18,
    borderRadius: 12,
    marginTop: 28,
    alignItems: "center",
    elevation: 8,
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    transform: [{ scale: 1 }],
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(229, 62, 62, 0.3)',
  },
  savePressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#c53030',
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  saveText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cancel: {
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: c.border,
    backgroundColor: 'transparent',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  cancelPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 2,
  },
  cancelText: {
    color: c.secondary,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});