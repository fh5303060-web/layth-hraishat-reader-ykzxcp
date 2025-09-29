
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function InteractiveDemoScreen() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [animationValue] = useState(new Animated.Value(0));

  const demos = [
    {
      id: "diffusion",
      title: "Simple Diffusion",
      description: "Molecules move from high to low concentration",
      example: "Oxygen entering cells",
      steps: [
        "High concentration outside cell",
        "Molecules cross membrane freely",
        "Equilibrium reached",
        "No energy required"
      ],
      color: "#4CAF50"
    },
    {
      id: "facilitated",
      title: "Facilitated Diffusion",
      description: "Transport through protein channels",
      example: "Glucose entering cells",
      steps: [
        "Molecule binds to carrier protein",
        "Protein changes shape",
        "Molecule released inside cell",
        "Protein returns to original shape"
      ],
      color: "#2196F3"
    },
    {
      id: "active",
      title: "Active Transport",
      description: "Energy-driven transport against gradient",
      example: "Sodium-Potassium pump",
      steps: [
        "ATP provides energy",
        "Protein pump changes conformation",
        "Ions moved against gradient",
        "Concentration gradient maintained"
      ],
      color: "#FF9800"
    },
    {
      id: "endocytosis",
      title: "Endocytosis",
      description: "Cell membrane engulfs materials",
      example: "White blood cells eating bacteria",
      steps: [
        "Membrane surrounds material",
        "Vesicle forms inside cell",
        "Material transported internally",
        "Vesicle may fuse with organelles"
      ],
      color: "#9C27B0"
    }
  ];

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderDemo = (demo: typeof demos[0]) => (
    <Pressable
      key={demo.id}
      style={[
        styles.demoCard,
        { borderColor: demo.color },
        selectedDemo === demo.id && styles.selectedCard
      ]}
      onPress={() => {
        setSelectedDemo(selectedDemo === demo.id ? null : demo.id);
        if (selectedDemo !== demo.id) {
          startAnimation();
        }
      }}
    >
      <View style={styles.demoHeader}>
        <View style={[styles.demoIcon, { backgroundColor: demo.color }]}>
          <IconSymbol name="play.circle" color="white" size={24} />
        </View>
        <View style={styles.demoInfo}>
          <Text style={styles.demoTitle}>{demo.title}</Text>
          <Text style={styles.demoDescription}>{demo.description}</Text>
          <Text style={styles.demoExample}>Example: {demo.example}</Text>
        </View>
      </View>

      {selectedDemo === demo.id && (
        <View style={styles.demoDetails}>
          <Text style={styles.stepsTitle}>Process Steps:</Text>
          <View style={styles.stepsList}>
            {demo.steps.map((step, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.stepItem,
                  {
                    opacity: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                    transform: [{
                      translateX: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 10],
                      }),
                    }],
                  }
                ]}
              >
                <View style={[styles.stepNumber, { backgroundColor: demo.color }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </Animated.View>
            ))}
          </View>
          
          <View style={styles.animationContainer}>
            <Animated.View
              style={[
                styles.animatedElement,
                { backgroundColor: demo.color },
                {
                  transform: [{
                    translateX: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 200],
                    }),
                  }],
                }
              ]}
            />
            <Text style={styles.animationLabel}>Transport Direction →</Text>
          </View>
        </View>
      )}
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Interactive Demo",
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
            <IconSymbol name="play.rectangle" color={colors.accent} size={48} />
            <Text style={styles.title}>Transport Mechanisms</Text>
            <Text style={styles.subtitle}>
              Tap on each method to see how it works
            </Text>
          </View>

          <View style={styles.demosSection}>
            {demos.map(renderDemo)}
          </View>

          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitle}>How to Use</Text>
            <View style={styles.instructionsList}>
              <View style={styles.instruction}>
                <IconSymbol name="hand.tap" color={colors.accent} size={20} />
                <Text style={styles.instructionText}>Tap on any transport method</Text>
              </View>
              <View style={styles.instruction}>
                <IconSymbol name="eye" color={colors.accent} size={20} />
                <Text style={styles.instructionText}>Watch the animation</Text>
              </View>
              <View style={styles.instruction}>
                <IconSymbol name="book" color={colors.accent} size={20} />
                <Text style={styles.instructionText}>Read the step-by-step process</Text>
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
  demosSection: {
    marginBottom: 30,
  },
  demoCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  selectedCard: {
    borderWidth: 3,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  demoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  demoInfo: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  demoDescription: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
    lineHeight: 22,
  },
  demoExample: {
    fontSize: 14,
    color: colors.grey,
    fontStyle: 'italic',
  },
  demoDetails: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.grey + '30',
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  stepsList: {
    gap: 12,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
    marginTop: 4,
  },
  animationContainer: {
    height: 60,
    backgroundColor: colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    position: 'relative',
  },
  animatedElement: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  animationLabel: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    fontSize: 12,
    color: colors.grey,
  },
  instructionsSection: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  instructionsList: {
    gap: 12,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  actionSection: {
    marginTop: 20,
  },
  backButton: {
    width: '100%',
  },
});
