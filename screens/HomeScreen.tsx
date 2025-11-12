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
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { menuItem, RootStackParamList } from "../type";
import { useTheme } from "../context/ThemeContext";
import ThemeSelector from "../components/ThemeSelector";

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
  const { currentTheme } = useTheme();
  const [pressedRemoveId, setPressedRemoveId] = useState<string | null>(null);
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [isFilterPressed, setIsFilterPressed] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Filter items based on search
  const filteredItems = searchQuery ? items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : items;

  const confirmRemove = (id: string) => {
    Alert.alert("Remove item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.bg }]}>
      {/* TOTAL NUMBER OF MENU ITEMS */}
      <Text style={[styles.heading, { color: currentTheme.colors.text }]}>
        Menu ({filteredItems.length})
      </Text>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: currentTheme.colors.input,
              color: currentTheme.colors.text,
              borderColor: currentTheme.colors.border,
            }
          ]}
          placeholder="Search menu items..."
          placeholderTextColor={currentTheme.colors.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearSearch}
            onPress={() => setSearchQuery('')}
          >
            <Text style={{ color: currentTheme.colors.accent, fontSize: 18, fontWeight: 'bold' }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* CATEGORY STATS (AVG + COUNT) */}
      <View style={styles.statsRow}>
        <View style={[
          styles.stat, 
          { 
            backgroundColor: currentTheme.colors.card,
            borderColor: currentTheme.colors.border,
            shadowColor: currentTheme.colors.shadow,
          }
        ]}>
          <Text style={[styles.statLabel, { color: currentTheme.colors.secondary }]}>STARTERS</Text>
          <Text style={[styles.statValue, { color: currentTheme.colors.accent }]}>R{averages.STARTER}</Text>
          <Text style={[styles.statCount, { color: currentTheme.colors.secondary }]}>
            {items.filter((i) => i.category === "STARTER").length} items
          </Text>
        </View>

        <View style={[
          styles.stat, 
          { 
            backgroundColor: currentTheme.colors.card,
            borderColor: currentTheme.colors.border,
            shadowColor: currentTheme.colors.shadow,
          }
        ]}>
          <Text style={[styles.statLabel, { color: currentTheme.colors.secondary }]}>MAINS</Text>
          <Text style={[styles.statValue, { color: currentTheme.colors.accent }]}>R{averages.MAIN}</Text>
          <Text style={[styles.statCount, { color: currentTheme.colors.secondary }]}>
            {items.filter((i) => i.category === "MAIN").length} items
          </Text>
        </View>

        <View style={[
          styles.stat, 
          { 
            backgroundColor: currentTheme.colors.card,
            borderColor: currentTheme.colors.border,
            shadowColor: currentTheme.colors.shadow,
          }
        ]}>
          <Text style={[styles.statLabel, { color: currentTheme.colors.secondary }]}>DESSERTS</Text>
          <Text style={[styles.statValue, { color: currentTheme.colors.accent }]}>R{averages.DESSERT}</Text>
          <Text style={[styles.statCount, { color: currentTheme.colors.secondary }]}>
            {items.filter((i) => i.category === "DESSERT").length} items
          </Text>
        </View>
      </View>

      {/* SEARCH RESULTS INFO */}
      {searchQuery && (
        <View style={styles.searchInfo}>
          <Text style={[styles.searchInfoText, { color: currentTheme.colors.secondary }]}>
            Found {filteredItems.length} items for "{searchQuery}"
          </Text>
        </View>
      )}

      {/* MENU LIST */}
      <FlatList
        data={filteredItems}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[
            styles.card,
            { 
              backgroundColor: currentTheme.colors.card,
              borderColor: currentTheme.colors.border,
              shadowColor: currentTheme.colors.shadow,
            }
          ]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <Text style={[styles.title, { color: currentTheme.colors.text }]}>{item.itemName}</Text>
              <Text style={[styles.desc, { color: currentTheme.colors.secondary }]}>{item.description}</Text>
              <Text style={[styles.meta, { color: currentTheme.colors.secondary }]}>
                {item.category} · R{item.price} · {item.intensity}
              </Text>
              <TouchableOpacity
                style={[
                  styles.remove,
                  pressedRemoveId === item.id && styles.removePressed,
                  { 
                    backgroundColor: currentTheme.colors.accent,
                    borderColor: `rgba(229, 62, 62, 0.3)`,
                    shadowColor: currentTheme.colors.accent,
                  }
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
            <Text style={[styles.emptyText, { color: currentTheme.colors.text }]}>
              {searchQuery ? 'No items found' : 'No menu items yet'}
            </Text>
            <Text style={[styles.emptySubtext, { color: currentTheme.colors.secondary }]}>
              {searchQuery ? 'Try a different search term' : 'Tap the Add button to create your first item'}
            </Text>
          </View>
        }
      />

      {/* BUTTONS */}
      <View style={styles.fabs}>
        {/* Theme Button */}
        <TouchableOpacity
          style={[
            styles.themeButton,
            { backgroundColor: currentTheme.colors.accent }
          ]}
          onPress={() => setShowThemeSelector(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.themeButtonText}>🎨</Text>
        </TouchableOpacity>

        {/* Add Button */}
        <TouchableOpacity
          style={[
            styles.fab,
            isAddPressed && styles.fabPressed,
            { 
              backgroundColor: currentTheme.colors.accent,
              borderColor: `rgba(229, 62, 62, 0.4)`,
              shadowColor: currentTheme.colors.accent,
            }
          ]}
          onPress={() => navigation.navigate("AddItem")}
          onPressIn={() => setIsAddPressed(true)}
          onPressOut={() => setIsAddPressed(false)}
          activeOpacity={1}
        >
          <Text style={styles.fabText}>Add</Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          style={[
            styles.fab,
            styles.fabAlt,
            isFilterPressed && styles.fabPressed,
            { 
              backgroundColor: currentTheme.colors.success,
              borderColor: `rgba(56, 161, 105, 0.4)`,
              shadowColor: currentTheme.colors.success,
            }
          ]}
          onPress={() => navigation.navigate("Filter")}
          onPressIn={() => setIsFilterPressed(true)}
          onPressOut={() => setIsFilterPressed(false)}
          activeOpacity={1}
        >
          <Text style={styles.fabText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Selector Modal */}
      <ThemeSelector
        visible={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 0 
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 16,
    paddingHorizontal: 20,
    letterSpacing: -0.5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
  },
  searchInput: {
    borderRadius: 12,
    borderWidth: 1.5,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  clearSearch: {
    position: 'absolute',
    right: 30,
    top: 13,
    padding: 4,
  },
  searchInfo: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInfoText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
    gap: 12,
  },
  stat: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1.5,
  },
  statLabel: { 
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  statValue: { 
    fontSize: 18, 
    fontWeight: "800",
    marginTop: 6,
    letterSpacing: -0.3,
  },
  statCount: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1.5,
  },
  image: { 
    width: "100%", 
    height: 180,
  },
  body: { 
    padding: 20 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  desc: { 
    marginVertical: 12,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  meta: { 
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  remove: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 2,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  removePressed: {
    transform: [{ scale: 0.95 }],
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  removeText: { 
    color: "#ffffff", 
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.6,
  },
  fabs: {
    position: "absolute",
    right: 20,
    bottom: 28,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  themeButton: {
    padding: 16,
    borderRadius: 25,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  themeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fab: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  fabPressed: {
    transform: [{ scale: 0.9 }],
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  fabAlt: { 
    // Success color is handled by theme
  },
  fabText: { 
    color: "#ffffff", 
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  emptySubtext: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});