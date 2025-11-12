import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { menuItem, RootStackParamList } from "../type";

type Props = NativeStackScreenProps<RootStackParamList, "Home"> & {
  items: menuItem[];
  removeItem: (id: string) => void;
  averages: { STARTER: string; MAIN: string; DESSERT: string };
};

export default function HomeScreen({
  navigation,
  items,
  removeItem,
  averages,
}: Props) {
  // Button press states
  const [pressedRemoveId, setPressedRemoveId] = useState<string | null>(null);
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [isFilterPressed, setIsFilterPressed] = useState(false);

  const confirmRemove = (id: string) => {
    Alert.alert("Remove item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOTAL NUMBER OF MENU ITEMS */}
      <Text style={styles.heading}>Menu ({items.length})</Text>

      {/* CATEGORY STATS (AVG + COUNT) */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>STARTERS</Text>
          <Text style={styles.statValue}>R{averages.STARTER}</Text>
          <Text style={styles.statCount}>
            {items.filter((i) => i.category === "STARTER").length} items
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>MAINS</Text>
          <Text style={styles.statValue}>R{averages.MAIN}</Text>
          <Text style={styles.statCount}>
            {items.filter((i) => i.category === "MAIN").length} items
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>DESSERTS</Text>
          <Text style={styles.statValue}>R{averages.DESSERT}</Text>
          <Text style={styles.statCount}>
            {items.filter((i) => i.category === "DESSERT").length} items
          </Text>
        </View>
      </View>

      {/* MENU LIST */}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.itemName}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.meta}>
                {item.category} · R{item.price} · {item.intensity}
              </Text>
              <TouchableOpacity
                style={[
                  styles.remove,
                  pressedRemoveId === item.id && styles.removePressed
                ]}
                onPress={() => confirmRemove(item.id)}
                onPressIn={() => setPressedRemoveId(item.id)}
                onPressOut={() => setPressedRemoveId(null)}
                activeOpacity={1}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No menu items yet</Text>
            <Text style={styles.emptySubtext}>Tap the Add button to create your first item</Text>
          </View>
        }
      />

      {/* BUTTONS */}
      <View style={styles.fabs}>
        <TouchableOpacity
          style={[
            styles.fab,
            isAddPressed && styles.fabPressed
          ]}
          onPress={() => navigation.navigate("AddItem")}
          onPressIn={() => setIsAddPressed(true)}
          onPressOut={() => setIsAddPressed(false)}
          activeOpacity={1}
        >
          <Text style={styles.fabText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.fab,
            styles.fabAlt,
            isFilterPressed && styles.fabPressed
          ]}
          onPress={() => navigation.navigate("Filter")}
          onPressIn={() => setIsFilterPressed(true)}
          onPressOut={() => setIsFilterPressed(false)}
          activeOpacity={1}
        >
          <Text style={styles.fabText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const c = {
  bg: "#000000",
  card: "#1a1a1a",
  text: "#ffffff",
  secondary: "#a0aec0",
  accent: "#e53e3e",    
  input: "#2d3748",
  border: "#4a5568",
  success: "#38a169",   
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: c.bg,
    padding: 0 
  },
  heading: {
    color: c.text,
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 24,
    paddingHorizontal: 20,
    letterSpacing: -0.5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingHorizontal: 20,
    gap: 12,
  },
  stat: {
    backgroundColor: c.card,
    flex: 1,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1.5,
    borderColor: c.border,
  },
  statLabel: { 
    color: c.secondary, 
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  statValue: { 
    color: c.accent, 
    fontSize: 20, 
    fontWeight: "800",
    marginTop: 8,
    letterSpacing: -0.3,
  },
  statCount: {
    color: c.secondary,
    fontSize: 13,
    marginTop: 6,
    fontWeight: "600",
    letterSpacing: 0.3,
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
  desc: { 
    color: c.secondary, 
    marginVertical: 12,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  meta: { 
    color: c.secondary, 
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  remove: {
    backgroundColor: c.accent,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    elevation: 6,
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(229, 62, 62, 0.3)',
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  removePressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#c53030',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  removeText: { 
    color: "#ffffff", 
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  fabs: {
    position: "absolute",
    right: 20,
    bottom: 28,
    flexDirection: "row",
    gap: 16,
  },
  fab: {
    backgroundColor: c.accent,
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 20,
    elevation: 12,
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(229, 62, 62, 0.4)',
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  fabPressed: {
    transform: [{ scale: 0.9 }],
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  fabAlt: { 
    backgroundColor: c.success,
    shadowColor: c.success,
    borderColor: 'rgba(56, 161, 105, 0.4)',
  },
  fabText: { 
    color: "#ffffff", 
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 80,
  },
  emptyText: {
    color: c.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  emptySubtext: {
    color: c.secondary,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});