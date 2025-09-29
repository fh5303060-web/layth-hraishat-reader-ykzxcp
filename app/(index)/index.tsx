
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, ImageBackground } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

const ICON_COLOR = "#007AFF";

export default function HomeScreen() {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  const transportMethods = [
    {
      id: "passive",
      title: "Passive Transport",
      subtitle: "No Energy Required",
      description: "Movement of substances across the membrane without energy input",
      methods: ["Simple Diffusion", "Facilitated Diffusion", "Osmosis"],
      color: "#4CAF50",
      icon: "arrow.right.circle"
    },
    {
      id: "active",
      title: "Active Transport",
      subtitle: "Energy Required",
      description: "Movement against concentration gradient using ATP",
      methods: ["Primary Active Transport", "Secondary Active Transport"],
      color: "#FF9800",
      icon: "bolt.circle"
    },
    {
      id: "bulk",
      title: "Bulk Transport",
      subtitle: "Large Molecules",
      description: "Transport of large molecules via vesicles",
      methods: ["Endocytosis", "Exocytosis", "Phagocytosis", "Pinocytosis"],
      color: "#9C27B0",
      icon: "circle.grid.3x3"
    }
  ];

  const renderTransportMethod = (method: typeof transportMethods[0]) => (
    <Pressable
      key={method.id}
      style={[styles.methodCard, { borderColor: method.color }]}
      onPress={() => setSelectedTransport(selectedTransport === method.id ? null : method.id)}
    >
      <View style={styles.methodHeader}>
        <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
          <IconSymbol name={method.icon as any} color="white" size={24} />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodTitle}>{method.title}</Text>
          <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
        </View>
        <IconSymbol 
          name={selectedTransport === method.id ? "chevron.up" : "chevron.down"} 
          color={colors.text} 
          size={20} 
        />
      </View>
      
      {selectedTransport === method.id && (
        <View style={styles.methodDetails}>
          <Text style={styles.methodDescription}>{method.description}</Text>
          <View style={styles.methodsList}>
            {method.methods.map((subMethod, index) => (
              <View key={index} style={styles.subMethodItem}>
                <View style={[styles.subMethodDot, { backgroundColor: method.color }]} />
                <Text style={styles.subMethodText}>{subMethod}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push("/membrane-details")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="info.circle" color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.push("/quiz")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="questionmark.circle" color={ICON_COLOR} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "LAYTH HRAISHAT",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      
      <View style={styles.container}>
        {/* Background with transparent overlay */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop' }}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.appTitle}>LAYTH HRAISHAT</Text>
            <Text style={styles.appSubtitle}>Bilazmii - Membrane Transport Methods</Text>
            <Text style={styles.headerDescription}>
              Explore the fascinating world of cellular membrane transport mechanisms
            </Text>
          </View>

          {/* Transport Methods */}
          <View style={styles.methodsSection}>
            <Text style={styles.sectionTitle}>Transport Methods</Text>
            {transportMethods.map(renderTransportMethod)}
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Button
              variant="primary"
              onPress={() => router.push("/interactive-demo")}
              style={styles.actionButton}
            >
              Interactive Demo
            </Button>
            <Button
              variant="outline"
              onPress={() => router.push("/study-guide")}
              style={styles.actionButton}
            >
              Study Guide
            </Button>
          </View>
        </ScrollView>

        {/* Bottom Image Representation */}
        <View style={styles.bottomImageContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop' }}
            style={styles.bottomImage}
            imageStyle={styles.bottomImageStyle}
          >
            <View style={styles.bottomImageOverlay}>
              <Text style={styles.bottomImageText}>Cell Membrane Structure</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImageStyle: {
    opacity: 0.1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for bottom image
  },
  headerSection: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 18,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  headerDescription: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  methodsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  methodCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  methodSubtitle: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '500',
  },
  methodDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.grey + '30',
  },
  methodDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  methodsList: {
    gap: 12,
  },
  subMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMethodDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  subMethodText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  actionsSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomImageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerButtonContainer: {
    padding: 8,
  },
});
