
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function MembraneDetailsScreen() {
  const membraneComponents = [
    {
      name: "Phospholipid Bilayer",
      description: "Forms the basic structure with hydrophilic heads and hydrophobic tails",
      function: "Selective permeability barrier",
      color: "#2196F3"
    },
    {
      name: "Integral Proteins",
      description: "Span the entire membrane thickness",
      function: "Transport channels, carriers, and receptors",
      color: "#4CAF50"
    },
    {
      name: "Peripheral Proteins",
      description: "Attached to membrane surface",
      function: "Enzymatic activity and structural support",
      color: "#FF9800"
    },
    {
      name: "Cholesterol",
      description: "Steroid molecule embedded in bilayer",
      function: "Membrane fluidity regulation",
      color: "#9C27B0"
    },
    {
      name: "Carbohydrates",
      description: "Attached to proteins and lipids",
      function: "Cell recognition and signaling",
      color: "#F44336"
    }
  ];

  const renderComponent = (component: typeof membraneComponents[0], index: number) => (
    <View key={index} style={[styles.componentCard, { borderLeftColor: component.color }]}>
      <View style={styles.componentHeader}>
        <View style={[styles.componentIndicator, { backgroundColor: component.color }]} />
        <Text style={styles.componentName}>{component.name}</Text>
      </View>
      <Text style={styles.componentDescription}>{component.description}</Text>
      <View style={styles.functionContainer}>
        <Text style={styles.functionLabel}>Function:</Text>
        <Text style={styles.functionText}>{component.function}</Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Membrane Structure",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          presentation: "modal",
        }}
      />
      
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <IconSymbol name="circle.grid.cross" color={colors.accent} size={48} />
            <Text style={styles.title}>Cell Membrane Components</Text>
            <Text style={styles.subtitle}>
              Understanding the structure that enables selective transport
            </Text>
          </View>

          <View style={styles.componentsSection}>
            {membraneComponents.map(renderComponent)}
          </View>

          <View style={styles.keyPointsSection}>
            <Text style={styles.sectionTitle}>Key Points</Text>
            <View style={styles.keyPointsList}>
              <View style={styles.keyPoint}>
                <IconSymbol name="checkmark.circle.fill" color={colors.accent} size={20} />
                <Text style={styles.keyPointText}>
                  Fluid mosaic model describes membrane structure
                </Text>
              </View>
              <View style={styles.keyPoint}>
                <IconSymbol name="checkmark.circle.fill" color={colors.accent} size={20} />
                <Text style={styles.keyPointText}>
                  Selective permeability controls what enters and exits
                </Text>
              </View>
              <View style={styles.keyPoint}>
                <IconSymbol name="checkmark.circle.fill" color={colors.accent} size={20} />
                <Text style={styles.keyPointText}>
                  Temperature affects membrane fluidity
                </Text>
              </View>
              <View style={styles.keyPoint}>
                <IconSymbol name="checkmark.circle.fill" color={colors.accent} size={20} />
                <Text style={styles.keyPointText}>
                  Proteins facilitate specific transport processes
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionSection}>
            <Button
              variant="primary"
              onPress={() => router.back()}
              style={styles.backButton}
            >
              Back to Main
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 24,
  },
  componentsSection: {
    marginBottom: 30,
  },
  componentCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  componentIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  componentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  componentDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  functionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  functionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.accent,
    marginRight: 8,
  },
  functionText: {
    fontSize: 14,
    color: colors.grey,
    flex: 1,
  },
  keyPointsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  keyPointsList: {
    gap: 12,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  keyPointText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  actionSection: {
    marginTop: 20,
  },
  backButton: {
    width: '100%',
  },
});
