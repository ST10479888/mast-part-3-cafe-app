import React, { useMemo, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { menuItem, Course, RootStackParamList } from "../type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Filter"> & {
  items?: menuItem[];
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

export default function FilterScreen({ route, items = [] }: Props) {
  const [selected, setSelected] = useState<Course>("STARTER");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredItems = useMemo(
    () => items.filter((i) => i.category === selected),
    [items, selected]
  );

  const categories: { label: string; value: Course }[] = [
    { label: "STARTER", value: "STARTER" },
    { label: "MAIN", value: "MAIN" },
    { label: "DESSERT", value: "DESSERT" },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectCategory = (value: Course) => {
    setSelected(value);
    setShowDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CUSTOM DROPDOWN */}
      <View style={styles.pickerWrap}>
        <TouchableOpacity style={styles.pickerBox} onPress={toggleDropdown}>
          <Text style={styles.pickerText}>{selected}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>

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
            {categories.map((category) => (
              <TouchableOpacity
                key={category.value}
                style={[
                  styles.dropdownItem,
                  selected === category.value && styles.dropdownItemSelected
                ]}
                onPress={() => selectCategory(category.value)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  selected === category.value && styles.dropdownItemTextSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* HEADING */}
      <Text style={styles.heading}>
        {selected}S ({filteredItems.length})
      </Text>

      {/* LIST */}
      <FlatList
        data={filteredItems}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubtext}>Add some menu items first</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.itemName}</Text>
              <Text style={styles.price}>R{item.price}</Text>
              <Text style={styles.intensity}>Intensity: {item.intensity}</Text>

              {/* INGREDIENT TAGS */}
              <View style={styles.chips}>
                {item.ingredients.map((g: string, idx: number) => (
                  <View key={idx} style={styles.chip}>
                    <Text style={styles.chipText}>{g}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: c.bg,
    padding: 0 
  },
  pickerWrap: { 
    marginBottom: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  pickerBox: {
    backgroundColor: c.input,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: c.border,
    height: 56,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
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
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  dropdownItemSelected: {
    backgroundColor: c.accent,
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
  heading: {
    color: c.text,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 12,
    paddingHorizontal: 20,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: c.card,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1.5,
    borderColor: c.border,
  },
  image: { 
    width: "100%", 
    height: 180,
    backgroundColor: "#1a1a1a",
  },
  body: { 
    padding: 20 
  },
  title: { 
    color: c.text,
    fontSize: 18, 
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  price: { 
    color: c.accent, 
    fontSize: 18, 
    fontWeight: "800", 
    marginTop: 8,
    letterSpacing: -0.3,
  },
  intensity: { 
    color: c.secondary, 
    fontSize: 14, 
    marginTop: 6,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  chips: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 8, 
    marginTop: 16 
  },
  chip: {
    backgroundColor: c.input,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: c.border,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  chipText: { 
    color: c.text,
    fontWeight: "600", 
    fontSize: 12,
    letterSpacing: 0.3,
  },
  empty: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 40,
    marginTop: 80,
  },
  emptyText: { 
    color: c.text,
    fontSize: 20, 
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  emptySubtext: { 
    color: c.secondary, 
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});