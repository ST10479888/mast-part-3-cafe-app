import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type"; 

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">; 

export default function WelcomeScreen({ navigation }: Props) {
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
          <TouchableOpacity style={styles.cta} onPress={() => navigation.replace("Home")}>
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
    paddingVertical: 18, 
    paddingHorizontal: 56, 
    borderRadius: 16, 
    elevation: 8,
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    transform: [{ scale: 1 }],
  },
  ctaText: { 
    color: c.text, 
    fontWeight: "800", 
    fontSize: 18,
    letterSpacing: 1.2,
  },
});
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