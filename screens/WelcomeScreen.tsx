import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type"; 

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">; 

export default function WelcomeScreen({ navigation }: Props) {
  const [isCtaPressed, setIsCtaPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg",
        }}
        style={styles.bg}
      >
        <View style={styles.overlay} />
        <View style={styles.center}>
          <Text style={styles.title}>Welcome to Christoffel Cutlery by Christoffel</Text>
          <Text style={styles.subtitle}>Experience the best Cuisine</Text>
          <TouchableOpacity 
            style={[
              styles.cta,
              isCtaPressed && styles.ctaPressed
            ]} 
            onPress={() => navigation.replace("Home")}
            onPressIn={() => setIsCtaPressed(true)}
            onPressOut={() => setIsCtaPressed(false)}
            activeOpacity={1}
          >
            <Text style={styles.ctaText}>MENU</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const c = {
  accent: "#e53e3e",    
  text: "#ffffff",      
  secondary: "#a0aec0", 
  overlay: "rgba(26, 32, 44, 0.6)",
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1a202c" 
  },
  bg: { 
    flex: 1, 
    justifyContent: "center" 
  },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: c.overlay 
  },
  center: { 
    alignItems: "center", 
    paddingHorizontal: 32 
  },
  title: { 
    color: c.text, 
    fontSize: 42, 
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.8,
    lineHeight: 48,
  },
  subtitle: { 
    color: c.secondary, 
    fontSize: 18, 
    marginTop: 8, 
    marginBottom: 40,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  cta: { 
    backgroundColor: c.accent, 
    paddingVertical: 20, 
    paddingHorizontal: 60, 
    borderRadius: 20, 
    elevation: 16,
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(229, 62, 62, 0.5)',
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  ctaPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#c53030',
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  ctaText: { 
    color: "#ffffff", 
    fontWeight: "900", 
    fontSize: 18,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
});